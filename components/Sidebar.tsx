import React from 'react';
import { UserCircleIcon, ChartBarIcon, TicketIcon, ShareIcon } from '@heroicons/react/24/outline';

type CrmView = 'clients' | 'analytics' | 'requests' | 'integrations';

interface SidebarProps {
  currentView: CrmView;
  setView: (view: CrmView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'clients' as CrmView, name: 'Clients', icon: UserCircleIcon },
    { id: 'analytics' as CrmView, name: 'Analytics', icon: ChartBarIcon },
    { id: 'requests' as CrmView, name: 'Requests', icon: TicketIcon },
    { id: 'integrations' as CrmView, name: 'Integrations', icon: ShareIcon },
  ];

  return (
    <aside className="
      fixed bottom-0 left-0 right-0 z-30 bg-primary shadow-[0_-2px_5px_rgba(0,0,0,0.1)]
      md:relative md:bg-primary md:p-4 md:rounded-lg md:shadow-md md:w-56 flex md:flex-col justify-start
    ">
      <nav className="w-full">
        <ul className="flex flex-row justify-around p-2 md:flex-col md:gap-2 md:p-0">
          {navItems.map(item => (
            <li key={item.id} className="flex-1 md:flex-initial">
              <button
                onClick={() => setView(item.id)}
                className={`w-full flex flex-col items-center justify-center p-2 rounded-lg text-xs font-medium transition-colors duration-200 md:flex-row md:justify-start md:p-3 md:text-sm ${
                  currentView === item.id 
                    ? 'bg-white/20 text-white' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5 mb-1 md:mb-0 md:mr-3" />
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;