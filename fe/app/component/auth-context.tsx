// To Save user logi8n info and wrap the whole web in AuthProvider
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    level: string;
    role?: string;
};

type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const api = axios.create({
        baseURL: 'http://localhost:5001',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    api.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.get('user/profile')
                .then(response => {
                    if (response.data.success) {
                        setUser(response.data.payload); // payload = user
                    } else {
                        console.error("Profile error:", response.data.message);
                        setUser(null);
                    }
                })
            .catch(() => setUser(null));
        } else {
            setUser(null);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};