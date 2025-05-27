'use client';

import api from '@/app/lib/api';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { CourseQuiz } from '@/app/component/course/types';
import { useAuth } from '@/app/component/auth-context';

export default function TestOutPage() {
    const [quizzes, setQuizzes] = useState<CourseQuiz[]>([]);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [submitting, setSubmitting] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');
    const level = searchParams.get('level');
    const { user } = useAuth();

    // Fetch quizzes for this course
    useEffect(() => {
        const fetchQuizzes = async () => {
            if (!courseId) return;
            
            try {
                setLoading(true);
                const response = await api.get(`/course/${courseId}/quizzes`);
                if (response.data.success) {
                    setQuizzes(response.data.payload);
                }
            } catch (error) {
                console.error('Failed to fetch quizzes:', error);
                toast.error('Failed to load quiz questions');
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, [courseId]);

    const handleAnswerChange = (quizId: string, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [quizId]: answer
        }));
    };

    const handleSubmit = async () => {
        if (!user || !courseId) {
            toast.error('Missing required information');
            return;
        }

        try {
            setSubmitting(true);

            // Submit each answer individually as per backend API
            for (const [quizId, selectedAnswer] of Object.entries(answers)) {
                await api.post('/course/quiz/answer', {
                    quiz_id: quizId,
                    selected_answer: selectedAnswer
                });
            }

            // Get updated score
            const scoreResponse = await api.get(`/course/${courseId}`);
            
            if (scoreResponse.data.success && scoreResponse.data.payload.score) {
                const finalScore = scoreResponse.data.payload.score.percentage;
                setScore(finalScore);
                setSubmitted(true);

                if (finalScore >= 70) {
                    // Update level progress
                    await api.get(`/course/level/${level}/progress`);
                    toast.success('Test completed successfully!');
                } else {
                    toast.error('You need 70% or higher to pass. Try again!');
                }
            }
        } catch (error) {
            console.error('Failed to submit answers:', error);
            toast.error('Failed to submit answers. Please try again.');
        } finally {
            setSubmitting(false);
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
                            onClick={() => router.push(`/content/course`)}
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
                                                onChange={() => handleAnswerChange(quiz.id, option)} // Changed from quiz to quiz.id
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
                                disabled={Object.keys(answers).length !== quizzes.length || submitting}
                                className={`
                                    px-8 py-3 rounded-full text-white font-semibold
                                    ${Object.keys(answers).length !== quizzes.length
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-[#5A6D51] hover:bg-[#C75F2A] transition-colors"
                                    }
                                `}
                            >
                                {submitting ? 'Submitting...' : 'Submit Answers'}
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}