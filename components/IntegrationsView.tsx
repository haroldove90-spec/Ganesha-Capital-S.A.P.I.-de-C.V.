import React, { useState } from 'react';

// Platform Icons
const WhatsAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.12c-1.48 0-2.91-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.69-8.23 8.23-8.23 4.54 0 8.23 3.69 8.23 8.23s-3.69 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.82-.23-.09-.39-.12-.56.12-.17.25-.64.82-.79.98-.15.17-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.09-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.76 2.68 4.27 3.77 2.51 1.08 2.51.72 2.96.69.45-.03 1.47-.6 1.67-1.18.21-.58.21-1.08.14-1.18-.05-.12-.2-.18-.44-.3z"/>
    </svg>
);
const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5.05 3.66 9.21 8.44 9.94v-7.03H7.9v-2.91h2.54V9.82c0-2.52 1.49-3.93 3.78-3.93 1.1 0 2.24.2 2.24.2v2.47h-1.29c-1.25 0-1.62.76-1.62 1.56v1.88h2.78l-.45 2.91h-2.33v7.03c4.78-.73 8.44-4.89 8.44-9.94C22 6.53 17.5 2.04 12 2.04z"/>
    </svg>
);
const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2c-2.72 0-3.06.01-4.12.06-1.06.05-1.79.22-2.42.47-.65.25-1.13.59-1.62 1.08s-.83 1-1.08 1.62c-.25.63-.42 1.36-.47 2.42C2.01 8.94 2 9.28 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.47 2.42.25.65.59 1.13 1.08 1.62s1 .83 1.62 1.08c.63.25 1.36.42 2.42.47 1.06.05 1.4.06 4.12.06s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.42-.47.65-.25 1.13-.59 1.62-1.08s.83-1 1.08-1.62c.25-.63.42-1.36.47-2.42.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.47-2.42-.25-.65-.59-1.13-1.08-1.62s-1-.83-1.62-1.08c-.63-.25-1.36-.42-2.42-.47C15.06 2.01 14.72 2 12 2zm0 1.8c2.67 0 2.98.01 4.04.06 1.03.05 1.58.21 1.9.34.42.17.72.37.95.6s.43.53.6.95c.13.32.29.87.34 1.9.05 1.06.06 1.37.06 4.04s-.01 2.98-.06 4.04c-.05 1.03-.21 1.58-.34 1.9-.17.42-.37.72-.6.95s-.53.43-.95.6c-.32.13-.87.29-1.9.34-1.06.05-1.37.06-4.04.06s-2.98-.01-4.04-.06c-1.03-.05-1.58-.21-1.9-.34-.42-.17-.72-.37-.95-.6s-.43-.53-.6-.95c-.13-.32-.29-.87-.34-1.9C3.81 14.98 3.8 14.67 3.8 12s.01-2.98.06-4.04c.05-1.03.21-1.58.34-1.9.17-.42.37.72.6-.95s.53-.43.95-.6c.32-.13.87-.29 1.9-.34C9.02 3.81 9.33 3.8 12 3.8zm0 4.35c-2.43 0-4.39 1.96-4.39 4.39s1.96 4.39 4.39 4.39 4.39-1.96 4.39-4.39-1.96-4.39-4.39-4.39zm0 7.18c-1.54 0-2.79-1.25-2.79-2.79s1.25-2.79 2.79-2.79 2.79 1.25 2.79 2.79-1.25 2.79-2.79 2.79zm5.35-7.38c-.6 0-1.08.48-1.08 1.08s.48 1.08 1.08 1.08 1.08-.48 1.08-1.08-.48-1.08-1.08-1.08z"/>
    </svg>
);
const TikTokIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.53.02c1.31-.02 2.61-.01 3.91.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.65 4.31 1.7.03 1.31.02 2.62.02 3.93-.91-.08-1.83-.31-2.7-.72-1.02-.46-1.94-1.16-2.65-2.05-.73-.9-1.22-1.97-1.46-3.13a5.56 5.56 0 0 1-.02-1.9zM12.53 14.47c.01.09.02.18.04.27.18 1.25.64 2.45 1.38 3.54.71 1.04 1.66 1.86 2.79 2.42.9.44 1.86.66 2.8.66.02 1.3.01 2.6.01 3.91-.97.02-1.94-.15-2.88-.52-1.1-.42-2.1-1.06-2.92-1.88-.89-.89-1.58-1.96-1.98-3.13-.41-1.2-.53-2.47-.36-3.73zM12.53 0c-2.62 0-5.24 0-7.87 0 .01 1.66.02 3.33.02 4.99 1.15-.08 2.29-.33 3.36-.78.96-.41 1.83-1.06 2.5-1.88.7-.85 1.16-1.85 1.34-2.94a4.46 4.46 0 0 0-.01-.39z"/>
    </svg>
);


const platforms = [
  { id: 'whatsapp', name: 'WhatsApp Business API', description: 'Automatiza mensajes y captura leads directamente desde WhatsApp.', icon: WhatsAppIcon, color: '#25D366' },
  { id: 'facebook', name: 'Facebook', description: 'Gestiona Messenger y publicaciones para interactuar con tu comunidad.', icon: FacebookIcon, color: '#1877F2' },
  { id: 'instagram', name: 'Instagram', description: 'Responde a DMs y comentarios para convertir seguidores en clientes.', icon: InstagramIcon, color: '#E4405F' },
  { id: 'tiktok', name: 'TikTok', description: 'Difunde videos educativos y dirige tráfico a tus planes.', icon: TikTokIcon, color: '#000000' },
];

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => {
    return (
        <button
            onClick={() => onChange(!enabled)}
            className={`${enabled ? 'bg-primary' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
            aria-pressed={enabled}
        >
            <span
                className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
        </button>
    );
};

const IntegrationsView: React.FC = () => {
    const [connections, setConnections] = useState<Record<string, boolean>>({
        whatsapp: true,
        facebook: true,
        instagram: false,
        tiktok: false,
    });

    const handleToggle = (id: string) => {
        setConnections(prev => ({...prev, [id]: !prev[id] }));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Integraciones y Conectividad Social</h2>
            <p className="text-gray-500 mb-6">Conecta tus redes sociales para automatizar interacciones y capturar leads.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {platforms.map(platform => (
                    <div key={platform.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center mb-4">
                                <platform.icon className="h-8 w-8 mr-4" style={{ color: platform.color }}/>
                                <h3 className="text-xl font-bold text-gray-900">{platform.name}</h3>
                            </div>
                            <p className="text-gray-600 mb-6">{platform.description}</p>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                             <span className={`text-sm font-semibold ${connections[platform.id] ? 'text-green-600' : 'text-gray-500'}`}>
                                {connections[platform.id] ? 'Conectado' : 'Desconectado'}
                            </span>
                            <ToggleSwitch enabled={connections[platform.id]} onChange={() => handleToggle(platform.id)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IntegrationsView;