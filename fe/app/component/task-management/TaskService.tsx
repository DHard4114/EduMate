import api from '@/app/lib/api';
import { Task, TaskProgress, TaskSummary } from './Types';

export const taskService = {
    // Create new task
    createTask: async (data: Partial<Task>) => {
        const response = await api.post('/task', data);
        return response.data.payload;
    },

    // Get tasks by group
    getTasksByGroup: async (groupId: number) => {
        const response = await api.get(`/task/group/${groupId}`);
        return response.data.payload;
    },

    // Get task progress
    getTaskProgress: async (groupId: number): Promise<TaskProgress> => {
        const response = await api.get(`/task/group/${groupId}/progress`);
        return response.data.payload;
    },

    // Get task summary
    getTaskSummary: async (groupId: number): Promise<TaskSummary[]> => {
        const response = await api.get(`/task/group/${groupId}/summary`);
        return response.data.payload;
    },

    // Update task
    updateTask: async (taskId: number, updates: Partial<Task>) => {
        const response = await api.put(`/task/${taskId}`, updates);
        return response.data.payload;
    },

    // Delete task
    deleteTask: async (taskId: number) => {
        const response = await api.delete(`/task/${taskId}`);
        return response.data.payload;
    },

    // Get filtered tasks
    getFilteredTasks: async (groupId: number, status?: string) => {
        const response = await api.get(`/task/group/${groupId}/filter`, {
            params: { status }
        });
        return response.data.payload;
    }
};