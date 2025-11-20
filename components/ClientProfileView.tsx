import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import type { Client } from '../types';
import { MOCK_CLIENTS } from '../constants';
import { 
    UserIcon, 
    CakeIcon, 
    MapPinIcon, 
    EnvelopeIcon, 
    CheckBadgeIcon, 
    PencilIcon,
    CheckIcon,
    XMarkIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';


const DetailRow: React.FC<{ icon: React.ElementType, label: string, value: string | React.ReactNode }> = ({ icon: Icon, label, value }) => (
    <div className="flex items-start py-3 border-b">
        <Icon className="h-5 w-5 text-gray-400 mr-4 mt-1 flex-shrink-0" />
        <div className="flex-1">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-base text-gray-900">{value}</p>
        </div>
    </div>
);

const EditableDetailRow: React.FC<{ 
    icon: React.ElementType, 
    label: string, 
    name: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type?: 'text' | 'email' | 'date' 
}> = ({ icon: Icon, label, name, value, onChange, type = 'text' }) => (
     <div className="flex items-center py-2">
        <Icon className="h-5 w-5 text-gray-400 mr-4 flex-shrink-0" />
        <div className="flex-1">
            <label htmlFor={name} className="text-sm font-medium text-gray-500">{label}</label>
            <input 
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900"
            />
        </div>
    </div>
);


const ClientProfileView: React.FC = () => {
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileData, setProfileData] = useState({ name: '', email: '', city: '', dob: '' });

    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
    const [passwordError, setPasswordError] = useState('');
    
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    
    useEffect(() => {
        const fetchClientProfile = async () => {
            // For this demo, we'll directly use mock data to ensure the view is populated.
            if (MOCK_CLIENTS.length > 0) {
                setClient(MOCK_CLIENTS[0]);
            } else {
                setFetchError('No hay datos de cliente de muestra disponibles.');
            }
            setLoading(false);
        };

        fetchClientProfile();
    }, []);

    useEffect(() => {
        if (client) {
            setProfileData({ name: client.name, email: client.email, city: client.city, dob: client.dob });
        }
    }, [client]);

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleProfileEditToggle = () => {
        if (isEditingProfile && client) {
            // If canceling, revert form data to the current client state
            setProfileData({ name: client.name, email: client.email, city: client.city, dob: client.dob });
        }
        setIsEditingProfile(!isEditingProfile);
    };

    const handleProfileSave = async () => {
        if (!client || !supabase) {
            showNotification('La función de guardado no está disponible en el modo de demostración.', 'error');
            return;
        }

        // 1. Update public.clients table
        const { data: updatedClientData, error: clientError } = await supabase
            .from('clients')
            .update({
                name: profileData.name,
                city: profileData.city,
                dob: profileData.dob,
            })
            .eq('id', client.id)
            .select()
            .single();

        if (clientError) {
            showNotification('Error al actualizar el perfil.', 'error');
            console.error(clientError);
            return;
        }

        // 2. Update auth.users metadata for name
        if (profileData.name !== client.name) {
            const { error: userError } = await supabase.auth.updateUser({
                data: { full_name: profileData.name }
            });
            if (userError) console.error("Error updating user metadata:", userError);
        }

        // 3. Handle auth email update, which requires confirmation
        if (profileData.email !== client.email) {
            const { error: emailError } = await supabase.auth.updateUser({ email: profileData.email });
            if (emailError) {
                showNotification(`Perfil guardado, pero no se pudo actualizar el email: ${emailError.message}`, 'error');
            } else {
                showNotification('Perfil actualizado. Revisa tu nuevo correo para confirmar el cambio.', 'success');
            }
        } else {
            showNotification('Perfil actualizado con éxito.', 'success');
        }

        setClient(updatedClientData);
        setIsEditingProfile(false);
    };


    const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };
    
    const handlePasswordChangeToggle = () => {
        setIsChangingPassword(!isChangingPassword);
        setPasswordData({ newPassword: '', confirmPassword: '' });
        setPasswordError('');
    };
    
    const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('Las nuevas contraseñas no coinciden.');
            return;
        }
        if (passwordData.newPassword.length < 6) {
            setPasswordError('La nueva contraseña debe tener al menos 6 caracteres.');
            return;
        }
        
        if (!supabase) {
            showNotification('La función de cambio de contraseña no está disponible en el modo de demostración.', 'error');
            return;
        };

        const { error } = await supabase.auth.updateUser({ password: passwordData.newPassword });

        if (error) {
            setPasswordError(error.message);
            showNotification('Error al cambiar la contraseña.', 'error');
        } else {
            showNotification('Contraseña cambiada con éxito.', 'success');
            handlePasswordChangeToggle();
        }
    };

    const getKycStatusPill = () => {
        if (!client) return null;
        switch (client.kycStatus) {
            case 'Verified':
                return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800 flex items-center gap-2"><CheckBadgeIcon className="h-5 w-5" /> Verificado</span>;
            case 'Pending':
                 return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">Pendiente</span>;
            case 'Rejected':
                return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">Rechazado</span>;
        }
    };
    
    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <ArrowPathIcon className="h-8 w-8 text-primary animate-spin" />
                <span className="ml-3 text-gray-600">Cargando perfil...</span>
            </div>
        );
    }

    if (fetchError || !client) {
        return <div className="text-center p-8 text-red-500">{fetchError || 'No se encontró el perfil del cliente.'}</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
            
            {notification && (
                <div className={`p-4 rounded-md text-sm ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {notification.message}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Profile Details Card */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Datos Personales</h2>
                         {!isEditingProfile ? (
                             <button onClick={handleProfileEditToggle} className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                                 <PencilIcon className="h-4 w-4" />
                                 Editar
                            </button>
                         ) : (
                             <div className="flex items-center gap-2">
                                <button onClick={handleProfileSave} className="flex items-center gap-1 px-3 py-1 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">
                                    <CheckIcon className="h-4 w-4" />
                                    Guardar
                                </button>
                                <button onClick={handleProfileEditToggle} className="flex items-center gap-1 px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                                    <XMarkIcon className="h-4 w-4" />
                                    Cancelar
                                </button>
                             </div>
                         )}
                    </div>
                    <div>
                        {isEditingProfile ? (
                            <div className="space-y-2">
                                <EditableDetailRow icon={UserIcon} label="Nombre Completo" name="name" value={profileData.name} onChange={handleProfileInputChange} />
                                <EditableDetailRow icon={EnvelopeIcon} label="Correo Electrónico" name="email" value={profileData.email} onChange={handleProfileInputChange} type="email" />
                                <EditableDetailRow icon={MapPinIcon} label="Ciudad" name="city" value={profileData.city} onChange={handleProfileInputChange} />
                                <EditableDetailRow icon={CakeIcon} label="Fecha de Nacimiento" name="dob" value={profileData.dob} onChange={handleProfileInputChange} type="date" />
                            </div>
                        ) : (
                            <>
                                <DetailRow icon={UserIcon} label="Nombre Completo" value={client.name} />
                                <DetailRow icon={EnvelopeIcon} label="Correo Electrónico" value={client.email} />
                                <DetailRow icon={CakeIcon} label="Fecha de Nacimiento" value={client.dob} />
                                <DetailRow icon={MapPinIcon} label="Ciudad" value={client.city} />
                            </>
                        )}
                    </div>
                </div>

                {/* Status and Security Card */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Estatus de la Cuenta</h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-2">Verificación de Identidad (KYC)</p>
                                {getKycStatusPill()}
                                {client.kycStatus !== 'Verified' && <p className="text-xs text-gray-500 mt-2">Completa tu verificación para acceder a todas las funciones.</p>}
                            </div>
                             <div>
                                <p className="text-sm font-medium text-gray-500 mb-2">Estatus General</p>
                                <p className={`font-semibold ${client.accountStatus === 'Active' ? 'text-green-700' : 'text-red-700'}`}>{client.accountStatus}</p>
                            </div>
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Seguridad</h2>
                         <div className="space-y-3">
                            <button onClick={handlePasswordChangeToggle} className="w-full text-left font-medium text-gray-700 hover:text-primary">
                                {isChangingPassword ? 'Cancelar Cambio de Contraseña' : 'Cambiar Contraseña'}
                            </button>
                            {isChangingPassword && (
                                <form onSubmit={handlePasswordSave} className="space-y-3 pt-2 border-t">
                                      <div>
                                        <label htmlFor="newPassword" className="text-xs font-medium text-gray-500">Nueva Contraseña</label>
                                        <input type="password" name="newPassword" id="newPassword" value={passwordData.newPassword} onChange={handlePasswordInputChange} required className="mt-1 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900"/>
                                     </div>
                                     <div>
                                        <label htmlFor="confirmPassword" className="text-xs font-medium text-gray-500">Confirmar Nueva Contraseña</label>
                                        <input type="password" name="confirmPassword" id="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordInputChange} required className="mt-1 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900"/>
                                     </div>
                                     {passwordError && <p className="text-xs text-red-600">{passwordError}</p>}
                                     <button type="submit" className="w-full px-3 py-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-primary/90">
                                         Guardar Nueva Contraseña
                                     </button>
                                </form>
                            )}
                            <button className="w-full text-left font-medium text-gray-700 hover:text-primary">Configurar Autenticación de 2 Factores</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientProfileView;