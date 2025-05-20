'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const materiDesimal = [
  {
    id: 1,
    title: "Apa Itu Bilangan Desimal?",
    content: `Bilangan desimal adalah bilangan yang memiliki bagian pecahan setelah tanda koma (,). Contoh: 3,14; 0,5; 12,75.`
  },
  {
    id: 2,
    title: "Cara Membaca Bilangan Desimal",
    content: `Contoh:
- 3,5 dibaca tiga koma lima
- 7,25 dibaca tujuh koma dua lima`
  },
  {
    id: 3,
    title: "Operasi Penjumlahan dan Pengurangan Desimal",
    content: `Langkah:
1. Samakan posisi koma.
2. Hitung seperti biasa.
Contoh: 1,5 + 2,25 = 3,75`
  },
  {
    id: 4,
    title: "Perkalian dan Pembagian Desimal",
    content: `Perkalian:
- Kalikan seperti bilangan biasa, lalu hitung jumlah angka di belakang koma.

Pembagian:
- Ubah menjadi pecahan atau gunakan pembagian panjang.`
  }
];

const quizDesimal = [
  {
    id: 1,
    question: "Bilangan desimal dari 3 per 10 adalah ...",
    options: [
      "0,03",
      "0,3",
      "3,0",
      "3,1"
    ]
  },
  {
    id: 2,
    question: "Hasil dari 2,5 + 1,25 adalah ...",
    options: [
      "3,75",
      "3,5",
      "4,25",
      "3,25"
    ]
  },
  {
    id: 3,
    question: "Cara membaca bilangan 0,75 adalah ...",
    options: [
      "Nol tujuh lima",
      "Nol koma tujuh lima",
      "Tujuh lima",
      "Nol koma tujuh lima belas"
    ]
  },
  {
    id: 4,
    question: "Hasil dari 1,2 × 3 adalah ...",
    options: [
      "3,2",
      "3,6",
      "4,2",
      "3,4"
    ]
  }
];

export default function DesimalPage() {
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
    <main className="min-h-screen bg-[#fff9f0] px-6 py-20 text-[#4b3a20] relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-12 text-center tracking-wide"
          style={{
            background: 'linear-gradient(90deg, #d9762c, #ffd680)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          🔢 Bilangan Desimal 🔢
        </motion.h1>

        <div className="space-y-8 mb-16">
          {materiDesimal.map(({ id, title, content }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: id * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-[#d9762c]"
            >
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#d9762c' }}>
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
          style={{ color: '#d9762c' }}
        >
          Quiz
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto">
          {quizDesimal.map(({ id, question, options }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: id * 0.1 }}
              className="bg-[#fff3e0] p-6 rounded-xl shadow-md border border-[#d9762c]"
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#d9762c' }}>
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
                      className="accent-[#d9762c] w-5 h-5"
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
              className="mt-6 bg-[#d9762c] hover:bg-[#b65d1c] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              Kirim Jawaban
            </button>
          </div>

          {submitted && (
            <p className="text-[#d9762c] font-semibold text-center mt-6 animate-pulse">
              ✅ Jawaban berhasil dikirim!
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
