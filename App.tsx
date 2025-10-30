
import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ClientView from './components/ClientView';
import Chatbot from './components/Chatbot';

export type View = 'client' | 'crm';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('client');

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="p-4 sm:p-6 lg:p-8">
        {currentView === 'client' ? <ClientView /> : <Dashboard />}
      </main>
      <Chatbot />
    </div>
  );
};

export default App;