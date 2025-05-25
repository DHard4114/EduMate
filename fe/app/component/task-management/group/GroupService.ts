import api from '@/app/lib/api';
import { ApiResponse, User } from '../Types';

export const groupService = {
    // You need to create this endpoint in your backend or use an existing one
    getAllUsers: async (search: string = '', page: number = 1, limit: number = 10) => {
        try {
            // This endpoint needs to exist in your backend - you might need to create it
            // Alternative: Use a different existing endpoint that returns users
            const response = await api.get<ApiResponse<User[]>>('/user/get', {
                params: {
                    search,
                    page,
                    limit
                }
            });

            return {
                success: response.data.success,
                payload: {
                    users: response.data.payload || [],
                    hasMore: response.data.payload?.length === limit,
                    total: response.data.payload?.length || 0
                }
            };
        } catch (error) {
            console.error('Error fetching users:', error);
            return {
                success: false,
                payload: {
                    users: [],
                    hasMore: false,
                    total: 0
                }
            };
        }
    },

    getGroupMembers: async (groupId: string) => {
        try {
            const response = await api.get<ApiResponse<User[]>>(`/group/${groupId}/members`);
            return response.data;
        } catch (error) {
            console.error('Error fetching group members:', error);
            return {
                success: false,
                message: 'Failed to fetch group members',
                payload: []
            };
        }
    },

    addMember: async (groupId: string, username: string) => {
        try {
            const response = await api.post('/group/addmember', {
                group_id: groupId,
                username
            });
            return response.data;
        } catch (error) {
            console.error('Error adding member:', error);
            return {
                success: false,
                message: 'Failed to add member'
            };
        }
    },

    removeMember: async (groupId: string, username: string) => {
        try {
            const response = await api.delete(`/group/${groupId}/members/${username}`);
            return response.data;
        } catch (error) {
            console.error('Error removing member:', error);
            return {
                success: false,
                message: 'Failed to remove member'
            };
        }
    }
};