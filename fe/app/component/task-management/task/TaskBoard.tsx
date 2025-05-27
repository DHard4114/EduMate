'use client'

import { useState, useEffect } from 'react';
import api from '../../../lib/api';
import TaskCard from './TaskCard';
import ProgressBar from '../ProgressBar';
import TaskForm from './TaskForm';
import GroupChat from '../group/GroupChat';
import TaskStatusModal from './TaskStatusModal';
import { Task, TaskProgress, TaskStatus, TaskSummary, Group} from '../Types';
import { GoTrash } from "react-icons/go";
import { CiCirclePlus } from "react-icons/ci";
import { IoChatbubblesOutline } from "react-icons/io5";

export interface TaskBoardProps {
    groupId?: string; // Make groupId optional
}

const TaskBoard = ({ groupId }: TaskBoardProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [progress, setProgress] = useState<TaskProgress | null>(null);
    const [summary, setSummary] = useState<TaskSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [draggedTask, setDraggedTask] = useState<Task | null>(null);
    const [showTrash, setShowTrash] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [tempStatus, setTempStatus] = useState<TaskStatus>('todo');
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [pendingStatus, setPendingStatus] = useState<TaskStatus | null>(null);
    const [group, setGroup] = useState<Group | null>(null);

    // Fetch tasks when component mounts or groupId changes
useEffect(() => {
    const fetchData = async () => {
        if (!groupId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const [tasksRes, progressRes, summaryRes, membersRes] = await Promise.all([
                api.get(`/task/group/${groupId}`),
                api.get(`/task/group/${groupId}/progress`),
                api.get(`/task/group/${groupId}/summary`),
                api.get(`/group/${groupId}/members`) // Changed from /group/${groupId} to match backend route
            ]);

            // Add response validation
            if (!tasksRes.data?.success || !progressRes.data?.success || 
                !summaryRes.data?.success || !membersRes.data?.success) {
                throw new Error('Invalid response from server');
            }

            setTasks(tasksRes.data.payload);
            setProgress(progressRes.data.payload);
            setSummary(summaryRes.data.payload);
            
            // Update group with members data
            if (membersRes.data.success) {
                setGroup({
                    id: groupId,
                    members: membersRes.data.payload,
                    name: '', // These can be updated if you add a route to fetch group details
                    description: ''
                });
            }
        } catch (err) {
            console.error('Failed to fetch task data:', err);
            setError('Failed to load tasks and group data');
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [groupId]);


    const handleDeleteTask = async (taskId: string) => { // Change parameter type to string
        try {
            const response = await api.delete(`/task/${taskId}`);
            if (response.data?.success) {
                setTasks(prev => prev.filter(task => task.id !== taskId));
            }
        } catch (err) {
            console.error('Failed to delete task:', err);
            setError('Failed to delete task');
        }
    };

    const addTask = (status: TaskStatus) => {
        setTempStatus(status);
        setShowForm(true);
    };

    const handleSaveTask = async (newTask: Omit<Task, 'id'>) => {
        if (!groupId) {
            setError('Group ID is required');
            return;
        }

        try {
            const response = await api.post('/task', {
                ...newTask,
                group_id: groupId, // No need to parse as integer
                status: tempStatus
            });

            if (response.data?.success) {
                setTasks(prev => [...prev, response.data.payload]);
                setShowForm(false);
                
                // Refresh data after creating new task
                const [progressRes, summaryRes] = await Promise.all([
                    api.get(`/task/group/${groupId}/progress`),
                    api.get(`/task/group/${groupId}/summary`)
                ]);

                if (progressRes.data?.success) {
                    setProgress(progressRes.data.payload);
                }
                if (summaryRes.data?.success) {
                    setSummary(summaryRes.data.payload);
                }
            }
        } catch (err) {
            console.error('Failed to create task:', err);
            setError('Failed to create task');
        }
    };

    const handleDragStart = (task: Task) => {
        setDraggedTask(task);
        setShowTrash(true);
    };

    const handleStatusChange = (task: Task, newStatus: TaskStatus) => {
        setSelectedTask(task);
        setPendingStatus(newStatus);
        setShowStatusModal(true);
    };

    const confirmStatusChange = async (task: Task, newStatus: TaskStatus) => {
        try {
            const response = await api.put(`/task/${task.id}`, {
                status: newStatus
            });

            if (response.data?.success) {
                setTasks(prev => prev.map(t =>
                    t.id === task.id ? { ...t, status: newStatus } : t
                ));
                await refreshData();
            }
        } catch (err) {
            console.error('Failed to update task status:', err);
            setError('Failed to update task status');
        } finally {
            setShowStatusModal(false);
            setSelectedTask(null);
            setPendingStatus(null);
        }
    };

    const handleDrop = async (e: React.DragEvent, status: TaskStatus) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        const droppedTask = tasks.find(task => task.id === taskId);
        
        if (droppedTask) {
            await handleStatusChange(droppedTask, status);
        }
    };

    const refreshData = async () => {
        if (!groupId) return;

        try {
            const [progressRes, summaryRes] = await Promise.all([
                api.get(`/task/group/${groupId}/progress`),
                api.get(`/task/group/${groupId}/summary`)
            ]);

            if (progressRes.data?.success) {
                setProgress(progressRes.data.payload);
            }
            if (summaryRes.data?.success) {
                setSummary(summaryRes.data.payload);
            }
        } catch (err) {
            console.error('Failed to refresh data:', err);
        }
    };

    const filteredTasks = (status: TaskStatus) => {
        return tasks.filter(task => task.status === status);
    };

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fontgreen"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 bg-red-50 p-4 rounded-lg">
                {error}
            </div>
        );
    }

        return (
        <div className="relative h-full ml-20 p-6">
            {showForm && (
                <div className="fixed inset-0 bg-gray-200 bg-opacity-100 flex items-center justify-center z-50">
                    <TaskForm 
                        groupId={groupId!} // Pass the groupId prop
                        onSave={handleSaveTask}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Task Manager</h1>
            </div>

            {/* Updated Progress Section using API data */}
            <div className="flex items-start mb-8">
                <div className="w-48 p-4 border border-gray-200 rounded-lg mr-6">
                    <ProgressBar percentage={progress?.percentage ?? 0} />
                    <p className="mt-2 text-center font-bold text-sm">Completion</p>
                </div>
                
                <div className="bg-basegreen p-4 rounded-lg border border-darkgreen flex-1">
                    <h3 className="font-bold text-fontgreen text-lg mb-3">Task Statistics</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-fontgreen">
                                {progress?.total ?? 0}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-fontgreen">Total Tasks</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-greenfont">
                                {progress?.completed ?? 0}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-greenfont">Completed</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-pinkfont">
                                {summary?.find(s => s.status === 'in_progress')?.count ?? 0}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-pinkfont">In Progress</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm">
                            <span className="font-semibold">To Do:</span> {summary?.find(s => s.status === 'todo')?.count ?? 0} tasks
                        </p>
                    </div>
                </div>
            </div>
                
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                {(['todo', 'in_progress', 'done'] as TaskStatus[]).map((status) => (
                    <div
                        key={status}
                        className={`rounded-lg min-h-[400px] overflow-hidden ${
                            status === 'todo' ? 'bg-orangebase border border-orangedark' :
                            status === 'in_progress' ? 'bg-pinkbase border border-pinkdark' :
                            'bg-greenbase border border-green-100'
                        }`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, status)}
                    >
                        {/* Updated Header with summary count */}
                        <div className={`px-4 py-2 flex justify-between items-center ${
                            status === 'todo' ? 'bg-orangedark' :
                            status === 'in_progress' ? 'bg-pinkdark' :
                            'bg-greendark'
                        }`}>
                            <div className="flex items-center">
                                <h2 className={`text-xl font-semibold capitalize ${
                                    status === 'todo' ? 'text-orangefont' :
                                    status === 'in_progress' ? 'text-pinkfont' :
                                    'text-green-800'
                                }`}>
                                    {status.replace('_', ' ')}
                                </h2>
                                <span className="ml-2 text-sm opacity-75">
                                    ({summary?.find(s => s.status === status)?.count ?? 0})
                                </span>
                            </div>
                            <button
                                onClick={() => addTask(status)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80`}
                            >
                                <CiCirclePlus
                                    style={{strokeWidth: "1"}}
                                    size={30}
                                    className={
                                        status === 'todo' ? 'text-orangefont' :
                                        status === 'in_progress' ? 'text-pinkfont' :
                                        'text-green-800'
                                    }
                                />
                            </button>
                        </div>
                        {/* Task content */}
                        <div className="p-4 space-y-4">
                            {filteredTasks(status).map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onDragStart={handleDragStart}
                                    onStatusChange={handleStatusChange}
                                    groupMembers={group?.members || []}
                                />
                            ))}
                        </div>
                        </div>
                ))}
            </div>

            {/* Tombol chat di pojok bawah kanan */}
            <button 
                onClick={toggleChat}
                className={`fixed right-6 bottom-6 z-20 p-3 rounded-full shadow-lg ${showChat ? 'bg-gray-200 text-gray-700' : 'bg-green text-white'}`}
            >
                <IoChatbubblesOutline size={24} />
            </button>

            {/* Chatbox */}
            {showChat && (
            <div className="fixed right-6 bottom-20 z-30 w-80 bg-basegreen rounded-lg shadow-xl border border-gray-200">
                <div className="p-3 bg-gray-200 text-gray-800 rounded-t-lg flex justify-between items-center">
                <h3 className="font-bold text-xl">Discussion</h3>
                <button
                    onClick={toggleChat}
                    className="text-white hover:text-fontgreen"
                >
                    ✕
                </button>
                </div>
                <GroupChat />
            </div>
            )}

            {showTrash && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2">
                    <button 
                        className="p-4 bg-red-900 text-white rounded-full shadow-lg hover:bg-red-600"
                        onClick={() => {
                            if (draggedTask) handleDeleteTask(draggedTask.id);
                            setShowTrash(false);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                            if (draggedTask) handleDeleteTask(draggedTask.id);
                            setShowTrash(false);
                        }}
                    >
                        <GoTrash size={20}/>
                    </button>
                </div>
            )}

            {/* Add the modal component */}
            <TaskStatusModal
                isOpen={showStatusModal}
                onClose={() => {
                    setShowStatusModal(false);
                    setSelectedTask(null);
                    setPendingStatus(null);
                }}
                onConfirm={confirmStatusChange}
                task={selectedTask}
                newStatus={pendingStatus || 'todo'}
            />
        </div>
    );
};

export default TaskBoard;