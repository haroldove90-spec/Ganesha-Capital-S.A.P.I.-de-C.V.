import React, { useState } from 'react';
import Analytics from './Analytics';
import Sidebar from './Sidebar';
import UserManagementView from './UserManagementView';
import ProductManagementView from './ProductManagementView';
import TransactionsView from './TransactionsView';
import CommunicationView from './CommunicationView';
import AdminEducationalView from './AdminEducationalView';
import SecurityView from './SecurityView';


export type CrmView = 'usuarios' | 'productos' | 'movimientos' | 'comunicacion' | 'educacion' | 'analisis' | 'seguridad';


const Dashboard: React.FC = () => {
  const [currentCrmView, setCurrentCrmView] = useState<CrmView>('analisis');

  const renderContent = () => {
    switch (currentCrmView) {
      case 'usuarios':
        return <UserManagementView />;
      case 'productos':
        return <ProductManagementView />;
      case 'movimientos':
        return <TransactionsView />;
      case 'comunicacion':
        return <CommunicationView />;
      case 'educacion':
        return <AdminEducationalView />;
      case 'analisis':
        return <Analytics />;
      case 'seguridad':
        return <SecurityView />;
      default:
        return <Analytics />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6" style={{ height: 'calc(100vh - 6rem)'}}>
      <Sidebar currentView={currentCrmView} setView={setCurrentCrmView} />
      <div className="flex-1 pb-20 md:pb-0 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;