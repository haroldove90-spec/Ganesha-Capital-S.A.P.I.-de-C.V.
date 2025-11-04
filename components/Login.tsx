import React, { useState } from 'react';

interface LoginProps {
    onLogin: (role: 'admin' | 'client') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (username.toLowerCase() === 'admin' && password === 'admin123') {
            onLogin('admin');
        } else if (username.toLowerCase() === 'cliente' && password === 'cliente123') {
            onLogin('client');
        } else {
            setError('Usuario o contraseña incorrectos.');
        }
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
                            <label htmlFor="username" className="sr-only">Usuario</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white"
                                placeholder="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-secondary transition-colors"
                        >
                            Ingresar
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