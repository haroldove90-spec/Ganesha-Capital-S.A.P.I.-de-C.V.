
import React from 'react';
import type { Client } from '../types';
import { UserIcon, CakeIcon, MapPinIcon, EnvelopeIcon, SparklesIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface ClientDetailProps {
  client: Client;
}

const DetailItem: React.FC<{ icon: React.ElementType, label: string, value: string | number }> = ({ icon: Icon, label, value }) => (
    <div className="flex items-start text-sm">
        <Icon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
        <div>
            <p className="font-medium text-gray-500">{label}</p>
            <p className="text-gray-900">{value}</p>
        </div>
    </div>
);


const ClientDetail: React.FC<ClientDetailProps> = ({ client }) => {
    const getStageColor = (stage: Client['salesStage']) => {
        switch (stage) {
            case 'Lead': return 'bg-secondary/20 text-yellow-800';
            case 'Prospect': return 'bg-primary/10 text-primary';
            case 'Client': return 'bg-green-100 text-green-800';
            case 'Advocate': return 'bg-purple-100 text-purple-800';
        }
    }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center space-x-4">
        <img src={`httpshttps://picsum.photos/seed/${client.id}/80/80`} alt="Client" className="h-20 w-20 rounded-full"/>
        <div>
            <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
            <p className="text-gray-500">{client.email}</p>
            <span className={`mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStageColor(client.salesStage)}`}>
              {client.salesStage}
            </span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Client Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <DetailItem icon={UserIcon} label="Gender" value={client.gender} />
            <DetailItem icon={CakeIcon} label="Age" value={client.age} />
            <DetailItem icon={MapPinIcon} label="City" value={client.city} />
            <DetailItem icon={SparklesIcon} label="Financial Knowledge" value={client.financialKnowledge} />
            <DetailItem icon={CalendarDaysIcon} label="Join Date" value={client.joinDate} />
            <DetailItem icon={ChatBubbleLeftRightIcon} label="Last Interaction" value={client.lastInteraction} />
          </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Interaction History</h3>
          <div className="space-y-3">
              <div className="text-sm p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-700">Email: Follow-up on investment plan</p>
                  <p className="text-xs text-gray-500">July 20, 2024</p>
              </div>
              <div className="text-sm p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-700">Chatbot: Question about financial freedom</p>
                  <p className="text-xs text-gray-500">July 18, 2024</p>
              </div>
              <div className="text-sm p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-700">Call: Initial consultation</p>
                  <p className="text-xs text-gray-500">July 15, 2024</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ClientDetail;