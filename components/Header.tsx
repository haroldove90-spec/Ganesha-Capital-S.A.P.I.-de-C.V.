import React from 'react';
import type { User } from '@supabase/supabase-js';
import { ArrowLeftOnRectangleIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
    userRole: 'admin' | 'client';
    onLogout: () => void;
    user: User | null;
}

const Header: React.FC<HeaderProps> = ({ userRole, onLogout, user }) => {
    const userName = user?.user_metadata?.full_name || (userRole === 'admin' ? 'Admin Ganesha' : 'Cliente');
    const userEmail = user?.email || '';

    return (
        <header className="bg-primary shadow-md sticky top-0 z-40 h-24">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                <div className="flex items-center">
                    <img 
                        src="https://appdesignmex.com/libertadfinanciera.png" 
                        alt="Ganesha Capital SAPI de CV Logo" 
                        className="h-12 w-auto"
                    />
                    <h1 className="text-xl font-bold text-white ml-3">Ganesha Capital SAPI de CV</h1>
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