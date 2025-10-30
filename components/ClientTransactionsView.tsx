import React from 'react';
import { MOCK_TRANSACTIONS } from '../constants';
import type { Transaction } from '../types';
import { ArrowUpOnSquareIcon, ArrowDownOnSquareIcon } from '@heroicons/react/24/outline';


const ClientTransactionsView: React.FC = () => {
    // Filter transactions for the first client for demonstration
    const clientTransactions = MOCK_TRANSACTIONS.filter(tx => tx.clientName === 'Ana Torres');

    const getStatusPill = (status: Transaction['status']) => {
        switch (status) {
            case 'Aprobado':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Aprobado</span>;
            case 'Pendiente':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pendiente</span>;
            case 'Rechazado':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Rechazado</span>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Historial de Movimientos</h1>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-transform transform hover:scale-105">
                        <ArrowUpOnSquareIcon className="h-5 w-5"/>
                        <span>Nuevo Depósito</span>
                    </button>
                     <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300">
                        <ArrowDownOnSquareIcon className="h-5 w-5"/>
                        <span>Solicitar Retiro</span>
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex justify-end items-center mb-4">
                     <div className="flex items-center gap-2">
                        <label htmlFor="filter-type" className="text-sm font-medium">Filtrar por tipo:</label>
                        <select id="filter-type" className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                            <option>Todos</option>
                            <option>Depósito</option>
                            <option>Retiro</option>
                            <option>Intereses</option>
                        </select>
                     </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Fecha</th>
                                <th scope="col" className="px-6 py-3">Tipo</th>
                                <th scope="col" className="px-6 py-3">Monto</th>
                                <th scope="col" className="px-6 py-3">Estatus</th>
                                <th scope="col" className="px-6 py-3">Comprobante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientTransactions.map((tx) => (
                                <tr key={tx.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{tx.date}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{tx.type}</td>
                                    <td className="px-6 py-4 font-mono">${tx.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                                    <td className="px-6 py-4">{getStatusPill(tx.status)}</td>
                                    <td className="px-6 py-4">
                                        {tx.status === 'Aprobado' && (
                                            <button className="font-medium text-primary hover:underline">Descargar</button>
                                        )}
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

export default ClientTransactionsView;
