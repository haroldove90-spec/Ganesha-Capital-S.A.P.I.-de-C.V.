import React from 'react';
import { MOCK_FINANCIAL_PRODUCTS } from '../constants';
import type { FinancialProduct } from '../types';
import { ChartBarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const FinancialPlansView: React.FC = () => {

    const getRiskColor = (risk: 'Bajo' | 'Medio' | 'Alto') => {
        if (risk === 'Bajo') return 'bg-blue-100 text-blue-800';
        if (risk === 'Medio') return 'bg-yellow-100 text-yellow-800';
        return 'bg-orange-100 text-orange-800';
    };

    const ProductCard: React.FC<{ product: FinancialProduct }> = ({ product }) => (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                <span className="text-xs font-semibold uppercase text-secondary">{product.type}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-1">{product.name}</h3>
                <div className="mt-2 flex items-center">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getRiskColor(product.riskLevel)}`}>
                        Riesgo {product.riskLevel}
                    </span>
                </div>
            </div>
            <div className="p-6 bg-gray-50 flex-grow space-y-4">
                <div className="flex items-center">
                    <ChartBarIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-gray-500">Rendimiento Anual Estimado</p>
                        <p className="font-bold text-gray-900">{product.annualReturn}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <CurrencyDollarIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-gray-500">Inversión Mínima</p>
                        <p className="font-bold text-gray-900">${product.minInvestment.toLocaleString()}</p>
                    </div>
                </div>
            </div>
            <div className="p-4 border-t border-gray-200 mt-auto">
                <button className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                    Solicitar Información
                </button>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Planes de Previsión Financiera</h1>
                <p className="text-gray-500 mt-1">Descubre los planes y fondos que tenemos para ayudarte a alcanzar tus metas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {MOCK_FINANCIAL_PRODUCTS.filter(p => p.status === 'Activo').map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default FinancialPlansView;