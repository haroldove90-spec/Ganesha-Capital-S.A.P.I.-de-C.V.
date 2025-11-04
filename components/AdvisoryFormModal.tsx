import React, { useState, useEffect } from 'react';
import { XMarkIcon, PaperAirplaneIcon, CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

interface AdvisoryFormModalProps {
  onClose: () => void;
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const AdvisoryFormModal: React.FC<AdvisoryFormModalProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '', // Let the user fill their name
        email: '', // Let the user fill their email
        preferredDate: '',
        preferredTime: 'Cualquiera',
        notes: 'Me gustaría discutir mis opciones para un plan de previsión.',
    });
    const [status, setStatus] = useState<SubmissionStatus>('idle');

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        
        // Simulate sending the email
        console.log("--- SOLICITUD DE ASESORÍA ---");
        console.log("Asunto:", "Me interesa un plan de previsión.");
        console.log("Para:", "haroldo90@hotmail.com");
        console.log("Datos del Cliente:");
        console.log("Nombre:", formData.name);
        console.log("Email:", formData.email);
        console.log("Fecha preferida:", formData.preferredDate);
        console.log("Hora preferida:", formData.preferredTime);
        console.log("Notas:", formData.notes);
        console.log("---------------------------------");

        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    return (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="advisory-form-title"
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 id="advisory-form-title" className="text-xl font-bold text-gray-900">Agendar Asesoría</h2>
              <button 
                onClick={onClose} 
                className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                aria-label="Cerrar modal"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </header>
            
            {status === 'success' ? (
                <div className="p-8 text-center flex flex-col justify-center items-center flex-grow">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4"/>
                    <h3 className="text-2xl font-bold text-gray-900">¡Cita Solicitada!</h3>
                    <p className="text-gray-600 mt-2">Hemos recibido tu solicitud. Un asesor de GANESHA Capital se pondrá en contacto contigo muy pronto para confirmar la fecha y hora de tu asesoría gratuita.</p>
                    <button
                        onClick={onClose}
                        className="mt-6 w-full max-w-xs py-3 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-transform transform hover:scale-105"
                    >
                        Excelente
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
                    <p className="text-sm text-gray-600">Completa tus datos y nos pondremos en contacto para confirmar tu cita.</p>
                    
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900"/>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700">Fecha de Preferencia</label>
                            <input type="date" name="preferredDate" id="preferredDate" value={formData.preferredDate} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900"/>
                        </div>
                        <div>
                            <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700">Horario</label>
                            <select name="preferredTime" id="preferredTime" value={formData.preferredTime} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900">
                                <option>Cualquiera</option>
                                <option>Mañana (9am-12pm)</option>
                                <option>Tarde (1pm-5pm)</option>
                            </select>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notas Adicionales</label>
                        <textarea name="notes" id="notes" rows={3} value={formData.notes} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900"></textarea>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full flex justify-center items-center gap-2 py-3 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-colors disabled:bg-gray-400"
                        >
                            {status === 'submitting' ? (
                                <>
                                    <ArrowPathIcon className="h-5 w-5 animate-spin"/>
                                    <span>Solicitando...</span>
                                </>
                            ) : (
                                <>
                                    <PaperAirplaneIcon className="h-5 w-5"/>
                                    <span>Solicitar Cita</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}
          </div>
        </div>
    );
};

export default AdvisoryFormModal;