'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const quizBeginner = [
  {
    id: 1,
    question: "10% dari 50 adalah ...",
    options: ["5", "10", "15", "20"]
  },
  {
    id: 2,
    question: "Ubah 25% menjadi pecahan paling sederhana:",
    options: ["1/4", "1/3", "1/5", "1/2"]
  },
  {
    id: 3,
    question: "Berapa desimal dari 50%?",
    options: ["0.5", "5", "0.05", "50"]
  },
  {
    id: 4,
    question: "Jika harga asli Rp200.000 dan diskon 20%, harga setelah diskon adalah ...",
    options: ["Rp160.000", "Rp180.000", "Rp140.000", "Rp150.000"]
  },
  {
    id: 5,
    question: "30% dari 300 adalah ...",
    options: ["90", "60", "100", "120"]
  },
  {
    id: 6,
    question: "Ubah 75% menjadi desimal:",
    options: ["0.75", "7.5", "0.075", "75"]
  },
  {
    id: 7,
    question: "25% + 25% = ...",
    options: ["50%", "25%", "75%", "100%"]
  },
  {
    id: 8,
    question: "Ubah 12.5% menjadi pecahan paling sederhana:",
    options: ["1/8", "1/4", "1/6", "1/10"]
  },
  {
    id: 9,
    question: "Apa arti 100%?",
    options: ["Semuanya", "Separuh", "Setengah", "Tidak ada"]
  },
  {
    id: 10,
    question: "Jika 15% dari sebuah nilai adalah 30, maka nilai tersebut adalah ...",
    options: ["200", "150", "180", "100"]
  }
];

export default function QuizBeginner() {
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
    <main className="min-h-screen bg-[#FFE0C8] px-6 py-20 text-[#5A6D51] relative">
      <div className="max-w-4xl mx-auto relative z-10">
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
          🎯 Advance Test 🎯
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto">
          {quizBeginner.map(({ id, question, options }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: id * 0.1 }}
              className="bg-[#D6E3C9] p-6 rounded-xl shadow-md border border-[#C75F2A]"
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#C75F2A' }}>
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
              className="mt-6 bg-[#C75F2A] hover:bg-[#a4471d] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
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
