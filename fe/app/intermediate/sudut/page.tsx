'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const materiSudut = [
  {
    id: 1,
    title: "Pengertian Sudut",
    content: `Sudut adalah daerah yang terbentuk dari dua garis yang berpotongan di satu titik. Titik temu disebut titik sudut, dan kedua garis disebut kaki sudut.`
  },
  {
    id: 2,
    title: "Satuan Sudut",
    content: `Satuan yang digunakan untuk mengukur sudut adalah derajat (°). Satu lingkaran penuh memiliki besar 360°.`
  },
  {
    id: 3,
    title: "Jenis-Jenis Sudut",
    content: `1. Sudut Lancip (< 90°)
2. Sudut Siku-Siku (= 90°)
3. Sudut Tumpul (> 90° dan < 180°)
4. Sudut Lurus (= 180°)
5. Sudut Refleks (> 180° dan < 360°)`
  },
  {
    id: 4,
    title: "Mengukur Sudut",
    content: `Untuk mengukur sudut, kita dapat menggunakan busur derajat. Tempatkan titik tengah busur pada titik sudut dan lihat di mana kaki sudut lainnya menunjuk pada skala.`
  }
];

const quizSudut = [
  {
    id: 1,
    question: "Sudut 45° termasuk jenis sudut apa?",
    options: ["Sudut lancip", "Sudut tumpul", "Sudut siku-siku", "Sudut lurus"]
  },
  {
    id: 2,
    question: "Berapa derajat sudut lurus?",
    options: ["90°", "120°", "180°", "360°"]
  },
  {
    id: 3,
    question: "Sudut 120° termasuk jenis sudut apa?",
    options: ["Sudut lancip", "Sudut tumpul", "Sudut siku-siku", "Sudut refleks"]
  },
  {
    id: 4,
    question: "Sudut antara 0° dan 90° disebut ...",
    options: ["Sudut tumpul", "Sudut lurus", "Sudut lancip", "Sudut siku-siku"]
  }
];

export default function SudutPage() {
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
    <main className="min-h-screen bg-[#f5f9f8] px-6 py-20 text-[#265a33] relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-12 text-center tracking-wide"
          style={{
            background: 'linear-gradient(90deg, #265a33, #5aa35b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          🎯 Sudut 🎯
        </motion.h1>

        <div className="space-y-8 mb-16">
          {materiSudut.map(({ id, title, content }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: id * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-[#265a33]"
            >
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#265a33' }}>
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
          style={{ color: '#265a33' }}
        >
          Quiz Sudut
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto">
          {quizSudut.map(({ id, question, options }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: id * 0.1 }}
              className="bg-[#e8f0e7] p-6 rounded-xl shadow-md border border-[#265a33]"
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#265a33' }}>
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
                      className="accent-[#265a33] w-5 h-5"
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
              className="mt-6 bg-[#265a33] hover:bg-[#1f4529] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              Kirim Jawaban
            </button>
          </div>

          {submitted && (
            <p className="text-[#265a33] font-semibold text-center mt-6 animate-pulse">
              ✅ Jawaban berhasil dikirim!
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
