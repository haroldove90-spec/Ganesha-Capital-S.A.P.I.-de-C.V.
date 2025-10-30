import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ClientView from './components/ClientView';
import Header from './components/Header';
import Chatbot from './components/Chatbot';

type UserRole = 'admin' | 'client';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('client');

  const handleLogin = (role: 'admin' | 'client') => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className={`${isLoggedIn ? 'bg-gray-100' : 'bg-primary'} min-h-screen font-sans`}>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Header userRole={userRole} onLogout={handleLogout} />
          <main className="p-4 md:p-6">
            {userRole === 'admin' && <Dashboard />}
            {userRole === 'client' && <ClientView />}
          </main>
          {userRole === 'client' && <Chatbot />}
        </>
      )}
    </div>
  );
}

export default App;