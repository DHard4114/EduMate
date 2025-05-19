export default function Footer() {
    return (
        <footer className="bg-gray-100 py-8 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} EduMate. Empowering Students to Learn Better, Together.</p>
        <div className="mt-2 space-x-4">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Contact</a>
        </div>
        </footer>
    );
}
