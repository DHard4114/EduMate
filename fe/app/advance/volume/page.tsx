'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const materiVolume = [
  {
    id: 1,
    title: "Volume Kubus",
    content: `Rumus: V = sisi × sisi × sisi\nContoh: Jika sisi = 4 cm, maka V = 4 × 4 × 4 = 64 cm³`
  },
  {
    id: 2,
    title: "Volume Balok",
    content: `Rumus: V = panjang × lebar × tinggi\nContoh: 5 × 3 × 2 = 30 cm³`
  },
  {
    id: 3,
    title: "Volume Tabung",
    content: `Rumus: V = π × r² × t\nContoh: r = 7 cm, t = 10 cm ⇒ V = 22/7 × 7 × 7 × 10 = 1540 cm³`
  },
  {
    id: 4,
    title: "Volume Kerucut",
    content: `Rumus: V = 1/3 × π × r² × t\nContoh: r = 6 cm, t = 12 cm ⇒ V = 1/3 × 3,14 × 36 × 12 = 452,16 cm³`
  }
];

const quizVolume = [
  {
    id: 1,
    question: "Volume dari kubus dengan sisi 5 cm adalah ...",
    options: [
      "15 cm³",
      "25 cm³",
      "125 cm³",
      "100 cm³"
    ]
  },
  {
    id: 2,
    question: "Volume balok dengan panjang 4 cm, lebar 3 cm, dan tinggi 2 cm adalah ...",
    options: [
      "24 cm³",
      "30 cm³",
      "32 cm³",
      "36 cm³"
    ]
  },
  {
    id: 3,
    question: "Volume tabung dengan jari-jari 7 cm dan tinggi 5 cm adalah ...",
    options: [
      "770 cm³",
      "550 cm³",
      "1540 cm³",
      "1100 cm³"
    ]
  },
  {
    id: 4,
    question: "Volume kerucut dengan r = 3 cm dan t = 6 cm (π = 3,14) adalah ...",
    options: [
      "56,52 cm³",
      "64,50 cm³",
      "113,04 cm³",
      "37,68 cm³"
    ]
  }
];

export default function VolumePage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#f2faff] px-6 py-20 text-[#1e3a5f] relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-12 text-center tracking-wide"
          style={{
            background: 'linear-gradient(90deg, #0077b6, #90e0ef)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          🧊 Materi Volume Bangun Ruang 🧊
        </motion.h1>

        <div className="space-y-8 mb-16">
          {materiVolume.map(({ id, title, content }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: id * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-[#0077b6]"
            >
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#0077b6' }}>
                {title}
              </h2>
              <p className="leading-relaxed whitespace-pre-line">{content}</p>
            </motion.div>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-10 text-center"
          style={{ color: '#0077b6' }}
        >
          Quiz Volume
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto">
          {quizVolume.map(({ id, question, options }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: id * 0.1 }}
              className="bg-[#e0f7fa] p-6 rounded-xl shadow-md border border-[#0077b6]"
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#0077b6' }}>
                {id}. {question}
              </h3>
              <div className="space-y-2">
                {options.map((opt, idx) => (
                  <label
                    key={idx}
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-lg cursor-pointer transition duration-200"
                  >
                    <input
                      type="radio"
                      name={`quiz-${id}`}
                      value={opt}
                      checked={answers[id] === opt}
                      onChange={() => handleChange(id, opt)}
                      className="accent-[#0077b6] w-5 h-5"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          ))}

          <div className="text-center">
            <button
              type="submit"
              className="mt-6 bg-[#0077b6] hover:bg-[#005f8c] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              Kirim Jawaban
            </button>
          </div>

          {submitted && (
            <p className="text-[#0077b6] font-semibold text-center mt-6 animate-pulse">
              ✅ Jawaban berhasil dikirim!
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
