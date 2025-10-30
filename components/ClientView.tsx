import React, { useState } from 'react';
import ClientSidebar from './ClientSidebar';
import ClientDashboardView from './ClientDashboardView';
import ClientTransactionsView from './ClientTransactionsView';
import ClientEducationView from './ClientEducationView';
import ClientToolsView from './ClientToolsView';
import ClientAdvisoryView from './ClientAdvisoryView';
import ClientProfileView from './ClientProfileView';
import type { ClientModuleView } from '../types';

const ClientView: React.FC = () => {
    const [currentView, setCurrentView] = useState<ClientModuleView>('panel');

    const renderContent = () => {
        switch (currentView) {
            case 'panel':
                return <ClientDashboardView />;
            case 'movimientos':
                return <ClientTransactionsView />;
            case 'educacion':
                return <ClientEducationView />;
            case 'herramientas':
                return <ClientToolsView />;
            case 'asesoria':
                return <ClientAdvisoryView />;
            case 'perfil':
                return <ClientProfileView />;
            default:
                return <ClientDashboardView />;
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6" style={{ height: 'calc(100vh - 6rem)'}}>
            <ClientSidebar currentView={currentView} setView={setCurrentView} />
            <div className="flex-1 pb-20 md:pb-0 overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default ClientView;
