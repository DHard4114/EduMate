'use client'
import UserProfile from './UserProfile';
import ThemeToggle from './ThemeToggle';
import { FaHome, FaUser, FaTasks } from 'react-icons/fa';
import { LuPanelLeftOpen, LuPanelLeftClose } from 'react-icons/lu';
import { usePathname } from 'next/navigation';

const Sidebar = ({ isOpen, toggleNavbar }: { isOpen: boolean; toggleNavbar: () => void }) => {
    const pathname = usePathname();

    // Not really sure how it went. Need more troubleshooting
    const getActiveState = (text: string) => {
        const routeMap: Record<string, string> = {
            'Course': '/content/course',
            'Task Manager': '/content/task-manager',
            'Account': '/content/account'
        };
        return pathname?.startsWith(routeMap[text] || '');
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
                        />
                        <NavItem 
                            isOpen={isOpen} 
                            icon={<FaTasks size={20} />} 
                            text="Task Manager" 
                            active={getActiveState('Task Manager')} 
                        />
                        <NavItem 
                            isOpen={isOpen} 
                            icon={<FaUser size={20} />} 
                            text="Account" 
                            active={getActiveState('Account')} 
                        />
                    </ul>
                </nav>
                
                <ThemeToggle isOpen={isOpen} />
            </div>
        </div>
    );
};

const NavItem = ({ isOpen, icon, text, active = false }: { isOpen: boolean; icon: React.ReactNode; text: string; active?: boolean }) => {
    return (
        <li className="relative group">
            <a 
                href={`/${text.toLowerCase().replace(' ', '-')}`}
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