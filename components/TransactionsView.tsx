import React from 'react';
import { MOCK_TRANSACTIONS } from '../constants';
import type { Transaction } from '../types';

const TransactionsView: React.FC = () => {

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
            <h1 className="text-2xl font-bold text-gray-900">Control de Movimientos</h1>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                     <h2 className="text-lg font-semibold text-gray-700">Historial de Transacciones</h2>
                     <div className="flex items-center gap-2">
                        <label htmlFor="filter-status" className="text-sm font-medium">Filtrar por estatus:</label>
                        <select id="filter-status" className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                            <option>Todos</option>
                            <option>Aprobado</option>
                            <option>Pendiente</option>
                            <option>Rechazado</option>
                        </select>
                     </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Cliente</th>
                                <th scope="col" className="px-6 py-3">Fecha</th>
                                <th scope="col" className="px-6 py-3">Tipo</th>
                                <th scope="col" className="px-6 py-3">Monto</th>
                                <th scope="col" className="px-6 py-3">Estatus</th>
                                <th scope="col" className="px-6 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_TRANSACTIONS.map((tx) => (
                                <tr key={tx.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{tx.clientName}</td>
                                    <td className="px-6 py-4">{tx.date}</td>
                                    <td className="px-6 py-4">{tx.type}</td>
                                    <td className="px-6 py-4 font-mono">${tx.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                                    <td className="px-6 py-4">{getStatusPill(tx.status)}</td>
                                    <td className="px-6 py-4">
                                        {tx.status === 'Pendiente' ? (
                                            <div className="flex gap-2">
                                                <button className="font-medium text-green-600 hover:underline">Aprobar</button>
                                                <button className="font-medium text-red-600 hover:underline">Rechazar</button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">-</span>
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

export default TransactionsView;