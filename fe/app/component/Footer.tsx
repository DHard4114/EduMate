'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-fontgreen text-white py-10 px-6 text-center text-sm">
        {/* COPYRIGHT */}
        <p className="mb-3 font-medium tracking-wide">
            &copy; {new Date().getFullYear()} <span className="font-bold">EduMate</span>. Empowering Students to Learn Better, Together.
        </p>

        {/* LINK NAVIGATION */}
        <div className="flex justify-center items-center space-x-6 text-white/80 font-semibold text-sm transition-all">
            <Link href="/about" className="hover:text-white hover:underline transition-all duration-200">
            About
            </Link>
            <Link href="/privacy" className="hover:text-white hover:underline transition-all duration-200">
            Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white hover:underline transition-all duration-200">
            Contact
            </Link>
        </div>
        </footer>
    );
}
