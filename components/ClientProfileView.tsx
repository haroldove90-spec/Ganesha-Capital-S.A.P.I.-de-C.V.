import React from 'react';
import { MOCK_CLIENTS } from '../constants';
import { UserIcon, CakeIcon, MapPinIcon, EnvelopeIcon, CheckBadgeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';


const DetailRow: React.FC<{ icon: React.ElementType, label: string, value: string | React.ReactNode }> = ({ icon: Icon, label, value }) => (
    <div className="flex items-start py-3 border-b">
        <Icon className="h-5 w-5 text-gray-400 mr-4 mt-1" />
        <div className="flex-1">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-base text-gray-900">{value}</p>
        </div>
    </div>
);

const ClientProfileView: React.FC = () => {
    const client = MOCK_CLIENTS[0];

    const getKycStatusPill = () => {
        switch (client.kycStatus) {
            case 'Verified':
                return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800 flex items-center gap-2"><CheckBadgeIcon className="h-5 w-5" /> Verificado</span>;
            case 'Pending':
                 return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">Pendiente</span>;
            case 'Rejected':
                return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">Rechazado</span>;
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Profile Details Card */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Datos Personales</h2>
                         <button className="text-sm font-semibold text-primary hover:underline">Editar</button>
                    </div>
                    <div>
                        <DetailRow icon={UserIcon} label="Nombre Completo" value={client.name} />
                        <DetailRow icon={EnvelopeIcon} label="Correo Electrónico" value={client.email} />
                        <DetailRow icon={CakeIcon} label="Fecha de Nacimiento" value={client.dob} />
                        <DetailRow icon={MapPinIcon} label="Ciudad" value={client.city} />
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
                            <button className="w-full text-left font-medium text-gray-700 hover:text-primary">Cambiar Contraseña</button>
                            <button className="w-full text-left font-medium text-gray-700 hover:text-primary">Configurar Autenticación de 2 Factores</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientProfileView;
