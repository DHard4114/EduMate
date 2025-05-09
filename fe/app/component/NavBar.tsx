import Link from 'next/link';

export default function NavBar() {
    return (
        <div className="w-full h-28 bg-[#767753] flex items-center justify-end px-4">
            <ul className="flex space-x-6">
                <li>
                <Link href="/contact">Contact</Link>
                </li>
                <li>
                <Link href="/about">About</Link>
                </li>
                {/* Add more links here if needed */}
            </ul>
        </div>
    );
}
