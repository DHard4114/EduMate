'use client'
import { useState, useRef, useEffect } from 'react';
import TaskCard from './TaskCard';
import ProgressBar from './ProgressBar';
import TaskForm from './TaskForm';
import GroupChat from './GroupChat';
import { Task } from "./Types";
import { GoTrash } from "react-icons/go";
import { CiCirclePlus } from "react-icons/ci";
import { IoChatbubblesOutline } from "react-icons/io5";

const TaskBoard = () => {
    const [tasks, setTasks] = useState<Task[]>([
        {
        id: '1',
        title: 'Design Homepage',
        description: 'Create mockups for the homepage',
        assignedTo: 'Sarah',
        severity: 'high',
        status: 'todo'
        },
        {
        id: '2',
        title: 'API Integration',
        description: 'Connect frontend to backend API',
        assignedTo: 'Mike',
        severity: 'medium',
        status: 'in-progress'
        }
    ]);
    
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);
    const [showTrash, setShowTrash] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formStatus, setFormStatus] = useState<'todo' | 'in-progress' | 'completed'>('todo');
    
    const [showChat, setShowChat] = useState(false);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
    const todoTasks = tasks.filter(task => task.status === 'todo').length;

    const addTask = (status: 'todo' | 'in-progress' | 'completed') => {
        setFormStatus(status);
        setShowForm(true);
    };

    const handleSaveTask = (newTask: Omit<Task, 'id'>) => {
        setTasks([...tasks, {
        ...newTask,
        id: Date.now().toString()
        }]);
        setShowForm(false);
    };

    const handleDragStart = (task: Task) => {
        setDraggedTask(task);
        setShowTrash(true);
    };

    const handleDrop = (status: 'todo' | 'in-progress' | 'completed') => {
        if (draggedTask) {
        const updatedTasks = tasks.map(t => 
            t.id === draggedTask.id ? { ...t, status } : t
        );
        setTasks(updatedTasks);
        }
        setDraggedTask(null);
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
        setShowTrash(false);
    };

    const filteredTasks = (status: 'todo' | 'in-progress' | 'completed') => {
        return tasks.filter(task => task.status === status);
    };

    const progressPercentage = tasks.length > 0 
        ? (filteredTasks('completed').length / tasks.length) * 100 
        : 0;

    const handleChatToggle = () => {
        setShowChat(!showChat);
    };

        return (
        <div className="ml-20 p-6">
            {showForm && (
                <div className="fixed inset-0 bg-gray-200 bg-opacity-100 flex items-center justify-center z-50">
                    <TaskForm 
                        onSave={handleSaveTask} 
                        onCancel={() => setShowForm(false)} 
                    />
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Task Manager</h1>
            </div>

            {/* Progress Section */}
            <div className="flex items-start mb-8">
                <div className="w-48 p-4 border border-gray-200 rounded-lg mr-6">
                    <ProgressBar percentage={progressPercentage} />
                    <p className="mt-2 text-center font-bold text-sm">Completion</p>
                </div>
                
                <div className="bg-basegreen p-4 rounded-lg border border-darkgreen flex-1">
                    <h3 className="font-bold text-fontgreen text-lg mb-3">Task Statistics</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-fontgreen">{totalTasks}</p>
                            <p className="text-sm text-gray-500 dark:text-fontgreen">Total Tasks</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-greenfont">{completedTasks}</p>
                            <p className="text-sm text-gray-500 dark:text-greenfont">Completed</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-pinkfont">{inProgressTasks}</p>
                            <p className="text-sm text-gray-500 dark:text-pinkfont">In Progress</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm">
                            <span className="font-semibold">To Do:</span> {todoTasks} tasks
                        </p>
                    </div>
                </div>
            </div>
                
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                {(['todo', 'in-progress', 'completed'] as const).map((status) => (
                    <div 
                        key={status}
                        className={`rounded-lg min-h-[400px] overflow-hidden ${
                            status === 'todo' ? 'bg-orangebase border border-orangedark' :
                            status === 'in-progress' ? 'bg-pinkbase border border-pinkdark' :
                            'bg-greenbase border border-green-100'
                        }`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(status)}
                        >
                        {/* Header */}
                        <div className={`px-4 py-2 flex justify-between items-center ${
                            status === 'todo' ? 'bg-orangedark' :
                            status === 'in-progress' ? 'bg-pinkdark' :
                            'bg-greendark'
                        }`}>
                            <h2 className={`text-xl font-semibold capitalize ${
                            status === 'todo' ? 'text-orangefont' :
                            status === 'in-progress' ? 'text-pinkfont' :
                            'text-green-800'
                            }`}>
                            {status.replace('-', ' ')}
                            </h2>
                            <button 
                            onClick={() => addTask(status)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80`}
                            >
                            <CiCirclePlus 
                                style={{strokeWidth: "1"}} 
                                size={30}
                                className={
                                status === 'todo' ? 'text-orangefont' :
                                status === 'in-progress' ? 'text-pinkfont' :
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
                            />
                            ))}
                        </div>
                        </div>
                ))}
            </div>

            {/* Tombol chat di pojok bawah kanan */}
            <button 
                onClick={handleChatToggle}
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
                    onClick={handleChatToggle}
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
                            if (draggedTask) deleteTask(draggedTask.id);
                            setShowTrash(false);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                            if (draggedTask) deleteTask(draggedTask.id);
                            setShowTrash(false);
                        }}
                    >
                        <GoTrash size={20}/>
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskBoard;