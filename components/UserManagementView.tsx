import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import type { Client } from '../types';
import ClientList from './ClientList';
import ClientDetail from './ClientDetail';
import RegisterClientModal from './RegisterClientModal';
import { UserPlusIcon, ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const UserManagementView: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchClients = async () => {
    setLoading(true);
    setError(null);

    if (!supabase) {
      setError("El servicio de base de datos no está disponible.");
      setLoading(false);
      return;
    }
    const { data, error } = await supabase.from('clients').select('*');

    if (error) {
      setError(error.message);
      console.error("Error fetching clients:", error);
    } else {
      setClients(data);
      if (data && data.length > 0 && !selectedClient) {
        setSelectedClient(data[0]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleClientRegistered = () => {
    setIsRegisterModalOpen(false);
    fetchClients(); // Refetch list to show the new client
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
          <ArrowPathIcon className="h-8 w-8 text-primary animate-spin" />
          <span className="ml-3 text-gray-600">Cargando clientes...</span>
        </div>
      );
    }

    if (error) {
      return <div className="text-center p-8 text-red-500">Error al cargar clientes: {error}</div>;
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-md border border-gray-200 overflow-y-auto">
          <ClientList clients={filteredClients} selectedClient={selectedClient} onSelectClient={setSelectedClient} />
        </div>
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 overflow-y-auto">
          {selectedClient ? <ClientDetail client={selectedClient} /> : (
             <div className="text-center p-8 text-gray-500">
                {filteredClients.length > 0 ? 'Selecciona un cliente para ver sus detalles.' : 'No se encontraron clientes.'}
             </div>
          )}
        </div>
      </div>
    );
  };


  return (
    <>
      <div className="space-y-4 h-full flex flex-col">
          <div className="flex-shrink-0 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
              <button 
                onClick={() => setIsRegisterModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-transform transform hover:scale-105"
              >
                  <UserPlusIcon className="h-5 w-5"/>
                  <span>Registrar Cliente</span>
              </button>
          </div>
          <div className="flex-shrink-0 relative">
             <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
             <input
              type="text"
              placeholder="Buscar cliente por nombre o correo..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900 placeholder-gray-500"
              aria-label="Buscar clientes"
            />
          </div>
          <div className="flex-grow min-h-0">
            {renderContent()}
          </div>
      </div>
      {isRegisterModalOpen && (
        <RegisterClientModal
          onClose={() => setIsRegisterModalOpen(false)}
          onClientRegistered={handleClientRegistered}
        />
      )}
    </>
  );
};

export default UserManagementView;