// Navigation Bar when you logged in. Have brief profile, Course, Task Management, and Profile (Pomodoro if you want it seperated. A)
'use client'

import UserProfile from './UserProfile';
import ThemeToggle from './ThemeToggle';
import { FaHome, FaUser, FaTasks, FaSignOutAlt } from 'react-icons/fa';
import { LuPanelLeftOpen, LuPanelLeftClose } from 'react-icons/lu';
import { usePathname, useRouter} from 'next/navigation';

interface LogoutButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

const LogoutButton = ({ isOpen, onClick }: LogoutButtonProps) => (
    <li className="relative group">
        <button 
            onClick={onClick}
            className="w-full flex items-center p-3 pl-5 rounded-lg transition-colors duration-200 relative hover:bg-[#110b0b] hover:text-fontgreen"
        >
            <span className="absolute left-0 top-0 h-full w-1 transition-all duration-300 bg-fontgreen scale-y-0 group-hover:scale-y-100 origin-top" />
            <span className="text-xl">
                <FaSignOutAlt size={20} />
            </span>
            {isOpen && <span className="ml-3">Logout</span>}
        </button>
    </li>
);


const Sidebar = ({ isOpen, toggleNavbar }: { isOpen: boolean; toggleNavbar: () => void }) => {
    const pathname = usePathname();
    const router = useRouter();

    const routeMap: Record<string, string> = {
            'Course': '/content/course',
            'Task Manager': '/content/task-manager',
            'Account': '/content/account',

    };
    const getActiveState = (text: string) => {
        return pathname?.startsWith(routeMap[text] || '');
    };

   const handleLogout = async () => {
        try {
            console.log('Logging out...');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            console.log('Token after remove:', localStorage.getItem('token'));
            router.push('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };


    return (
        <div className={`fixed left-0 top-0 h-full bg-basegreen text-gray-400 transition-all duration-300 z-50 ${isOpen ? 'w-64' : 'w-20'}`}>
            {/* dark:bg-gray-800 dark:text-white */}
            <div className="p-4 flex flex-col h-full">
                <button
                    onClick={toggleNavbar}
                    className="self-end mb-4 hover:text-fontgreen text-xl p-1 rounded-md transition-colors"
                    // dark:hover:bg-gray-700
                    aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                    {isOpen ? <LuPanelLeftClose size={24} /> : <LuPanelLeftOpen size={24} />}
                </button>
                
                <UserProfile isOpen={isOpen} />
                
                <nav className="mt-8 flex-1">
                    <ul className="space-y-2">
                        <NavItem 
                            isOpen={isOpen} 
                            icon={<FaHome size={20} />} 
                            text="Course" 
                            active={getActiveState('Course')} 
                            route={routeMap['Course']}
                        />
                        <NavItem 
                            isOpen={isOpen} 
                            icon={<FaTasks size={20} />} 
                            text="Task Manager" 
                            active={getActiveState('Task Manager')} 
                            route={routeMap['Task Manager']} 
                        />
                        <NavItem 
                            isOpen={isOpen} 
                            icon={<FaUser size={20} />} 
                            text="Account" 
                            active={getActiveState('Account')} 
                            route={routeMap['Account']} 
                        />
                        <LogoutButton isOpen={isOpen} onClick={handleLogout} />
                    </ul>
                </nav>
                
                <ThemeToggle isOpen={isOpen} />
            </div>
        </div>
    );
};

const NavItem = ({ isOpen, icon, text, active = false, route }: { isOpen: boolean; icon: React.ReactNode; text: string; active?: boolean, route: string }) => {
    return (
        <li className="relative group">
            <a 
                href={route}
                className={`flex items-center p-3 pl-5 rounded-lg transition-colors duration-200 relative
                    ${active 
                        ? 'bg-white text-fontgreen font-semibold'
                        : ' hover:text-fontgreen'}
                `}
            >
                {/* Garis di kiri */}
                <span className={`absolute left-0 top-0 h-full w-1 transition-all duration-300
                    ${active ? 'bg-fontgreen' : 'bg-fontgreen scale-y-0 group-hover:scale-y-100 origin-top'}`}
                />
                
                <span className="text-xl">{icon}</span>
                {isOpen && <span className="ml-3">{text}</span>}
            </a>
        </li>
    );
};

export default Sidebar;