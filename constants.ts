import type { TestQuestion, Client, SocialLead, ChatEscalation, FinancialProduct, Transaction, AdminActivityLog, EducationalTopic, PortfolioSummary, Investment, Notification, FinancialGoal } from './types';
import { ShieldCheckIcon, ChartBarIcon, CurrencyDollarIcon, SparklesIcon, ScaleIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import type React from 'react';

export const TOPIC_ICONS: Record<string, (props: React.SVGProps<SVGSVGElement>) => React.ReactElement> = {
  ShieldCheckIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  ScaleIcon,
  RocketLaunchIcon,
};


export const SALES_FUNNEL_DATA = [
  { name: 'Leads', value: 120 },
  { name: 'Prospects', value: 80 },
  { name: 'Clients', value: 45 },
  { name: 'Advocates', value: 25 },
];


export const MOCK_TEST_QUESTIONS: Record<'Basic' | 'Intermediate' | 'Advanced', TestQuestion[]> = {
  Basic: [
    { id: 1, question: '¿Qué es un presupuesto?', options: ['Un plan para gastar tu dinero', 'Una forma de pedir un préstamo', 'Un tipo de inversión', 'Un impuesto del gobierno'], correctAnswer: 'Un plan para gastar tu dinero' },
    { id: 2, question: '¿Por qué es importante tener un fondo de emergencia?', options: ['Para comprar artículos de lujo', 'Para cubrir gastos inesperados sin endeudarse', 'Para invertir en la bolsa', 'Para pagar la hipoteca'], correctAnswer: 'Para cubrir gastos inesperados sin endeudarse' },
    { id: 3, question: '¿Qué significa "interés compuesto"?', options: ['Un interés que solo se paga una vez', 'Ganar intereses sobre tus intereses', 'Un tipo de tarjeta de crédito', 'Un descuento en una compra'], correctAnswer: 'Ganar intereses sobre tus intereses' },
    { id: 4, question: '¿Cuál de estos es un ejemplo de un "activo"?', options: ['Un préstamo de coche', 'Una casa de tu propiedad', 'La deuda de una tarjeta de crédito', 'Una multa por exceso de velocidad'], correctAnswer: 'Una casa de tu propiedad' },
    { id: 5, question: '¿Cuál es el propósito principal del ahorro?', options: ['Gastar más dinero en el futuro', 'Acumular dinero para metas específicas', 'Pagar las facturas diarias', 'Evitar pagar impuestos'], correctAnswer: 'Acumular dinero para metas específicas' },
  ],
  Intermediate: [
    { id: 1, question: '¿Qué es la diversificación en las inversiones?', options: ['Poner todo tu dinero en una sola acción', 'Distribuir tus inversiones en diferentes activos para reducir el riesgo', 'Invertir solo en empresas de tecnología', 'Sacar todo tu dinero del mercado'], correctAnswer: 'Distribuir tus inversiones en diferentes activos para reducir el riesgo' },
    { id: 2, question: '¿Cuál es la diferencia entre una acción y un bono?', options: ['No hay diferencia', 'Una acción es una parte de la propiedad de una empresa, un bono es un préstamo a una entidad', 'Un bono te hace dueño de la empresa', 'Una acción te garantiza un pago fijo'], correctAnswer: 'Una acción es una parte de la propiedad de una empresa, un bono es un préstamo a una entidad' },
    { id: 3, question: '¿Qué mide el puntaje de crédito (score crediticio)?', options: ['Tu nivel de ingresos', 'Tu historial educativo', 'Tu confiabilidad para pagar deudas', 'La cantidad de dinero que tienes en el banco'], correctAnswer: 'Tu confiabilidad para pagar deudas' },
    { id: 4, question: '¿Qué es un fondo de inversión indexado (index fund)?', options: ['Un fondo que intenta superar al mercado eligiendo acciones específicas', 'Un fondo que invierte en un solo tipo de industria', 'Un fondo que busca replicar el rendimiento de un índice de mercado específico, como el S&P 500', 'Un fondo gestionado por un robot'], correctAnswer: 'Un fondo que busca replicar el rendimiento de un índice de mercado específico, como el S&P 500' },
    { id: 5, question: '¿Qué es la inflación?', options: ['El aumento del valor del dinero con el tiempo', 'La tasa de interés que paga un banco', 'La disminución del poder adquisitivo de una moneda con el tiempo', 'Un impuesto sobre las ventas'], correctAnswer: 'La disminución del poder adquisitivo de una moneda con el tiempo' },
  ],
  Advanced: [
    { id: 1, question: '¿Qué son las opciones financieras (financial options)?', options: ['Diferentes tipos de cuentas de ahorro', 'Contratos que dan al comprador el derecho, pero no la obligación, de comprar o vender un activo a un precio específico en una fecha determinada', 'Acciones de empresas muy seguras', 'Un plan de jubilación ofrecido por el gobierno'], correctAnswer: 'Contratos que dan al comprador el derecho, pero no la obligación, de comprar o vender un activo a un precio específico en una fecha determinada' },
    { id: 2, question: '¿Cuál es la función principal de un "fideicomiso" (trust)?', options: ['Es una cuenta corriente con altos intereses', 'Es un vehículo legal para mantener y administrar activos en nombre de un beneficiario', 'Es un tipo de seguro de vida', 'Es una forma de evadir impuestos ilegalmente'], correctAnswer: 'Es un vehículo legal para mantener y administrar activos en nombre de un beneficiario' },
    { id: 3, question: '¿Qué es el "arbitraje" en los mercados financieros?', options: ['El proceso de elegir acciones al azar', 'La práctica de comprar y vender simultáneamente un activo en diferentes mercados para beneficiarse de una diferencia de precio', 'Un tipo de análisis técnico', 'Invertir a muy largo plazo'], correctAnswer: 'La práctica de comprar y vender simultáneamente un activo en diferentes mercados para beneficiarse de una diferencia de precio' },
    { id: 4, question: '¿Qué significa "beta" en el contexto de una acción?', options: ['La rentabilidad por dividendo de la acción', 'El precio de la acción en el último año', 'Una medida de la volatilidad de una acción en relación con el mercado en general', 'La calificación de riesgo de la empresa'], correctAnswer: 'Una medida de la volatilidad de una acción en relación con el mercado en general' },
    { id: 5, question: '¿Qué es la planificación fiscal (tax planning)?', options: ['No pagar impuestos', 'Pagar más impuestos para apoyar al gobierno', 'El análisis de una situación financiera para minimizar la obligación tributaria de manera legal', 'Declarar tus impuestos el último día posible'], correctAnswer: 'El análisis de una situación financiera para minimizar la obligación tributaria de manera legal' },
  ],
};

// Fix: Add all missing mock data exports
export const MOCK_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Ana Torres',
    dob: '1990-05-15',
    age: 34,
    gender: 'Female',
    email: 'ana.torres@example.com',
    city: 'Mexico City',
    financialKnowledge: 'Intermediate',
    joinDate: '2022-01-20',
    lastInteraction: '2024-07-18',
    salesStage: 'Client',
    role: 'Client',
    kycStatus: 'Verified',
    accountStatus: 'Active',
    phone_number: '55-1234-5678',
    address: 'Av. Insurgentes Sur 123, Roma Nte., 06700',
    birth_city: 'Puebla',
  },
  {
    id: '2',
    name: 'Carlos Gomez',
    dob: '1985-11-02',
    age: 38,
    gender: 'Male',
    email: 'carlos.gomez@example.com',
    city: 'Guadalajara',
    financialKnowledge: 'Advanced',
    joinDate: '2021-09-10',
    lastInteraction: '2024-07-20',
    salesStage: 'Advocate',
    role: 'Client',
    kycStatus: 'Verified',
    accountStatus: 'Active',
    phone_number: '33-9876-5432',
    address: null,
    birth_city: 'Guadalajara',
  },
  {
    id: '3',
    name: 'Sofia Hernandez',
    dob: '1995-02-28',
    age: 29,
    gender: 'Female',
    email: 'sofia.h@example.com',
    city: 'Monterrey',
    financialKnowledge: 'Basic',
    joinDate: '2023-03-05',
    lastInteraction: '2024-06-30',
    salesStage: 'Prospect',
    role: 'Client',
    kycStatus: 'Pending',
    accountStatus: 'Active',
    phone_number: null,
    address: null,
    birth_city: null,
  },
];

