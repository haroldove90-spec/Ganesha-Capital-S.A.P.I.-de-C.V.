import React, { useState } from 'react';
import ClientSidebar from './ClientSidebar';
import ClientDashboardView from './ClientDashboardView';
import ClientEducationView from './ClientEducationView';
import FinancialPlansView from './FinancialPlansView';
import FinancialPlanningInfoView from './FinancialPlanningInfoView';
import ClientTransactionsView from './ClientTransactionsView';
import ClientToolsView from './ClientToolsView';
import ClientAdvisoryView from './ClientAdvisoryView';
import ClientProfileView from './ClientProfileView';
import type { ClientModuleView } from '../types';

const ClientView: React.FC = () => {
    const [currentView, setCurrentView] = useState<ClientModuleView>('dashboard');

    const renderContent = () => {
        switch (currentView) {
            case 'dashboard':
                return <ClientDashboardView />;
            case 'planes':
                return <FinancialPlansView />;
            case 'movimientos':
                return <ClientTransactionsView />;
            case 'herramientas':
                return <ClientToolsView />;
            case 'educacion':
                return <ClientEducationView />;
            case 'asesoria':
                return <ClientAdvisoryView />;
            case 'perfil':
                return <ClientProfileView />;
            case 'prevision':
                return <FinancialPlanningInfoView />;
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