'use client'

import { useState } from 'react';
import Sidebar from '../../component/Sidebar';
import AccountPage from '@/app/component/account/account';
//import { useRouter } from 'next/navigation';

const Course = () => {
    const [isNavOpen, setIsNavOpen] = useState(true);

    //const router = useRouter();
    return (
        <>
        <div className="min-h-screen bg-gray-50 text-gray-800 flex">
            {/* Sidebar */}
            <Sidebar isOpen={isNavOpen} toggleNavbar={() => setIsNavOpen(!isNavOpen)} />
            <div className={`flex-1 transition-all duration-300 ${isNavOpen ? 'ml-64' : 'ml-20'} pr-80`}>
                <AccountPage/>
            </div>
        </div>
        </>
    );
};

export default Course;