import React, { useState } from 'react';
import { MOCK_CLIENTS } from '../constants';
import type { Client } from '../types';
import ClientList from './ClientList';
import ClientDetail from './ClientDetail';
import { UserPlusIcon } from '@heroicons/react/24/outline';

const UserManagementView: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(MOCK_CLIENTS[0]);

  return (
    <div className="space-y-6 h-full">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-transform transform hover:scale-105">
                <UserPlusIcon className="h-5 w-5"/>
                <span>Registrar Cliente</span>
            </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-4.5rem)]">
            <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-md border border-gray-200 overflow-y-auto">
              <ClientList clients={MOCK_CLIENTS} selectedClient={selectedClient} onSelectClient={setSelectedClient} />
            </div>
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 overflow-y-auto">
              {selectedClient ? <ClientDetail client={selectedClient} /> : <div className="text-center p-8 text-gray-500">Selecciona un cliente para ver sus detalles.</div>}
            </div>
        </div>
    </div>
  );
};

export default UserManagementView;