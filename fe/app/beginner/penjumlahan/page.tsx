'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const dummyMateri = [
  {
    id: 1,
    title: "Pengertian Penjumlahan",
    content: `Penjumlahan adalah operasi matematika dasar yang menggabungkan dua angka atau lebih untuk mendapatkan jumlah total. Penjumlahan merupakan salah satu operasi aritmatika yang paling sederhana dan digunakan dalam berbagai situasi sehari-hari, mulai dari menghitung jumlah barang hingga penjumlahan angka dalam kalkulasi kompleks.`
  },
  {
    id: 2,
    title: "Sifat-Sifat Penjumlahan",
    content: `Penjumlahan memiliki beberapa sifat penting, antara lain sifat komutatif yang menyatakan bahwa urutan angka yang dijumlahkan tidak mempengaruhi hasil, sifat asosiatif yang berarti pengelompokan angka dalam penjumlahan tidak mempengaruhi hasil, serta adanya elemen identitas yaitu angka nol yang tidak mengubah nilai saat dijumlahkan.`
  },
  {
    id: 3,
    title: "Contoh Penggunaan Penjumlahan",
    content: `Penjumlahan digunakan dalam berbagai aspek kehidupan seperti menghitung total harga belanjaan, menjumlahkan nilai dalam laporan keuangan, serta dalam bidang teknik dan ilmu komputer untuk operasi dasar pada data numerik. Pemahaman penjumlahan sangat penting untuk membangun konsep matematika yang lebih kompleks.`
  },
  {
    id: 4,
    title: "Sejarah Penjumlahan",
    content: `Konsep penjumlahan sudah dikenal sejak zaman kuno sebagai bagian dari sistem bilangan dan aritmatika yang digunakan oleh berbagai peradaban. Pengembangan metode penjumlahan modern berkembang bersamaan dengan sistem angka yang lebih kompleks, memungkinkan perhitungan yang lebih efisien dan akurat dalam matematika dan ilmu pengetahuan.`
  }
];

const dummyQuiz = [
  {
    id: 1,
    question: "Apa hasil dari 7 + 5?",
    options: ["12", "11", "13", "14"]
  },
  {
    id: 2,
    question: "Sifat komutatif dalam penjumlahan berarti?",
    options: [
      "Urutan angka tidak mempengaruhi hasil",
      "Hasil selalu nol",
      "Hanya berlaku untuk angka positif",
      "Hasil berubah jika angka ditukar"
    ]
  },
  {
    id: 3,
    question: "Elemen identitas pada penjumlahan adalah?",
    options: ["0", "1", "-1", "10"]
  },
  {
    id: 4,
    question: "Penjumlahan digunakan untuk?",
    options: [
      "Menggabungkan angka untuk mendapatkan jumlah total",
      "Mengalikan angka",
      "Mengurangi angka",
      "Membagi angka"
    ]
  }
];

export default function PenjumlahanPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Jawaban:", answers);
    setTimeout(() => router.push('/content/course'), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#E6F0D4] via-[#D6E3C9] to-[#C2D1B0] px-6 py-20 text-[#5A6D51] relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-10 pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-center mb-10 tracking-tight"
          style={{
            background: 'linear-gradient(90deg, #C75F2A, #E67E22)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ✨ Penjumlahan ✨
        </motion.h1>

        <div className="mb-16 space-y-8">
          {dummyMateri.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 * item.id }}
              className="bg-white rounded-2xl shadow-lg p-8 border-l-8 border-[#C75F2A]"
            >
              <h2 className="text-2xl font-bold text-[#C75F2A] mb-3">{item.title}</h2>
              <p className="text-[#5A6D51]/90 leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-8 text-center text-[#C75F2A]"
        >
          Quiz
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          {dummyQuiz.map((q) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * q.id }}
              className="bg-[#fff7f0] p-6 rounded-2xl shadow-md border border-orange-200"
            >
              <h3 className="text-lg font-semibold mb-4 text-[#C75F2A]">
                {q.id}. {q.question}
              </h3>
              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-200 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`quiz-${q.id}`}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleChange(q.id, opt)}
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
              className="mt-6 bg-[#C75F2A] hover:bg-[#a64a1d] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              Kirim Jawaban
            </button>
          </div>

          {submitted && (
            <p className="text-green-600 text-center font-semibold mt-6 animate-bounce">
              ✅ Jawaban berhasil dikirim! Mengarahkan ke halaman materi...
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
