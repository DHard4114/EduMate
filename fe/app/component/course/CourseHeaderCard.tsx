import { LevelProgress } from './types';

interface CourseHeaderCardProps {
    level: string;
    progress: LevelProgress | null;
}

export default function CourseHeaderCard({ level, progress }: CourseHeaderCardProps) {
    return (
        <div className="bg-darkgreen text-white p-4 rounded-xl shadow-lg flex items-center justify-between mb-8">
            <div>
                <h2 className="text-xl font-bold capitalize">{level}</h2>
                <p className="text-sm">
                    Progress: {progress ? `${progress.completed}/${progress.total} (${progress.percentage}%)` : 'Loading...'}
                </p>
            </div>
        </div>
    );
}