'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <section 
        id="top"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-violet-700 text-white px-4 text-center">
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h1 className="text-5xl font-bold mb-4">Level Up Your Learning Experience with EduMate</h1>
            <p className="text-lg mb-6 max-w-xl mx-auto">
            A smarter, more engaging platform for students to explore interactive modules, manage group projects, and build productive study habits.
            </p>
            <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-2xl shadow-md hover:bg-gray-100 transition"
            >
            Get Started
            </motion.button>
        </motion.div>
        </section>
    );
}
