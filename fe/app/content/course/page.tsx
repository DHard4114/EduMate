'use client'
import { useState } from 'react';
import Sidebar from '../../component/Sidebar';
import PomodoroTimer from '@/app/component/pomodoro/pomodoro-timer';
import LearningPath from '@/app/component/course/CourseBoard';
import { useRouter } from 'next/navigation';

const Course = () => {
    const [isNavOpen, setIsNavOpen] = useState(true);

    const router = useRouter();
    return (
        <>
        <div className="min-h-screen bg-gray-50 text-gray-800 flex">
            {/* Sidebar */}
            <Sidebar isOpen={isNavOpen} toggleNavbar={() => setIsNavOpen(!isNavOpen)} />
            
            {/* Main Content Area */}
            <div className={`flex-1 transition-all duration-300 ${isNavOpen ? 'ml-64' : 'ml-20'} pr-80`}>
                {/* Learning Path */}
                <LearningPath/>
            </div>
            
            {/* Pomodoro Timer - sekarang fixed position */}
            <PomodoroTimer />
        </div>
        </>
    );
};

export default Course;