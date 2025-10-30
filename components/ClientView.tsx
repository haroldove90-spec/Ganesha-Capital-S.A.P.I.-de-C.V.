import React, { useState } from 'react';
import { EDUCATIONAL_TOPICS } from '../constants';
import EducationalModule from './EducationalModule';
import type { EducationalTopic } from '../types';
import EducationalModal from './EducationalModal';
import FinancialTestModal from './FinancialTestModal';
import PlanModal from './PlanModal'; // Import the new modal
import { BeakerIcon } from '@heroicons/react/24/outline';


const ClientView: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<EducationalTopic | null>(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false); // State for the new modal
  const [testLevel, setTestLevel] = useState<'Basic' | 'Intermediate' | 'Advanced'>('Basic');


  const handleOpenTopic = (topic: EducationalTopic) => {
    setSelectedTopic(topic);
  };

  const handleCloseModal = () => {
    setSelectedTopic(null);
  };

  const renderTopicsByCategory = (category: string) => {
    return EDUCATIONAL_TOPICS.filter(topic => topic.category === category).map(topic => (
      <EducationalModule key={topic.id} topic={topic} onSelectTopic={handleOpenTopic} />
    ));
  };

  return (
    <>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Tu Camino hacia la Prosperidad Financiera</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            <strong>Nuestra Misión:</strong> Empoderarte con el conocimiento y las herramientas para que tomes el control de tu futuro financiero. En GANESHA Capital, creemos en la educación como pilar para construir un patrimonio sólido y alcanzar la tranquilidad, libertad y abundancia que mereces.
          </p>
          <button 
            onClick={() => setIsPlanModalOpen(true)} // Activate the modal
            className="mt-8 px-8 py-3 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary/90 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Comienza tu Plan de Previsión
          </button>
        </div>
        
        {/* Featured Content Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Contenido Destacado</h3>
            <p className="text-gray-500 mb-6">Nuestros últimos videos para mantenerte al día en tu camino financiero.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[EDUCATIONAL_TOPICS[0], EDUCATIONAL_TOPICS[2]].map(topic => (
                     <EducationalModule key={`featured-${topic.id}`} topic={topic} onSelectTopic={handleOpenTopic} />
                ))}
            </div>
        </div>


        {/* Financial Knowledge Test Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="hidden sm:block flex-shrink-0 bg-primary/10 p-4 rounded-full">
                        <BeakerIcon className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">Pon a Prueba tu Conocimiento</h3>
                        <p className="mt-2 text-gray-600">Elige un nivel y realiza nuestro test para obtener recomendaciones personalizadas.</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 md:mt-0">
                     <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
                        {(['Basic', 'Intermediate', 'Advanced'] as const).map(level => (
                            <button
                                key={level}
                                onClick={() => setTestLevel(level)}
                                className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${testLevel === level ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                            >
                                {level === 'Basic' ? 'Básico' : level === 'Intermediate' ? 'Intermedio' : 'Avanzado'}
                            </button>
                        ))}
                    </div>
                    <button 
                        onClick={() => setIsTestModalOpen(true)}
                        className="flex-shrink-0 w-full sm:w-auto px-6 py-2.5 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary/90 transition-transform transform hover:scale-105">
                        Comenzar
                    </button>
                </div>
            </div>
        </div>


        {/* Educational Modules */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Paz Financiera</h3>
          <p className="text-gray-500 mb-6">Establece las bases para una vida financiera sin estrés.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderTopicsByCategory('Paz Financiera')}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Libertad Financiera</h3>
          <p className="text-gray-500 mb-6">Haz que tu dinero trabaje para ti y logra tus grandes objetivos.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderTopicsByCategory('Libertad Financiera')}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Abundancia Financiera</h3>
          <p className="text-gray-500 mb-6">Expande tus horizontes y crea un legado de prosperidad.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderTopicsByCategory('Abundancia Financiera')}
          </div>
        </div>

        {/* Testimonials */}
         <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Lo que dicen nuestros clientes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-100 p-6 rounded-lg">
                <p className="text-gray-600 italic">"Gracias a GANESHA Capital, por fin entiendo mis finanzas. Su enfoque educativo me dio la confianza para empezar a invertir."</p>
                <div className="flex items-center mt-4">
                  <img className="w-12 h-12 rounded-full mr-4" src="https://picsum.photos/seed/test1/100/100" alt="Avatar"/>
                  <div>
                    <p className="font-semibold text-gray-800">Ana Torres</p>
                    <p className="text-sm text-gray-500">Cliente Satisfecho</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <p className="text-gray-600 italic">"El Plan de Previsión Financiera fue la mejor decisión para mi futuro. El equipo es transparente y profesional."</p>
                <div className="flex items-center mt-4">
                  <img className="w-12 h-12 rounded-full mr-4" src="https://picsum.photos/seed/test2/100/100" alt="Avatar"/>
                  <div>
                    <p className="font-semibold text-gray-800">Carlos Rodriguez</p>
                    <p className="text-sm text-gray-500">Cliente y Defensor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

      </div>
      {selectedTopic && <EducationalModal topic={selectedTopic} onClose={handleCloseModal} />}
      {isTestModalOpen && <FinancialTestModal onClose={() => setIsTestModalOpen(false)} level={testLevel} />}
      {isPlanModalOpen && <PlanModal onClose={() => setIsPlanModalOpen(false)} />} 
    </>
  );
};

export default ClientView;