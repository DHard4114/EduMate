import { LevelProgress } from './types';

interface LessonHeaderCardProps {
    course: string;
}

export default function LessonHeaderCard({ course }: LessonHeaderCardProps) {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-green border border-gray-200 rounded-lg shadow-sm p-6 w-full">
                <h3 className="text-2xl font-semibold text-basegreen text-center">
                    {course}
                </h3>
            </div>
        </div>
    );
}