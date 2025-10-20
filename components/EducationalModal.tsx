import React, { useEffect } from 'react';
import type { EducationalTopic } from '../types';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShareIcon } from '@heroicons/react/24/outline';


interface EducationalModalProps {
  topic: EducationalTopic;
  onClose: () => void;
}

const EducationalModal: React.FC<EducationalModalProps> = ({ topic, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Simple social share links
    const shareUrl = window.location.href;
    const shareTitle = `Echa un vistazo a este recurso de GANESHA Capital: ${topic.title}`;
    const socialLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`,
    };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="educational-modal-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="educational-modal-title" className="text-xl font-bold text-gray-800">{topic.title}</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800"
            aria-label="Cerrar modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </header>

        <div className="p-6 overflow-y-auto">
          <div className="aspect-w-16 aspect-h-9 mb-6 bg-gray-200 rounded-lg overflow-hidden">
             <iframe 
                src={topic.videoUrl} 
                title={topic.title} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
            ></iframe>
          </div>
          <p className="text-gray-600 mb-6">{topic.description}</p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
             <h4 className="font-bold text-blue-800">¿Listo para el siguiente paso?</h4>
             <p className="text-sm text-blue-700 mt-1">Aplica este conocimiento a tu futuro. Descubre cómo nuestros Planes de Previsión Financiera pueden ayudarte a alcanzar tus metas.</p>
             <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105">
                Conocer los Planes
             </button>
          </div>

        </div>
        
        <footer className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3 flex-shrink-0">
            <span className="text-sm font-medium text-gray-600">Compartir:</span>
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700" aria-label="Compartir en Facebook"><ShareIcon className="h-5 w-5"/></a>
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500" aria-label="Compartir en Twitter"><ShareIcon className="h-5 w-5"/></a>
            <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500" aria-label="Compartir en WhatsApp"><ShareIcon className="h-5 w-5"/></a>
        </footer>
      </div>
    </div>
  );
};

export default EducationalModal;
