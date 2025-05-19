'use client';

import { motion } from 'framer-motion';

export default function CTA() {
    return (
        <section 
        id="cta"
        className="bg-violet-700 py-20 text-white px-6 text-center">
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-bold mb-4">Join Thousands of Curious Learners</h2>
            <p className="mb-6 text-lg">
            Sign up for free and discover how EduMate helps you study smarter, collaborate better, and stay motivated every step of the way.
            </p>
            <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-violet-700 font-semibold px-6 py-3 rounded-2xl shadow hover:bg-gray-100 transition"
            >
            Sign Up Now
            </motion.button>
        </motion.div>
        </section>
    );
}
