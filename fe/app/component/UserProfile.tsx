const UserProfile = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <div className="flex items-center p-2 border-b border-gray-700">
        <div className="fix">
            <div className="w-10 h-10 rounded-full bg-darkgreen flex items-center justify-center text-white">
            <span className="text-lg">JD</span>
        </div>
        </div>
        {isOpen && (
            <div className="ml-3">
            <p className="font-bold text-gray-800">Nama Lengkap</p>
            <p className="text-sm">[Beginner Level]</p>
            </div>
        )}
        </div>
    );
};

export default UserProfile;