

import React from 'react';
import type { Client } from '../types';

interface ClientListProps {
  clients: Client[];
  selectedClient: Client | null;
  onSelectClient: (client: Client) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, selectedClient, onSelectClient }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-900">Clientes</h2>
      
      {clients.length > 0 ? (
        <ul className="space-y-2">
          {clients.map(client => (
            <li key={client.id}>
              <button
                onClick={() => onSelectClient(client)}
                className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                  selectedClient?.id === client.id ? 'bg-primary/10' : 'hover:bg-gray-100'
                }`}
              >
                <p className={`font-semibold ${selectedClient?.id === client.id ? 'text-primary' : 'text-gray-900'}`}>
                  {client.name}
                </p>
                <p className="text-sm text-gray-500">{client.email}</p>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 text-center mt-4">No se encontraron clientes que coincidan con la búsqueda.</p>
      )}
    </div>
  );
};

export default ClientList;