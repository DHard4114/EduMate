'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const materiSkala = [
  {
    id: 1,
    title: "Pengertian Skala",
    content: `Skala adalah perbandingan antara ukuran gambar atau model dengan ukuran aslinya. Skala sering digunakan dalam peta, gambar teknik, atau miniatur.`
  },
  {
    id: 2,
    title: "Jenis-Jenis Skala",
    content: `Ada dua jenis skala:
- Skala Pembesaran (misal 2:1 artinya gambar dua kali lebih besar dari aslinya)
- Skala Pengecilan (misal 1:100 artinya gambar 100 kali lebih kecil dari aslinya)`
  },
  {
    id: 3,
    title: "Contoh Skala Peta",
    content: `Jika skala peta adalah 1:50.000, berarti 1 cm di peta sama dengan 50.000 cm (atau 500 m) di dunia nyata.`
  },
  {
    id: 4,
    title: "Menghitung Panjang Sebenarnya",
    content: `Rumus: Panjang sebenarnya = Panjang gambar × skala.
Contoh: Gambar 5 cm dengan skala 1:100 berarti panjang sebenarnya 5 × 100 = 500 cm atau 5 meter.`
  }
];

const quizSkala = [
  {
    id: 1,
    question: "Jika skala gambar adalah 1:200, gambar 3 cm maka panjang sebenarnya adalah?",
    options: ["600 cm", "0.6 cm", "200 cm", "3 cm"]
  },
  {
    id: 2,
    question: "Skala 2:1 berarti gambar ... dibandingkan aslinya?",
    options: ["2 kali lebih besar", "2 kali lebih kecil", "Sama besar", "Tidak ada hubungan"]
  },
  {
    id: 3,
    question: "Apa arti skala 1:50.000 pada peta?",
    options: ["1 cm gambar = 50.000 cm nyata", "1 m gambar = 50.000 m nyata", "50.000 cm gambar = 1 cm nyata", "1 cm gambar = 500 cm nyata"]
  },
  {
    id: 4,
    question: "Gambar 8 cm dengan skala 1:1000, berapa panjang sebenarnya?",
    options: ["8000 cm", "80 cm", "800 cm", "8 cm"]
  }
];

export default function SkalaPage() {
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
          📏 Skala 📏
        </motion.h1>

        <div className="space-y-8 mb-16">
          {materiSkala.map(({ id, title, content }) => (
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
          Quiz Skala
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto">
          {quizSkala.map(({ id, question, options }) => (
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
