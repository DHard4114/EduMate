'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/app/lib/api';
import { CourseQuiz } from '@/app/component/course/types';

export default function TestOutPage() {
    const [quizzes, setQuizzes] = useState<CourseQuiz[]>([]);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');
    const level = searchParams.get('level');

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/course/${courseId}/quizzes`);
                if (response.data.success) {
                    setQuizzes(response.data.payload);
                }
            } catch (error) {
                console.error('Failed to fetch quizzes:', error);
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchQuizzes();
        }
    }, [courseId]);

    const handleAnswerChange = (quizId: number, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [quizId]: answer
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await api.post(`/course/${courseId}/quiz-answers`, {
                answers: Object.entries(answers).map(([quizId, answer]) => ({
                    quiz_id: quizId,
                    selected_answer: answer
                }))
            });

            if (response.data.success) {
                setScore(response.data.payload.score);
                setSubmitted(true);
            }
        } catch (error) {
            console.error('Failed to submit answers:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFE0C8] px-6 py-20">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl font-bold text-[#5A6D51]">Course Test</h1>
                    <p className="text-[#C75F2A] mt-2">Complete the test to progress</p>
                </motion.div>

                {submitted && score !== null ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-bold mb-4">
                            Your Score: {score}%
                        </h2>
                        <button
                            onClick={() => router.push(`/course/${level}`)}
                            className="bg-[#5A6D51] text-white px-8 py-3 rounded-full hover:bg-[#C75F2A] transition-colors"
                        >
                            Return to Course
                        </button>
                    </motion.div>
                ) : (
                    <div className="space-y-8">
                        {quizzes.map((quiz, index) => (
                            <motion.div
                                key={quiz.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-lg p-6"
                            >
                                <h3 className="text-xl font-semibold text-[#5A6D51] mb-4">
                                    {index + 1}. {quiz.question}
                                </h3>
                                <div className="space-y-3">
                                    {quiz.options.map((option, optIndex) => (
                                        <label
                                            key={optIndex}
                                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                name={`quiz-${quiz.id}`}
                                                value={option}
                                                checked={answers[quiz.id] === option}
                                                onChange={() => handleAnswerChange(quiz.id, option)}
                                                className="form-radio text-[#5A6D51]"
                                            />
                                            <span className="text-gray-700">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-12 flex justify-center"
                        >
                            <button
                                onClick={handleSubmit}
                                disabled={Object.keys(answers).length !== quizzes.length}
                                className={`
                                    px-8 py-3 rounded-full text-white font-semibold
                                    ${Object.keys(answers).length !== quizzes.length
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-[#5A6D51] hover:bg-[#C75F2A] transition-colors"
                                    }
                                `}
                            >
                                Submit Answers
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}