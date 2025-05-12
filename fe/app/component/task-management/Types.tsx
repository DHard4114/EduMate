export type Task = {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    severity: 'low' | 'medium' | 'high';
    status: 'todo' | 'in-progress' | 'completed';
    };

    export type TaskFormProps = {
    onSave: (task: Omit<Task, 'id'>) => void;
    onCancel: () => void;
};