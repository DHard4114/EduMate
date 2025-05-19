'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpenCheck, ClipboardList, Timer, Award } from 'lucide-react';

const features = [
    {
        icon: <BookOpenCheck className="w-7 h-7 text-[#C75F2A]" />,
        title: 'Interactive Courses',
        desc: 'Fun and structured learning modules with videos, texts, and quizzes.',
        details:
        'These courses are designed by experts with interactive activities, discussion forums, and certification after completion.',
    },
    {
        icon: <ClipboardList className="w-7 h-7 text-[#C75F2A]" />,
        title: 'Smart Task Manager',
        desc: 'Organize projects with boards, deadlines, and real-time progress.',
        details:
        'Plan your week, assign tasks to team members, and visualize your progress with kanban boards and Gantt charts.',
    },
    {
        icon: <Timer className="w-7 h-7 text-[#C75F2A]" />,
        title: 'Pomodoro Study Timer',
        desc: 'Boost focus with customizable Pomodoro sessions and timers.',
        details:
        'Set your preferred focus/break durations and track your session history for productivity analytics.',
    },
    {
        icon: <Award className="w-7 h-7 text-[#C75F2A]" />,
        title: 'Achievement Badges',
        desc: 'Earn badges like “Top Scorer” and “Course Finisher” to stay motivated.',
        details:
        'Collect digital badges, share them on LinkedIn, and unlock special features through your achievements.',
    },
    ];

    const cardVariant = {
    hidden: { opacity: 0, y: 60, scale: 0.85 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
        delay: index * 0.2,
        duration: 0.7,
        ease: 'easeOut',
        },
    }),
};

export default function Features() {
    const [selected, setSelected] = useState(null);

    return (
        <section
        id="features"
        className="min-h-screen bg-[#FFF3E6] py-24 px-6 text-[#2E2E2E] flex items-center"
        >
        <div className="max-w-6xl mx-auto w-full text-center">
            {/* Judul Glowing */}
            <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-16 text-[#C75F2A] relative z-10 glow-title"
            >
            Why Choose <span className="text-fontgreen">EduMate?</span>
            </motion.h2>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {features.map((feature, index) => (
                <motion.div
                key={index}
                custom={index}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                onClick={() => setSelected(feature)}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer bg-white border border-[#F1DEC9] rounded-2xl p-6 shadow-sm hover:shadow-md transition-transform duration-500 ease-in-out"
                >
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-[#FFF3E6] ring-1 ring-[#F1DEC9]">
                    {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 leading-snug">
                    {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.desc}
                    </p>
                </div>
                </motion.div>
            ))}
            </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
            {selected && (
            <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
            >
                <motion.div
                className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-left"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                >
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#FFF3E6] p-3 rounded-full ring-1 ring-[#F1DEC9]">
                    {selected.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-[#C75F2A]">
                    {selected.title}
                    </h3>
                </div>
                <p className="text-gray-700">{selected.details}</p>
                <button
                    onClick={() => setSelected(null)}
                    className="mt-6 bg-[#C75F2A] text-white px-4 py-2 rounded-xl hover:bg-[#a84c1f] transition-colors"
                >
                    Close
                </button>
                </motion.div>
            </motion.div>
            )}
        </AnimatePresence>
        </section>
    );
}
