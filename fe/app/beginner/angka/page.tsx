'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const dummyMateri = [
    {
    id: 1,
    title: "Pengertian Angka",
    content: `Angka adalah simbol atau lambang yang digunakan untuk mewakili nilai atau jumlah dalam sistem bilangan. Angka memungkinkan kita untuk menghitung, mengukur, dan menyatakan kuantitas secara tepat. Dalam kehidupan sehari-hari, angka berperan penting dalam berbagai bidang seperti matematika, ekonomi, dan teknologi. Angka dapat berupa bilangan bulat maupun bilangan pecahan. Angka digunakan dalam berbagai sistem bilangan seperti desimal, biner, dan heksadesimal. Selain itu, angka juga digunakan sebagai simbol dalam pengkodean informasi, misalnya nomor telepon dan kode pos. Memahami angka adalah dasar yang sangat penting untuk belajar matematika dan ilmu pengetahuan secara luas.`
    },
    {
    id: 2,
    title: "Jenis-Jenis Angka",
    content: `Angka dibagi menjadi beberapa jenis berdasarkan sifat dan penggunaannya. Jenis-jenis angka yang umum dikenal meliputi angka asli atau natural numbers yang merupakan angka positif mulai dari 1, 2, 3, dan seterusnya, serta angka bulat atau integer yang mencakup angka asli, nol, dan angka negatif seperti -3 hingga 3. Selain itu, ada angka pecahan yang terdiri dari pembilang dan penyebut, misalnya ½ atau 0.75, dan angka desimal yang ditulis dengan tanda koma atau titik desimal seperti 3.14 atau 0.5. Setiap jenis angka tersebut memiliki fungsi dan kegunaan berbeda dalam berbagai situasi matematika dan kehidupan sehari-hari.`

    },
    {
    id: 3,
    title: "Peran Angka dalam Kehidupan Sehari-hari",
    content: `Angka tidak hanya ditemukan dalam buku matematika, tetapi juga sangat dekat dengan kehidupan sehari-hari kita. Angka digunakan dalam berbagai aspek penting seperti pengukuran waktu yang meliputi jam, menit, dan detik, penghitungan uang serta transaksi ekonomi, teknologi terutama dalam pengkodean data komputer dengan angka biner, serta dalam dunia pendidikan untuk mengukur nilai dan skor. Pemahaman yang baik tentang angka membantu kita dalam mengambil keputusan yang tepat dan efisien di berbagai bidang kehidupan.`
    },
    {
    id: 4,
    title: "Sejarah Singkat Angka",
    content: `Angka sudah dikenal sejak ribuan tahun yang lalu, yang berawal dari kebutuhan manusia untuk menghitung dan mencatat perdagangan serta persediaan barang. Sistem angka yang paling umum digunakan saat ini adalah sistem desimal yang berasal dari peradaban India dan kemudian disebarkan ke seluruh dunia oleh bangsa Arab. Selain itu, sistem angka Romawi merupakan salah satu sistem angka kuno yang masih dikenal walaupun jarang digunakan dalam perhitungan modern. Penemuan angka nol sangat revolusioner karena memungkinkan pengembangan sistem bilangan yang lebih kompleks. Dengan memahami sejarah angka, kita dapat lebih menghargai perkembangan ilmu pengetahuan dan teknologi.`
    }
];
    const dummyQuiz = [
    {
        id: 1,
        question: "Apa itu angka genap?",
        options: ["Bilangan yang habis dibagi 2", "Bilangan negatif", "Bilangan prima", "Bilangan pecahan"]
    },
    {
        id: 2,
        question: "Manakah dari berikut ini yang merupakan bilangan ganjil?",
        options: ["4", "6", "8", "7"]
    },
    {
        id: 3,
        question: "Bilangan 0 termasuk dalam kategori?",
        options: ["Negatif", "Genap", "Ganjil", "Pecahan"]
    },
    {
        id: 4,
        question: "Hasil dari 5 + 7 adalah?",
        options: ["12", "11", "10", "13"]
    }
    ];

    export default function AngkaPage() {
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
        setTimeout(() => router.push('/content/course'), 2000); // ⏩ Redirect after 2s
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#E6F0D4] via-[#D6E3C9] to-[#C2D1B0] px-6 py-20 text-[#5A6D51] relative">
        {/* Background Pattern */}
        <div
            aria-hidden="true"
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-10 pointer-events-none z-0"
        />

        <div className="relative z-10 max-w-4xl mx-auto">
            {/* Title */}
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
            ✨ Angka ✨
            </motion.h1>

            {/* Materi Section */}
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

            {/* Quiz Section */}
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
