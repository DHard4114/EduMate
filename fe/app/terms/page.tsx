'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TermsFunny() {
    return (
        <main className="min-h-screen bg-[#F0EAD8] flex items-center justify-center p-12">
        <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-xl bg-[#C75F2A]/20 border-4 border-[#C75F2A] rounded-3xl p-8 shadow-lg text-[#5A6D51] text-center font-semibold text-xl sm:text-2xl tracking-wide select-none"
        >
            <p>Dengan ini menyatakan akan memberi nilai</p>
            <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5, type: 'spring', stiffness: 300 }}
            className="text-[#C75F2A] text-4xl sm:text-5xl font-extrabold my-4"
            >
            SEKURANG-KURANGNYA 90
            </motion.p>
            <p className="mt-2">
            Peryataan ini valid dan akan dipertanggungjawabkan.{' '}
            <span role="img" aria-label="wink" className="inline-block animate-pulse">
                😉
            </span>
            </p>
        </motion.div>
        </main>
    );
};
