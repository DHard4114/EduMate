'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const dummyMateri = [
    {
        id: 1,
        title: "Pengertian Pembagian",
        content: `Pembagian adalah operasi matematika yang merupakan kebalikan dari perkalian, digunakan untuk membagi sebuah bilangan menjadi beberapa bagian yang sama. Contohnya, 12 ÷ 3 berarti membagi angka 12 menjadi 3 bagian yang sama, sehingga hasilnya adalah 4.`
    },
    {
        id: 2,
        title: "Jenis-Jenis Pembagian",
        content: `Pembagian dapat dilakukan pada bilangan bulat, pecahan, dan desimal. Pembagian juga memiliki konsep pembagian dengan sisa (modulus) dan pembagian pecahan. Dalam matematika lebih lanjut, pembagian dapat melibatkan bilangan kompleks dan matriks.`
    },
    {
        id: 3,
        title: "Peran Pembagian dalam Kehidupan Sehari-hari",
        content: `Pembagian sering digunakan saat membagi makanan, uang, atau barang ke dalam beberapa bagian yang sama besar. Memahami pembagian membantu dalam perencanaan, pengelolaan sumber daya, dan berbagai situasi di mana pembagian adil diperlukan.`
    },
    {
        id: 4,
        title: "Sejarah Singkat Pembagian",
        content: `Konsep pembagian sudah dikenal sejak zaman kuno, ditemukan dalam dokumen matematika Mesir dan Babilonia. Seiring perkembangan, pembagian menjadi bagian penting dalam matematika, khususnya dalam aljabar dan kalkulus.`
    }
];

const dummyQuiz = [
    {
        id: 1,
        question: "Hasil dari 20 ÷ 5 adalah?",
        options: ["4", "5", "6", "3"]
    },
    {
        id: 2,
        question: "Jika 15 ÷ 4, hasil bagi bulatnya adalah?",
        options: ["3", "4", "3.75", "4.25"]
    },
    {
        id: 3,
        question: "Pembagian berulang dari 18 sebanyak 3 kali sama dengan?",
        options: ["6", "9", "12", "3"]
    },
    {
        id: 4,
        question: "Pembagian adalah operasi kebalikan dari operasi?",
        options: ["Perkalian", "Penjumlahan", "Pengurangan", "Pangkat"]
    }
];

export default function PembagianPage() {
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
                    ➗ Pembagian ➗
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
