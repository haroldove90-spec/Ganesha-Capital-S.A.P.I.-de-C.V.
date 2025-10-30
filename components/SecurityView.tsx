import React, { useState } from 'react';
import { MOCK_ACTIVITY_LOGS } from '../constants';

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void; label: string }> = ({ enabled, onChange, label }) => {
    return (
        <label className="flex items-center justify-between cursor-pointer">
            <span className="font-medium text-gray-700">{label}</span>
            <div className="relative">
                <input type="checkbox" className="sr-only" checked={enabled} onChange={() => onChange(!enabled)} />
                <div className={`block w-14 h-8 rounded-full ${enabled ? 'bg-primary' : 'bg-gray-200'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${enabled ? 'transform translate-x-6' : ''}`}></div>
            </div>
        </label>
    );
};


const SecurityView: React.FC = () => {
    const [tfaEnabled, setTfaEnabled] = useState(false);

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Seguridad y Control</h1>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Configuración General</h2>
                <div className="max-w-md space-y-4">
                    <ToggleSwitch 
                        enabled={tfaEnabled}
                        onChange={setTfaEnabled}
                        label="Habilitar Autenticación de Dos Factores (2FA) para todos los administradores"
                    />
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Registro de Actividad (Logs)</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Usuario</th>
                                <th scope="col" className="px-6 py-3">Acción</th>
                                <th scope="col" className="px-6 py-3">Fecha y Hora</th>
                                <th scope="col" className="px-6 py-3">Dirección IP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_ACTIVITY_LOGS.map((log) => (
                                <tr key={log.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{log.user}</td>
                                    <td className="px-6 py-4">{log.action}</td>
                                    <td className="px-6 py-4">{log.timestamp}</td>
                                    <td className="px-6 py-4 font-mono">{log.ip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SecurityView;