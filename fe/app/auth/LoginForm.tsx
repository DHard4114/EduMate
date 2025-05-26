'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '../lib/api';

import { AuthFormProps } from './AuthType';
import {
    AuthIllustration,
    AuthFormContainer,
    AuthHeader,
    AuthError,
    AuthInput,
    AuthRememberForgot,
    AuthButton,
    AuthToggle
} from '../component/auth-component/page';
import { useAuth } from '../component/auth-context';

export default function LoginForm({ onToggleAuth, loading, setLoading }: AuthFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { setUser } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/user/login', {
                email,
                password
            });

            const data = response.data;

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            console.log('Login response:', data);
            router.push('/content/course');
            
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Login failed');
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ 
                type: 'spring',
                stiffness: 100,
                damping: 20
            }}
            className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
            <AuthIllustration 
                title="Welcome Back!"
                description="Sign in to continue your learning journey and track your progress."
                imageSrc="/Book2.png"
            />

            <AuthFormContainer>
                <AuthHeader title="Welcome Back" subtitle="Sign in to your account" />
                
                {error && <AuthError error={error} />}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <AuthInput
                        label="Email or Username"
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email or username"
                        delay={0.5}
                    />

                    <AuthInput
                        label="Password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        delay={0.6}
                    />

                    <AuthRememberForgot delay={0.7} />

                    <AuthButton 
                        loading={loading} 
                        text="Sign in" 
                        loadingText="Signing in..." 
                        delay={0.8}
                    />
                </form>

                <AuthToggle 
                    text="Don't have an account?"
                    buttonText="Sign up"
                    onToggle={onToggleAuth}
                    delay={0.9}
                />
            </AuthFormContainer>
        </motion.div>
    );
}