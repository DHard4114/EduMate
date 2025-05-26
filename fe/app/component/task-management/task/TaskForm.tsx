'use client'

import { useState, useEffect } from 'react';
import { TaskFormProps, GroupMember } from '../Types';
import { taskService } from './TaskService';

const TaskForm = ({ groupId, onSave, onCancel }: TaskFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assigned_to, setAssigned_to] = useState('');
    const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('low');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
    const [loadingMembers, setLoadingMembers] = useState(false);

    // Validate groupId when component mounts
    useEffect(() => {
        if (!groupId) {
            setError('Group ID is required');
        }
    }, [groupId]);

    // Fetch group members when groupId changes
    useEffect(() => {
        const fetchGroupMembers = async () => {
            if (!groupId) return;
            
            try {
                setLoadingMembers(true);
                const members = await taskService.getGroupMembers(groupId);
                setGroupMembers(members);
            } catch (err) {
                console.error('Failed to fetch group members:', err);
                setError('Failed to load group members');
            } finally {
                setLoadingMembers(false);
            }
        };

        fetchGroupMembers();
    }, [groupId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title.trim()) {
            setError('Title is required');
            return;
        }

        if (!groupId) {
            setError('Group ID is required');
            return;
        }

        try {
            setIsSubmitting(true);
            setError('');

            const taskData = {
                group_id: groupId,
                title: title.trim(),
                description: description.trim() || undefined,
                status: 'todo' as const,
                severity,
                assigned_to: assigned_to || undefined // Will be UUID or undefined
            };

            await onSave(taskData);

            // Reset form on success
            setTitle('');
            setDescription('');
            setAssigned_to('');
            setSeverity('low');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create task');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show error state if no groupId is provided
    if (!groupId) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="text-red-500 p-4 bg-red-50 rounded">
                    Group ID is required to create a task
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg mb-4 bg-basegreen p-2 text-center rounded">Create New Task</h3>
            
            {error && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Title *</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green focus:border-transparent"
                        required
                        disabled={isSubmitting}
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green focus:border-transparent"
                        rows={3}
                        disabled={isSubmitting}
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Assign To</label>
                    <select
                        value={assigned_to}
                        onChange={(e) => setAssigned_to(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green focus:border-transparent"
                        disabled={isSubmitting || loadingMembers}
                    >
                        <option value="">-- Select Member (Optional) --</option>
                        {loadingMembers ? (
                            <option disabled>Loading members...</option>
                        ) : (
                            groupMembers.map((member) => (
                                <option key={member.id} value={member.id}>
                                    {member.name} (@{member.username})
                                </option>
                            ))
                        )}
                    </select>
                    {loadingMembers ? (
                        <p className="text-sm text-gray-500 mt-1">Loading members...</p>
                    ) : (!groupMembers || groupMembers.length === 0) && (
                        <p className="text-sm text-gray-500 mt-1">No group members available</p>
                    )}
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Severity</label>
                    <select
                        value={severity}
                        onChange={(e) => setSeverity(e.target.value as 'low' | 'medium' | 'high')}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green focus:border-transparent"
                        disabled={isSubmitting}
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
                        className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green text-white rounded hover:bg-fontgreen disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Task'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;