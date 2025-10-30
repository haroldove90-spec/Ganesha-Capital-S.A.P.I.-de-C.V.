import React from 'react';
import { EDUCATIONAL_TOPICS } from '../constants';
import { PlusIcon } from '@heroicons/react/24/outline';

const AdminEducationalView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Contenido Educativo</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-black font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-transform transform hover:scale-105">
            <PlusIcon className="h-5 w-5"/>
            <span>Publicar Nuevo Módulo</span>
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Título del Módulo</th>
                <th scope="col" className="px-6 py-3">Categoría</th>
                <th scope="col" className="px-6 py-3">Vistas</th>
                <th scope="col" className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {EDUCATIONAL_TOPICS.map((topic) => (
                <tr key={topic.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{topic.title}</td>
                  <td className="px-6 py-4">{topic.category}</td>
                  <td className="px-6 py-4">{Math.floor(Math.random() * 500) + 50}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="font-medium text-primary hover:underline">Editar</button>
                    <button className="font-medium text-blue-600 hover:underline">Estadísticas</button>
                     <button className="font-medium text-red-600 hover:underline">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminEducationalView;