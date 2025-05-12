'use client'
import { useState } from 'react';
import Sidebar from '../../component/Sidebar';
import TaskBoard from '../../component/task-management/TaskBoard';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { CiCirclePlus } from "react-icons/ci";

const TaskManagement = () => {
    const [isNavOpen, setIsNavOpen] = useState(true);

    const router = useRouter();
    const handleAddGroup = () => {
        router.push('component/task-management/create-group');
    };

    return (
        <>
        <Head>
            <title>Task Manager</title>
            <meta name="description" content="Task management application" />
        </Head>
        <div className="min-h-screen bg-gray-50  text-gray-800">
            {/* dark:bg-gray-900 dark:text-gray-100 */}
            <Sidebar isOpen={isNavOpen} toggleNavbar={() => setIsNavOpen(!isNavOpen)} />
            <div className={`transition-all duration-300 ${isNavOpen ? 'ml-64' : 'ml-20'}`}>
            <div >
                <div className="pt-4 pr-4 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">  </h1>
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
                <TaskBoard />
            </div>
            </div>
        </div>
        </>
    );
};

export default TaskManagement;