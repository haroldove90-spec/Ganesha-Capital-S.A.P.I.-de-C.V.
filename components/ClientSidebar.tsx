import React from 'react';
import { 
  AcademicCapIcon, 
  CircleStackIcon,
  ChartPieIcon,
  ArrowsRightLeftIcon,
  SparklesIcon,
  CalendarDaysIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import type { ClientModuleView } from '../types';

interface ClientSidebarProps {
  currentView: ClientModuleView;
  setView: (view: ClientModuleView) => void;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard' as ClientModuleView, name: 'Resumen', icon: ChartPieIcon },
    { id: 'planes' as ClientModuleView, name: 'Planes de Previsión', icon: CircleStackIcon },
    { id: 'movimientos' as ClientModuleView, name: 'Movimientos', icon: ArrowsRightLeftIcon },
    { id: 'herramientas' as ClientModuleView, name: 'Herramientas', icon: SparklesIcon },
    { id: 'educacion' as ClientModuleView, name: 'Educación', icon: AcademicCapIcon },
    { id: 'asesoria' as ClientModuleView, name: 'Asesoría', icon: CalendarDaysIcon },
    { id: 'perfil' as ClientModuleView, name: 'Mi Perfil', icon: UserCircleIcon },
  ];

  return (
    <aside className="
      fixed bottom-0 left-0 right-0 z-30 bg-primary shadow-[0_-2px_5px_rgba(0,0,0,0.1)]
      md:relative md:bg-primary md:p-4 md:rounded-lg md:shadow-md md:w-64 flex md:flex-col justify-start
    ">
       <div className="hidden md:flex flex-col items-center justify-center p-4 mb-4 border-b border-white/10">
          <img src="https://appdesignmex.com/libertadfinanciera.png" alt="Ganesha Capital Logo" className="h-16 w-auto" />
          <h2 className="text-sm font-bold text-white mt-2 text-center">Ganesha Capital SAPI de CV</h2>
      </div>
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
                aria-current={currentView === item.id ? 'page' : undefined}
              >
                <item.icon className="h-5 w-5 mb-1 md:mb-0 md:mr-3" />
                <span className="capitalize">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default ClientSidebar;