import React from 'react';
import { MOCK_FINANCIAL_GOALS } from '../constants';
import { CalculatorIcon, FlagIcon, LightBulbIcon } from '@heroicons/react/24/outline';

// Helper function to format currency
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const ClientToolsView: React.FC = () => {
    const goals = MOCK_FINANCIAL_GOALS;

    return (
        <div className="space-y-6">
             <h1 className="text-2xl font-bold text-gray-900">Herramientas de Libertad Financiera</h1>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Goal Tracker Card */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <FlagIcon className="h-6 w-6 mr-2 text-primary" />
                        Seguimiento de Metas
                    </h3>
                    <div className="space-y-4">
                        {goals.map(goal => {
                            const progress = (goal.currentAmount / goal.targetAmount) * 100;
                            return (
                                <div key={goal.id} className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-semibold text-gray-800">{goal.name}</p>
                                        <span className="text-sm font-bold text-primary">{progress.toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 text-right">{formatCurrency(goal.currentAmount)} de {formatCurrency(goal.targetAmount)}</p>
                                </div>
                            );
                        })}
                        <button className="w-full text-sm border-2 border-dashed border-gray-300 text-gray-500 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-colors">
                            + Agregar Nueva Meta
                        </button>
                    </div>
                </div>

                {/* Calculator Card */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                     <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <CalculatorIcon className="h-6 w-6 mr-2 text-primary" />
                        Calculadora de Inversión
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="initial-investment" className="block text-sm font-medium text-gray-700">Inversión Inicial ($)</label>
                            <input type="number" id="initial-investment" defaultValue="10000" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>
                         <div>
                            <label htmlFor="monthly-contribution" className="block text-sm font-medium text-gray-700">Aportación Mensual ($)</label>
                            <input type="number" id="monthly-contribution" defaultValue="500" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>
                         <div>
                            <label htmlFor="years" className="block text-sm font-medium text-gray-700">Periodo (Años)</label>
                            <input type="number" id="years" defaultValue="10" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>
                         <button className="w-full text-sm bg-secondary text-white font-bold py-3 px-4 rounded-lg hover:bg-secondary/90 transition-colors">
                            Calcular Proyección
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-r-lg">
                <div className="flex">
                    <div className="py-1"><LightBulbIcon className="h-6 w-6 text-blue-500 mr-4"/></div>
                    <div>
                        <p className="font-bold">Reporte de Salud Financiera</p>
                        <p className="text-sm">Próximamente podrás generar un reporte completo para entender mejor tu situación financiera y recibir recomendaciones personalizadas.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ClientToolsView;
