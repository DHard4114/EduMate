import { Task, TaskStatus } from '../Types';

interface TaskStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (task: Task, newStatus: TaskStatus) => void;
    task: Task | null;
    newStatus: TaskStatus;
}

const TaskStatusModal = ({ isOpen, onClose, onConfirm, task, newStatus }: TaskStatusModalProps) => {
    if (!isOpen || !task) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-4">Update Task Status</h3>
                <p className="text-gray-600 mb-4">
                    Are you sure you want to move &quot;{task.title}&quot; to {newStatus.replace('_', ' ')}?
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(task, newStatus)}
                        className="px-4 py-2 bg-green text-white rounded hover:bg-fontgreen"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskStatusModal;