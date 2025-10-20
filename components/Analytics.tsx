
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { SALES_FUNNEL_DATA } from '../constants';

const KpiCard: React.FC<{ title: string; value: string; change: string; isPositive: boolean }> = ({ title, value, change, isPositive }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    <p className={`text-sm mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
      {change}
    </p>
  </div>
);

const SalesFunnelChart: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Sales Funnel</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SALES_FUNNEL_DATA} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip wrapperClassName="rounded-md shadow-lg border-none" contentStyle={{backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)'}}/>
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const ClientKnowledgeChart: React.FC = () => {
    const data = [
        { name: 'Basic', value: 400 },
        { name: 'Intermediate', value: 300 },
        { name: 'Advanced', value: 300 },
    ];
    const COLORS = ['#facc15', '#60a5fa', '#3b82f6'];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Client Financial Knowledge</h3>
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
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="New Clients (Month)" value="45" change="+12.5%" isPositive={true} />
        <KpiCard title="Total Leads" value="120" change="+5.2%" isPositive={true} />
        <KpiCard title="Conversion Rate" value="37.5%" change="-1.8%" isPositive={false} />
        <KpiCard title="Avg. Response Time" value="2.1h" change="-0.3h" isPositive={true} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesFunnelChart />
        <ClientKnowledgeChart />
      </div>
    </div>
  );
};

export default Analytics;
