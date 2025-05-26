export interface Task {
    id: string; // UUID string
    group_id: string; // UUID string
    title: string;
    description?: string;
    status: 'todo' | 'in_progress' | 'done';
    severity: 'low' | 'medium' | 'high';
    assigned_to?: string; // UUID string (user ID, not username)
    created_at?: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface TaskFormProps {
    groupId: string; // Required UUID string
    onSave: (task: CreateTaskDto) => Promise<void>;
    onCancel: () => void;
    groupMembers?: User[]; // Added to provide list of users for assignment
}

export interface CreateTaskDto {
    group_id: string; // UUID string
    title: string;
    description?: string;
    status: 'todo' | 'in_progress' | 'done';
    severity: 'low' | 'medium' | 'high';
    assigned_to?: string; // UUID string (user ID)
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
    id: string; // UUID string to match database
    name: string;
    email: string;
    username: string;
    isSelected?: boolean; // Made optional
}

export interface Group {
    id: string; // Added group ID
    name: string;
    description: string;
    members: User[];
}

export interface PaginatedUsersResponse {
    users: User[];
    hasMore: boolean;
    total: number;
}

export interface GroupMember extends User {
    id: string;
}
export interface ManageMembersModalProps {
    isOpen: boolean;
    onClose: () => void;
    groupId: string;
}
export interface ApiError {
    message: string;
    success: boolean;
}
