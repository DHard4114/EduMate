'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTA() {
  return (
    <section
      id="cta"
      className="min-h-screen w-full flex items-center justify-center bg-basegreen px-6 py-24 text-white text-center relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto"
      >
        {/* JUDUL GLOW DENGAN ANIMASI WOW */}
        <motion.h2
          initial={{ rotateX: 90, opacity: 0, scale: 0.8 }}
          whileInView={{ rotateX: 0, opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: 'easeOut',
            type: 'spring',
            stiffness: 100,
          }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 glow-cta text-fontgreen"
        >
          <span className="inline-block">Join Thousands of</span> <br />
          <motion.span
            initial={{ y: -80, opacity: 0, scale: 0.8 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
            className="text-[#C75F2A] inline-block"
          >
            Curious Learners
          </motion.span>
        </motion.h2>

        {/* DESKRIPSI UNIK */}
        <motion.p
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          className="text-lg sm:text-xl mb-10 text-fontgreen/90"
        >
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
            className="inline-block"
          >
            Sign up for free and discover how EduMate helps you
            <span className="font-semibold"> study smarter</span>,
            <span className="font-semibold"> collaborate better</span>, and stay
            <span className="font-semibold"> motivated</span> every step of the way.
          </motion.span>
        </motion.p>

        {/* TOMBOL LINK */}
        <Link href="/auth?mode=signup">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="inline-block bg-[#C75F2A] text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl transition-all hover:bg-[#a84c1f] glow-button cursor-pointer"
          >
            Register Now
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
