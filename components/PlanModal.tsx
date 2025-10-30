import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ClipboardDocumentCheckIcon, RocketLaunchIcon, PencilSquareIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

interface PlanModalProps {
  onClose: () => void;
}

const Step: React.FC<{ icon: React.ElementType; title: string; description: string }> = ({ icon: Icon, title, description }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 bg-primary/10 rounded-lg p-3">
            <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h4 className="text-lg font-bold text-gray-800">{title}</h4>
            <p className="mt-1 text-gray-600">{description}</p>
        </div>
    </div>
);

const PlanModal: React.FC<PlanModalProps> = ({ onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="plan-modal-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 id="plan-modal-title" className="text-xl font-bold text-gray-800">Tu Futuro Financiero Comienza Hoy</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800"
            aria-label="Cerrar modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </header>

        <div className="p-6 overflow-y-auto space-y-6">
            <p className="text-gray-700">
                Un Plan de Previsión Financiera es tu mapa personal hacia la tranquilidad y el logro de tus sueños. En <strong>GANESHA Capital</strong>, te acompañamos en cada paso para construir un plan sólido, claro y adaptado a ti.
            </p>

            <div className="space-y-6">
                <Step 
                    icon={ClipboardDocumentCheckIcon}
                    title="Paso 1: Diagnóstico"
                    description="Analizamos tu situación financiera actual, tus ingresos, gastos y patrimonio para tener un punto de partida claro."
                />
                <Step 
                    icon={RocketLaunchIcon}
                    title="Paso 2: Definición de Metas"
                    description="¿Comprar una casa, planear tu retiro, asegurar la educación de tus hijos? Juntos, definimos tus objetivos a corto, mediano y largo plazo."
                />
                <Step 
                    icon={PencilSquareIcon}
                    title="Paso 3: Diseño de Estrategia"
                    description="Creamos un plan de acción personalizado que incluye presupuesto, ahorro, gestión de deudas y estrategias de inversión para alcanzar tus metas."
                />
                 <Step 
                    icon={PlayCircleIcon}
                    title="Paso 4: Puesta en Marcha y Seguimiento"
                    description="Te ayudamos a implementar tu plan y realizamos revisiones periódicas para ajustarlo según tus necesidades y los cambios del mercado."
                />
            </div>

            <div className="mt-6 bg-primary/5 border-l-4 border-primary p-5 rounded-r-lg text-center">
                 <h4 className="text-xl font-bold text-primary">¿Estás listo para tomar el control?</h4>
                 <p className="text-primary/90 mt-2">El primer paso es el más importante. Agenda una asesoría gratuita con uno de nuestros expertos y comienza a construir el futuro que deseas.</p>
                 <button className="mt-4 px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary/90 transition-transform transform hover:scale-105">
                    Agendar Asesoría Gratuita
                 </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlanModal;