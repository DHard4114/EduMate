'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const levels = [
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
        id: 'expert',
        name: 'Expert',
        description: 'Operasi bilangan kompleks, desimal, persen, dan volume',
        image: '/Expert.png',
    },
    ];

    export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        level: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
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
        const response = await fetch('http://localhost:5000/user/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            name: formData.name,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            level: formData.level,
            }),
        });

        console.log('Raw response:', response);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Registration failed');
        }
        const data = await response.json();
        console.log('Parsed data:', data);

        // Redirect ke login kalau registrasi berhasil
        router.push('/login');
        } catch (err) {
        setError(err.message);
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-basegreen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
            <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-fontgreen">Create Your Account</h1>
            <p className="text-gray-600 mt-2">Join us today and start your journey</p>
            </div>

            {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
            </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fontgreen focus:border-fontgreen outline-none transition"
                    placeholder="Enter your full name"
                    required
                />
                </div>

                <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fontgreen focus:border-fontgreen  outline-none transition"
                    placeholder="Choose a username"
                    required
                />
                </div>

                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fontgreen focus:border-fontgreen  outline-none transition"
                    placeholder="Enter your email"
                    required
                />
                </div>

                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fontgreen focus:border-fontgreen  outline-none transition"
                    placeholder="Create a password (min 8 chars)"
                    required
                />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Your Skill Level
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {levels.map((level) => (
                    <div
                    key={level.id}
                    onClick={() => setFormData({ ...formData, level: level.id })}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${formData.level === level.id ? 'focus:ring-fontgreen focus:border-fontgreen ' : 'border-green hover:border-green'}`}
                    >
                    <div className="flex flex-col items-center text-center">
                        <div className="w-32 h-32 mb-3 relative">
                        <Image
                            src={level.image}
                            alt={level.name}
                            fill
                            className="object-contain"
                        />
                        </div>
                        <h3 className="font-medium text-gray-900">{level.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{level.description}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>

            <div className="flex items-center">
                <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-fontgreen bg-fontgreen focus:ring-fontgreen border-gray-300 rounded"
                required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <Link href="/terms" className="text-green hover:text-fontgreen">
                    Terms and Conditions
                </Link>
                </label>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-green hover:bg-fontgreen text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-fontgreen focus:ring-offset-2 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Creating account...' : 'Create Account'}
            </button>
            </form>

            <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-green hover:text-fontgreen font-medium">
                Sign in
                </Link>
            </p>
            </div>
        </div>
        </div>
    );
}