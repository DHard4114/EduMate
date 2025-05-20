'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const dummyMateri = [
    {
        id: 1,
        title: "Pengertian Pengurangan",
        content: `Pengurangan adalah operasi matematika yang digunakan untuk mengurangi satu bilangan dengan bilangan lainnya. Operasi ini menunjukkan selisih antara dua angka, yang berarti mengurangi nilai suatu angka dengan nilai angka lainnya. Pengurangan merupakan operasi kebalikan dari penjumlahan dan sering digunakan dalam kehidupan sehari-hari untuk menghitung sisa atau perbedaan.`
    },
    {
        id: 2,
        title: "Jenis-Jenis Pengurangan",
        content: `Pengurangan dapat dilakukan pada berbagai jenis bilangan seperti bilangan bulat, pecahan, dan desimal. Dalam pengurangan bilangan bulat, kita bisa mengurangi angka positif dan negatif dengan aturan khusus. Pengurangan pecahan melibatkan pengurangan pembilang setelah menyamakan penyebutnya. Pada pengurangan desimal, kita mengurangkan angka setelah tanda desimal secara berurutan.`
    },
    {
        id: 3,
        title: "Peran Pengurangan dalam Kehidupan Sehari-hari",
        content: `Pengurangan sering digunakan dalam berbagai aktivitas sehari-hari seperti menghitung sisa uang setelah membeli barang, menghitung jarak yang tersisa saat perjalanan, serta dalam berbagai perhitungan ilmiah dan teknis. Memahami pengurangan penting agar kita bisa membuat keputusan yang tepat dalam pengelolaan sumber daya dan waktu.`
    },
    {
        id: 4,
        title: "Sejarah Singkat Pengurangan",
        content: `Sejarah pengurangan sudah ada sejak zaman kuno, saat manusia pertama kali mulai mencatat dan mengelola barang dagangan. Sistem pengurangan berkembang seiring dengan berkembangnya sistem bilangan dan matematika. Pengurangan modern mengikuti aturan dan notasi yang telah distandarisasi sejak abad pertengahan.`
    }
];

const dummyQuiz = [
    {
        id: 1,
        question: "Hasil dari 10 - 4 adalah?",
        options: ["6", "5", "7", "8"]
    },
    {
        id: 2,
        question: "Bilangan berapakah yang jika dikurangi 3 hasilnya 2?",
        options: ["5", "6", "4", "7"]
    },
    {
        id: 3,
        question: "Pengurangan 15 - 0 sama dengan?",
        options: ["15", "0", "1", "10"]
    },
    {
        id: 4,
        question: "Apa operasi kebalikan dari pengurangan?",
        options: ["Penjumlahan", "Perkalian", "Pembagian", "Eksponen"]
    }
];

export default function PenguranganPage() {
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
        <main className="min-h-screen bg-gradient-to-br from-[#FDEBD0] via-[#FAD7A0] to-[#F5CBA7] px-6 py-20 text-[#87431D] relative">
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pw-maze-white.png')] opacity-10 pointer-events-none z-0"
            />
            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-5xl font-extrabold text-center mb-10 tracking-tight"
                    style={{
                        background: 'linear-gradient(90deg, #87431D, #D35400)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    ✨ Pengurangan ✨
                </motion.h1>

                <div className="mb-16 space-y-8">
                    {dummyMateri.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 * item.id }}
                            className="bg-white rounded-2xl shadow-lg p-8 border-l-8 border-[#87431D]"
                        >
                            <h2 className="text-2xl font-bold text-[#87431D] mb-3">{item.title}</h2>
                            <p className="text-[#87431D]/90 leading-relaxed">{item.content}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-5xl font-bold mb-8 text-center text-[#87431D]"
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
                            <h3 className="text-lg font-semibold mb-4 text-[#87431D]">
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
                                            className="accent-[#87431D] w-5 h-5"
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
                            className="mt-6 bg-[#87431D] hover:bg-[#5b2c0c] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
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
