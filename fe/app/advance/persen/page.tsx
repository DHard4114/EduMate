'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const materiPersen = [
  {
    id: 1,
    title: "Apa Itu Persen?",
    content: `Persen berarti "per seratus". Simbolnya adalah %.\nContoh: 25% artinya 25 dari 100 atau 25/100.`
  },
  {
    id: 2,
    title: "Mengubah Persen ke Pecahan",
    content: `Caranya: tulis persen sebagai pembilang dengan penyebut 100\nContoh: 40% = 40/100 = 2/5`
  },
  {
    id: 3,
    title: "Mengubah Persen ke Desimal",
    content: `Caranya: bagi dengan 100\nContoh: 75% = 75 ÷ 100 = 0,75`
  },
  {
    id: 4,
    title: "Mencari Nilai dari Persen",
    content: `Caranya: persen × jumlah keseluruhan\nContoh: 20% dari 80 = 0,2 × 80 = 16`
  }
];

const quizPersen = [
  {
    id: 1,
    question: "40% dari 200 adalah ...",
    options: ["60", "80", "40", "100"]
  },
  {
    id: 2,
    question: "Ubah 25% menjadi pecahan paling sederhana:",
    options: ["1/2", "1/4", "1/5", "1/3"]
  },
  {
    id: 3,
    question: "Berapa desimal dari 10%?",
    options: ["1.0", "0.10", "0.01", "0.5"]
  },
  {
    id: 4,
    question: "Jika harga diskon 30% dari Rp100.000, maka potongannya adalah ...",
    options: ["Rp70.000", "Rp30.000", "Rp60.000", "Rp50.000"]
  }
];

export default function PersenPage() {
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
            color: '#C75F2A',
          }}
        >
          ⚡ Persen ⚡
        </motion.h1>

        <div className="space-y-8 mb-16">
          {materiPersen.map(({ id, title, content }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: id * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-[#C75F2A]"
            >
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#C75F2A' }}>
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
          Quiz 
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto">
          {quizPersen.map(({ id, question, options }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: id * 0.1 }}
              className="bg-[#f5f9f1] p-6 rounded-xl shadow-md border border-[#C75F2A]"
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
