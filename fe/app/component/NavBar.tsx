'use client';

export default function NavBar() {
    return (
        <header className="w-full bg-fontgreen shadow-md text-white fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            
            {/* Logo / Brand */}
            <a href="#top" className="text-2xl font-extrabold tracking-wide text-white hover:text-basegreen transition-colors duration-300">
            EduMate
            </a>

            {/* Navigation Links */}
            <nav>
            <ul className="flex space-x-6 text-medium font-xl">
                <li>
                <a href="#top" className="hover:text-basegreen transition-colors duration-300">Home</a>
                </li>
                <li>
                <a href="#features" className="hover:text-basegreen transition-colors duration-300">Features</a>
                </li>
                <li>
                <a href="#cta" className="hover:text-basegreen transition-colors duration-300">Join</a>
                </li>
            </ul>
            </nav>

            {/* Auth Buttons */}
            <div className="flex space-x-2">
            <a
                href="/auth?mode=login"
                className="px-4 py-2 text-sm font-semibold border border-white text-white rounded-lg hover:bg-white hover:text-basegreen transition-all duration-300"
            >
                Login
            </a>
            <a
                href="/auth?mode=signup"
                className="px-4 py-2 text-sm font-semibold bg-white text-fontgreen rounded-lg hover:bg-[#f0f0f0] transition-all duration-300"
            >
                Register
            </a>
            </div>
        </div>
        </header>
    );
}
