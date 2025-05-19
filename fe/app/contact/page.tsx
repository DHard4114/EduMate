'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaLinkedinIn, FaTwitter, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#D6E3C9] flex flex-col items-center justify-center p-12 text-[#5A6D51]">
      {/* Judul */}
      <motion.h1
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="text-5xl sm:text-6xl font-extrabold mb-10 text-center max-w-4xl"
      >
        Connect with <span className="text-[#C75F2A]">EduMate</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-lg sm:text-xl text-center max-w-3xl mb-14 font-semibold leading-relaxed"
      >
        Got questions or want to collaborate? Reach out through any of these channels.
      </motion.p>

      {/* Contact Cards Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl w-full"
      >
        {/* Email */}
        <div className="flex items-center gap-6 bg-white rounded-3xl shadow-lg p-6 border border-[#C75F2A]/30 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <FaEnvelope className="text-[#C75F2A] text-3xl" />
          <a
            href="mailto:support@edumate.com"
            className="text-[#5A6D51] font-semibold text-lg hover:text-[#A94B1F] transition-colors"
            aria-label="Email EduMate Support"
          >
            support@edumate.com
          </a>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-6 bg-white rounded-3xl shadow-lg p-6 border border-[#C75F2A]/30 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <FaPhoneAlt className="text-[#C75F2A] text-3xl" />
          <a
            href="tel:+6281234567890"
            className="text-[#5A6D51] font-semibold text-lg hover:text-[#A94B1F] transition-colors"
            aria-label="Phone EduMate Support"
          >
            +62 812 3456 7890
          </a>
        </div>

        {/* LinkedIn */}
        <div className="flex items-center gap-6 bg-white rounded-3xl shadow-lg p-6 border border-[#C75F2A]/30 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <FaLinkedinIn className="text-[#C75F2A] text-3xl" />
          <a
            href="https://www.linkedin.com/company/edumate"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5A6D51] font-semibold text-lg hover:text-[#A94B1F] transition-colors"
            aria-label="EduMate LinkedIn"
          >
            linkedin.com/company/edumate
          </a>
        </div>

        {/* Twitter */}
        <div className="flex items-center gap-6 bg-white rounded-3xl shadow-lg p-6 border border-[#C75F2A]/30 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <FaTwitter className="text-[#C75F2A] text-3xl" />
          <a
            href="https://twitter.com/edumate"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5A6D51] font-semibold text-lg hover:text-[#A94B1F] transition-colors"
            aria-label="EduMate Twitter"
          >
            @EduMate
          </a>
        </div>

        {/* Address (full width on small screens) */}
        <div className="flex items-center gap-6 bg-white rounded-3xl shadow-lg p-6 border border-[#C75F2A]/30 hover:shadow-xl transition-shadow duration-300 sm:col-span-2 cursor-default">
          <FaMapMarkerAlt className="text-[#C75F2A] text-3xl" />
          <p className="text-[#5A6D51] font-semibold text-lg max-w-md">
            Jl. Pendidikan No. 123, Jakarta, Indonesia
          </p>
        </div>
      </motion.div>

      {/* Closing Statement */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 0.8 }}
        className="mt-20 max-w-3xl text-center italic text-[#5A6D51]/80 text-lg"
      >
        We’re excited to hear from you — let’s make learning extraordinary together!
      </motion.p>
    </main>
  );
}
