import type React from 'react';

export interface Client {
  id: number;
  name: string;
  dob: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  city: string;
  financialKnowledge: 'Basic' | 'Intermediate' | 'Advanced';
  joinDate: string;
  lastInteraction: string;
  salesStage: 'Lead' | 'Prospect' | 'Client' | 'Advocate';
  role: 'Client' | 'Admin' | 'Auditor';
  kycStatus: 'Verified' | 'Pending' | 'Rejected';
  accountStatus: 'Active' | 'Suspended';
}

export interface ChatMessage {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface EducationalTopic {
  id: string;
  title: string;
  category: 'Paz Financiera' | 'Libertad Financiera' | 'Abundancia Financiera';
  description: string;
  videoUrl: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}

export interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface UserAnswer {
  questionId: number;
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface TestResult {
  score: number;
  feedback: string;
  recommendations: string[];
}

export interface SocialLead {
  id: number;
  name: string;
  platform: 'Facebook' | 'Instagram' | 'WhatsApp';
  message: string;
  timestamp: string;
}

export interface ChatEscalation {
  id: number;
  clientName: string;
  lastMessage: string;
  timestamp: string;
}

export interface FinancialProduct {
  id: string;
  name: string;
  type: 'Fondo de Inversión' | 'Plan de Ahorro' | 'Seguro de Retiro';
  annualReturn: string;
  riskLevel: 'Bajo' | 'Medio' | 'Alto';
  minInvestment: number;
  status: 'Activo' | 'Inactivo';
}

export interface Transaction {
  id: string;
  clientName: string;
  date: string;
  type: 'Depósito' | 'Retiro' | 'Intereses generados';
  amount: number;
  status: 'Aprobado' | 'Pendiente' | 'Rechazado';
}

export interface AdminActivityLog {
  id: number;
  user: string;
  action: string;
  timestamp: string;
  ip: string;
}

export interface PortfolioSummary {
    investedCapital: number;
    currentValue: number;
    totalReturn: number;
    roiPercentage: number;
}

export interface Investment {
    id:string;
    productName: string;
    category: string;
    investedAmount: number;
    currentValue: number;
    returnPercentage: number;
}

export interface Notification {
    id: number;
    title: string;
    description: string;
    timestamp: string;
    read: boolean;
}

export interface FinancialGoal {
    id: number;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
}

export type ClientModuleView = 'educacion' | 'planes';