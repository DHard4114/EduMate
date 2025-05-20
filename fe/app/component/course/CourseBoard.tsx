'use client';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { FaHome, FaCoffee, FaBookOpen, FaStar, FaCalculator, FaCube, FaPercent } from "react-icons/fa";
import CourseHeaderCard from "./CourseHeaderCard";

// --------------------- 1. DATA LEVEL DAN LESSON ---------------------
const courseData = {
    Beginner: [
        { title: "Angka", icon: <FaBookOpen />, current: true, lessonsCount: "2/2", path: "/beginner/angka" },
        { title: "Penjumlahan", icon: <FaCalculator />, lessonsCount: "0/2", path: "/beginner/penjumlahan" },
        { title: "Pengurangan", icon: <FaCalculator />, lessonsCount: "0/3", path: "/beginner/pengurangan" },
        { title: "Perkalian", icon: <FaBookOpen />, lessonsCount: "0/4", path: "/beginner/perkalian" },
        { title: "Pembagian", icon: <FaCoffee />, lessonsCount: "0/3", path: "/beginner/pembagian" },
        { title: "Test Out", icon: <FaStar />, lessonsCount: "0/2", path: "/beginner/test" },
        { title: "Review", icon: <FaHome />, lessonsCount: "0/1", path: "/beginner/review" },
    ],
    Intermediate: [
        { title: "Aljabar", icon: <FaCalculator />, current: true, lessonsCount: "1/2", path: "/intermediate/aljabar" },
        { title: "Pecahan", icon: <FaBookOpen />, lessonsCount: "0/2", path: "/intermediate/pecahan" },
        { title: "Geometri Dasar", icon: <FaCube />, lessonsCount: "0/3", path: "/intermediate/geometri" },
        { title: "Bangun Ruang", icon: <FaCube />, lessonsCount: "0/2", path: "/intermediate/ruang" },
        { title: "Sudut", icon: <FaBookOpen />, lessonsCount: "0/2", path: "/intermediate/sudut" },
        { title: "Skala", icon: <FaCoffee />, lessonsCount: "0/3", path: "/intermediate/skala" },
        { title: "Test Out", icon: <FaStar />, lessonsCount: "0/1", path: "/intermediate/test" },
    ],
    Advanced: [
        { title: "Bilangan Kompleks", icon: <FaCalculator />, current: true, lessonsCount: "0/2", path: "/advance/kompleks" },
        { title: "Desimal", icon: <FaBookOpen />, lessonsCount: "0/2", path: "/advance/desimal" },
        { title: "Persen", icon: <FaPercent />, lessonsCount: "0/2", path: "/advance/persen" },
        { title: "Volume", icon: <FaCube />, lessonsCount: "0/3", path: "/advance/volume" },
        { title: "Bangun Kompleks", icon: <FaCube />, lessonsCount: "0/2", path: "/advance/bangun" },
        { title: "Test Out", icon: <FaStar />, lessonsCount: "0/2", path: "/advance/test" },
        { title: "Review", icon: <FaHome />, lessonsCount: "0/1", path: "/advance/review" },
    ],
    };

    function LessonNode({ title, icon, completed, locked, current, lessonsCount, route }: any) {
    const router = useRouter();

    const handleClick = () => {
        if (!locked && route) {
        router.push(route);
        }
    };

    return (
        <div 
        className="relative flex flex-col items-center text-center w-24 cursor-pointer" 
        onClick={handleClick}
        >
        {current && (
            <div className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full p-1 text-xs shadow">
            <FaStar />
            </div>
        )}

        <div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-xl border-6
            ${completed ? "bg-green border-green-200" : current ? "bg-green border-basegreen" : "bg-gray-300 border-gray-200"}
            ${locked ? "opacity-90 grayscale" : ""}`}
        >
            {icon}
        </div>

        <p className="text-sm font-semibold mt-2">{title}</p>
        </div>
    );
    }

    // --------------------- 3. MAIN COMPONENT ---------------------
    export default function LearningPath() {
    const [level, setLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");

    const rawLessons = courseData[level];

    const lessons = rawLessons.map((lesson, idx) => {
        const [done, total] = lesson.lessonsCount.split('/').map(Number);
        const completed = done >= total;
        const prev = rawLessons[idx - 1];
        const isFirst = idx === 0;

        const unlocked = isFirst || (prev && prev.lessonsCount.split('/')[0] === prev.lessonsCount.split('/')[1]);
        const locked = !unlocked && !lesson.current;

        return { ...lesson, completed, locked, route: lesson.path };
    });

    const pathDirection = "right";
    const pathBias = 0.7;

    const lessonPositions = lessons.map((_, index) => {
        const y = index * 180 + 40;
        const baseX = 50;
        const offset = (index % 2 === 0 ? 1 : -1) * 30 * (pathDirection === "right" ? 1 : -1);
        const x = baseX + (pathBias * offset);
        return { x, y };
    });

    const generatePathData = () => {
        let pathData = `M${lessonPositions[0].x},${lessonPositions[0].y}`;
        for (let i = 1; i < lessonPositions.length; i++) {
        const prev = lessonPositions[i - 1];
        const curr = lessonPositions[i];
        const controlX1 = prev.x + (pathDirection === "right" ? 15 : -15);
        const controlY1 = prev.y + (curr.y - prev.y) / 2;
        const controlX2 = curr.x + (pathDirection === "right" ? -15 : 15);
        const controlY2 = prev.y + (curr.y - prev.y) / 2;
        pathData += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${curr.x},${curr.y}`;
        }
        return pathData;
    };

    return (
        <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-50 w-full px-4 pt-4 bg-white">
            <CourseHeaderCard />
            {/* Tombol Level */}
            <div className="flex gap-4 justify-center mt-4">
            {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                <button
                key={lvl}
                onClick={() => setLevel(lvl as any)}
                className={`px-4 py-2 rounded font-semibold border 
                ${level === lvl ? "bg-green text-white" : "bg-gray-100 text-gray-800"}`}
                >
                {lvl}
                </button>
            ))}
            </div>
        </div>

        {/* Konten Path */}
        <div
            className="relative py-10 px-4 flex justify-center"
            style={{
            height: `${lessons.length * 180 + 200}px`,
            width: "600px",
            margin: "0 auto",
            }}
        >
            {/* SVG Path */}
            <svg
            className="absolute top-20 left-0 w-full h-full"
            viewBox={`0 0 100 ${lessons.length * 180 + 100}`}
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

            {/* Lesson Nodes */}
            <div className="relative z-10 w-full h-full mt-32">
            {lessons.map((lesson, index) => (
                <div
                key={index}
                className="absolute"
                style={{
                    left: `${lessonPositions[index].x}%`,
                    top: `${lessonPositions[index].y}px`,
                    transform: "translate(-50%, -50%)",
                }}
                >
                <LessonNode {...lesson} />
                </div>
            ))}
            </div>
        </div>
        </div>
    );
}
