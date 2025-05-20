'use client';
import React from 'react';
import { motion } from 'framer-motion';

const materiBeginner = [
  "Persen berarti 'per seratus'. Simbol: %",
  "Mengubah persen ke pecahan dengan penyebut 100.",
  "Mengubah persen ke desimal dengan membagi 100.",
  "Mencari nilai dari persen = persen × jumlah keseluruhan."
];

export default function ReviewBeginner() {
  return (
    <main className="min-h-screen bg-[#FFE0C8] px-6 py-20 text-[#5A6D51] relative">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-12 text-center tracking-wide"
          style={{
            background: 'linear-gradient(90deg, #5A6D51, #C75F2A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          📚 Review Materi Beginner 📚
        </motion.h1>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="list-disc list-inside space-y-4 text-lg"
        >
          {materiBeginner.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </motion.ul>
      </div>
    </main>
  );
}
