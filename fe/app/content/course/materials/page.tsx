'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/app/lib/api';
import { Course } from '@/app/component/course/types';
import { useAuth } from '@/app/component/auth-context';

export default function CourseMaterialsPage() {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(false);
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const level = searchParams.get('level');
    const courseId = searchParams.get('courseId');

    useEffect(() => {
        const fetchCourse = async () => {
            if (!courseId) return;

            try {
                setLoading(true);
                const response = await api.get(`/course/${courseId}`);

                if (response.data.success) {
                    const sortedMaterials = [...response.data.payload.materials].sort(
                        (a, b) => a.order_number - b.order_number
                    );
                    setCourse({
                        ...response.data.payload,
                        materials: sortedMaterials,
                    });
                }
            } catch (error) {
                console.error('Failed to fetch course:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    const handleComplete = async () => {
        if (!courseId || !level || !user) return;

        try {
            setCompleted(true);
            router.push(`/content/course/materials/testout?level=${level}&courseId=${courseId}`);
        } catch (error) {
            console.error('Failed to mark course as complete:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#FFE0C8]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5A6D51]"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-[#FFE0C8] flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <p className="text-red-600 font-medium">Course not found</p>
                    <button
                        onClick={() => router.back()}
                        className="mt-4 text-[#5A6D51] hover:text-[#C75F2A] transition-colors"
                    >
                        ← Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FFE0C8] via-[#FFF3E5] to-[#D6E3C9] px-6 py-20 relative overflow-hidden">
            {/* Optional background pattern */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-5 pointer-events-none"
            />

            <div className="relative max-w-5xl mx-auto z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <button
                        onClick={() => router.back()}
                        className="text-[#5A6D51] hover:text-[#C75F2A] transition-colors mb-6 text-lg"
                    >
                        ← Kembali
                    </button>
                    <h1 className="text-5xl sm:text-6xl font-extrabold text-[#5A6D51] text-center leading-tight tracking-wide drop-shadow-md">
                        {course.title}
                    </h1>
                    <p className="text-[#C75F2A] text-center mt-4 text-lg sm:text-xl max-w-3xl mx-auto">
                        {course.description}
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {course.materials.map((material, index) => (
                        <motion.div
                            key={material.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#D6E3C9] hover:shadow-xl transition-shadow"
                        >
                            <div className="p-6 sm:p-8">
                                <div className="flex items-center mb-4">
                                    <span className="bg-[#5A6D51] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4">
                                        {index + 1}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-semibold text-[#5A6D51]">
                                        {material.title}
                                    </h2>
                                </div>
                                <div className="prose prose-lg max-w-none">
                                    {material.type === 'text' ? (
                                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                            {material.content}
                                        </p>
                                    ) : (
                                        <div className="aspect-w-16 aspect-h-9">
                                            <iframe
                                                src={material.content}
                                                className="w-full h-full rounded-lg border border-[#C75F2A]/30"
                                                allowFullScreen
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-16 flex justify-center"
                >
                    <button
                        onClick={handleComplete}
                        disabled={completed}
                        className={`px-8 py-3 rounded-full text-white text-lg font-semibold shadow-md transition-all ${
                            completed
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#5A6D51] hover:bg-[#C75F2A]"
                        }`}
                    >
                        {completed ? "Completed" : "Mark as Complete & Take Test"}
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