export const MOCK_SOCIAL_LEADS: SocialLead[] = [
  { id: 1, name: 'Ricardo P.', platform: 'Facebook', message: 'Hola, me gustaría saber más sobre sus planes de inversión.', timestamp: 'Julio 24, 2024, 10:30 AM' },
  { id: 2, name: 'Laura Morales', platform: 'Instagram', message: 'Vi su anuncio y quiero información sobre cómo empezar a ahorrar para mi retiro.', timestamp: 'Julio 24, 2024, 9:15 AM' },
  { id: 3, name: '+52 55 1234 5678', platform: 'WhatsApp', message: 'Info', timestamp: 'Julio 23, 2024, 6:00 PM' },
];

export const MOCK_CHAT_ESCALATIONS: ChatEscalation[] = [
  { id: 1, clientName: 'Ana Torres', lastMessage: 'No entiendo cómo ver el rendimiento de mi plan Futuro Seguro.', timestamp: 'Julio 22, 2024, 2:45 PM' },
  { id: 2, clientName: 'Carlos Gomez', lastMessage: 'Necesito ayuda para hacer un depósito adicional.', timestamp: 'Julio 21, 2024, 11:00 AM' },
];

export const MOCK_FINANCIAL_PRODUCTS: FinancialProduct[] = [
  { id: 'FP001', name: 'Plan Futuro Seguro 2040', type: 'Plan de Ahorro', riskLevel: 'Bajo', status: 'Activo', monthlyContribution: 5000, finalValue: 1500000, finalValueDescription: 'en 15 años' },
  { id: 'FP002', name: 'Fondo Crecimiento Global', type: 'Fondo de Inversión', riskLevel: 'Alto', status: 'Activo', monthlyContribution: 10000, finalValue: 4000000, finalValueDescription: 'en 20 años' },
  { id: 'FP003', name: 'Protección Retiro Total', type: 'Seguro de Retiro', riskLevel: 'Medio', status: 'Activo', monthlyContribution: 7500, finalValue: 2500000, finalValueDescription: 'al cumplir 65 años' },
  { id: 'FP004', name: 'Mi Primer Millón', type: 'Plan de Ahorro', riskLevel: 'Medio', status: 'Inactivo', monthlyContribution: 8000, finalValue: 1000000, finalValueDescription: 'en 10 años' },
  { id: 'FP005', name: 'Crédito Personal Express', type: 'Préstamo Personal', riskLevel: 'Medio', status: 'Activo', monthlyContribution: 2500, finalValue: 50000, finalValueDescription: 'a 24 meses' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TXN001', clientName: 'Ana Torres', date: 'Julio 22, 2024', type: 'Depósito', amount: 5000, status: 'Aprobado' },
  { id: 'TXN002', clientName: 'Carlos Gomez', date: 'Julio 21, 2024', type: 'Depósito', amount: 10000, status: 'Aprobado' },
  { id: 'TXN003', clientName: 'Sofia Hernandez', date: 'Julio 20, 2024', type: 'Depósito', amount: 3000, status: 'Pendiente' },
  { id: 'TXN004', clientName: 'Ana Torres', date: 'Julio 15, 2024', type: 'Intereses generados', amount: 850.75, status: 'Aprobado' },
  { id: 'TXN005', clientName: 'Carlos Gomez', date: 'Julio 10, 2024', type: 'Retiro', amount: 20000, status: 'Aprobado' },
  { id: 'TXN006', clientName: 'David Peña', date: 'Julio 09, 2024', type: 'Depósito', amount: 15000, status: 'Rechazado' },
];

export const EDUCATIONAL_TOPICS: EducationalTopic[] = [
  { id: 'et1', title: 'Construyendo tu Fondo de Emergencia', category: 'Paz Financiera', description: 'Aprende por qué un fondo de emergencia es tu primer paso hacia la seguridad financiera y cómo construirlo efectivamente.', videoUrl: 'https://www.youtube.com/embed/O5nZt_X_3wM', icon: 'ShieldCheckIcon' },
  { id: 'et2', title: 'Principios Básicos de Inversión', category: 'Paz Financiera', description: 'Descubre los conceptos fundamentales de la inversión, desde acciones y bonos hasta la importancia de la diversificación.', videoUrl: 'https://www.youtube.com/embed/O5nZt_X_3wM', icon: 'ChartBarIcon' },
  { id: 'et3', title: 'Saliendo de Deudas Inteligentemente', category: 'Paz Financiera', description: 'Estrategias probadas para manejar y eliminar deudas, recuperando el control de tus finanzas personales.', videoUrl: 'https://www.youtube.com/embed/O5nZt_X_3wM', icon: 'CurrencyDollarIcon' },
  { id: 'et4', title: 'Creando Múltiples Fuentes de Ingreso', category: 'Libertad Financiera', description: 'Explora cómo diversificar tus ingresos puede acelerar tu camino hacia la independencia económica.', videoUrl: 'https://www.youtube.com/embed/O5nZt_X_3wM', icon: 'SparklesIcon' },
  { id: 'et5', title: 'Planificación para el Retiro (PPR)', category: 'Libertad Financiera', description: 'Todo lo que necesitas saber sobre los Planes Personales de Retiro para asegurar un futuro cómodo.', videoUrl: 'https://www.youtube.com/embed/O5nZt_X_3wM', icon: 'RocketLaunchIcon' },
  { id: 'et6', title: 'Optimización Fiscal para Inversionistas', category: 'Abundancia Financiera', description: 'Aprende a maximizar tus rendimientos a través de estrategias fiscales inteligentes y legales.', videoUrl: 'https://www.youtube.com/embed/O5nZt_X_3wM', icon: 'ScaleIcon' },
];

export const MOCK_ACTIVITY_LOGS: AdminActivityLog[] = [
  { id: 1, user: 'admin@ganesha.com', action: 'Inició sesión', timestamp: 'Julio 25, 2024, 09:01 AM', ip: '187.188.130.1' },
  { id: 2, user: 'admin@ganesha.com', action: 'Consultó el perfil del cliente: Ana Torres', timestamp: 'Julio 25, 2024, 09:05 AM', ip: '187.188.130.1' },
  { id: 3, user: 'soporte@ganesha.com', action: 'Inició sesión', timestamp: 'Julio 25, 2024, 09:15 AM', ip: '201.144.100.5' },
  { id: 4, user: 'admin@ganesha.com', action: 'Agregó nuevo producto: Fondo Crecimiento Global', timestamp: 'Julio 24, 2024, 03:30 PM', ip: '187.188.130.1' },
  { id: 5, user: 'soporte@ganesha.com', action: 'Resolvió ticket de soporte #1', timestamp: 'Julio 24, 2024, 11:45 AM', ip: '201.144.100.5' },
];

export const MOCK_PORTFOLIO_SUMMARY: PortfolioSummary = {
    investedCapital: 150000,
    currentValue: 162500,
    totalReturn: 12500,
    roiPercentage: 8.33,
};

export const MOCK_INVESTMENTS: Investment[] = [
    { id: 'inv1', productName: 'Plan Futuro Seguro 2040', category: 'Plan de Ahorro', investedAmount: 100000, currentValue: 108000, returnPercentage: 8.00 },
    { id: 'inv2', productName: 'Fondo Crecimiento Global', category: 'Fondo de Inversión', investedAmount: 50000, currentValue: 54500, returnPercentage: 9.00 },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 1, title: 'Depósito Aprobado', description: 'Tu depósito de $5,000.00 a tu Plan Futuro Seguro 2040 ha sido aplicado.', timestamp: 'hace 2 días', read: false },
    { id: 2, title: 'Resumen Mensual Disponible', description: 'Tu estado de cuenta de Junio ya está disponible para consulta.', timestamp: 'hace 3 semanas', read: true },
    { id: 3, title: '¡Nuevo Módulo Educativo!', description: 'Aprende sobre Optimización Fiscal para Inversionistas.', timestamp: 'hace 1 mes', read: true },
];

export const MOCK_FINANCIAL_GOALS: FinancialGoal[] = [
    { id: 1, name: 'Enganche para Casa', targetAmount: 500000, currentAmount: 162500, deadline: '2027-12-31' },
    { id: 2, name: 'Fondo para el Retiro', targetAmount: 5000000, currentAmount: 350000, deadline: '2050-01-01' },
];

// Mock data for charts that would typically be aggregated from a database
export const MOCK_PORTFOLIO_HISTORY = [
  { month: 'Ene', value: 150000 },
  { month: 'Feb', value: 151000 },
  { month: 'Mar', value: 153500 },
  { month: 'Abr', value: 155000 },
  { month: 'May', value: 158200 },
  { month: 'Jun', value: 160100 },
  { month: 'Jul', value: 162500 },
];