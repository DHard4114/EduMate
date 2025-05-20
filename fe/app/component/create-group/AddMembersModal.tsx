'use client'
import { FiSearch, FiUserPlus, FiUser, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from './types';

type AddMembersModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAddSelected: (selectedUsers: User[]) => void;
};

export default function AddMembersModal({
    isOpen,
    onClose,
    onAddSelected,
    }: AddMembersModalProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
        if (!isOpen) return;
        
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5001/user/get');
            if (response.data && Array.isArray(response.data.data)) {
            const usersWithSelection: User[] = response.data.data.map((user: any) => ({
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
            setError('Failed to load users. Please try again.');
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
        };

        fetchUsers();
    }, [isOpen]);

    const toggleUserSelection = (userId: string) => {
        setUsers(users.map(user => 
        user.id === userId ? { ...user, isSelected: !user.isSelected } : user
        ));
    };

    const handleAddSelected = () => {
        const selectedUsers = users.filter(user => user.isSelected);
        onAddSelected(selectedUsers);
        setUsers(users.map(user => ({ ...user, isSelected: false })));
        setSearchQuery('');
        onClose();
    };

    const filteredUsers = users.filter(
        (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
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
            {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                {error}
                </div>
            )}

            <form
                onSubmit={(e) => {
                e.preventDefault();
                }}
                className="mb-4"
            >
                <div className="relative">
                <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fontgreen focus:border-fontgreen"
                    placeholder="Search by name, email or username"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
            </form>

            <div className="max-h-96 overflow-y-auto">
                {isLoading ? (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mx-auto"></div>
                    <p className="mt-2 text-gray-500">Loading users...</p>
                </div>
                ) : filteredUsers.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                    {searchQuery ? 'No matching users found' : 'No users available'}
                </div>
                ) : (
                <ul className="space-y-2">
                    {filteredUsers.map((user) => (
                    <li key={user.id}>
                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                            <FiUser className="text-gray-500" />
                            </div>
                            <div>
                            <p className="font-medium text-gray-800">{user.name}</p>
                            <p className="text-sm text-gray-500">@{user.username}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => toggleUserSelection(user.id)}
                            className={`p-2 rounded-full ${
                            user.isSelected
                                ? 'bg-basegreen text-fontgreen'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
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
                onClick={onClose}
                className="px-4 py-2 mr-2 text-gray-600 hover:text-gray-800"
            >
                Cancel
            </button>
            <button
                type="button"
                onClick={handleAddSelected}
                disabled={!users.some((user) => user.isSelected) || isLoading}
                className={`px-4 py-2 rounded-lg ${
                !users.some((user) => user.isSelected) || isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green text-white hover:bg-fontgreen'
                }`}
            >
                Add Selected
            </button>
            </div>
        </motion.div>
        </motion.div>
    );
}