import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import type { Client } from '../types';
import ClientList from './ClientList';
import ClientDetail from './ClientDetail';
import RegisterClientModal from './RegisterClientModal';
import { UserPlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const UserManagementView: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-4.5rem)]">
        <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-md border border-gray-200 overflow-y-auto">
          <ClientList clients={clients} selectedClient={selectedClient} onSelectClient={setSelectedClient} />
        </div>
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 overflow-y-auto">
          {selectedClient ? <ClientDetail client={selectedClient} /> : <div className="text-center p-8 text-gray-500">Selecciona un cliente para ver sus detalles.</div>}
        </div>
      </div>
    );
  };


  return (
    <>
      <div className="space-y-6 h-full">
          <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
              <button 
                onClick={() => setIsRegisterModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-transform transform hover:scale-105"
              >
                  <UserPlusIcon className="h-5 w-5"/>
                  <span>Registrar Cliente</span>
              </button>
          </div>
          {renderContent()}
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