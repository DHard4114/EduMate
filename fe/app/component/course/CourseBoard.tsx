'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from '../auth-context';
import api from '@/app/lib/api';
import { Course, LevelProgress } from './types';
import CourseHeaderCard from './CourseHeaderCard';
import LessonNode from './LessonNode';

export default function CourseBoard() {
    const { user } = useAuth();
    const router = useRouter();
    const [level, setLevel] = useState<string | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [progress, setProgress] = useState<LevelProgress | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
;

    useEffect(() => {
        if (user?.level) {
            setLevel(user.level);
        }
    }, [user]);;

    useEffect(() => {
        const fetchData = async () => {
            if (!level || !user?.id) return;

            try {
                setLoading(true);
                setError(null);

                const [coursesResponse, progressResponse] = await Promise.all([
                    api.get(`/course/level/${level}`),
                    api.get(`/course/level/${level}/progress`, {
                        params: { userId: user.id }
                    })
                ]);

                if (coursesResponse.data.success) {
                    setCourses(coursesResponse.data.payload);
                }

                if (progressResponse?.data.success) {
                    setProgress(progressResponse.data.payload);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError('Failed to load courses');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [level, user?.id]);

    

    const lessonPositions = courses.map((_, index) => ({
        x: 50 + (index % 2 === 0 ? 1 : -1) * 30 * 0.7,
        y: index * 180 + 40
    }));

    const generatePathData = () => {
        if (lessonPositions.length === 0) return '';
        
        let pathData = `M${lessonPositions[0].x},${lessonPositions[0].y}`;
        for (let i = 1; i < lessonPositions.length; i++) {
            const prev = lessonPositions[i - 1];
            const curr = lessonPositions[i];
            pathData += ` C${prev.x + 15},${prev.y + (curr.y - prev.y) / 2} ${curr.x - 15},${prev.y + (curr.y - prev.y) / 2} ${curr.x},${curr.y}`;
        }
        return pathData;
    };

    const handleNodeClick = (courseId: string, isLocked: boolean) => {
    if (!isLocked) {
        router.push(`/content/course/materials?level=${level}&courseId=${courseId}`);
    }
};

    return (
        <div className="min-h-screen bg-white">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            <div className="sticky top-0 z-50 w-full px-4 pt-4 bg-white">
                <CourseHeaderCard level={level||'beginner'} progress={progress} />
                
                <div className="flex gap-4 justify-center mt-4 mb-6">
                    {["beginner", "intermediate", "advanced"].map((lvl) => (
                        <button
                            key={lvl}
                            onClick={() => setLevel(lvl)}
                            className={`
                                px-6 py-2 rounded-lg font-semibold transition-colors duration-200
                                ${level === lvl
                                    ? "bg-green text-white shadow-md"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                }
                            `}
                        >
                            {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green"></div>
                </div>
            ) : (
                <div className="relative py-10 px-4 flex justify-center"
                    style={{
                        height: `${courses.length * 180 + 200}px`,
                        width: "600px",
                        margin: "0 auto",
                    }}
                >
                    <svg
                        className="absolute top-20 left-0 w-full h-full"
                        viewBox={`0 0 100 ${courses.length * 180 + 100}`}
                        preserveAspectRatio="none"
                    >
                        <path
                            d={generatePathData()}
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                        />
                    </svg>

                    <div className="relative z-10 w-full h-full mt-32">
                        {courses.map((course, index) => {
                            const isLocked = index > 0 && !progress?.completed_course_ids?.includes(courses[index - 1].id);
                            
                            return (
                                <div
                                    key={course.id}
                                    className="absolute"
                                    style={{
                                        left: `${lessonPositions[index].x}%`,
                                        top: `${lessonPositions[index].y}px`,
                                        transform: "translate(-50%, -50%)",
                                    }}
                                >
                                    <LessonNode
                                        title={course.title}
                                        completed={progress?.completed_course_ids?.includes(course.id)}
                                        locked={isLocked}
                                        current={index === progress?.completed}
                                        onClick={() => handleNodeClick(course.id, isLocked)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}