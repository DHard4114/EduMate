'use client'
import { useState } from 'react';
import { Task } from './Types';

type TaskFormProps = {
    onSave: (task: Omit<Task, 'id'>) => void;
    onCancel: () => void;
    };

    const TaskForm = ({ onSave, onCancel }: TaskFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
        title,
        description,
        assignedTo,
        severity,
        status: 'todo',
        });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="font-bold text-lg mb-4 bg-basegreen p-2 text-center rounded">Create New Task</h3>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />
            </div>
            
            <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
            />
            </div>
            
            <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Assigned To</label>
            <input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full p-2 border rounded"
            />
            </div>
            
            <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Severity</label>
            <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as 'low' | 'medium' | 'high')}
                className="w-full p-2 border rounded"
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            </div>
            
            <div className="flex justify-end space-x-2">
            <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border rounded hover:bg-gray-300"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-4 py-2 bg-green text-white rounded hover:bg-fontgreen"
            >
                Save Task
            </button>
            </div>
        </form>
        </div>
    );
};

export default TaskForm;