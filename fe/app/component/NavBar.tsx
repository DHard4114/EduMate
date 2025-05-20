'use client';

import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function NavBar() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDark = () => {
        document.documentElement.classList.toggle('dark');
        setDarkMode(!darkMode);
    };

    return (
        <header className="w-full backdrop-blur-md bg-fontgreen/90 shadow-md text-white fixed top-0 z-50 transition duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            {/* Logo */}
            <a
            href="/about"
            className="text-3xl font-extrabold tracking-wide text-white hover:text-basegreen transition-colors duration-300"
            >
            <span className="bg-white text-fontgreen px-2 py-1 rounded-md shadow-inner">Edu</span>
            <span className="ml-1">Mate</span>
            </a>

            {/* Navigation Links */}
            <nav>
            <ul className="flex space-x-8 text-base font-semibold items-center">
                {['Home', 'Features', 'Join'].map((item, index) => (
                <li key={index} className="relative group">
                    <a
                    href={`#${item.toLowerCase()}`}
                    className="transition-colors duration-300 hover:text-basegreen"
                    >
                    {item}
                    </a>
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-basegreen transition-all duration-300 group-hover:w-full"></span>
                </li>
                ))}
            </ul>
            </nav>

            {/* Search + Auth + Dark Mode */}
            <div className="flex items-center space-x-3">
            

            {/* Auth Buttons */}
            <a
                href="/auth?mode=login"
                className="px-4 py-2 text-sm font-semibold border border-white text-white rounded-full hover:bg-white hover:text-fontgreen transition-all duration-300 shadow-sm"
            >
                Login
            </a>
            <a
                href="/auth?mode=signup"
                className="px-4 py-2 text-sm font-semibold bg-white text-fontgreen rounded-full hover:bg-[#f0f0f0] transition-all duration-300 shadow-sm"
            >
                Register
            </a>
            </div>
        </div>

        {/* Gradient Border Bawah */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#D6E3C9] via-[#5A6D51] to-[#D6E3C9] animate-pulse"></div>
        </header>
    );
}
