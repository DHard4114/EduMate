import { LevelProgress } from './types';

interface LessonHeaderCardProps {
    course: string;
    description: string;
}

export default function LessonHeaderCard({ course, description }: LessonHeaderCardProps) {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-green border border-gray-200 rounded-lg shadow-sm p-6 w-full">
                <h3 className="text-2xl font-semibold text-white text-center">
                    {course}
                </h3>
                <p className="text-l font-semibold text-basegreen text-center">{description}</p>
            </div>
        </div>
    );
}