'use client'
import { useState, useEffect } from 'react';
import { MdModeNight, MdOutlineLightMode } from "react-icons/md";

const ThemeToggle = ({ isOpen }: { isOpen: boolean }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Handle SSR by checking window object
        if (typeof window !== 'undefined') {
            const isDark = localStorage.getItem('darkMode') === 'true' || 
                            (!('darkMode' in localStorage) && 
                            window.matchMedia('(prefers-color-scheme: dark)').matches);
            setDarkMode(isDark);
            document.documentElement.classList.toggle('dark', isDark);
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', String(newMode));
        document.documentElement.classList.toggle('dark', newMode);
    };

    return (
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
                onClick={toggleTheme}
                className="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 w-full transition-colors duration-200"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
                <span className="text-xl">
                    {darkMode ? <MdOutlineLightMode size={20} /> : <MdModeNight size={20} />}
                </span>
                {isOpen && <span className="ml-3">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
            </button>
        </div>
    );
};

export default ThemeToggle;