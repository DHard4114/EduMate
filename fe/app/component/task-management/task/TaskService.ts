import api from '@/app/lib/api';
import { Task, TaskProgress, TaskSummary, User, ApiResponse } from '../Types';

export const taskService = {
    createTask: async (data: Omit<Task, 'id'>) => {
        const response = await api.post('task', {
            ...data,
            group_id: data.group_id.toString() // Ensure group_id is string
        });
        return response.data.payload;
    },

    getTasksByGroup: async (groupId: string) => { // Change parameter type to string
        const response = await api.get(`task/group/${groupId}`);
        return response.data.payload;
    },

    getTaskProgress: async (groupId: string): Promise<TaskProgress> => { // Change parameter type to string
        const response = await api.get(`task/group/${groupId}/progress`);
        return response.data.payload;
    },

    getTaskSummary: async (groupId: string): Promise<TaskSummary[]> => { // Change parameter type to string
        const response = await api.get(`task/group/${groupId}/summary`);
        return response.data.payload;
    },

    

    deleteTask: async (taskId: string) => { // Change parameter type to string
        const response = await api.delete(`task/${taskId}`);
        return response.data.payload;
    },

    getFilteredTasks: async (groupId: string, status?: string) => { // Change parameter type to string
        const response = await api.get(`task/group/${groupId}/filter`, {
            params: { status }
        });
        return response.data.payload;
    },

    // Add new method to fetch group members
    getGroupMembers: async (groupId: string): Promise<User[]> => {
        try {
            const response = await api.get<ApiResponse<User[]>>(`/group/${groupId}/members`);
            if (response.data?.success) {
                return response.data.payload;
            }
            throw new Error(response.data?.message || 'Failed to fetch group members');
        } catch (error) {
            console.error('Error fetching group members:', error);
            throw error;
        }
    },
    updateTask: async (taskId: string, updates: Partial<Task>) => {
        try {
            const response = await api.patch(`/task/${taskId}`, {
                ...updates,
                group_id: updates.group_id?.toString()
            });

            if (!response.data?.success) {
                throw new Error(response.data?.message || 'Failed to update task');
            }

            return response.data.payload;
        } catch (error) {
            console.error('Update task error:', error);
            throw error;
        }
    },
};