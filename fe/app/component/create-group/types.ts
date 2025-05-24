export type User = {
    id: string;
    name: string;
    email: string;
    username: string;
    isSelected: boolean;
};

export type Group = {
    name: string;
    description: string;
    members: User[];
};
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    payload: T;
}

export type UserResponse =  {
    id: number;
    name: string;
    email: string;
    username: string;
}

export interface AddMembersModalProps {
    isOpen: boolean;
    onClose: () => void;
    users: User[];
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onToggleUser: (userId: string) => void;
    onAddSelected: (selectedUsers: User[]) => void;
}