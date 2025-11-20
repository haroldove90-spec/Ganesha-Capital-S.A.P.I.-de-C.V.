import React, { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './services/supabase';
import Dashboard from './components/Dashboard';
import ClientView from './components/ClientView';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import { MOCK_CLIENTS, MOCK_NOTIFICATIONS } from './constants';

type UserRole = 'admin' | 'client';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('client');
  // const [loading, setLoading] = useState(true); // Ya no es necesario al omitir la autenticación
  const [initialAuthError, setInitialAuthError] = useState<string | null>(null);
  const [adminViewAsClient, setAdminViewAsClient] = useState(false);

  useEffect(() => {
    // La lógica de autenticación se ha desactivado temporalmente para fines de demostración.
    // El rol del usuario se puede cambiar con el nuevo botón en el encabezado.
    // Para reactivar la autenticación, restaura el contenido original de useEffect.
  }, []);

  // El bloque de carga se elimina ya que la autenticación se omite.

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    // Restablecer manualmente el estado ya que el listener de autenticación está desactivado
    setSession(null);
    setUserRole('client');
    setAdminViewAsClient(false);
  };

  const handleToggleAdminView = () => {
    if (userRole === 'admin') {
      setAdminViewAsClient(prev => !prev);
    }
  };

  const handleRoleSwitch = () => {
    setUserRole(prevRole => {
        const newRole = prevRole === 'admin' ? 'client' : 'admin';
        // Al cambiar a cliente, nos aseguramos de no estar en modo "admin viendo como cliente".
        if (newRole === 'client') {
            setAdminViewAsClient(false);
        }
        return newRole;
    });
  };
  
  // Para la demostración, usaremos el primer cliente de muestra.
  // En una aplicación real, obtendrías el perfil del cliente basado en el ID del usuario de la sesión.
  const currentClient = MOCK_CLIENTS[0];

  const unreadNotificationsCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <>
        <Header 
          userRole={userRole} 
          onLogout={handleLogout} 
          user={session?.user ?? null} 
          isViewingAsClient={adminViewAsClient}
          onToggleView={handleToggleAdminView}
          unreadNotificationsCount={unreadNotificationsCount}
          onRoleSwitch={handleRoleSwitch}
        />
        <main className="p-4 md:p-6">
          {userRole === 'admin' ? (
            adminViewAsClient ? <ClientView /> : <Dashboard />
          ) : (
            <ClientView />
          )}
        </main>
        {(userRole === 'client' || (userRole === 'admin' && adminViewAsClient)) && <Chatbot client={currentClient} />}
      </>
    </div>
  );
}

export default App;