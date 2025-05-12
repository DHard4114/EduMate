'use client'
import { useState, useEffect } from 'react';
import { FiSearch, FiUserPlus, FiUsers, FiX, FiCheck } from 'react-icons/fi';
import { FaUserFriends } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

type User = {
    id: string;
    name: string;
    avatar: string;
    email: string;
    isSelected: boolean;
    };

    type Group = {
    name: string;
    description: string;
    members: User[];
    };

    const CreateGroupPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [group, setGroup] = useState<Group>({
        name: '',
        description: '',
        members: [],
    });
    const [isSearching, setIsSearching] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Dummy data. Ganti aja ke backend nanti
    useEffect(() => {
        const mockUsers: User[] = [
        {
            id: '1',
            name: 'Alex Johnson',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            email: 'alex@example.com',
            isSelected: false
        },
        {
            id: '2',
            name: 'Sarah Williams',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            email: 'sarah@example.com',
            isSelected: false
        },
        {
            id: '3',
            name: 'Michael Chen',
            avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
            email: 'michael@example.com',
            isSelected: false
        },
        {
            id: '4',
            name: 'Emily Davis',
            avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
            email: 'emily@example.com',
            isSelected: false
        },
        {
            id: '5',
            name: 'David Kim',
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
            email: 'david@example.com',
            isSelected: false
        },
        ];
        setUsers(mockUsers);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        // Nanti APInya dipanggi ke sini
    };

    const toggleUserSelection = (userId: string) => {
        setUsers(users.map(user => 
        user.id === userId ? { ...user, isSelected: !user.isSelected } : user
        ));
    };

    const addSelectedUsers = () => {
        const selectedUsers = users.filter(user => user.isSelected);
        setGroup({
        ...group,
        members: [...group.members, ...selectedUsers]
        });
        // Reset selection
        setUsers(users.map(user => ({ ...user, isSelected: false })));
        setSearchQuery('');
        setIsSearching(false);
    };

    const removeMember = (userId: string) => {
        setGroup({
        ...group,
        members: group.members.filter(member => member.id !== userId)
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Nanti disini dikirim ke simpen di database
        console.log('Group created:', group);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        // Reset form
        setGroup({
        name: '',
        description: '',
        members: []
        });
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-basegreen from-basegreen to-green p-6">
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
            <FaUserFriends className="text-fontgreen text-3xl mr-3" />
            <h1 className="text-3xl font-bold text-fontgreen">Create New Group</h1>
            </div>

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
                        <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="w-8 h-8 rounded-full mr-2"
                        />
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
                disabled={group.members.length === 0 || !group.name}
                className={`px-6 py-2 rounded-lg font-medium ${group.members.length === 0 || !group.name ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green text-white hover:bg-fontgreen'}`}
                >
                Create Group
                </button>
            </div>
            </form>

            {/* Search Modal */}
            <AnimatePresence>
            {isSearching && (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={() => setIsSearching(false)}
                >
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="bg-white rounded-xl shadow-xl w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Add Members</h3>
                    </div>

                    <div className="p-4">
                    <form onSubmit={handleSearch} className="mb-4">
                        <div className="relative">
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fontgreen focus:border-fontgreen"
                            placeholder="Search by name or email"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FiSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </form>

                    <div className="max-h-96 overflow-y-auto">
                        {filteredUsers.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">
                            No users found
                        </div>
                        ) : (
                        <ul className="space-y-2">
                            {filteredUsers.map(user => (
                            <li key={user.id}>
                                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <img 
                                    src={user.avatar} 
                                    alt={user.name} 
                                    className="w-10 h-10 rounded-full mr-3"
                                    />
                                    <div>
                                    <p className="font-medium text-gray-800">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => toggleUserSelection(user.id)}
                                    className={`p-2 rounded-full ${user.isSelected ? 'bg-basegreen text-fontgreen' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                >
                                    {user.isSelected ? <FiCheck /> : <FiUserPlus />}
                                </button>
                                </div>
                            </li>
                            ))}
                        </ul>
                        )}
                    </div>
                    </div>

                    <div className="p-4 border-t border-gray-200 flex justify-end">
                    <button
                        type="button"
                        onClick={() => setIsSearching(false)}
                        className="px-4 py-2 mr-2 text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={addSelectedUsers}
                        disabled={!users.some(user => user.isSelected)}
                        className={`px-4 py-2 rounded-lg ${!users.some(user => user.isSelected) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green text-white hover:bg-fontgreen'}`}
                    >
                        Add Selected
                    </button>
                    </div>
                </motion.div>
                </motion.div>
            )}
            </AnimatePresence>

            {/* Success Notification */}
            <AnimatePresence>
            {showSuccess && (
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-6 right-6 bg-fontgreen text-white px-6 py-3 rounded-lg shadow-lg flex items-center"
                >
                <FiCheck className="mr-2 text-xl" />
                Group created successfully!
                </motion.div>
            )}
            </AnimatePresence>
        </div>
        </div>
    );
};

export default CreateGroupPage;