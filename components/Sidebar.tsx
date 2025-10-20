
import React from 'react';
import { UserCircleIcon, ChartBarIcon, TicketIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

type CrmView = 'clients' | 'analytics' | 'requests';

interface SidebarProps {
  currentView: CrmView;
  setView: (view: CrmView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'clients' as CrmView, name: 'Clients', icon: UserCircleIcon },
    { id: 'analytics' as CrmView, name: 'Analytics', icon: ChartBarIcon },
    { id: 'requests' as CrmView, name: 'Requests', icon: TicketIcon },
  ];

  return (
    <aside className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-full md:w-56 flex flex-row md:flex-col justify-between">
      <nav>
        <ul className="flex flex-row md:flex-col gap-2">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setView(item.id)}
                className={`w-full flex items-center p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  currentView === item.id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="hidden md:inline">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto hidden md:block">
        <button
          className="w-full flex items-center p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors duration-200"
        >
          <Cog6ToothIcon className="h-5 w-5 mr-3" />
          Settings
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
