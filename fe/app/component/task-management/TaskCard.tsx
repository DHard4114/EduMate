import { Task } from "./Types";

const TaskCard = ({ task, onDragStart }: { task: Task; onDragStart: (task: Task) => void }) => {
    const severityColors = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800',
    };

    return (
        <div
        draggable
        onDragStart={() => onDragStart(task)}
        className="bg-white p-4 rounded-lg shadow cursor-move hover:shadow-md transition-shadow"
        >
        <h3 className="font-bold text-lg mb-2">{task.title}</h3>
        <p className="text-gray-600 mb-3">{task.description}</p>
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Assigned to: {task.assignedTo}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${severityColors[task.severity]}`}>
            {task.severity}
            </span>
        </div>
        </div>
    );
};

export default TaskCard;