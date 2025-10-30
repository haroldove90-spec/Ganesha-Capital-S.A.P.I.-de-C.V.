
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { SALES_FUNNEL_DATA } from '../constants';

const KpiCard: React.FC<{ title: string; value: string; change: string; isPositive: boolean }> = ({ title, value, change, isPositive }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    <p className={`text-sm mt-2 flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isPositive ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17l5-5m0 0l-5-5m5 5H6"></path>}
        </svg>
      {change} vs mes anterior
    </p>
  </div>
);

const SalesFunnelChart: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Embudo de Ventas</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SALES_FUNNEL_DATA} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip wrapperClassName="rounded-md shadow-lg border-none" contentStyle={{backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)'}}/>
                    <Legend />
                    <Bar dataKey="value" fill="#132D48" barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const ClientKnowledgeChart: React.FC = () => {
    const data = [
        { name: 'Básico', value: 25 },
        { name: 'Intermedio', value: 45 },
        { name: 'Avanzado', value: 30 },
    ];
    const COLORS = ['#BA933D', '#132D48', '#5e768e'];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Conocimiento Financiero de Clientes</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={110}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

const UserGrowthChart: React.FC = () => {
    const data = [
      { name: 'Ene', clientes: 12 },
      { name: 'Feb', clientes: 19 },
      { name: 'Mar', clientes: 25 },
      { name: 'Abr', clientes: 34 },
      { name: 'May', clientes: 45 },
      { name: 'Jun', clientes: 58 },
      { name: 'Jul', clientes: 72 },
    ];
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Crecimiento de Clientes (2024)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="clientes" stroke="#132D48" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};


const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Nuevos Usuarios (Mes)" value="14" change="+12.5%" isPositive={true} />
        <KpiCard title="Monto Total Invertido" value="$1.2M" change="+$150k" isPositive={true} />
        <KpiCard title="Tasa de Conversión" value="37.5%" change="-1.8%" isPositive={false} />
        <KpiCard title="ROI Promedio" value="8.2%" change="+0.5%" isPositive={true} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesFunnelChart />
        <ClientKnowledgeChart />
      </div>
       <div className="grid grid-cols-1 gap-6">
        <UserGrowthChart />
      </div>
    </div>
  );
};

export default Analytics;