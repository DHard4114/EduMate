'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-[#D6E3C9] flex flex-col items-center justify-center p-10 text-[#5A6D51]">
        {/* Judul */}
        <motion.h1
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl sm:text-6xl font-extrabold mb-8 text-center max-w-4xl"
        >
            Privacy Policy of <span className="text-[#C75F2A]">EduMate</span>
        </motion.h1>

        {/* Intro */}
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base sm:text-lg text-center max-w-3xl mb-12 leading-relaxed font-medium"
        >
            Your privacy is important to us. This policy explains how EduMate collects, uses, and protects your information while you use our platform.
        </motion.p>

        {/* Sections Container */}
        <div className="max-w-4xl w-full space-y-10">
            {/* Data Collection */}
            <motion.section
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="bg-white rounded-3xl shadow-lg p-8 text-[#5A6D51]"
            >
            <h2 className="text-2xl font-bold mb-4 border-b-4 border-[#C75F2A] inline-block pb-1">
                Data We Collect
            </h2>
            <p className="text-base leading-relaxed">
                We collect personal information such as your name, email, and usage data to personalize your experience and improve EduMate.
            </p>
            </motion.section>

            {/* Use of Data */}
            <motion.section
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="bg-white rounded-3xl shadow-lg p-8 text-[#5A6D51]"
            >
            <h2 className="text-2xl font-bold mb-4 border-b-4 border-[#C75F2A] inline-block pb-1">
                How We Use Your Data
            </h2>
            <p className="text-base leading-relaxed">
                Your data helps us enhance learning tools, communicate updates, provide support, and ensure the platform runs smoothly.
            </p>
            </motion.section>

            {/* Data Protection */}
            <motion.section
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="bg-white rounded-3xl shadow-lg p-8 text-[#5A6D51]"
            >
            <h2 className="text-2xl font-bold mb-4 border-b-4 border-[#C75F2A] inline-block pb-1">
                Data Protection
            </h2>
            <p className="text-base leading-relaxed">
                We implement industry-standard security measures to protect your information from unauthorized access, alteration, or disclosure.
            </p>
            </motion.section>

            {/* User Rights */}
            <motion.section
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7, duration: 0.7 }}
            className="bg-white rounded-3xl shadow-lg p-8 text-[#5A6D51]"
            >
            <h2 className="text-2xl font-bold mb-4 border-b-4 border-[#C75F2A] inline-block pb-1">
                Your Rights
            </h2>
            <p className="text-base leading-relaxed">
                You can access, update, or delete your personal data anytime by contacting our support team or adjusting your account settings.
            </p>
            </motion.section>

            {/* Changes to Policy */}
            <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="bg-white rounded-3xl shadow-lg p-8 text-[#5A6D51]"
            >
            <h2 className="text-2xl font-bold mb-4 border-b-4 border-[#C75F2A] inline-block pb-1">
                Changes to This Policy
            </h2>
            <p className="text-base leading-relaxed">
                EduMate may update this policy occasionally. We encourage you to review it regularly for any updates.
            </p>
            </motion.section>
        </div>

        {/* Closing Statement */}
        <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.8 }}
            className="mt-16 max-w-3xl text-center italic text-[#5A6D51]/80 text-lg"
        >
            Your trust is our priority. EduMate is committed to protecting your privacy every step of the way.
        </motion.p>
        </main>
    );
}
