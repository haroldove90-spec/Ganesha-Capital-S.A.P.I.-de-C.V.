import React, { useState } from 'react';
import PlanModal from './PlanModal';
import { CalendarDaysIcon, ChatBubbleLeftRightIcon, LightBulbIcon } from '@heroicons/react/24/outline';


const ClientAdvisoryView: React.FC = () => {
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

    return (
        <>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Asesoría Personalizada</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Schedule Appointment Card */}
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col items-center text-center">
                        <CalendarDaysIcon className="h-12 w-12 text-primary mb-4" />
                        <h2 className="text-xl font-bold text-gray-900">Agenda una Cita</h2>
                        <p className="text-gray-600 mt-2 mb-6">¿Tienes dudas sobre tu portafolio o quieres ajustar tus metas? Nuestros asesores expertos están aquí para ayudarte.</p>
                        <button 
                            onClick={() => setIsPlanModalOpen(true)} 
                            className="w-full max-w-xs py-3 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-transform transform hover:scale-105"
                        >
                            Ver Disponibilidad y Agendar
                        </button>
                    </div>

                    {/* Direct Chat Card */}
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col items-center text-center">
                        <ChatBubbleLeftRightIcon className="h-12 w-12 text-primary mb-4" />
                        <h2 className="text-xl font-bold text-gray-900">Chat con Soporte</h2>
                        <p className="text-gray-600 mt-2 mb-6">Para preguntas rápidas o asistencia con la plataforma, nuestro equipo de soporte está disponible para chatear.</p>
                         <button className="w-full max-w-xs py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors">
                            Iniciar Chat
                        </button>
                    </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        <LightBulbIcon className="h-6 w-6 mr-2 text-primary"/>
                        Recomendaciones para ti
                    </h3>
                    <p className="text-gray-600 mb-4">Basado en tu perfil de conocimiento <span className="font-semibold">Intermedio</span> y tus inversiones actuales, te recomendamos:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Considerar una sesión para explorar opciones de mayor crecimiento y diversificar tu portafolio.</li>
                        <li>Revisar el módulo educativo sobre "Creando Múltiples Fuentes de Ingreso" para expandir tus horizontes.</li>
                    </ul>
                </div>
            </div>

            {isPlanModalOpen && <PlanModal onClose={() => setIsPlanModalOpen(false)} />}
        </>
    );
};

export default ClientAdvisoryView;
