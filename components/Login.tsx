import React, { useState } from 'react';
import { supabase } from '../services/supabase';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
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
                        Toma el control de tu futuro financiero.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Correo Electrónico</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white"
                                placeholder="Correo Electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-400 text-center">{error}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-secondary transition-colors disabled:bg-secondary/50"
                        >
                            {loading ? 'Ingresando...' : 'Ingresar'}
                        </button>
                    </div>

                     <div className="text-center">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-gray-300 hover:text-white">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
