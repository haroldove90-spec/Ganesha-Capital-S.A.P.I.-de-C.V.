import React from 'react';
import type { User } from '@supabase/supabase-js';
import { ArrowLeftOnRectangleIcon, BellIcon, UserCircleIcon, ArrowsRightLeftIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
    userRole: 'admin' | 'client';
    onLogout: () => void;
    user: User | null;
    isViewingAsClient?: boolean;
    onToggleView?: () => void;
    unreadNotificationsCount?: number;
    onRoleSwitch?: () => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, onLogout, user, isViewingAsClient, onToggleView, unreadNotificationsCount = 0, onRoleSwitch }) => {
    const userName = user?.user_metadata?.full_name || (userRole === 'admin' ? 'Admin Ganesha' : 'Cliente');
    const userEmail = user?.email || (userRole === 'admin' ? 'admin@ganesha.com' : 'cliente@example.com');

    return (
        <header className="bg-primary shadow-md sticky top-0 z-40 h-16 md:h-24">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                <div className="flex items-center">
                    <img 
                        src="https://ganeshacapital.com.mx/wp-content/uploads/2025/11/Ganesha-Logo-Elefante-transparente.png" 
                        alt="Ganesha Capital Logo" 
                        className="h-12 md:h-16 w-auto"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <button className="relative p-2 rounded-full text-gray-300 hover:bg-white/10 hover:text-white">
                        <BellIcon className="h-6 w-6" />
                        {unreadNotificationsCount > 0 && (
                           <span className="absolute top-1 right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        )}
                    </button>
                    <div className="flex items-center">
                         <UserCircleIcon className="h-10 w-10 text-white" />
                         <div className="ml-3 hidden md:block">
                            <p className="text-sm font-medium text-white">
                                {userRole === 'admin' ? <span className="font-bold text-secondary">Admin: </span> : <span className="font-bold text-secondary">Cliente: </span>}
                                {userName}
                            </p>
                            <p className="text-xs text-gray-300">{userEmail}</p>
                        </div>
                    </div>
                     {onRoleSwitch && (
                        <button
                        onClick={onRoleSwitch}
                        className="flex items-center p-2 rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        title="Cambiar Rol (Demo)"
                        >
                        <UserGroupIcon className="h-6 w-6" />
                        <span className="ml-2 hidden lg:block text-sm font-medium">
                            {userRole === 'admin' ? "Ser Cliente" : "Ser Admin"}
                        </span>
                        </button>
                    )}
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