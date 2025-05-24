export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task {
    id: number;
    title: string;
    description?: string;
    assigned_to?: string;
    severity: 'low' | 'medium' | 'high';
    status: TaskStatus;
    group_id?: string;
    created_at?: string;
    updated_at?: string;
}

export interface TaskProgress {
    completed: number;
    total: number;
    percentage: number;
}

export interface TaskSummary {
    status: string;
    count: number;
}

export interface ApiUser {
    id: number;
    name: string;
    email: string;
    username: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    payload: T;
}

export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    isSelected: boolean;
}

export interface Group {
    name: string;
    description: string;
    members: User[];
}