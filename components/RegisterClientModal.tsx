import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import type { Client } from '../types';
import { XMarkIcon, ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface RegisterClientModalProps {
  onClose: () => void;
  onClientRegistered: () => void;
}

const RegisterClientModal: React.FC<RegisterClientModalProps> = ({ onClose, onClientRegistered }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
    const [city, setCity] = useState('');
    const [financialKnowledge, setFinancialKnowledge] = useState<'Basic' | 'Intermediate' | 'Advanced'>('Basic');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        if (!supabase) {
            setError("Servicio de base de datos no disponible.");
            setLoading(false);
            return;
        }

        // 1. Sign up user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: 'client',
                },
            },
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        if (authData.user) {
            // The database trigger 'on_auth_user_created' will handle creating the client profile.
            // The client-side insert is removed to fix the Row-Level Security policy violation.
            
            // 3. Success
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                onClientRegistered();
            }, 2000); // Close modal after 2 seconds
        } else {
             setError("No se pudo crear el usuario. Por favor, intenta de nuevo.");
             setLoading(false);
        }
    };

    return (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="register-client-title"
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 id="register-client-title" className="text-xl font-bold text-gray-900">Registrar Nuevo Cliente</h2>
              <button 
                onClick={onClose} 
                className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                aria-label="Cerrar modal"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </header>
            
            {success ? (
                <div className="p-8 text-center flex flex-col justify-center items-center flex-grow">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4"/>
                    <h3 className="text-2xl font-bold text-gray-900">¡Cliente Registrado!</h3>
                    <p className="text-gray-600 mt-2">Se ha enviado un correo de confirmación al nuevo usuario. El perfil ha sido creado exitosamente.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
                     <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                        <input type="text" name="fullName" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900"/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <div className="relative mt-1">
                            <input type={showPassword ? 'text' : 'password'} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="block w-full px-3 py-2 pr-10 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900"/>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                            <input type="date" name="dob" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900"/>
                        </div>
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Género</label>
                            <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value as any)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900">
                                <option value="Male">Masculino</option>
                                <option value="Female">Femenino</option>
                                <option value="Other">Otro</option>
                            </select>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
                        <input type="text" name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900"/>
                    </div>
                     <div>
                        <label htmlFor="financialKnowledge" className="block text-sm font-medium text-gray-700">Conocimiento Financiero Inicial</label>
                        <select name="financialKnowledge" id="financialKnowledge" value={financialKnowledge} onChange={(e) => setFinancialKnowledge(e.target.value as any)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900">
                            <option value="Basic">Básico</option>
                            <option value="Intermediate">Intermedio</option>
                            <option value="Advanced">Avanzado</option>
                        </select>
                    </div>

                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                    <div className="pt-4">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center gap-2 py-3 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-colors disabled:bg-gray-400"
                        >
                            {loading ? (
                                <>
                                    <ArrowPathIcon className="h-5 w-5 animate-spin"/>
                                    <span>Registrando...</span>
                                </>
                            ) : (
                                "Registrar Cliente"
                            )}
                        </button>
                    </div>
                </form>
            )}
          </div>
        </div>
    );
};

export default RegisterClientModal;