'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const materiBangunKompleks = [
  {
    id: 1,
    title: "Apa Itu Bangun Kompleks?",
    content: `Bangun kompleks adalah bentuk yang terbentuk dari gabungan dua atau lebih bangun datar atau bangun ruang sederhana, seperti persegi, segitiga, lingkaran, kubus, atau balok.`
  },
  {
    id: 2,
    title: "Contoh Bangun Datar Kompleks",
    content: `Contoh: Gabungan persegi panjang dan setengah lingkaran dapat ditemukan pada desain pintu atau jendela berbentuk melengkung. Untuk menghitung luasnya, hitung masing-masing bagian lalu jumlahkan.`
  },
  {
    id: 3,
    title: "Contoh Bangun Ruang Kompleks",
    content: `Contoh: Gabungan balok dan setengah bola, seperti tangki air. Volume dihitung dengan menjumlahkan volume tiap bagian: balok dan setengah bola.`
  },
  {
    id: 4,
    title: "Langkah Menyelesaikan Soal Bangun Kompleks",
    content: `1. Pisahkan bangun menjadi bentuk sederhana.
2. Hitung luas atau volume tiap bagian.
3. Jumlahkan semua bagian.
4. Perhatikan satuan dan bagian yang dipotong atau ditambahkan.`
  }
];

const quizBangunKompleks = [
  {
    id: 1,
    question: "Bangun yang terdiri dari persegi panjang dan setengah lingkaran disebut ...",
    options: [
      "Bangun ruang",
      "Bangun datar kompleks",
      "Lingkaran penuh",
      "Segitiga sama sisi"
    ]
  },
  {
    id: 2,
    question: "Jika sebuah bangun terdiri dari balok dan setengah bola, maka volumenya adalah ...",
    options: [
      "Volume balok saja",
      "Volume setengah bola saja",
      "Volume balok + volume setengah bola",
      "Tidak bisa dihitung"
    ]
  },
  {
    id: 3,
    question: "Langkah pertama menghitung luas bangun kompleks adalah ...",
    options: [
      "Langsung hitung semua bagian",
      "Pisahkan bangun menjadi bentuk sederhana",
      "Mengabaikan bagian kecil",
      "Mencari keliling dulu"
    ]
  },
  {
    id: 4,
    question: "Satuan volume yang tepat untuk bangun ruang adalah ...",
    options: [
      "cm",
      "cm²",
      "cm³",
      "cm⁴"
    ]
  }
];

export default function BangunKompleksPage() {
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
    <main className="min-h-screen bg-[#f4f8f7] px-6 py-20 text-[#2a5941] relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-12 text-center tracking-wide"
          style={{
            background: 'linear-gradient(90deg, #2a5941, #6cbf76)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          🧩 Bangun Kompleks 🧩
        </motion.h1>

        <div className="space-y-8 mb-16">
          {materiBangunKompleks.map(({ id, title, content }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: id * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-[#2a5941]"
            >
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#2a5941' }}>
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
          style={{ color: '#2a5941' }}
        >
          Quiz
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto">
          {quizBangunKompleks.map(({ id, question, options }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: id * 0.1 }}
              className="bg-[#e8f3ec] p-6 rounded-xl shadow-md border border-[#2a5941]"
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#2a5941' }}>
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
                      className="accent-[#2a5941] w-5 h-5"
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
              className="mt-6 bg-[#2a5941] hover:bg-[#1e3f2d] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              Kirim Jawaban
            </button>
          </div>

          {submitted && (
            <p className="text-[#2a5941] font-semibold text-center mt-6 animate-pulse">
              ✅ Jawaban berhasil dikirim!
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
