'use client';

import React from 'react';
import { motion } from 'framer-motion';

const cardFeatures = [
    {
        title: 'Interactive Courses',
        icon: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-6 h-6 mr-2 text-[#C75F2A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l9-5-9-5-9 5 9 5z" />
        </svg>
        ),
        description:
        'Dive into modules crafted for ages 6-12, from Algebra basics to advanced Calculus. Enjoy immersive lessons combining text, videos, and quizzes — learning at your own pace!',
    },
    {
        title: 'Teamwork & Task Management',
        icon: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-6 h-6 mr-2 text-[#C75F2A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M15 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        ),
        description:
        'Create groups, assign tasks, set deadlines, and chat in real time. Our intuitive task manager helps keep your team aligned and projects on track — with drag & drop ease!',
    },
    {
        title: 'Smart Pomodoro Timer',
        icon: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-6 h-6 mr-2 text-[#C75F2A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
        </svg>
        ),
        description:
        'Balance focus and breaks with our built-in Pomodoro timer. Track your study sessions, improve concentration, and stay refreshed throughout your day.',
    },
    {
        title: 'Earn Badges & Achievements',
        icon: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-6 h-6 mr-2 text-[#C75F2A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7 7h10v10H7z" />
        </svg>
        ),
        description:
        'Stay motivated by earning badges for Highest Score, Most Diligent, and Course Finisher. Celebrate your progress and keep pushing your limits!',
    },
    ];

    export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-[#E6F0D4] via-[#D6E3C9] to-[#C2D1B0] relative overflow-hidden px-6 py-20 flex flex-col items-center text-[#5A6D51]">

        {/* Pattern Overlay */}
        <div
            aria-hidden="true"
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-10 pointer-events-none"
        />

        {/* Title */}
        <motion.h1
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 text-4xl sm:text-7xl font-extrabold mb-12 text-center max-w-5xl leading-tight tracking-wide"
            style={{
            background: 'linear-gradient(90deg, #C75F2A, #E67E22)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            }}
        >
            About 
            <span className="text-fontgreen"> EduMate</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="relative z-10 max-w-3xl text-center text-lg sm:text-xl font-semibold mb-16 leading-relaxed tracking-wide"
        >
            A smart, fun, and collaborative platform designed to help students study smarter, manage their time effectively, and unlock their full potential.
        </motion.p>

        {/* Features Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">

            {cardFeatures.map(({ title, icon, description }, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.3, duration: 0.7, ease: 'easeOut' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(199,95,42,0.4)' }}
                className="bg-white rounded-3xl p-8 shadow-lg cursor-pointer transition-transform duration-300 ease-in-out flex flex-col"
            >
                <h2 className="text-2xl font-extrabold mb-5 flex items-center text-[#C75F2A] tracking-wide">
                {icon}
                {title}
                </h2>
                <p className="text-base text-[#5A6D51]/90 leading-relaxed flex-grow">{description}</p>
            </motion.div>
            ))}

        </div>

        {/* Closing Statement */}
        <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.9 }}
            className="relative z-10 mt-12 max-w-3xl text-center italic text-[#5A6D51]/70 text-lg tracking-wide"
        >
            EduMate isn’t just a platform — it’s your companion for lifelong learning, growth, and discovery. Join us and transform the way you learn today!
        </motion.p>
        </main>
    );
}
