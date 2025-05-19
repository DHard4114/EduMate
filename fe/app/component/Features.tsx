'use client';

import { motion } from 'framer-motion';
import { BookOpenCheck, ClipboardList, Timer, Award } from 'lucide-react';

const features = [
    {
        icon: <BookOpenCheck className="w-6 h-6 text-blue-600 mb-2" />,
        title: 'Interactive Courses',
        desc: 'Access fun and structured learning modules with videos, texts, and quizzes tailored to your pace.',
    },
    {
        icon: <ClipboardList className="w-6 h-6 text-blue-600 mb-2" />,
        title: 'Smart Task Manager',
        desc: 'Organize group projects with task boards, deadlines, and progress tracking. Stay synced with your team.',
    },
    {
        icon: <Timer className="w-6 h-6 text-blue-600 mb-2" />,
        title: 'Pomodoro Study Timer',
        desc: 'Focus better with customizable Pomodoro sessions. Track your time and keep burnout away.',
    },
    {
        icon: <Award className="w-6 h-6 text-blue-600 mb-2" />,
        title: 'Achievement Badges',
        desc: 'Earn badges like “Highest Score” or “Course Finisher” as recognition of your learning journey.',
    },
    ];

    export default function Features() {
    return (
        <section 
        id="features"
        className="bg-white py-16 px-6 text-gray-800">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Why Choose EduMate?</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            {features.map((feature, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition"
                >
                {feature.icon}
                <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
                </motion.div>
            ))}
            </div>
        </div>
        </section>
    );
}
