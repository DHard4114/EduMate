'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const materiBangunRuang = [
  {
    id: 1,
    title: "Pengertian Bangun Ruang",
    content: `Bangun ruang adalah bentuk tiga dimensi yang memiliki volume dan ruang, seperti kubus, balok, bola, tabung, kerucut, dan limas.`
  },
  {
    id: 2,
    title: "Kubus",
    content: `Kubus adalah bangun ruang dengan 6 sisi yang berbentuk persegi sama besar. Semua rusuknya sama panjang. Volume kubus = sisi³.`
  },
  {
    id: 3,
    title: "Balok",
    content: `Balok memiliki 6 sisi berbentuk persegi panjang. Volume balok = panjang × lebar × tinggi.`
  },
  {
    id: 4,
    title: "Bola",
    content: `Bola adalah bangun ruang dengan semua titik pada permukaan sama jaraknya dari pusat. Volume bola = 4/3 × π × r³.`
  },
  {
    id: 5,
    title: "Tabung",
    content: `Tabung adalah bangun ruang yang memiliki dua lingkaran sejajar sebagai alas dan tutup serta sisi melengkung. Volume tabung = π × r² × tinggi.`
  }
];

const quizBangunRuang = [
  {
    id: 1,
    question: "Berapa jumlah sisi kubus?",
    options: ["6", "8", "12", "4"]
  },
  {
    id: 2,
    question: "Rumus volume balok adalah?",
    options: ["panjang × lebar × tinggi", "sisi × sisi", "4/3 × π × r³", "π × r² × tinggi"]
  },
  {
    id: 3,
    question: "Apa yang membedakan bola dengan tabung?",
    options: ["Bola tidak punya sisi datar, tabung punya alas dan tutup lingkaran", "Bola memiliki rusuk, tabung tidak", "Tabung punya sisi persegi", "Bola memiliki alas persegi"]
  },
  {
    id: 4,
    question: "Jika sisi kubus adalah 5 cm, berapakah volumenya?",
    options: ["125 cm³", "25 cm³", "75 cm³", "100 cm³"]
  }
];

export default function BangunRuangPage() {
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
    <main className="min-h-screen bg-[#c8d7d1] px-6 py-20 text-[#2a4d3a] relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-12 text-center tracking-wide"
          style={{
            background: 'linear-gradient(90deg, #2a4d3a, #6fa56f)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          🧱 Bangun Ruang 🧱
        </motion.h1>

        <div className="space-y-8 mb-16">
          {materiBangunRuang.map(({ id, title, content }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: id * 0.2 }}
              className="bg-[#f9faf8] rounded-2xl p-8 shadow-lg border-l-8 border-[#2a4d3a]"
            >
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#2a4d3a' }}>
                {title}
              </h2>
              <p className="leading-relaxed text-[#2a4d3a]/90">{content}</p>
            </motion.div>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-10 text-center"
          style={{ color: '#2a4d3a' }}
        >
          Quiz Bangun Ruang
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto">
          {quizBangunRuang.map(({ id, question, options }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: id * 0.1 }}
              className="bg-[#e5f0e7] p-6 rounded-xl shadow-md border border-[#2a4d3a]"
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#2a4d3a' }}>
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
                      className="accent-[#2a4d3a] w-5 h-5"
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
              className="mt-6 bg-[#2a4d3a] hover:bg-[#235233] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              Kirim Jawaban
            </button>
          </div>

          {submitted && (
            <p className="text-[#2a4d3a] font-semibold text-center mt-6 animate-pulse">
              ✅ Jawaban berhasil dikirim!
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
