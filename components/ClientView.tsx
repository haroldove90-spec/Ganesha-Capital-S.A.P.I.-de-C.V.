import React, { useState } from 'react';
import ClientSidebar from './ClientSidebar';
import ClientEducationView from './ClientEducationView';
import FinancialPlansView from './FinancialPlansView';
import type { ClientModuleView } from '../types';

const ClientView: React.FC = () => {
    const [currentView, setCurrentView] = useState<ClientModuleView>('educacion');

    const renderContent = () => {
        switch (currentView) {
            case 'educacion':
                return <ClientEducationView />;
            case 'planes':
                return <FinancialPlansView />;
            default:
                return <ClientEducationView />;
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