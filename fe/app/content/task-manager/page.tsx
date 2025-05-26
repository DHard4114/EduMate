'use client'

import { useState } from 'react';
import Head from 'next/head';
import Sidebar from '../../component/Sidebar';
import TaskBoard from '../../component/task-management/task/TaskBoard';
import GroupNavbar from '@/app/component/task-management/group/GroupNav';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useRouter } from 'next/navigation';
import MemberManagementModal from '@/app/component/task-management/MemberManagementModal';

const TaskManagement = () => {
    const [isNavOpen, setIsNavOpen] = useState(true);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [showMemberModal, setShowMemberModal] = useState(false);

    const router = useRouter();

    const handleAddGroup = () => {
        router.push('task-manager/create-group');
    };

    const handleAddMember = () => {
        if (!selectedGroupId) {

            return;
        }
        setShowMemberModal(true);
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
                            <div className='pl-28'>
                                <GroupNavbar onGroupSelect={handleGroupSelect} />
                            </div>
                            <div className='flex flex-col items-start gap-4 pr-4'>
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
                                
                                <button
                                    onClick={handleAddMember}
                                    disabled={!selectedGroupId}
                                    className={`bg-green text-white rounded-full px-4 py-2 flex items-center 
                                        ${!selectedGroupId ? 'opacity-50 cursor-not-allowed' : 'hover:bg-fontgreen'}`}
                                >
                                    <CiCirclePlus
                                        style={{ strokeWidth: '1' }}
                                        size={30}
                                        className=""
                                    />
                                    <CiCircleMinus
                                        style={{ strokeWidth: '1' }}
                                        size={30}
                                        className="mr-2"
                                    />
                                    Members
                                </button>

                                {selectedGroupId && (
                                    <MemberManagementModal
                                        isOpen={showMemberModal}
                                        onClose={() => setShowMemberModal(false)}
                                        groupId={selectedGroupId}
                                    />
                                )}
                            </div>
                        </div>
                        <TaskBoard groupId={selectedGroupId ?? undefined} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskManagement;