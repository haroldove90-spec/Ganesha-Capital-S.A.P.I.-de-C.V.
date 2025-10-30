import React from 'react';
import { ArrowLeftOnRectangleIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
    userRole: 'admin' | 'client';
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, onLogout }) => {
    const userName = userRole === 'admin' ? 'Admin Ganesha' : 'Ana Torres';
    const userEmail = userRole === 'admin' ? 'admin@ganesha.com' : 'ana.torres@example.com';

    return (
        <header className="bg-primary shadow-md sticky top-0 z-40 h-24">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                <div className="flex items-center">
                    {/* Placeholder for a logo */}
                    <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.789-2.75 9.566-1.74 2.777-2.5 5.434-2.5 5.434H12M12 11c0-3.517 1.009-6.789 2.75-9.566 1.74-2.777 2.5-5.434 2.5-5.434H12M12 11H2.5M12 11h9.5" />
                    </svg>
                    <h1 className="text-2xl font-bold text-white ml-3">GANESHA <span className="font-light">Capital</span></h1>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full text-gray-300 hover:bg-white/10 hover:text-white">
                        <BellIcon className="h-6 w-6" />
                    </button>
                    <div className="flex items-center">
                         <UserCircleIcon className="h-10 w-10 text-white" />
                         <div className="ml-3 hidden md:block">
                            <p className="text-sm font-medium text-white">{userName}</p>
                            <p className="text-xs text-gray-300">{userEmail}</p>
                        </div>
                    </div>
                    <button 
                        onClick={onLogout}
                        className="flex items-center p-2 rounded-full text-gray-300 hover:bg-white/10 hover:text-white"
                        title="Cerrar sesión"
                    >
                        <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
