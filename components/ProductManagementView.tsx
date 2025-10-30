import React from 'react';
import { MOCK_FINANCIAL_PRODUCTS } from '../constants';
import { PlusIcon } from '@heroicons/react/24/outline';

const ProductManagementView: React.FC = () => {
    
    const getStatusColor = (status: 'Activo' | 'Inactivo') => {
        return status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    const getRiskColor = (risk: 'Bajo' | 'Medio' | 'Alto') => {
        if (risk === 'Bajo') return 'bg-blue-100 text-blue-800';
        if (risk === 'Medio') return 'bg-yellow-100 text-yellow-800';
        return 'bg-orange-100 text-orange-800';
    };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Productos Financieros</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-transform transform hover:scale-105">
            <PlusIcon className="h-5 w-5"/>
            <span>Crear Nuevo Plan</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Nombre del Plan</th>
                <th scope="col" className="px-6 py-3">Tipo</th>
                <th scope="col" className="px-6 py-3">Rendimiento Anual</th>
                <th scope="col" className="px-6 py-3">Riesgo</th>
                <th scope="col" className="px-6 py-3">Inversión Mínima</th>
                <th scope="col" className="px-6 py-3">Estatus</th>
                <th scope="col" className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_FINANCIAL_PRODUCTS.map((product) => (
                <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4">{product.type}</td>
                  <td className="px-6 py-4">{product.annualReturn}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(product.riskLevel)}`}>{product.riskLevel}</span>
                  </td>
                  <td className="px-6 py-4">${product.minInvestment.toLocaleString()}</td>
                  <td className="px-6 py-4">
                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>{product.status}</span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="font-medium text-primary hover:underline">Editar</button>
                    <button className="font-medium text-red-600 hover:underline">Archivar</button>
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

export default ProductManagementView;