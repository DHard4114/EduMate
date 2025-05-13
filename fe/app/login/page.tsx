'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-basegreen to-green-100 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
            <AnimatePresence mode="wait">
            {isLogin ? (
                <LoginPage key="login" onToggleAuth={toggleAuthMode} loading={loading} setLoading={setLoading} />
            ) : (
                <SignupPage key="signup" onToggleAuth={toggleAuthMode} loading={loading} setLoading={setLoading} />
            )}
            </AnimatePresence>
        </div>
        </div>
    );
    };

    const LoginPage = ({ onToggleAuth, loading, setLoading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
        const response = await fetch('http://localhost:5001/user/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        localStorage.setItem('token', data.token);
        router.push('/dashboard');
        } catch (err) {
        setError(err.message);
        setLoading(false);
        }
    };

    return (
        <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
        <div className="w-full md:w-1/2 bg-gradient-to-br from-green to-fontgreen p-12 flex flex-col justify-center text-white">
            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            >
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-green-100 mb-8">
                Sign in to continue your learning journey and track your progress.
            </p>
            <div className="relative h-64">
                <Image 
                src="/login-illustration.svg" 
                alt="Login Illustration"
                fill
                className="object-contain"
                />
            </div>
            </motion.div>
        </div>

        <div className="w-full md:w-1/2 p-12">
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            >
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-fontgreen">Welcome Back</h1>
                <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            {error && (
                <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm"
                >
                {error}
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email or Username
                </label>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fontgreen focus:border-fontgreen outline-none transition duration-300"
                    placeholder="Enter your email or username"
                    required
                />
                </div>

                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fontgreen focus:border-fontgreen outline-none transition duration-300"
                    placeholder="Enter your password"
                    required
                />
                </div>

                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-fontgreen focus:ring-fontgreen border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                    </label>
                </div>

                <Link href="/forgot-password" className="text-sm text-green hover:text-fontgreen transition duration-300">
                    Forgot password?
                </Link>
                </div>

                <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-green to-fontgreen text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-fontgreen focus:ring-offset-2 transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                {loading ? (
                    <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                    </span>
                ) : 'Sign in'}
                </motion.button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button 
                    onClick={onToggleAuth}
                    className="text-green hover:text-fontgreen font-medium transition duration-300 cursor-pointer"
                >
                    Sign up
                </button>
                </p>
            </div>
            </motion.div>
        </div>
        </motion.div>
    );
};