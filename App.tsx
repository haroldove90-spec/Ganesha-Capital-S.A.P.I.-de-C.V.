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

  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    }
  }, []);


  const handleLogout = async () => {
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error);
      }
    }
  };
  
  const isLoggedIn = !!session;
  const userRole: UserRole = session?.user?.user_metadata?.role ?? 'client';

  return (
    <div className={`${isLoggedIn ? 'bg-gray-100' : 'bg-primary'} min-h-screen font-sans`}>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <>
          <Header userRole={userRole} onLogout={handleLogout} user={session.user} />
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
