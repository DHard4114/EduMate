'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-[#fdfaf5] to-[#f5f4f3] px-10 py-20 overflow-hidden"
        >
            {/* Gambar di kiri */}
            <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="md:w-1/2 ml-6"
            >
            <Image
                src="/landing.svg"
                alt="Background Illustration"
                width={500}
                height={550}
                className="z-0"
            />
            </motion.div>

            {/* Teks di kanan, dengan animasi satu per satu */}
            <div className="z-10 w-full md:w-1/2 text-right md:pr-20">
                
                <motion.h1
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
                    className="text-5xl md:text-7xl font-extrabold text-[#5A6D51] mb-6 leading-tight"
                    >
                    Learn Smarter<br />
                    with <span className="text-[#C75F2A]">EduMate</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                    className="text-lg text-[#5A6D51] mb-8 font-medium"
                >
                    Discover interactive modules, collaborate in groups, and build good habits with Pomodoro.
                </motion.p>
                <motion.button
                onClick={() => {
                    const el = document.getElementById('features');
                    if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: [1.2, 0.95, 1] }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
                    whileHover={{ scale: 1.1, boxShadow: '0 0 15px #C75F2A' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#C75F2A] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-[#a74d20] transition-all duration-300"
                    >
                    Get Started
                </motion.button>   
            </div>
        </section>
    );
}
