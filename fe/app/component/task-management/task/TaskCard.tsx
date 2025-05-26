import { Task, TaskStatus } from '../Types';

interface TaskCardProps {
    task: Task;
    onDragStart: (task: Task) => void;
    onStatusChange: (task: Task, newStatus: TaskStatus) => void;
}

const TaskCard = ({ task, onDragStart, onStatusChange }: TaskCardProps) => {
    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('taskId', task.id);
        onDragStart(task);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
        >
            <h3 className="font-semibold mb-2">{task.title}</h3>
            {task.description && (
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
            )}
            <div className="mt-2 flex justify-end space-x-2">
                {task.status === 'todo' && (
                    <button
                        onClick={() => onStatusChange(task, 'in_progress')}
                        className="text-xs bg-pinkbase text-pinkfont px-2 py-1 rounded"
                    >
                        Move to Progress
                    </button>
                )}
                {task.status === 'in_progress' && (
                    <button
                        onClick={() => onStatusChange(task, 'done')}
                        className="text-xs bg-greenbase text-greenfont px-2 py-1 rounded"
                    >
                        Complete
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskCard;