'use client';

export default function NavBar() {
    return (
        <header className="w-full bg-basegreen shadow-md text-white fixed top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                
                {/* Logo / Brand */}
                <a href="#top" className="text-2xl font-extrabold tracking-wide text-white hover:text-fontgreen">
                    EduMate
                </a>

                {/* Navigation Links */}
                <nav>
                    <ul className="flex space-x-6 text-sm font-medium">
                        <li>
                            <a href="#top" className="hover:text-fontgreen">Home</a>
                        </li>
                        <li>
                            <a href="#features" className="hover:text-fontgreen">Features</a>
                        </li>
                        <li>
                            <a href="#cta" className="hover:text-fontgreen">Join</a>
                        </li>
                    </ul>
                </nav>

                {/* Auth Buttons */}
                <div className="flex space-x-4">
                    <a
                        href="/auth?mode=login"
                        className="px-4 py-2 text-sm bg-white text-basegreen font-semibold rounded hover:bg-[#e4e4e4] transition-colors"
                    >
                        Login
                    </a>
                    <a
                        href="/auth?mode=signup"
                        className="px-4 py-2 text-sm border border-white text-white font-semibold rounded hover:bg-white hover:text-basegreen transition-colors"
                    >
                        Register
                    </a>
                </div>
            </div>
        </header>
    );
}
