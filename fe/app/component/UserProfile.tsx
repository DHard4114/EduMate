'use client';

import { useAuth } from './auth-context';
import Image from 'next/image';

const UserProfile = ({ isOpen }: { isOpen: boolean }) => {
    const { user } = useAuth();

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="flex items-center p-2 border-b border-gray-700">
            <div className="fix">
                {user?.profile_picture_url ? (
                    <Image
                        src={user.profile_picture_url}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                        priority
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-darkgreen flex items-center justify-center text-white">
                        <span className="text-lg">{user ? getInitials(user.name) : '??'}</span>
                    </div>
                )}
            </div>
            {isOpen && user && (
                <div className="ml-3">
                    <p className="font-bold text-gray-800">{user.name}</p>
                    <p className="text-sm">{user.level}</p>
                </div>
            )}
        </div>
    );
};

export default UserProfile;