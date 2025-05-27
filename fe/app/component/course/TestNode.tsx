'use client';

import { useRouter } from 'next/navigation';

export default function TestOutCard() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/content/course/materials/testout'); 
    };

    return (
        <div 
            className="w-full max-w-xl mx-auto cursor-pointer hover:scale-105 transition-transform"
            onClick={handleClick}
        >
            <div className="bg-darkgreen border border-gray-200 rounded-lg shadow-sm p-4 w-full">
                <h3 className="text-xl font-semibold text-basegreen text-center">
                    Try Out
                </h3>
            </div>
        </div>
    );
}
