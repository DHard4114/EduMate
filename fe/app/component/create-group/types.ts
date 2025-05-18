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