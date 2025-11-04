import type { Client, EducationalTopic, SocialLead, ChatEscalation, TestQuestion, FinancialProduct, Transaction, AdminActivityLog, PortfolioSummary, Investment, Notification, FinancialGoal } from './types';
import { ShieldCheckIcon, ChartBarIcon, CurrencyDollarIcon, SparklesIcon, ScaleIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';


export const MOCK_CLIENTS: Client[] = [
  { id: 1, name: 'Ana Torres', dob: '1990-05-15', age: 34, gender: 'Female', email: 'ana.torres@example.com', city: 'Mexico City', financialKnowledge: 'Intermediate', joinDate: '2023-01-20', lastInteraction: '2024-07-15', salesStage: 'Client', role: 'Client', kycStatus: 'Verified', accountStatus: 'Active' },
  { id: 2, name: 'Carlos Rodriguez', dob: '1985-11-22', age: 38, gender: 'Male', email: 'carlos.r@example.com', city: 'Guadalajara', financialKnowledge: 'Advanced', joinDate: '2022-11-10', lastInteraction: '2024-07-20', salesStage: 'Advocate', role: 'Client', kycStatus: 'Verified', accountStatus: 'Active' },
  { id: 3, name: 'Sofia Gomez', dob: '1998-02-10', age: 26, gender: 'Female', email: 'sofia.g@example.com', city: 'Monterrey', financialKnowledge: 'Basic', joinDate: '2024-03-05', lastInteraction: '2024-07-22', salesStage: 'Prospect', role: 'Client', kycStatus: 'Pending', accountStatus: 'Active' },
  { id: 4, name: 'Javier Fernandez', dob: '1992-08-30', age: 31, gender: 'Male', email: 'javier.f@example.com', city: 'Puebla', financialKnowledge: 'Intermediate', joinDate: '2023-09-01', lastInteraction: '2024-06-30', salesStage: 'Client', role: 'Client', kycStatus: 'Verified', accountStatus: 'Active' },
  { id: 5, name: 'Laura Martinez', dob: '2000-07-07', age: 24, gender: 'Female', email: 'laura.m@example.com', city: 'Cancun', financialKnowledge: 'Basic', joinDate: '2024-06-12', lastInteraction: '2024-07-25', salesStage: 'Lead', role: 'Client', kycStatus: 'Rejected', accountStatus: 'Suspended' },
  { id: 6, name: 'David Lopez', dob: '1980-03-12', age: 44, gender: 'Male', email: 'david.l@example.com', city: 'Tijuana', financialKnowledge: 'Advanced', joinDate: '2021-05-18', lastInteraction: '2024-07-18', salesStage: 'Client', role: 'Client', kycStatus: 'Verified', accountStatus: 'Active' },
];

export const EDUCATIONAL_TOPICS: EducationalTopic[] = [
    {
      id: 'pf1',
      title: 'Construyendo tu Fondo de Emergencia',
      category: 'Paz Financiera',
      description: 'Aprende la importancia de tener un colchón financiero y cómo construirlo paso a paso para afrontar imprevistos sin estrés.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      icon: ShieldCheckIcon,
    },
    {
      id: 'pf2',
      title: 'Entendiendo y Manejando Deudas',
      category: 'Paz Financiera',
      description: 'Estrategias efectivas para organizar, priorizar y eliminar deudas, recuperando el control de tus finanzas personales.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      icon: ScaleIcon,
    },
    {
      id: 'lf1',
      title: 'Principios de Inversión para Principiantes',
      category: 'Libertad Financiera',
      description: 'Descubre los conceptos básicos de la inversión, desde acciones hasta fondos, y cómo hacer que tu dinero trabaje para ti.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      icon: ChartBarIcon,
    },
    {
      id: 'lf2',
      title: 'Planificación para el Retiro',
      category: 'Libertad Financiera',
      description: 'Explora diferentes vehículos de ahorro para el retiro y cómo establecer metas realistas para un futuro financiero seguro.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      icon: RocketLaunchIcon,
    },
    {
      id: 'af1',
      title: 'Creando Múltiples Fuentes de Ingreso',
      category: 'Abundancia Financiera',
      description: 'Ideas y estrategias para diversificar tus ingresos más allá de tu salario principal, acelerando tu camino hacia la abundancia.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      icon: CurrencyDollarIcon,
    },
    {
      id: 'af2',
      title: 'Mentalidad de Abundancia y Crecimiento',
      category: 'Abundancia Financiera',
      description: 'Cómo cultivar una mentalidad que atraiga oportunidades y te permita tomar decisiones financieras más audaces y estratégicas.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      icon: SparklesIcon,
    },
];

export const SALES_FUNNEL_DATA = [
  { name: 'Leads', value: 120 },
  { name: 'Prospects', value: 80 },
  { name: 'Clients', value: 45 },
  { name: 'Advocates', value: 25 },
];

export const MOCK_SOCIAL_LEADS: SocialLead[] = [
  { id: 1, name: 'Ricardo Morales', platform: 'Instagram', message: 'Hola, me interesa saber más sobre sus planes de inversión.', timestamp: '2024-07-26 10:30 AM' },
  { id: 2, name: 'Lucia Fernandez', platform: 'Facebook', message: 'Vi su video sobre fondos de emergencia y tengo una pregunta.', timestamp: '2024-07-26 09:15 AM' },
  { id: 3, name: 'Jorge Campos', platform: 'WhatsApp', message: 'Me gustaría agendar una asesoría.', timestamp: '2024-07-25 04:55 PM' },
];

export const MOCK_CHAT_ESCALATIONS: ChatEscalation[] = [
    { id: 1, clientName: 'Sofia Gomez', lastMessage: 'No entiendo la diferencia entre interés simple y compuesto, ¿me puede ayudar un asesor?', timestamp: '2024-07-26 11:00 AM' },
    { id: 2, clientName: 'Javier Fernandez', lastMessage: 'Quiero hablar con alguien sobre mi plan actual.', timestamp: '2024-07-25 02:10 PM' },
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

// Se han actualizado los planes según la solicitud, corrigiendo un posible error en el valor del tercer plan para mantener la coherencia.
export const MOCK_FINANCIAL_PRODUCTS: FinancialProduct[] = [
    { id: 'FP001', name: '47 Años', type: 'Plan de Ahorro', riskLevel: 'Bajo', status: 'Activo', monthlyContribution: 2000, finalValue: 1050204, finalValueDescription: 'a tus 65 años' },
    { id: 'FP002', name: '47 Años', type: 'Plan de Ahorro', riskLevel: 'Bajo', status: 'Activo', monthlyContribution: 3000, finalValue: 1622207, finalValueDescription: 'a tus 65 años' },
    { id: 'FP003', name: '47 Años', type: 'Plan de Ahorro', riskLevel: 'Bajo', status: 'Activo', monthlyContribution: 4000, finalValue: 2189551, finalValueDescription: 'a tus 65 años' },
    { id: 'FP004', name: '47 Años', type: 'Plan de Ahorro', riskLevel: 'Bajo', status: 'Activo', monthlyContribution: 5000, finalValue: 2768541, finalValueDescription: 'a tus 65 años' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 'TRN001', clientName: 'Ana Torres', date: '2024-07-25', type: 'Depósito', amount: 10000, status: 'Aprobado' },
    { id: 'TRN002', clientName: 'Carlos Rodriguez', date: '2024-07-24', type: 'Retiro', amount: 5000, status: 'Aprobado' },
    { id: 'TRN003', clientName: 'Sofia Gomez', date: '2024-07-23', type: 'Depósito', amount: 7500, status: 'Pendiente' },
    { id: 'TRN004', clientName: 'Javier Fernandez', date: '2024-07-22', type: 'Intereses generados', amount: 350.75, status: 'Aprobado' },
    { id: 'TRN005', clientName: 'Ana Torres', date: '2024-07-21', type: 'Retiro', amount: 2000, status: 'Rechazado' },
];

export const MOCK_ACTIVITY_LOGS: AdminActivityLog[] = [
    { id: 1, user: 'admin@ganesha.com', action: 'Aprobó la transacción TRN002', timestamp: '2024-07-26 10:05 AM', ip: '192.168.1.10' },
    { id: 2, user: 'support@ganesha.com', action: 'Editó el perfil del cliente ID: 3', timestamp: '2024-07-26 09:45 AM', ip: '201.150.33.12' },
    { id: 3, user: 'admin@ganesha.com', action: 'Creó el nuevo producto financiero FP005', timestamp: '2024-07-25 03:20 PM', ip: '192.168.1.10' },
    { id: 4, user: 'auditor@ganesha.com', action: 'Inició sesión', timestamp: '2024-07-25 09:00 AM', ip: '187.210.55.98' },
];

// Mock data for the new Client Dashboard
export const MOCK_PORTFOLIO_SUMMARY: PortfolioSummary = {
    investedCapital: 150000,
    currentValue: 162500,
    totalReturn: 12500,
    roiPercentage: 8.33,
};

export const MOCK_INVESTMENTS: Investment[] = [
    { id: 'INV001', productName: 'Fondo Crecimiento Global', category: 'Fondo de Inversión', investedAmount: 75000, currentValue: 82500, returnPercentage: 10.0 },
    { id: 'INV002', productName: 'Plan Futuro Seguro 2040', category: 'Plan de Ahorro', investedAmount: 50000, currentValue: 52500, returnPercentage: 5.0 },
    { id: 'INV003', productName: 'Retiro Dorado Plus', category: 'Seguro de Retiro', investedAmount: 25000, currentValue: 27500, returnPercentage: 10.0 },
];

export const MOCK_PORTFOLIO_HISTORY = [
  { month: 'Ene', value: 150000 },
  { month: 'Feb', value: 151000 },
  { month: 'Mar', value: 153500 },
  { month: 'Abr', value: 155000 },
  { month: 'May', value: 158200 },
  { month: 'Jun', value: 160100 },
  { month: 'Jul', value: 162500 },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 1, title: 'Intereses generados', description: 'Has recibido $350.75 en tu "Plan Futuro Seguro 2040".', timestamp: 'hace 2 días', read: false },
    { id: 2, title: 'Nuevo Módulo Educativo', description: '¡No te pierdas nuestro nuevo video sobre "Mentalidad de Abundancia"!', timestamp: 'hace 5 días', read: false },
    { id: 3, title: 'Depósito Confirmado', description: 'Tu depósito de $10,000.00 ha sido aprobado.', timestamp: 'hace 1 semana', read: true },
];

export const MOCK_FINANCIAL_GOALS: FinancialGoal[] = [
    { id: 1, name: 'Enganche para casa', targetAmount: 300000, currentAmount: 120000, deadline: '2026-12-31' },
];