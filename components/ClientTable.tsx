import React, { useState, useMemo } from 'react';
import type { Client } from '../types';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface ClientTableProps {
  clients: Client[];
  selectedClient: Client | null;
  onSelectClient: (client: Client) => void;
}

type SortKey = keyof Client;

const KycStatusPill: React.FC<{ status: Client['kycStatus'] }> = ({ status }) => {
  const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full inline-block';
  switch (status) {
    case 'Verified': return <span className={`${baseClasses} bg-green-100 text-green-800`}>Verificado</span>;
    case 'Pending': return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pendiente</span>;
    case 'Rejected': return <span className={`${baseClasses} bg-red-100 text-red-800`}>Rechazado</span>;
    default: return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
  }
};

const AccountStatusPill: React.FC<{ status: Client['accountStatus'] }> = ({ status }) => {
    const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full inline-block';
    switch (status) {
        case 'Active': return <span className={`${baseClasses} bg-green-100 text-green-800`}>Activo</span>;
        case 'Suspended': return <span className={`${baseClasses} bg-red-100 text-red-800`}>Suspendido</span>;
        default: return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
};

const SortableHeader: React.FC<{
    sortKey: SortKey;
    label: string;
    sortConfig: { key: SortKey; direction: string } | null;
    requestSort: (key: SortKey) => void;
}> = ({ sortKey, label, sortConfig, requestSort }) => {
    const isSorted = sortConfig?.key === sortKey;
    const directionIcon = isSorted ? (
        sortConfig.direction === 'ascending' ? <ArrowUpIcon className="h-3 w-3" /> : <ArrowDownIcon className="h-3 w-3" />
    ) : null;

    return (
        <th scope="col" className="px-3 py-3">
            <button
                onClick={() => requestSort(sortKey)}
                className="group flex items-center gap-2"
            >
                {label}
                <span className={`transition-opacity ${isSorted ? 'opacity-100' : 'opacity-25 group-hover:opacity-100'}`}>
                    {directionIcon}
                </span>
            </button>
        </th>
    );
};

const ClientTable: React.FC<ClientTableProps> = ({ clients, selectedClient, onSelectClient }) => {
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: string } | null>({ key: 'name', direction: 'ascending' });

    const sortedClients = useMemo(() => {
        let sortableClients = [...clients];
        if (sortConfig !== null) {
            sortableClients.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                
                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableClients;
    }, [clients, sortConfig]);

    const requestSort = (key: SortKey) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="overflow-x-auto">
            {clients.length > 0 ? (
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <SortableHeader sortKey="name" label="Nombre" sortConfig={sortConfig} requestSort={requestSort} />
                            <SortableHeader sortKey="email" label="Email" sortConfig={sortConfig} requestSort={requestSort} />
                            <SortableHeader sortKey="kycStatus" label="KYC" sortConfig={sortConfig} requestSort={requestSort} />
                            <SortableHeader sortKey="accountStatus" label="Cuenta" sortConfig={sortConfig} requestSort={requestSort} />
                        </tr>
                    </thead>
                    <tbody>
                        {sortedClients.map(client => (
                            <tr
                                key={client.id}
                                onClick={() => onSelectClient(client)}
                                className={`border-b cursor-pointer ${
                                    selectedClient?.id === client.id
                                        ? 'bg-primary/10'
                                        : 'hover:bg-gray-50'
                                }`}
                            >
                                <td className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap">{client.name}</td>
                                <td className="px-3 py-3 whitespace-nowrap">{client.email}</td>
                                <td className="px-3 py-3"><KycStatusPill status={client.kycStatus} /></td>
                                <td className="px-3 py-3"><AccountStatusPill status={client.accountStatus} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-sm text-gray-500 text-center mt-4">No se encontraron clientes que coincidan con la búsqueda.</p>
            )}
        </div>
    );
};

export default ClientTable;