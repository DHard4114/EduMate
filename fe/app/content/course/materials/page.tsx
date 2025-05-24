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
    
    // Get parameters from URL query string
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
                        materials: sortedMaterials
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
            // First mark the course as complete
            await api.post(`/course/quiz/answer`, {
                userId: user.id,
                courseId: courseId,
                level: level
            });

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
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-red-600">Course not found</p>
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
        <div className="min-h-screen bg-[#FFE0C8] px-6 py-20">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <button
                        onClick={() => router.back()}
                        className="text-[#5A6D51] hover:text-[#C75F2A] transition-colors mb-4"
                    >
                        ← Kembali
                    </button>
                    <h1 className="text-4xl font-bold text-[#5A6D51] text-center mb-2">
                        {course.title}
                    </h1>
                    <p className="text-[#C75F2A] text-center mb-12">
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
                            className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#D6E3C9]"
                        >
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <span className="bg-[#5A6D51] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                        {index + 1}
                                    </span>
                                    <h2 className="text-2xl font-semibold text-[#5A6D51]">
                                        {material.title}
                                    </h2>
                                </div>
                                <div className="prose prose-lg max-w-none">
                                    {material.type === 'text' ? (
                                        <p className="text-gray-600 whitespace-pre-wrap">
                                            {material.content}
                                        </p>
                                    ) : (
                                        <div className="aspect-w-16 aspect-h-9">
                                            <iframe
                                                src={material.content}
                                                className="w-full h-full rounded-lg"
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
                    className="mt-12 flex justify-center"
                >
                    <button
                        onClick={handleComplete}
                        disabled={completed}
                        className={`
                            px-8 py-3 rounded-full text-white font-semibold
                            ${completed
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#5A6D51] hover:bg-[#C75F2A] transition-colors"
                            }
                        `}
                    >
                        {completed ? "Completed" : "Mark as Complete & Take Test"}
                    </button>
                </motion.div>
            </div>
        </div>
    );
}