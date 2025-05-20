'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const materiAljabar = [
  {
    id: 1,
    title: "Pengertian Aljabar",
    content: `Aljabar adalah cabang matematika yang mempelajari simbol dan aturan operasi untuk memanipulasi simbol tersebut. Aljabar digunakan untuk menyatakan hubungan antara variabel dan konstanta.`
  },
  {
    id: 2,
    title: "Variabel dan Konstanta",
    content: `Variabel adalah simbol yang mewakili nilai yang belum diketahui, sedangkan konstanta adalah nilai yang tetap. Contoh: dalam persamaan x + 5 = 10, x adalah variabel dan 5 serta 10 adalah konstanta.`
  },
  {
    id: 3,
    title: "Operasi Aljabar Dasar",
    content: `Operasi dasar dalam aljabar meliputi penjumlahan, pengurangan, perkalian, dan pembagian dengan variabel. Contoh: 2x + 3x = 5x dan 4x - 2x = 2x.`
  },
  {
    id: 4,
    title: "Persamaan dan Pertidaksamaan",
    content: `Persamaan adalah pernyataan dua ekspresi yang sama, sedangkan pertidaksamaan adalah pernyataan hubungan ketidaksamaan antara dua ekspresi. Contoh persamaan: 3x + 2 = 11. Contoh pertidaksamaan: 2x - 5 > 3.`
  }
];

const quizAljabar = [
  {
    id: 1,
    question: "Apa itu variabel dalam aljabar?",
    options: ["Simbol yang mewakili nilai belum diketahui", "Nilai tetap", "Hasil dari operasi matematika", "Angka positif"]
  },
  {
    id: 2,
    question: "Hasil dari 3x + 4x adalah?",
    options: ["7x", "12x", "x", "1"]
  },
  {
    id: 3,
    question: "Persamaan x + 5 = 9 memiliki nilai x?",
    options: ["4", "5", "14", "9"]
  },
  {
    id: 4,
    question: "Jika 2x - 3 > 7, nilai x yang benar adalah?",
    options: ["x > 5", "x < 5", "x = 5", "x = 2"]
  }
];

export default function AljabarPage() {
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
          📐 Aljabar Dasar 📐
        </motion.h1>

        <div className="space-y-8 mb-16">
          {materiAljabar.map(({ id, title, content }) => (
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
          Quiz Aljabar
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto">
          {quizAljabar.map(({ id, question, options }) => (
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
