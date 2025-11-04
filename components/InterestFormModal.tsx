import React, { useState, useEffect } from 'react';
import { XMarkIcon, PaperAirplaneIcon, CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import type { FinancialProduct } from '../types';

interface InterestFormModalProps {
  product: FinancialProduct;
  onClose: () => void;
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const InterestFormModal: React.FC<InterestFormModalProps> = ({ product, onClose }) => {
    const [formData, setFormData] = useState({
        name: 'Ana Torres', // Pre-fill with client name
        email: 'ana.torres@example.com', // Pre-fill
        phone: '',
        message: `Hola, estoy interesado/a en el plan "${product.name}" con una aportación de $${product.monthlyContribution.toLocaleString()}. Me gustaría recibir más información.`,
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        
        // Simulate sending the email
        console.log("--- SOLICITUD DE INFORMACIÓN ---");
        console.log("Plan:", product.name);
        console.log("Aportación Mensual:", `$${product.monthlyContribution.toLocaleString()}`);
        console.log("Para:", "haroldo90@hotmail.com");
        console.log("Datos del Cliente:");
        console.log("Nombre:", formData.name);
        console.log("Email:", formData.email);
        console.log("Teléfono:", formData.phone);
        console.log("Mensaje:", formData.message);
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
          aria-labelledby="interest-form-title"
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 id="interest-form-title" className="text-xl font-bold text-gray-900">Solicitar Información</h2>
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
                    <h3 className="text-2xl font-bold text-gray-900">¡Solicitud Enviada!</h3>
                    <p className="text-gray-600 mt-2">Gracias por tu interés. Un asesor de GANESHA Capital se pondrá en contacto contigo a la brevedad para proporcionarte toda la información que necesitas.</p>
                    <button
                        onClick={onClose}
                        className="mt-6 w-full max-w-xs py-3 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-transform transform hover:scale-105"
                    >
                        Entendido
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                        <p className="text-sm font-medium text-gray-500">Plan de interés:</p>
                        <p className="text-lg font-bold text-primary">{product.name} - Aportación de ${product.monthlyContribution.toLocaleString()}</p>
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
                    </div>
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono (Opcional)</label>
                        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
                    </div>
                     <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje Adicional</label>
                        <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"></textarea>
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
                                    <span>Enviando...</span>
                                </>
                            ) : (
                                <>
                                    <PaperAirplaneIcon className="h-5 w-5"/>
                                    <span>Enviar Solicitud</span>
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

export default InterestFormModal;