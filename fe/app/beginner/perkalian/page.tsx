'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const dummyMateri = [
    {
        id: 1,
        title: "Pengertian Perkalian",
        content: `Perkalian adalah operasi matematika yang digunakan untuk menghitung hasil kali dua bilangan atau lebih. Perkalian merupakan penjumlahan berulang dari sebuah bilangan. Contohnya, 4 x 3 berarti menambahkan angka 4 sebanyak 3 kali (4 + 4 + 4). Perkalian memiliki sifat-sifat khusus seperti komutatif dan distributif yang penting dalam berbagai cabang matematika.`
    },
    {
        id: 2,
        title: "Jenis-Jenis Perkalian",
        content: `Perkalian dapat dilakukan pada bilangan bulat, pecahan, desimal, serta matriks. Pada bilangan bulat dan pecahan, perkalian mengikuti aturan dasar, sedangkan pada matriks, perkalian mengikuti aturan khusus yang melibatkan baris dan kolom. Perkalian juga sering digunakan dalam konsep eksponen dan aljabar.`
    },
    {
        id: 3,
        title: "Peran Perkalian dalam Kehidupan Sehari-hari",
        content: `Perkalian digunakan dalam berbagai aktivitas seperti menghitung total harga barang saat membeli dalam jumlah banyak, menghitung luas dan volume, serta dalam ilmu pengetahuan dan teknologi. Memahami perkalian membantu kita melakukan perhitungan yang cepat dan tepat.`
    },
    {
        id: 4,
        title: "Sejarah Singkat Perkalian",
        content: `Perkalian sudah dikenal sejak zaman Mesopotamia dan Mesir kuno yang menggunakan tabel perkalian untuk membantu perhitungan. Seiring perkembangan matematika, konsep perkalian menjadi lebih formal dan diperluas hingga ke aljabar dan kalkulus.`
    }
];

const dummyQuiz = [
    {
        id: 1,
        question: "Hasil dari 6 x 7 adalah?",
        options: ["42", "36", "48", "40"]
    },
    {
        id: 2,
        question: "Apa hasil dari 0 x 5?",
        options: ["0", "5", "1", "Tidak terdefinisi"]
    },
    {
        id: 3,
        question: "Perkalian berulang dari 3 sebanyak 4 kali sama dengan?",
        options: ["12", "7", "9", "15"]
    },
    {
        id: 4,
        question: "Sifat perkalian yang menyatakan a x b = b x a disebut?",
        options: ["Komutatif", "Asosiatif", "Distributif", "Identitas"]
    }
];

export default function PerkalianPage() {
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
        setTimeout(() => router.push('/content/course'), 2000); // Redirect after 2s
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#D0F0FD] via-[#A0D7F9] to-[#A7C8F5] px-6 py-20 text-[#1B4965] relative">
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10 pointer-events-none z-0"
            />
            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-5xl font-extrabold text-center mb-10 tracking-tight"
                    style={{
                        background: 'linear-gradient(90deg, #1B4965, #0D3B66)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    ✨ Perkalian ✨
                </motion.h1>

                <div className="mb-16 space-y-8">
                    {dummyMateri.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 * item.id }}
                            className="bg-white rounded-2xl shadow-lg p-8 border-l-8 border-[#1B4965]"
                        >
                            <h2 className="text-2xl font-bold text-[#1B4965] mb-3">{item.title}</h2>
                            <p className="text-[#1B4965]/90 leading-relaxed">{item.content}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-5xl font-bold mb-8 text-center text-[#1B4965]"
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
                            className="bg-[#e0f0ff] p-6 rounded-2xl shadow-md border border-blue-300"
                        >
                            <h3 className="text-lg font-semibold mb-4 text-[#1B4965]">
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
                                            className="accent-[#1B4965] w-5 h-5"
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
                            className="mt-6 bg-[#1B4965] hover:bg-[#0a2440] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
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
