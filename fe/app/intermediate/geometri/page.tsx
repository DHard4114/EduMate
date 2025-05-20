'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const materiGeometri = [
  {
    id: 1,
    title: "Pengertian Geometri",
    content: `Geometri adalah cabang matematika yang mempelajari bentuk, ukuran, dan sifat ruang serta hubungan antar titik, garis, bidang, dan bangun ruang.`
  },
  {
    id: 2,
    title: "Jenis-Jenis Bangun Datar",
    content: `Bangun datar adalah bentuk dua dimensi seperti segitiga, persegi, persegi panjang, lingkaran, dan jajargenjang. Masing-masing memiliki sifat dan rumus luas yang berbeda.`
  },
  {
    id: 3,
    title: "Bangun Ruang",
    content: `Bangun ruang adalah bentuk tiga dimensi seperti kubus, balok, prisma, tabung, kerucut, dan bola. Materi ini mencakup volume dan luas permukaan bangun ruang.`
  },
  {
    id: 4,
    title: "Teorema Pythagoras",
    content: `Teorema Pythagoras menyatakan bahwa dalam segitiga siku-siku, kuadrat sisi miring (hipotenusa) sama dengan jumlah kuadrat kedua sisi lainnya. Rumus: c² = a² + b².`
  }
];

const quizGeometri = [
  {
    id: 1,
    question: "Apa itu bangun datar?",
    options: [
      "Bentuk dua dimensi",
      "Bentuk tiga dimensi",
      "Sifat ruang",
      "Garis dan titik"
    ]
  },
  {
    id: 2,
    question: "Rumus luas persegi adalah?",
    options: ["s × s", "p × l", "½ × a × t", "π × r²"]
  },
  {
    id: 3,
    question: "Volume kubus dengan sisi 4 cm adalah?",
    options: ["64 cm³", "16 cm³", "8 cm³", "12 cm³"]
  },
  {
    id: 4,
    question: "Dalam teorema Pythagoras, jika a=3 dan b=4, maka c adalah?",
    options: ["5", "7", "6", "9"]
  }
];

export default function GeometriPage() {
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
          📐 Geometri Dasar 📐
        </motion.h1>

        <div className="space-y-8 mb-16">
          {materiGeometri.map(({ id, title, content }) => (
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
          Quiz Geometri
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto">
          {quizGeometri.map(({ id, question, options }) => (
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
