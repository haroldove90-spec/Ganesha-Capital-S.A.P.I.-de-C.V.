import React from 'react';
import type { User } from '@supabase/supabase-js';
import { ArrowLeftOnRectangleIcon, BellIcon, UserCircleIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
    userRole: 'admin' | 'client';
    onLogout: () => void;
    user: User | null;
    isViewingAsClient?: boolean;
    onToggleView?: () => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, onLogout, user, isViewingAsClient, onToggleView }) => {
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
                     {userRole === 'admin' && onToggleView && (
                        <button
                        onClick={onToggleView}
                        className="flex items-center p-2 rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        title={isViewingAsClient ? "Volver a la vista de Administrador" : "Ver como Cliente"}
                        >
                        <ArrowsRightLeftIcon className="h-6 w-6" />
                        <span className="ml-2 hidden lg:block text-sm font-medium">
                            {isViewingAsClient ? "Vista Admin" : "Vista Cliente"}
                        </span>
                        </button>
                    )}
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