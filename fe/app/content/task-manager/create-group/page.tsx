'use client'

import { useState, useEffect } from 'react';
import { FiUserPlus, FiX } from 'react-icons/fi';
import { FaUserFriends } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { ApiUser, ApiResponse } from '@/app/component/task-management/Types';
import { User, GroupMember, CreateGroupState } from '@/app/component/create-group/types';
import api from '../../../lib/api';
import AddMembersModal from '@/app/component/create-group/AddMembersModal';
import SuccessNotification from '@/app/component/create-group/SuccessNotification';

const CreateGroupPage = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [group, setGroup] = useState<CreateGroupState>({
        name: '',
        description: '',
        members: []
    });
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState('');

    const toggleUserSelection = (userId: string) => { // Added missing function
        setUsers(users.map(user =>
            user.id === userId ? { ...user, isSelected: !user.isSelected } : user
        ));
    };

    const removeMember = (userId: string) => {
        setGroup((prevGroup: CreateGroupState) => ({
            ...prevGroup,
            members: prevGroup.members.filter((member: GroupMember) => member.id !== userId)
        }));
    };

    const addSelectedUsers = (selectedUsers: User[]) => {
        const newMembers: GroupMember[] = selectedUsers.map(({ id, name, email, username }) => ({
            id,
            name,
            email,
            username
        }));
        
        setGroup((prevGroup: CreateGroupState) => ({
            ...prevGroup,
            members: [...prevGroup.members, ...newMembers]
        }));
        
        setUsers(users.map(user => ({ ...user, isSelected: false })));
        setSearchQuery('');
    };

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const response = await api.get<ApiResponse<ApiUser[]>>('/user/get');
                if (response.data?.payload) {
                    const usersWithSelection = response.data.payload.map((user) => ({
                        id: user.id.toString(),
                        name: user.name || 'No Name',
                        email: user.email || 'No Email',
                        username: user.username || '',
                        isSelected: false as const // Explicitly set as boolean
                    }));
                    setUsers(usersWithSelection);
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
                setError('Failed to load users');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsCreating(true);
        
        try {
            // Validasi
            if (!group.name.trim()) {
                throw new Error('Group name is required');
            }

            if (group.members.length === 0) {
                throw new Error('At least one member is required');
            }

            // Buat grup - sesuai dengan API backend
            const createResponse = await api.post<ApiResponse<{ id: number }>>('/group', {
                name: group.name.trim()
                // Backend tidak memerlukan description pada saat create
            });

            if (!createResponse.data?.payload?.id) {
                throw new Error('Invalid response from server');
            }

            const groupId = createResponse.data.payload.id;

            // Tambah member satu per satu
            try {
                // Gunakan for...of untuk menambahkan member secara sequential
                for (const member of group.members) {
                    const addMemberResponse = await api.post('/group/addmember', {
                        group_id: groupId,
                        username: member.username // pastikan username ada
                    });

                    if (!addMemberResponse.data?.success) {
                        throw new Error(`Failed to add member: ${member.username}`);
                    }
                }
            } catch (memberError) {
                // Jika gagal, hapus grup
                await api.delete(`/group/${groupId}`);
                throw memberError;
            }

            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                router.push(`/group/${groupId}`);
            }, 2000);

        } catch (error) {
            console.error('Failed to create group:', error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="min-h-screen bg-basegreen from-basegreen to-green p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <FaUserFriends className="text-fontgreen text-3xl mr-3" />
                    <h1 className="text-3xl font-bold text-fontgreen">Create New Group</h1>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {isLoading ? (
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fontgreen"></div>
                    <span className="ml-3 text-gray-600">Loading users...</span>
                </div>
            ) : (

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="group-name">
                            Group Name
                        </label>
                        <input
                            id="group-name"
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fontgreen focus:border-fontgreen"
                            placeholder="Enter group name"
                            value={group.name}
                            onChange={(e) => setGroup({...group, name: e.target.value})}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="group-description">
                            Description (Optional)
                        </label>
                        <textarea
                            id="group-description"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fontgreen focus:border-fontgreen"
                            placeholder="What's this group about?"
                            rows={3}
                            value={group.description}
                            onChange={(e) => setGroup({...group, description: e.target.value})}
                        />
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <label className="block text-gray-700 font-medium">Group Members</label>
                            <button
                                type="button"
                                onClick={() => setIsSearching(true)}
                                className="flex items-center text-green hover:text-fontgreen"
                            >
                                <FiUserPlus className="mr-1" />
                                Add Members
                            </button>
                        </div>

                        {group.members.length === 0 ? (
                            <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                                No members added yet
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {group.members.map((member: GroupMember) => (
                                    <div key={member.id} className="flex items-center justify-between bg-basegreen rounded-lg p-3">
                                        <div className="flex items-center">
                                            <span className="text-gray-700">{member.name}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeMember(member.id)}
                                            className="text-gray-500 hover:text-red-800"
                                        >
                                            <FiX />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={group.members.length === 0 || !group.name || isCreating}
                            className={`px-6 py-2 rounded-lg font-medium ${group.members.length === 0 || !group.name || isCreating ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green text-white hover:bg-fontgreen'}`}
                        >
                            {isCreating ? 'Creating...' : 'Create Group'}
                        </button>
                    </div>
                </form>
                )}
                <AddMembersModal
                    isOpen={isSearching}
                    onClose={() => setIsSearching(false)}
                    users={users}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onToggleUser={toggleUserSelection}
                    onAddSelected={addSelectedUsers}
                />

                <SuccessNotification
                    show={showSuccess}
                    message="Group created successfully!"
                />
            </div>
        </div>
    );
};

export default CreateGroupPage;