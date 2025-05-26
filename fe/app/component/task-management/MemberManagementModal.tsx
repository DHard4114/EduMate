import { useState, useEffect, useCallback, useRef } from 'react';
import { FiX, FiUserPlus, FiUserMinus } from 'react-icons/fi';
import { groupService } from './group/GroupService';
import { User, GroupMember, ManageMembersModalProps } from './Types';
import toast from 'react-hot-toast';

export default function ManageMembersModal({ isOpen, onClose, groupId }: ManageMembersModalProps) {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [currentMembers, setCurrentMembers] = useState<GroupMember[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'add' | 'remove'>('add');
    const [page, setPage] = useState(1);
    const [displayCount, setDisplayCount] = useState(5); // Initial display count
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError('');
        
        try {
            const membersResponse = await groupService.getGroupMembers(groupId);
            
            if (membersResponse.success && Array.isArray(membersResponse.payload)) {
                const members = membersResponse.payload.map(member => ({
                    ...member,
                    id: String(member.id)
                }));
                setCurrentMembers(members);
            } else {
                setCurrentMembers([]);
            }
            setAllUsers([]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [groupId]);

    useEffect(() => {
        if (isOpen) {
            setPage(1);
            setDisplayCount(5); // Reset display count when modal opens
            setAllUsers([]);
            setCurrentMembers([]);
            loadData();
        }
    }, [isOpen, loadData]);

    useEffect(() => {
        if (!isOpen) return;
        
        const timer = setTimeout(() => {
            setPage(1);
            setAllUsers([]);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, isOpen]);

    const handleScroll = useCallback(() => {
        if (loading) return;
        
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        // Check if we've scrolled near the bottom
        const scrollPosition = container.scrollTop + container.clientHeight;
        const contentHeight = content.clientHeight;
        
        if (scrollPosition > contentHeight - 100) {
            setDisplayCount(prev => prev + 5);
        }
    }, [loading]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleAddMember = async (username: string) => {
        try {
            const response = await groupService.addMember(groupId, username);
            if (response.success) {
                await loadData();
                toast.success(`Successfully added ${username} to the group`);
            } else {
                setError(response.message || 'Failed to add member');
                toast.error(response.message || 'Failed to add member');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to add member';
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    const handleRemoveMember = async (username: string) => {
        try {
            const response = await groupService.removeMember(groupId, username);
            if (response.success) {
                await loadData();
                toast.success(`Successfully removed ${username} from the group`);
            } else {
                setError(response.message || 'Failed to remove member');
                toast.error(response.message || 'Failed to remove member');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to remove member';
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    const filteredUsers = allUsers.filter(user => {
        const isNotMember = !currentMembers.some(member => member.id === user.id || member.username === user.username);
        const matchesSearch = searchQuery === '' ||
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase());
        return isNotMember && matchesSearch;
    });

    const filteredMembers = currentMembers.filter(member =>
        searchQuery === '' ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const displayedUsers = filteredUsers.slice(0, displayCount);
    const displayedMembers = filteredMembers.slice(0, displayCount);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Manage Members</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FiX size={24} />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <div className="flex mb-4 border-b">
                    <button
                        className={`px-4 py-2 ${activeTab === 'add' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
                        onClick={() => {
                            setActiveTab('add');
                            setDisplayCount(5); // Reset display count when switching tabs
                        }}
                    >
                        Add Members ({filteredUsers.length})
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'remove' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
                        onClick={() => {
                            setActiveTab('remove');
                            setDisplayCount(5); // Reset display count when switching tabs
                        }}
                    >
                        Remove Members ({filteredMembers.length})
                    </button>
                </div>

                <input
                    type="text"
                    value={activeTab === 'remove' ? searchQuery : ''}
                    onChange={(e) => {
                        if (activeTab === 'remove') {
                            setSearchQuery(e.target.value);
                        }
                    }}
                    placeholder={activeTab === 'add' ? "Username will be entered above" : "Search members..."}
                    disabled={activeTab === 'add'}
                    className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div ref={containerRef} className="flex-1 overflow-y-auto">
                    {activeTab === 'add' ? (
                        <div className="space-y-4">
                            {/* Add user by username */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="font-medium text-blue-900 mb-2">Add Member by Username</h3>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Enter username to add..."
                                        className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && searchQuery.trim()) {
                                                handleAddMember(searchQuery.trim());
                                                setSearchQuery('');
                                            }
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            if (searchQuery.trim()) {
                                                handleAddMember(searchQuery.trim());
                                                setSearchQuery('');
                                            }
                                        }}
                                        disabled={!searchQuery.trim()}
                                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        <FiUserPlus size={16} />
                                        Add
                                    </button>
                                </div>
                                <p className="text-sm text-blue-600 mt-2">
                                    Type a username and press Enter or click Add to invite them to this group
                                </p>
                            </div>

                            {/* Show available users if we have them */}
                            {displayedUsers.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="font-medium text-gray-700">Available Users</h3>
                                    {displayedUsers.map(user => (
                                        <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-sm text-gray-500">@{user.username}</p>
                                            </div>
                                            <button
                                                onClick={() => handleAddMember(user.username)}
                                                className="text-green-600 hover:text-green-800 p-2 hover:bg-green-100 rounded"
                                                title="Add member"
                                            >
                                                <FiUserPlus size={20} />
                                            </button>
                                        </div>
                                    ))}
                                    {displayedUsers.length < filteredUsers.length && (
                                        <div className="text-center py-2 text-gray-500">
                                            Scroll down to load more users
                                        </div>
                                    )}
                                </div>
                            )}

                            {loading && (
                                <div className="flex justify-center p-4">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {displayedMembers.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    {currentMembers.length === 0 ? 
                                        'No members in this group' : 
                                        'No members found matching your search'
                                    }
                                </div>
                            ) : (
                                <>
                                    {displayedMembers.map(member => (
                                        <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                            <div>
                                                <p className="font-medium">{member.name}</p>
                                                <p className="text-sm text-gray-500">@{member.username}</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveMember(member.username)}
                                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-100 rounded"
                                                title="Remove member"
                                            >
                                                <FiUserMinus size={20} />
                                            </button>
                                        </div>
                                    ))}
                                    {displayedMembers.length < filteredMembers.length && (
                                        <div className="text-center py-2 text-gray-500">
                                            Scroll down to load more members
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}