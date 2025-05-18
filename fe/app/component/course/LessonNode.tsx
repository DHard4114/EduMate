import { FC } from "react";

type LessonNodeProps = {
    title: string;
    icon: React.ReactNode;
    completed?: boolean;
    locked?: boolean;
    current?: boolean;
    lessonsCount: string;
};

export const LessonNode: FC<LessonNodeProps> = ({
    title,
    icon,
    completed,
    locked,
    current,
    lessonsCount,
    }) => {
    return (
        <div className="flex flex-col items-center text-center relative">
        <div
            className={
            `"w-16 h-16 rounded-full flex items-center justify-center text-white text-lg shadow-lg",
            completed ? "bg-green" : current ? "bg-green" : "bg-gray-300"`
            }
        >
            {icon}
        </div>
        <p className="text-sm font-semibold mt-2">{title}</p>
        <p className="text-xs text-gray-500">{lessonsCount}</p>
        </div>
    );
};