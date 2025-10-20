import React from 'react';
import type { EducationalTopic } from '../types';

interface EducationalModuleProps {
  topic: EducationalTopic;
  onSelectTopic: (topic: EducationalTopic) => void;
}

const EducationalModule: React.FC<EducationalModuleProps> = ({ topic, onSelectTopic }) => {
  const { title, description, icon: Icon } = topic;

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-200 group cursor-pointer"
      onClick={() => onSelectTopic(topic)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if(e.key === 'Enter') onSelectTopic(topic)}}
      aria-label={`Aprender más sobre ${title}`}
    >
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-bold text-gray-900">{title}</h4>
          </div>
        </div>
        <p className="mt-4 text-gray-600">{description}</p>
        <div className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800 group-hover:underline">
          Aprender más &rarr;
        </div>
      </div>
    </div>
  );
};

export default EducationalModule;
