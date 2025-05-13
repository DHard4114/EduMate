import { FaHome, FaCoffee, FaBookOpen, FaStar, FaLock } from "react-icons/fa";

const lessons = [
    { title: "Angka", icon: <FaBookOpen />, current: true, lessonsCount: "0/2" },
    { title: "Penjumlahan", icon: <FaBookOpen />, locked: true, lessonsCount: "0/2" },
    { title: "Pengurangan", icon: <FaHome />, locked: true, lessonsCount: "0/3" },
    { title: "Test Out", icon: <FaCoffee />, locked: true, lessonsCount: "0/2" },
    { title: "Perkalian", icon: <FaBookOpen />, locked: true, lessonsCount: "0/4" },
    { title: "Pembagian ", icon: <FaCoffee />, locked: true, lessonsCount: "0/3" },
];

function LessonNode({ title, icon, completed, locked, current, lessonsCount }: any) {
    return (
        <div className="relative flex flex-col items-center text-center w-24">
        {current && (
            <div className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full p-1 text-xs shadow">
            <FaStar />
            </div>
        )}

        <div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-xl border-4
            ${completed ? "bg-green-500 border-green-200" : current ? "bg-yellow-400 border-yellow-200" : "bg-gray-300 border-gray-200"}
            ${locked ? "opacity-40 grayscale" : ""}`}
        >
            {icon}
        </div>

        <p className="text-sm font-semibold mt-2">{title}</p>
        <p className="text-xs text-gray-500">{lessonsCount}</p>
        </div>
    );
    }

    export default function LearningPath() {
    const pathDirection = "right"; // "left" or "right"
    const pathBias = 0.7; // 0-1 (how much it leans to the side)

    const lessonPositions = lessons.map((_, index) => {
        const y = index * 180 + 40;
        // Calculate x position based on direction and bias
        const baseX = 50; // center
        const offset = (index % 2 === 0 ? 1 : -1) * 30 * (pathDirection === "right" ? 1 : -1);
        const x = baseX + (pathBias * offset);
        return { x, y };
    });

    const generatePathData = () => {
        let pathData = `M${lessonPositions[0].x},${lessonPositions[0].y}`;
        
        for (let i = 1; i < lessonPositions.length; i++) {
        const prev = lessonPositions[i - 1];
        const curr = lessonPositions[i];
        
        // Control points biased to the selected direction
        const controlX1 = prev.x + (pathDirection === "right" ? 15 : -15);
        const controlY1 = prev.y + (curr.y - prev.y) / 2;
        const controlX2 = curr.x + (pathDirection === "right" ? -15 : 15);
        const controlY2 = prev.y + (curr.y - prev.y) / 2;
        
        pathData += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${curr.x},${curr.y}`;
        }
        
        return pathData;
    };

    return (
        <div className="min-h-screen bg-white py-10 px-4 flex justify-center">
        <div className="relative" style={{ 
            height: `${lessons.length * 180 + 100}px`, 
            width: '600px' // Wider container
        }}>
            <svg 
            className="absolute top-0 left-0 w-full h-full"
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

            <div className="relative z-10 w-full h-full">
            {lessons.map((lesson, index) => (
                <div 
                key={index} 
                className="absolute" 
                style={{ 
                    left: `${lessonPositions[index].x}%`,
                    top: `${lessonPositions[index].y}px`,
                    transform: 'translate(-50%, -50%)'
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