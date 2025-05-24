'use client'

import { useState, useEffect } from 'react';
import Sidebar from '../../component/Sidebar';
import PomodoroTimer from '@/app/component/pomodoro/pomodoro-timer';
import LearningPath from '@/app/component/course/CourseBoard';

const Course = () => {
    const [isNavOpen, setIsNavOpen] = useState(true);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user?.id) {
            setUserId(user.id);
        }
    }, []);

    if (!userId) {
        return (
            <div className="min-h-screen bg-gray-50 text-gray-800 flex">
                <Sidebar isOpen={isNavOpen} toggleNavbar={() => setIsNavOpen(!isNavOpen)} />
                <div className={`flex-1 transition-all duration-300 ${isNavOpen ? 'ml-64' : 'ml-20'} pr-80`}>
                    <LearningPath/>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 flex">
            <Sidebar isOpen={isNavOpen} toggleNavbar={() => setIsNavOpen(!isNavOpen)} />
            
            <div className={`flex-1 transition-all duration-300 ${isNavOpen ? 'ml-64' : 'ml-20'} pr-80`}>
                <LearningPath/>
            </div>
            
            {/* Now TypeScript knows userId is definitely a number */}
            <PomodoroTimer userId={userId} />
        </div>
    );
};

export default Course;