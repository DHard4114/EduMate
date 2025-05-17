'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import axios from 'axios';
import { AuthFormProps, levels } from './AuthType';
import {
    AuthIllustration,
    AuthFormContainer,
    AuthHeader,
    AuthError,
    AuthInput,
    AuthButton,
    AuthToggle,
    SkillLevels,
    AuthTermsCheckbox
} from '../component/auth-component/page';

export default function SignupForm({ onToggleAuth, loading, setLoading }: AuthFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        level: '',
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            setLoading(false);
            return;
        }

        if (!formData.level) {
            setError('Please select your skill level');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/user/register', {
                name: formData.name,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: "student",
                level: formData.level,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.success) {
                window.location.reload()
            } else {
                throw new Error(response.data.message || 'Registration failed');
            }
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || 'Registration failed');
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ 
                type: 'spring',
                stiffness: 100,
                damping: 20
            }}
            className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
            <AuthIllustration 
                title="Join Us Today!"
                description="Create an account to unlock personalized learning experiences."
                imageSrc="/Book1.png"
            />

            <AuthFormContainer>
                <AuthHeader title="Create Your Account" subtitle="Join us today and start your journey" />
                
                {error && <AuthError error={error} />}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AuthInput
                            label="Full Name"
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            delay={0.5}
                        />

                        <AuthInput
                            label="Username"
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Choose a username"
                            delay={0.6}
                        />

                        <AuthInput
                            label="Email Address"
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            delay={0.7}
                        />

                        <AuthInput
                            label="Password"
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password (min 8 chars)"
                            delay={0.8}
                        />
                    </div>

                    <SkillLevels 
                        levels={levels} 
                        selectedLevel={formData.level}
                        onSelect={(level) => setFormData({...formData, level})}
                    />

                    <AuthTermsCheckbox delay={1.0} />

                    <AuthButton 
                        loading={loading} 
                        text="Create Account" 
                        loadingText="Creating account..." 
                        delay={1.1}
                    />
                </form>

                <AuthToggle 
                    text="Already have an account?"
                    buttonText="Sign in"
                    onToggle={onToggleAuth}
                    delay={1.2}
                />
            </AuthFormContainer>
        </motion.div>
    );
}