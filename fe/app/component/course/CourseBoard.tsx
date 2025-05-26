'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from '../auth-context';
import api from '@/app/lib/api';
import { Course, LevelProgress, CourseMaterial } from './types';
import CourseHeaderCard from './CourseHeaderCard';
import LessonNode from './LessonNode';
import LessonHeaderCard from "./LessonHeader";
import TestOutCard from "./TestNode";

export default function CourseBoard() {
    const { user } = useAuth();
    const router = useRouter();
    const [level, setLevel] = useState<string | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [materials, setMaterials] = useState<Record<string, CourseMaterial[]>>({});
    const [progress, setProgress] = useState<LevelProgress | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user?.level) {
            setLevel(user.level);
        }
    }, [user]);

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
                    const coursesData = coursesResponse.data.payload;
                    setCourses(coursesData);

                    const materialsData: Record<string, CourseMaterial[]> = {};
                    for (const course of coursesData) {
                        try {
                            const materialsResponse = await api.get(`/course/${course.id}`);
                            if (materialsResponse.data.success) {
                                materialsData[course.id] = materialsResponse.data.payload.materials;
                            }
                        } catch (err) {
                            console.error(`Error fetching materials for course ${course.id}:`, err);
                            materialsData[course.id] = [];
                        }
                    }
                    setMaterials(materialsData);
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

    const handleNodeClick = (courseId: string, materialId: string, isLocked: boolean) => {
        if (!isLocked) {
            router.push(`/content/course/materials?level=${level}&courseId=${courseId}&materialId=${materialId}`);
        }
    };

    const getNodePositions = () => {
        const positions: {x: number, y: number, courseId: string, isCourseHeader?: boolean}[] = [];
        let yPosition = 100;
        const xPosition = 50;
        
        courses.forEach((course) => {
            // Add course header position
            positions.push({
                x: xPosition,
                y: yPosition,
                courseId: course.id,
                isCourseHeader: true
            });
            yPosition += 80; // Spacing after course header
            
            const courseMaterials = materials[course.id] || [];
            
            courseMaterials.forEach((material) => {
                positions.push({
                    x: xPosition,
                    y: yPosition,
                    courseId: course.id
                });
                yPosition += 100; // Spacing between lessons
            });
            
            yPosition += 40; // Extra spacing after each course
        });
        
        return positions;
    };

    const nodePositions = getNodePositions();


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
                <div className="relative py-10 px-4">

                    <div className="relative z-10 max-w-2xl mx-auto">
                        {courses.map((course) => {
                            const courseMaterials = materials[course.id] || [];
                            const isLocked = courses.indexOf(course) > 0 && 
                                        !progress?.completed_course_ids?.includes(courses[courses.indexOf(course) - 1].id);
                            
                            return (
                                <div key={course.id} className="mb-12">
                                    {/* Course Header */}
                                    <div className="flex justify-center mb-4">
                                        <LessonHeaderCard course={course.title} description={course.description} />
                                    </div>
                                    
                                    <div className="flex flex-col items-center">
                                        {courseMaterials.length > 0 ? (
                                            courseMaterials.map((material, materialIndex) => {
                                                const isCurrent = courses.indexOf(course) === progress?.completed && 
                                                            materialIndex === 0;
                                                return (
                                                    <div key={material.id} className="mb-8">
                                                        <LessonNode
                                                            title={material.title}
                                                            completed={progress?.completed_material_ids?.includes(material.id)}
                                                            locked={isLocked}
                                                            current={isCurrent}
                                                            onClick={() => handleNodeClick(course.id, material.id, isLocked)}
                                                        />
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="text-gray-500 italic mb-8">No materials available</div>
                                        )}
                                    </div>
                                    <div className="flex justify-center mb-4">
                                        <TestOutCard />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}