'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const materiBilKompleks = [
  {
    id: 1,
    title: "Apa Itu Bilangan Kompleks?",
    content: `Bilangan kompleks terdiri dari dua bagian:\n1. Bagian real\n2. Bagian imajiner (mengandung i)\nContoh: 3 + 2i`
  },
  {
    id: 2,
    title: "Apa Itu i?",
    content: `i adalah √(-1). Maka i² = -1`
  },
  {
    id: 3,
    title: "Penjumlahan Bilangan Kompleks",
    content: `(2 + 3i) + (1 + 4i) = 3 + 7i`
  },
  {
    id: 4,
    title: "Perkalian Bilangan Kompleks",
    content: `(1 + 2i)(3 + 4i) = -5 + 10i`
  }
];

const quizBilKompleks = [
  {
    id: 1,
    question: "i² sama dengan ...",
    options: ["1", "-1", "i", "0"]
  },
  {
    id: 2,
    question: "(2 + 3i) + (4 + 5i) = ...",
    options: ["6 + 8i", "8 + 6i", "2 + 15i", "5 + 5i"]
  },
  {
    id: 3,
    question: "(1 + i)(1 - i) = ...",
    options: ["2", "0", "1", "1 + i"]
  },
  {
    id: 4,
    question: "Bilangan 0 + 2i disebut ...",
    options: [
      "Bilangan real",
      "Bilangan imajiner murni",
      "Bilangan asli",
      "Bilangan rasional"
    ]
  }
];

export default function BilKompleksPage() {
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
    <main className="min-h-screen bg-[#D6E3C9] px-6 py-20 text-[#5A6D51] relative">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-12 text-center tracking-wide"
          style={{
            color: '#C75F2A',
          }}
        >
          ⚡ Bilangan Kompleks ⚡
        </motion.h1>

        <div className="space-y-8 mb-16">
          {materiBilKompleks.map(({ id, title, content }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: id * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-l-8"
              style={{ borderColor: '#5A6D51' }}
            >
              <h2 className="text-2xl font-bold mb-3 text-[#5A6D51]">
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
          style={{ color: '#C75F2A' }}
        >
          Kuis Bilangan Kompleks
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto">
          {quizBilKompleks.map(({ id, question, options }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: id * 0.1 }}
              className="bg-[#FFE0C8] p-6 rounded-xl shadow-md border"
              style={{ borderColor: '#C75F2A' }}
            >
              <h3 className="text-lg font-semibold mb-4 text-[#5A6D51]">
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
                      className="accent-[#C75F2A] w-5 h-5"
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
              className="mt-6 bg-[#5A6D51] hover:bg-[#4c5d45] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              Kirim Jawaban
            </button>
          </div>

          {submitted && (
            <p className="text-[#C75F2A] font-semibold text-center mt-6 animate-pulse">
              ✅ Jawaban berhasil dikirim!
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
