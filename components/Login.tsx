import React, { useState } from 'react';
import { supabase } from '../services/supabase';

const Login: React.FC = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        if (!supabase) {
            setError('Servicio de autenticación no disponible. Por favor, revisa la configuración.');
            setLoading(false);
            return;
        }
        
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        }
        // The App component will automatically update via onAuthStateChange
        setLoading(false);
    };
    
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        if (!supabase) {
            setError('Servicio de autenticación no disponible.');
            setLoading(false);
            return;
        }

        const { data, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: 'client',
                },
            },
        });

        setLoading(false);

        if (authError) {
            setError(authError.message);
            return;
        }

        // The database trigger 'on_auth_user_created' will handle creating the client profile.
        // The client-side insert was removed to fix the Row-Level Security policy violation.
        if (data.user) {
            setSuccessMessage('¡Registro exitoso! Revisa tu correo para activar tu cuenta.');
            setIsLoginView(true); // Switch to login view after successful registration
        } else {
            setError("No se pudo crear el usuario. Por favor, intenta de nuevo.");
        }
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        // Reset fields and messages
        setEmail('');
        setPassword('');
        setFullName('');
        setError('');
        setSuccessMessage('');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary">
            <div className="w-full max-w-sm p-8 space-y-8">
                <div className="text-center">
                     <img 
                        src="https://appdesignmex.com/libertadfinanciera.png" 
                        alt="Ganesha Capital SAPI de CV Logo" 
                        className="mx-auto h-24 w-auto"
                     />
                    <h2 className="mt-6 text-3xl font-extrabold text-white">
                        Ganesha Capital SAPI de CV
                    </h2>
                    <p className="mt-2 text-sm text-gray-300">
                        {isLoginView ? 'Toma el control de tu futuro financiero.' : 'Crea tu cuenta para comenzar.'}
                    </p>
                </div>

                {isLoginView ? (
                    // Login Form
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="rounded-md space-y-4">
                            <div>
                                <label htmlFor="email-login" className="sr-only">Correo Electrónico</label>
                                <input id="email-login" name="email" type="email" autoComplete="email" required className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password-login" className="sr-only">Contraseña</label>
                                <input id="password-login" name="password" type="password" autoComplete="current-password" required className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                        {successMessage && <p className="text-sm text-green-400 text-center">{successMessage}</p>}
                        <div>
                            <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-secondary transition-colors disabled:bg-secondary/50">
                                {loading ? 'Ingresando...' : 'Ingresar'}
                            </button>
                        </div>
                        <div className="text-center text-sm">
                            <span className="text-gray-300">¿No tienes cuenta? </span>
                            <button type="button" onClick={toggleView} className="font-medium text-secondary hover:text-secondary/80 focus:outline-none">
                                Regístrate
                            </button>
                        </div>
                    </form>
                ) : (
                    // Registration Form
                    <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                        <div className="rounded-md space-y-4">
                             <div>
                                <label htmlFor="fullName" className="sr-only">Nombre Completo</label>
                                <input id="fullName" name="fullName" type="text" autoComplete="name" required className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white" placeholder="Nombre Completo" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="email-register" className="sr-only">Correo Electrónico</label>
                                <input id="email-register" name="email" type="email" autoComplete="email" required className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password-register" className="sr-only">Contraseña</label>
                                <input id="password-register" name="password" type="password" required minLength={6} className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white" placeholder="Contraseña (mín. 6 caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                        <div>
                            <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-secondary transition-colors disabled:bg-secondary/50">
                                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                            </button>
                        </div>
                         <div className="text-center text-sm">
                            <span className="text-gray-300">¿Ya tienes cuenta? </span>
                            <button type="button" onClick={toggleView} className="font-medium text-secondary hover:text-secondary/80 focus:outline-none">
                                Ingresa
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;