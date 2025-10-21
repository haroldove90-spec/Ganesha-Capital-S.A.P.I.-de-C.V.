import type { Client, EducationalTopic, SocialLead, ChatEscalation } from './types';
import { ShieldCheckIcon, ChartBarIcon, CurrencyDollarIcon, SparklesIcon, ScaleIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';


export const MOCK_CLIENTS: Client[] = [
  { id: 1, name: 'Ana Torres', dob: '1990-05-15', age: 34, gender: 'Female', email: 'ana.torres@example.com', city: 'Mexico City', financialKnowledge: 'Intermediate', joinDate: '2023-01-20', lastInteraction: '2024-07-15', salesStage: 'Client' },
  { id: 2, name: 'Carlos Rodriguez', dob: '1985-11-22', age: 38, gender: 'Male', email: 'carlos.r@example.com', city: 'Guadalajara', financialKnowledge: 'Advanced', joinDate: '2022-11-10', lastInteraction: '2024-07-20', salesStage: 'Advocate' },
  { id: 3, name: 'Sofia Gomez', dob: '1998-02-10', age: 26, gender: 'Female', email: 'sofia.g@example.com', city: 'Monterrey', financialKnowledge: 'Basic', joinDate: '2024-03-05', lastInteraction: '2024-07-22', salesStage: 'Prospect' },
  { id: 4, name: 'Javier Fernandez', dob: '1992-08-30', age: 31, gender: 'Male', email: 'javier.f@example.com', city: 'Puebla', financialKnowledge: 'Intermediate', joinDate: '2023-09-01', lastInteraction: '2024-06-30', salesStage: 'Client' },
  { id: 5, name: 'Laura Martinez', dob: '2000-07-07', age: 24, gender: 'Female', email: 'laura.m@example.com', city: 'Cancun', financialKnowledge: 'Basic', joinDate: '2024-06-12', lastInteraction: '2024-07-25', salesStage: 'Lead' },
  { id: 6, name: 'David Lopez', dob: '1980-03-12', age: 44, gender: 'Male', email: 'david.l@example.com', city: 'Tijuana', financialKnowledge: 'Advanced', joinDate: '2021-05-18', lastInteraction: '2024-07-18', salesStage: 'Client' },
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
