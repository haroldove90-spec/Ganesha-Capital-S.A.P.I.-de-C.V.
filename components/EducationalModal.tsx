import React, { useEffect } from 'react';
import type { EducationalTopic } from '../types';
import { XMarkIcon } from '@heroicons/react/24/solid';

// SVG Icon Components for Social Media
const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5.05 3.66 9.21 8.44 9.94v-7.03H7.9v-2.91h2.54V9.82c0-2.52 1.49-3.93 3.78-3.93 1.1 0 2.24.2 2.24.2v2.47h-1.29c-1.25 0-1.62.76-1.62 1.56v1.88h2.78l-.45 2.91h-2.33v7.03c4.78-.73 8.44-4.89 8.44-9.94C22 6.53 17.5 2.04 12 2.04z"/>
    </svg>
);

const TwitterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);

const WhatsAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.12c-1.48 0-2.91-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.69-8.23 8.23-8.23 4.54 0 8.23 3.69 8.23 8.23s-3.69 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.82-.23-.09-.39-.12-.56.12-.17.25-.64.82-.79.98-.15.17-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.09-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.76 2.68 4.27 3.77 2.51 1.08 2.51.72 2.96.69.45-.03 1.47-.6 1.67-1.18.21-.58.21-1.08.14-1.18-.05-.12-.2-.18-.44-.3z"/>
    </svg>
);


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
          <h2 id="educational-modal-title" className="text-xl font-bold text-gray-900">{topic.title}</h2>
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
          
          <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
             <h4 className="font-bold text-primary">{`¿Listo para el siguiente paso?`}</h4>
             <p className="text-sm text-primary/90 mt-1">Aplica este conocimiento a tu futuro. Descubre cómo nuestros Planes de Previsión Financiera pueden ayudarte a alcanzar tus metas.</p>
             <button className="mt-3 px-4 py-2 bg-secondary text-black text-sm font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-transform transform hover:scale-105">
                Conocer los Planes
             </button>
          </div>

        </div>
        
        <footer className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-4 flex-shrink-0">
            <span className="text-sm font-medium text-gray-600">Compartir este video:</span>
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#1877F2] transition-colors" aria-label="Compartir en Facebook"><FacebookIcon className="h-6 w-6"/></a>
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors" aria-label="Compartir en Twitter"><TwitterIcon className="h-6 w-6"/></a>
            <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#25D366] transition-colors" aria-label="Compartir en WhatsApp"><WhatsAppIcon className="h-6 w-6"/></a>
        </footer>
      </div>
    </div>
  );
};

export default EducationalModal;