'use client'
import { useState, useEffect } from 'react';
import { FiUserPlus, FiX } from 'react-icons/fi';
import { FaUserFriends } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User, Group } from '@/app/component/create-group/types';
import AddMembersModal from '@/app/component/create-group/AddMembersModal';
import SuccessNotification from '@/app/component/create-group/SuccessNotification';

const CreateGroupPage = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<User[]>([]); // Added missing users state
    const [group, setGroup] = useState<Group>({
        name: '',
        description: '',
        members: [],
    });
    const [isSearching, setIsSearching] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState('');

    const toggleUserSelection = (userId: string) => { // Added missing function
        setUsers(users.map(user => 
            user.id === userId ? { ...user, isSelected: !user.isSelected } : user
        ));
    };

    const addSelectedUsers = (selectedUsers: User[]) => { // Added missing function
        setGroup({
            ...group,
            members: [...group.members, ...selectedUsers]
        });
        setUsers(users.map(user => ({ ...user, isSelected: false })));
        setSearchQuery('');
    };

    useEffect(() => {
        const fetchUsers = async () => {
            setIsSearching(true);
            try {
                const response = await axios.get('http://localhost:5001/user/get');
                if (response.data && Array.isArray(response.data)) {
                    const usersWithSelection: User[] = response.data.map((user: any) => ({
                        id: user.id.toString(),
                        name: user.name || 'No Name',
                        email: user.email || 'No Email',
                        username: user.username || '',
                        isSelected: false
                    }));
                    setUsers(usersWithSelection);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
                setUsers([]);
            } finally {
                setIsSearching(false);
            }
        };
        
        fetchUsers();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
    };

    const removeMember = (userId: string) => {
        setGroup({
            ...group,
            members: group.members.filter(member => member.id !== userId)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsCreating(true);
        
        try {
            const createResponse = await axios.post('http://localhost:5001/group/', {
                name: group.name
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const groupId = createResponse.data.payload.id;

            const addMemberPromises = group.members.map(member => 
                axios.post('http://localhost:5001/group/addmember', {
                    group_id: groupId,
                    username: member.username
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            );

            await Promise.all(addMemberPromises);

            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                router.push('/groups');
            }, 2000);
            
            setGroup({
                name: '',
                description: '',
                members: []
            });
        } catch (err: any) {
            console.error('Failed to create group:', err);
            setError(err.response?.data?.message || 'Failed to create group. Please try again.');
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
                                {group.members.map(member => (
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