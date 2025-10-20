
import React, { useState } from 'react';
import type { Client } from '../types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface ClientListProps {
  clients: Client[];
  selectedClient: Client | null;
  onSelectClient: (client: Client) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, selectedClient, onSelectClient }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Clients</h2>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
      <ul className="space-y-2">
        {filteredClients.map(client => (
          <li key={client.id}>
            <button
              onClick={() => onSelectClient(client)}
              className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                selectedClient?.id === client.id ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
            >
              <p className={`font-semibold ${selectedClient?.id === client.id ? 'text-blue-700' : 'text-gray-800'}`}>
                {client.name}
              </p>
              <p className="text-sm text-gray-500">{client.email}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
