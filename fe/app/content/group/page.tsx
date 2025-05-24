'use client'

import { useState, useEffect } from 'react';
import Sidebar from '../../component/Sidebar';
import TaskBoard from '../../component/task-management/TaskBoard';
import api from '../../lib/api';

interface GroupData {
    id: number;
    name: string;
    members: Array<{
        id: string;
        name: string;
        username: string;
    }>;
}

export default function GroupPage() {
    const [isNavOpen, setIsNavOpen] = useState(true);
    const [groupData, setGroupData] = useState<GroupData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Subscribe to activeGroup changes from localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            const activeGroupId = localStorage.getItem('activeGroupId');
            if (activeGroupId) {
                fetchGroupData(parseInt(activeGroupId));
            }
        };

        // Initial check
        handleStorageChange();

        // Listen for changes
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const fetchGroupData = async (groupId: number) => {
        setLoading(true);
        try {
            const response = await api.get(`/group/${groupId}/members`);
            if (response.data?.success) {
                setGroupData(response.data.payload);
                setError('');
            }
        } catch (err) {
            console.error('Failed to fetch group data:', err);
            setError('Failed to load group data');
            setGroupData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <Sidebar isOpen={isNavOpen} toggleNavbar={() => setIsNavOpen(!isNavOpen)} />
            <div className={`transition-all duration-300 ${isNavOpen ? 'ml-64' : 'ml-20'}`}>
                <div className="p-6">
                    {loading ? (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fontgreen"></div>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>
                    ) : !groupData ? (
                        <div className="text-center text-gray-500">Select a group to view details</div>
                    ) : (
                        <>
                            <h1 className="text-2xl font-semibold mb-6">{groupData.name}</h1>
                            <TaskBoard groupId={groupData.id.toString()} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}