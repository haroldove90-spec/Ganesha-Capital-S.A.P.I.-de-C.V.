import React from 'react';
import { MOCK_SOCIAL_LEADS, MOCK_CHAT_ESCALATIONS } from '../constants';
import { ChatBubbleLeftRightIcon, UserPlusIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const RequestsView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Social Media Leads */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <UserPlusIcon className="h-7 w-7 mr-3 text-primary" />
          Nuevos Leads de Redes Sociales
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
          {MOCK_SOCIAL_LEADS.map(lead => (
            <div key={lead.id} className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-bold text-gray-800">{lead.name} <span className="text-sm font-normal text-gray-500">via {lead.platform}</span></p>
                <p className="text-gray-600 italic mt-1">"{lead.message}"</p>
                <p className="text-xs text-gray-400 mt-2">{lead.timestamp}</p>
              </div>
              <button className="flex-shrink-0 bg-green-500 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5" />
                Agregar al CRM
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Escalations */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <ChatBubbleLeftRightIcon className="h-7 w-7 mr-3 text-primary" />
          Escalaciones del Chat
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
          {MOCK_CHAT_ESCALATIONS.map(escalation => (
            <div key={escalation.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <p className="font-bold text-gray-800">{escalation.clientName}</p>
              <p className="text-gray-600 italic mt-1">Último mensaje: "{escalation.lastMessage}"</p>
              <p className="text-xs text-gray-400 mt-2">{escalation.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestsView;