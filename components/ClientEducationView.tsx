import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import type { EducationalTopic } from '../types';
import EducationalModule from './EducationalModule';
import EducationalModal from './EducationalModal';
import FinancialTestModal from './FinancialTestModal';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const ClientEducationView: React.FC = () => {
    const [topics, setTopics] = useState<EducationalTopic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<EducationalTopic | null>(null);
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);

    useEffect(() => {
        const fetchTopics = async () => {
            if (!supabase) {
                setError("No se pudo conectar a la base de datos para cargar el contenido educativo.");
                setLoading(false);
                return;
            }
            const { data, error } = await supabase
                .from('educational_topics')
                .select('*');

            if (error) {
                setError(error.message);
                console.error(error);
            } else {
                setTopics(data as EducationalTopic[]);
            }
            setLoading(false);
        };

        fetchTopics();
    }, []);

    const topicsByCat: Record<string, EducationalTopic[]> = topics.reduce((acc, topic) => {
        if (!acc[topic.category]) {
            acc[topic.category] = [];
        }
        acc[topic.category].push(topic);
        return acc;
    }, {} as Record<string, EducationalTopic[]>);

    return (
        <>
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Educación Financiera</h1>
                        <p className="text-gray-500 mt-1">Fortalece tus conocimientos y toma el control de tu futuro.</p>
                    </div>
                    <button 
                        onClick={() => setIsTestModalOpen(true)}
                        className="px-4 py-2 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-transform transform hover:scale-105"
                    >
                        Pon a Prueba tu Conocimiento
                    </button>
                </div>
                
                {loading && (
                    <div className="flex justify-center items-center p-10">
                        <ArrowPathIcon className="h-8 w-8 text-primary animate-spin" />
                        <span className="ml-3 text-gray-600">Cargando contenido...</span>
                    </div>
                )}

                {error && <p className="text-center text-red-500">Error al cargar el contenido: {error}</p>}
                
                {!loading && !error && Object.entries(topicsByCat).map(([category, topics]) => (
                    <div key={category}>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">{category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {topics.map(topic => (
                                <EducationalModule key={topic.id} topic={topic} onSelectTopic={setSelectedTopic} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {selectedTopic && <EducationalModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />}
            {isTestModalOpen && <FinancialTestModal onClose={() => setIsTestModalOpen(false)} level="Basic" />}
        </>
    );
};

export default ClientEducationView;
