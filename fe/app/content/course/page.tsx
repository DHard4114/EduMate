'use client'
import { useState } from 'react';
import Sidebar from '../../component/Sidebar';
import LearningPath from '@/app/component/course/CourseBoard';
import { useRouter } from 'next/navigation';

const Course = () => {
    const [isNavOpen, setIsNavOpen] = useState(true);

    const router = useRouter();
    return (
        <>
        <div className="min-h-screen bg-gray-50  text-gray-800">
            {/* dark:bg-gray-900 dark:text-gray-100 */}
            <Sidebar isOpen={isNavOpen} toggleNavbar={() => setIsNavOpen(!isNavOpen)} />
            <div className={`transition-all duration-300 ${isNavOpen ? 'ml-64' : 'ml-20'}`}>
            <div >
                <LearningPath/>
            </div>
            </div>
        </div>
        </>
    );
};

export default Course;