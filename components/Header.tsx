
import React from 'react';
import type { View } from '../App';
import { ChartPieIcon, UserGroupIcon } from '@heroicons/react/24/solid';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
             <img src="logo.svg" alt="Ganesha Capital Logo" className="h-10 w-10" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
              GANESHA <span className="text-blue-600">Capital</span>
            </h1>
          </div>
          <div className="flex items-center bg-gray-200 rounded-full p-1">
            <button
              onClick={() => setCurrentView('client')}
              className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 flex items-center space-x-2 ${
                currentView === 'client' ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-300'
              }`}
            >
              <UserGroupIcon className="h-5 w-5" />
              <span>Portal Cliente</span>
            </button>
            <button
              onClick={() => setCurrentView('crm')}
              className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 flex items-center space-x-2 ${
                currentView === 'crm' ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-300'
              }`}
            >
               <ChartPieIcon className="h-5 w-5" />
              <span>CRM</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;