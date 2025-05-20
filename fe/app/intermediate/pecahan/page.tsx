'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const materiPecahan = [
  {
    id: 1,
    title: "Pengertian Pecahan",
    content: `Pecahan adalah bilangan yang menyatakan bagian dari keseluruhan. Pecahan terdiri dari pembilang (atas) dan penyebut (bawah). Contoh: 3/4 berarti 3 bagian dari 4 bagian keseluruhan.`
  },
  {
    id: 2,
    title: "Jenis-Jenis Pecahan",
    content: `Pecahan terdiri dari beberapa jenis, antara lain pecahan biasa (3/4), pecahan campuran (1 1/2), dan pecahan desimal (0,75).`
  },
  {
    id: 3,
    title: "Operasi Pada Pecahan",
    content: `Operasi dasar pada pecahan meliputi penjumlahan, pengurangan, perkalian, dan pembagian. Contoh: 1/2 + 1/4 = 3/4, dan 2/3 × 3/5 = 6/15.`
  },
  {
    id: 4,
    title: "Penyederhanaan Pecahan",
    content: `Pecahan dapat disederhanakan dengan membagi pembilang dan penyebut dengan faktor persekutuan terbesar (FPB). Contoh: 6/8 disederhanakan menjadi 3/4.`
  }
];

const quizPecahan = [
  {
    id: 1,
    question: "Apa itu pembilang dalam pecahan?",
    options: ["Bagian atas pecahan yang menunjukkan jumlah bagian", "Bagian bawah pecahan yang menunjukkan jumlah keseluruhan", "Nilai pecahan secara keseluruhan", "Penyebut"]
  },
  {
    id: 2,
    question: "Hasil dari 1/3 + 1/6 adalah?",
    options: ["1/2", "2/9", "1/6", "1/3"]
  },
  {
    id: 3,
    question: "Pecahan 4/12 jika disederhanakan menjadi?",
    options: ["1/3", "1/4", "2/6", "3/4"]
  },
  {
    id: 4,
    question: "Hasil dari 2/5 × 3/4 adalah?",
    options: ["6/20", "5/9", "6/9", "8/15"]
  }
];

export default function PecahanPage() {
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
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-12 text-center tracking-wide"
          style={{
            background: 'linear-gradient(90deg, #C75F2A, #5A6D51)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          ➗ Pecahan ➗
        </motion.h1>

        <div className="space-y-8 mb-16">
          {materiPecahan.map(({ id, title, content }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: id * 0.2 }}
              className="bg-[#fcfaf9] rounded-2xl p-8 shadow-lg border-l-8 border-[#C75F2A]"
            >
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#5A6D51' }}>
                {title}
              </h2>
              <p className="leading-relaxed text-[#5A6D51]/90">{content}</p>
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
          Quiz Pecahan
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto">
          {quizPecahan.map(({ id, question, options }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: id * 0.1 }}
              className="bg-[#f4e5d8] p-6 rounded-xl shadow-md border border-[#C75F2A]"
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#5A6D51' }}>
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
              className="mt-6 bg-[#5A6D51] hover:bg-[#43563e] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
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
