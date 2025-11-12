import React, { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './services/supabase';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ClientView from './components/ClientView';
import Header from './components/Header';
import Chatbot from './components/Chatbot';

type UserRole = 'admin' | 'client';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('client');
  const [loading, setLoading] = useState(true);
  const [initialAuthError, setInitialAuthError] = useState<string | null>(null);
  const [adminViewAsClient, setAdminViewAsClient] = useState(false);

  useEffect(() => {
    // Check for auth errors in the URL hash on initial load.
    const hash = window.location.hash;
    if (hash.includes('error=access_denied')) {
      const params = new URLSearchParams(hash.substring(1));
      const errorDescription = params.get('error_description');
      if (errorDescription) {
        // Translate common Supabase errors for better UX
        if (errorDescription.includes('invalid or has expired')) {
          setInitialAuthError('El enlace de confirmación ha expirado o ya fue utilizado. Por favor, intenta iniciar sesión o regístrate de nuevo.');
        } else {
          setInitialAuthError('No se pudo completar la autenticación. Por favor, intenta de nuevo.');
        }
      }
      // Clean up the URL hash to avoid showing the error on refresh.
      window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
    }
    
    if (supabase) {
      // Set up an auth state change listener.
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);

        if (session) {
          // The session object from the listener has the most up-to-date user data.
          // No need for an extra API call to getUser().
          const role = session.user.user_metadata?.role ?? 'client';
          setUserRole(role as UserRole);
          setInitialAuthError(null);
        } else {
          // If no session, reset to default client state.
          setUserRole('client');
          setAdminViewAsClient(false);
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false); // Supabase not available, stop loading.
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary">
        <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }
  
  const isLoggedIn = !!session;

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
  };

  const handleToggleAdminView = () => {
    if (userRole === 'admin') {
      setAdminViewAsClient(prev => !prev);
    }
  };

  return (
    <div className={`${isLoggedIn ? 'bg-gray-100' : 'bg-primary'} min-h-screen font-sans`}>
      {!isLoggedIn ? (
        <Login initialAuthError={initialAuthError} />
      ) : (
        <>
          <Header 
            userRole={userRole} 
            onLogout={handleLogout} 
            user={session.user} 
            isViewingAsClient={adminViewAsClient}
            onToggleView={handleToggleAdminView}
          />
          <main className="p-4 md:p-6">
            {userRole === 'admin' ? (
              adminViewAsClient ? <ClientView /> : <Dashboard />
            ) : (
              <ClientView />
            )}
          </main>
          {(userRole === 'client' || (userRole === 'admin' && adminViewAsClient)) && <Chatbot />}
        </>
      )}
    </div>
  );
}

export default App;