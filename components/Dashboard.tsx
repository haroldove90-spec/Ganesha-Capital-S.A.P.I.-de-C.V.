import React, { useState } from 'react';
import { MOCK_CLIENTS } from '../constants';
import type { Client } from '../types';
import ClientList from './ClientList';
import ClientDetail from './ClientDetail';
import Analytics from './Analytics';
import Sidebar from './Sidebar';
import RequestsView from './RequestsView';
import IntegrationsView from './IntegrationsView';

type CrmView = 'clients' | 'analytics' | 'requests' | 'integrations';

const Dashboard: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(MOCK_CLIENTS[0]);
  const [currentCrmView, setCurrentCrmView] = useState<CrmView>('clients');

  const renderContent = () => {
    switch (currentCrmView) {
      case 'analytics':
        return <Analytics />;
      case 'clients':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-md border border-gray-200 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 12rem)'}}>
              <ClientList clients={MOCK_CLIENTS} selectedClient={selectedClient} onSelectClient={setSelectedClient} />
            </div>
            <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-md border border-gray-200 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 12rem)'}}>
              {selectedClient ? <ClientDetail client={selectedClient} /> : <div className="text-center p-8 text-gray-500">Select a client to see details.</div>}
            </div>
          </div>
        );
      case 'requests':
        return <RequestsView />;
      case 'integrations':
        return <IntegrationsView />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6" style={{ height: 'calc(100vh - 6rem)'}}>
      <Sidebar currentView={currentCrmView} setView={setCurrentCrmView} />
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;