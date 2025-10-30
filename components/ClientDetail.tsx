
import React from 'react';
import type { Client } from '../types';
import { UserIcon, CakeIcon, MapPinIcon, SparklesIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon, ShieldCheckIcon, AcademicCapIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

interface ClientDetailProps {
  client: Client;
}

const DetailItem: React.FC<{ icon: React.ElementType, label: string, value: string | number, children?: React.ReactNode }> = ({ icon: Icon, label, value, children }) => (
    <div className="flex items-start text-sm">
        <Icon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
        <div>
            <p className="font-medium text-gray-500">{label}</p>
            {value && <p className="text-gray-900">{value}</p>}
            {children}
        </div>
    </div>
);


const ClientDetail: React.FC<ClientDetailProps> = ({ client }) => {
    const getStageColor = (stage: Client['salesStage']) => {
        switch (stage) {
            case 'Lead': return 'bg-yellow-100 text-yellow-800';
            case 'Prospect': return 'bg-blue-100 text-blue-800';
            case 'Client': return 'bg-green-100 text-green-800';
            case 'Advocate': return 'bg-purple-100 text-purple-800';
        }
    }

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <img src={`https://i.pravatar.cc/80?u=${client.id}`} alt="Client" className="h-20 w-20 rounded-full"/>
        <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
            <p className="text-gray-500">{client.email}</p>
            <span className={`mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStageColor(client.salesStage)}`}>
              {client.salesStage}
            </span>
        </div>
        <button className="px-4 py-2 bg-secondary text-black text-sm font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-transform transform hover:scale-105">
            Editar Cliente
        </button>
      </div>

      <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Información del Cliente</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <DetailItem icon={UserIcon} label="Género" value={client.gender} />
            <DetailItem icon={CakeIcon} label="Edad" value={client.age} />
            <DetailItem icon={MapPinIcon} label="Ciudad" value={client.city} />
            <DetailItem icon={CalendarDaysIcon} label="Fecha de Ingreso" value={client.joinDate} />
            <DetailItem icon={ChatBubbleLeftRightIcon} label="Última Interacción" value={client.lastInteraction} />
          </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Rol y Progreso</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <DetailItem icon={ShieldCheckIcon} label="Rol Asignado" value={client.role} />
            <DetailItem icon={SparklesIcon} label="Conocimiento Financiero" value={client.financialKnowledge} />
            <DetailItem icon={AcademicCapIcon} label="Módulos Educativos Completados" value="">
                <ul className="list-disc list-inside text-gray-900">
                    <li>Fondo de Emergencia</li>
                    <li>Principios de Inversión</li>
                </ul>
            </DetailItem>
          </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Historial de Actividad Reciente</h3>
          <div className="space-y-3">
              <div className="text-sm p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-700">Depósito de $5,000.00 en "Plan Futuro Seguro 2040"</p>
                  <p className="text-xs text-gray-500">Julio 22, 2024</p>
              </div>
              <div className="text-sm p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-700">Completó el test de conocimiento 'Intermedio'</p>
                  <p className="text-xs text-gray-500">Julio 18, 2024</p>
              </div>
              <div className="text-sm p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-700">Solicitud de soporte vía Chatbot escalada a agente</p>
                  <p className="text-xs text-gray-500">Julio 15, 2024</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ClientDetail;