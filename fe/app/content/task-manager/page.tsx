'use client'

import { useState } from 'react';
import Head from 'next/head';
import Sidebar from '../../component/Sidebar';
import TaskBoard from '../../component/task-management/TaskBoard';
import GroupNavbar from '@/app/component/task-management/GroupNav';
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from 'next/navigation';

const TaskManagement = () => {
    const [isNavOpen, setIsNavOpen] = useState(true);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const router = useRouter();

    const handleAddGroup = () => {
        router.push('task-manager/create-group');
    };

    const handleGroupSelect = (groupId: string) => {
        setSelectedGroupId(groupId);
    };

    return (
        <>
            <Head>
                
                <meta name="description" content="Task management application" />
            </Head>
            <div className="min-h-screen bg-gray-50 text-gray-800">
                <Sidebar isOpen={isNavOpen} toggleNavbar={() => setIsNavOpen(!isNavOpen)} />
                <div className={`transition-all duration-300 ${isNavOpen ? 'ml-64' : 'ml-20'}`}>
                    <div>
                        <div className="pt-4 pr-4 flex justify-between items-center">
                            <h1 className="text-2xl font-semibold">Task Manager</h1>
                            <GroupNavbar onGroupSelect={handleGroupSelect} />
                            <button
                                onClick={handleAddGroup}
                                className="bg-green text-white rounded-full px-4 py-2 flex items-center hover:bg-fontgreen"
                            >
                                <CiCirclePlus
                                    style={{ strokeWidth: '1' }}
                                    size={30}
                                    className="mr-2"
                                />
                                Add Group
                            </button>
                        </div>
                        <TaskBoard groupId={selectedGroupId ?? undefined} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskManagement;