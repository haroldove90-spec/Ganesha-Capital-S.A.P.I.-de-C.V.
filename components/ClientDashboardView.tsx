import React, { useState } from 'react';
import type { EducationalTopic } from '../types';
import { EDUCATIONAL_TOPICS, MOCK_PORTFOLIO_SUMMARY, MOCK_INVESTMENTS, MOCK_PORTFOLIO_HISTORY, MOCK_NOTIFICATIONS, MOCK_FINANCIAL_GOALS, MOCK_CLIENTS } from '../constants';
import EducationalModal from './EducationalModal';
import FinancialTestModal from './FinancialTestModal';
import PlanModal from './PlanModal';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { 
    CheckBadgeIcon, 
    BanknotesIcon,
    ArrowTrendingUpIcon,
    ChartPieIcon,
    ArrowUpOnSquareIcon,
    ArrowDownOnSquareIcon,
    BellIcon,
    CalendarDaysIcon,
    AcademicCapIcon,
    CalculatorIcon,
    FlagIcon
} from '@heroicons/react/24/outline';


// Helper function to format currency
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};


const DashboardKpiCard: React.FC<{ icon: React.ElementType, title: string, value: string, color: string }> = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

const ClientDashboardView: React.FC = () => {
    const client = MOCK_CLIENTS[0]; // Use mock client data for demo purposes

    const [selectedTopic, setSelectedTopic] = useState<EducationalTopic | null>(null);
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
    const [testLevel] = useState<'Basic' | 'Intermediate' | 'Advanced'>('Basic');


    // Mock data for other sections
    const portfolio = MOCK_PORTFOLIO_SUMMARY;
    const investments = MOCK_INVESTMENTS;
    const notifications = MOCK_NOTIFICATIONS;
    const goals = MOCK_FINANCIAL_GOALS;
    
    const welcomeMessage = client.gender === 'Female' ? 'Bienvenida' : 'Bienvenido';

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Content Column */}
        <div className="xl:col-span-2 space-y-6">

            {/* Welcome & Profile Section */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{welcomeMessage} de nuevo, {client.name.split(' ')[0]}!</h2>
                        <p className="text-gray-500 mt-1">Aquí tienes un resumen de tu universo financiero.</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm font-semibold bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        <CheckBadgeIcon className="h-5 w-5" />
                        <span>KYC {client.kycStatus}</span>
                    </div>
                </div>
            </div>

            {/* Investment Panel */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Panel de Inversión</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DashboardKpiCard icon={BanknotesIcon} title="Capital Invertido" value={formatCurrency(portfolio.investedCapital)} color="bg-blue-500" />
                    <DashboardKpiCard icon={ArrowTrendingUpIcon} title="Rendimiento Total" value={formatCurrency(portfolio.totalReturn)} color="bg-green-500" />
                    <DashboardKpiCard icon={ChartPieIcon} title="ROI Total" value={`${portfolio.roiPercentage.toFixed(2)}%`} color="bg-purple-500" />
                </div>
                {/* Chart */}
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={MOCK_PORTFOLIO_HISTORY} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                             <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#132D48" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#132D48" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" stroke="gray" />
                            <YAxis stroke="gray" tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Legend />
                            <Area type="monotone" dataKey="value" name="Valor del Portafolio" stroke="#132D48" fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                 {/* Investment List */}
                <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Mis Inversiones</h4>
                    <div className="space-y-3">
                        {investments.map(inv => (
                            <div key={inv.id} className="grid grid-cols-3 gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="font-semibold text-gray-900">{inv.productName}</div>
                                <div className="text-gray-600">{formatCurrency(inv.currentValue)}</div>
                                <div className={`font-semibold ${inv.returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>{inv.returnPercentage.toFixed(2)}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Financial Tools */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Herramientas de Libertad Financiera</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Goal Tracker */}
                    {goals.map(goal => {
                        const progress = (goal.currentAmount / goal.targetAmount) * 100;
                        return (
                            <div key={goal.id} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-semibold text-gray-800 flex items-center"><FlagIcon className="h-5 w-5 mr-2"/> {goal.name}</p>
                                    <span className="text-sm font-bold text-primary">{progress.toFixed(0)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 text-right">{formatCurrency(goal.currentAmount)} de {formatCurrency(goal.targetAmount)}</p>
                            </div>
                        );
                    })}
                    {/* Financial Freedom Calculator */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                         <p className="font-semibold text-gray-800 flex items-center mb-3"><CalculatorIcon className="h-5 w-5 mr-2"/>Calculadora de Inversión</p>
                         <p className="text-xs text-gray-500">Simula tus ganancias futuras.</p>
                         <button className="mt-4 w-full text-sm bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary/90 transition-colors">
                            Simular ahora
                        </button>
                    </div>
                </div>
            </div>

        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">

            {/* Deposit & Withdraw */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-4">
                 <h3 className="text-xl font-bold text-gray-900">Movimientos</h3>
                 <button className="w-full flex items-center justify-center gap-2 py-3 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-transform transform hover:scale-105">
                    <ArrowUpOnSquareIcon className="h-5 w-5" />
                    <span>Realizar un Depósito</span>
                 </button>
                 <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors">
                    <ArrowDownOnSquareIcon className="h-5 w-5" />
                    <span>Solicitar Retiro</span>
                 </button>
            </div>
            
            {/* Notifications */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 flex items-center mb-4"><BellIcon className="h-6 w-6 mr-2"/> Notificaciones</h3>
                <div className="space-y-4">
                    {notifications.map(notif => (
                        <div key={notif.id} className="flex items-start space-x-3">
                            {!notif.read && <div className="h-2 w-2 rounded-full bg-secondary mt-1.5 flex-shrink-0"></div>}
                            <div className={notif.read ? 'pl-5' : ''}>
                                <p className="font-semibold text-gray-800 text-sm">{notif.title}</p>
                                <p className="text-xs text-gray-500">{notif.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Advisory & Education */}
             <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-4">
                 <h3 className="text-xl font-bold text-gray-900 flex items-center mb-4"><CalendarDaysIcon className="h-6 w-6 mr-2"/> Asesoría Personalizada</h3>
                 <p className="text-sm text-gray-600">¿Tienes dudas? Agenda una cita con nuestros expertos para revisar tu plan.</p>
                 <button onClick={() => setIsPlanModalOpen(true)} className="w-full py-2 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-secondary/90">
                    Agendar Cita
                 </button>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-4">
                 <h3 className="text-xl font-bold text-gray-900 flex items-center mb-4"><AcademicCapIcon className="h-6 w-6 mr-2"/> Sigue Aprendiendo</h3>
                 <p className="text-sm text-gray-600 mb-4">Refuerza tu conocimiento con estos módulos recomendados.</p>
                 <div onClick={() => setSelectedTopic(EDUCATIONAL_TOPICS[0])} className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <p className="font-semibold text-primary">{EDUCATIONAL_TOPICS[0].title}</p>
                 </div>
                 <div onClick={() => setSelectedTopic(EDUCATIONAL_TOPICS[2])} className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <p className="font-semibold text-primary">{EDUCATIONAL_TOPICS[2].title}</p>
                 </div>
                 <button onClick={() => setIsTestModalOpen(true)} className="w-full mt-2 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20">
                    Pon a Prueba tu Conocimiento
                 </button>
            </div>

        </div>

      </div>
      {selectedTopic && <EducationalModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />}
      {isTestModalOpen && <FinancialTestModal onClose={() => setIsTestModalOpen(false)} level={testLevel} />}
      {isPlanModalOpen && <PlanModal onClose={() => setIsPlanModalOpen(false)} />} 
    </>
  );
};

export default ClientDashboardView;