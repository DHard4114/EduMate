export interface BaseUser {
    id: string;
    name: string;
    email: string;
    username: string;
}

export interface User extends BaseUser {
    isSelected: boolean;
}

export interface GroupMember extends BaseUser {

    joinedAt?: string;
}

export interface CreateGroupState {
    name: string;
    description: string;
    members: GroupMember[];
}

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
    onAddSelected: (users: User[]) => void;
}