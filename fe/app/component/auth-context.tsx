'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';

// Define proper types
type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    level: string;
    role?: string;
    profile_picture_url?: string;
};

type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
    refreshProfile: () => Promise<void>; // Add refresh function
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    // Setup API interceptor for authentication
    api.interceptors.request.use(
        config => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    // Add refresh profile function
    const refreshProfile = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setUser(null);
                return;
            }

            const response = await api.get('user/profile');
            if (response.data.success) {
                setUser(response.data.payload);
            } else {
                console.error("Profile error:", response.data.message);
                setUser(null);
                localStorage.removeItem('token');
                router.push('/auth');
            }
        } catch (error) {
            console.error("Profile fetch error:", error);
            setUser(null);
            localStorage.removeItem('token');
            router.push('/auth');
        }
    }, [router]);

    // Initial profile fetch
   useEffect(() => {
        refreshProfile();
    }, [refreshProfile]);

    const logout = async () => {
        try {
            // Optional: Call logout endpoint if you have one
            // await api.post('auth/logout');
            
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            router.push('/auth');
        } catch (error) {
            console.error("Logout error:", error);
            // Still clear local data even if API call fails
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            router.push('/auth');
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, refreshProfile }}>
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