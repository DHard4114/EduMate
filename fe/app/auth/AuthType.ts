// components/auth/AuthTypes.ts
import { ReactNode } from 'react';

export interface AuthFormProps {
    onToggleAuth: () => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export interface Level {
    id: string;
    name: string;
    description: string;
    image: string;
}

export interface FormData {
    name: string;
    username: string;
    email: string;
    password: string;
    level: string;
}

export interface AuthInputProps {
    label: string;
    id: string;
    name?: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required?: boolean;
    delay?: number;
}

export interface AuthButtonProps {
    loading: boolean;
    text: string;
    loadingText: string;
    delay?: number;
}

export interface AuthToggleProps {
    text: string;
    buttonText: string;
    onToggle: () => void;
    delay?: number;
}

export interface AuthIllustrationProps {
    title: string;
    description: string;
    imageSrc: string;
}

export interface AuthHeaderProps {
    title: string;
    subtitle: string;
}

export interface AuthErrorProps {
    error: string;
}

export interface SkillLevelsProps {
    levels: Level[];
    selectedLevel: string;
    onSelect: (level: string) => void;
}

export const levels = [
    {
        id: 'beginner',
        name: 'Beginner',
        description: 'Aljabar, pecahan, dan geometri dasar',
        image: '/Beginner.png',
    },
    {
        id: 'intermediate',
        name: 'Intermediate',
        description: 'Sifat operasi hitung, bangun ruang, sudut dan skala',
        image: '/Intermediate.png',
    },
    {
        id: 'advanced',
        name: 'Advance',
        description: 'Operasi bilangan kompleks, desimal, persen, dan volume',
        image: '/Expert.png',
    },
];