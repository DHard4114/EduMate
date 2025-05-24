'use client';


import { FaBookOpen, FaStar } from "react-icons/fa";

interface LessonNodeProps {
    title: string;
    completed?: boolean;
    locked?: boolean;
    current?: boolean;
    onClick: () => void;
}

export default function LessonNode({
    title,
    completed,
    locked,
    current,
    onClick
}: LessonNodeProps) {
    
    const handleClick = () => {
        if (!locked) {
            onClick();
        }
    };

    return (
        <div 
            className={`
                relative flex flex-col items-center text-center w-24 
                ${!locked ? 'cursor-pointer hover:scale-105 transition-transform' : 'cursor-not-allowed opacity-50'}
            `}
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
                <FaBookOpen />
            </div>

            <p className="text-sm font-semibold mt-2">{title}</p>
        </div>
    );
}