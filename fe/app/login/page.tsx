'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
        const response = await fetch('/api/auth/login', {
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

        // Store token and redirect
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
        } catch (err) {
        setError(err.message);
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-basegreen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-fontgreen">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
            </div>
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fontgreen focus:border-fontgreen outline-none transition"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fontgreen focus:border-fontgreen outline-none transition"
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

                <Link href="/forgot-password" className="text-sm text-green hover:text-fontgreen">
                Forgot password?
                </Link>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-green hover:bg-fontgreen text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Signing in...' : 'Sign in'}
            </button>
            </form>

            <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="text-green hover:text-fontgreen font-medium">
                Sign up
                </Link>
            </p>
            </div>
        </div>
        </div>
    );
}