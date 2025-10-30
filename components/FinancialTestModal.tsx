import React, { useState, useEffect } from 'react';
import { XMarkIcon, CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { LightBulbIcon } from '@heroicons/react/24/outline';
import type { TestQuestion, UserAnswer, TestResult } from '../types';
import { generateTestQuestions, evaluateTestAnswers } from '../services/geminiService';
import { EDUCATIONAL_TOPICS } from '../constants';


interface FinancialTestModalProps {
  onClose: () => void;
  level: 'Basic' | 'Intermediate' | 'Advanced';
}

type TestStatus = 'loading' | 'testing' | 'submitting' | 'results' | 'error';

const LoadingState: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <ArrowPathIcon className="h-12 w-12 text-primary animate-spin mb-4" />
        <h3 className="text-xl font-bold text-gray-900">{text}</h3>
        <p className="text-gray-500 mt-2">Por favor, espera un momento...</p>
    </div>
);

const ErrorState: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <XCircleIcon className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-900">Ocurrió un Error</h3>
        <p className="text-gray-500 mt-2">No pudimos generar el test. Por favor, intenta de nuevo.</p>
        <button
            onClick={onRetry}
            className="mt-6 px-6 py-2 bg-secondary text-black font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-transform transform hover:scale-105"
        >
            Reintentar
        </button>
    </div>
);


const FinancialTestModal: React.FC<FinancialTestModalProps> = ({ onClose, level }) => {
    const [status, setStatus] = useState<TestStatus>('loading');
    const [questions, setQuestions] = useState<TestQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [finalResults, setFinalResults] = useState<TestResult | null>(null);

    const fetchQuestions = async () => {
        setStatus('loading');
        try {
            const fetchedQuestions = await generateTestQuestions(level);
            if (fetchedQuestions.length === 0) throw new Error("No questions returned");
            setQuestions(fetchedQuestions);
            setStatus('testing');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [level]);

    const handleAnswerSelect = (questionId: number, answer: string) => {
        setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };
    
    const handleSubmit = async () => {
        setStatus('submitting');
        const detailedAnswers: UserAnswer[] = questions.map(q => {
            const selected = userAnswers[q.id] || "";
            return {
                questionId: q.id,
                question: q.question,
                selectedAnswer: selected,
                correctAnswer: q.correctAnswer,
                isCorrect: selected === q.correctAnswer,
            };
        });

        const score = detailedAnswers.filter(a => a.isCorrect).length;
        
        try {
            const evaluation = await evaluateTestAnswers(detailedAnswers);
            setFinalResults({
                score,
                feedback: evaluation.feedback,
                recommendations: evaluation.recommendations,
            });
            setStatus('results');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    const currentQuestion = questions[currentQuestionIndex];
    const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
    
    return (
        <div 
          className="fixed inset-0 bg-gray-100 z-50 flex flex-col p-4 sm:p-6 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="financial-test-title"
        >
            <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl flex-1 flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 id="financial-test-title" className="text-xl font-bold text-gray-900">Test de Conocimiento Financiero</h2>
                  <button 
                    onClick={onClose} 
                    className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                    aria-label="Cerrar test"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </header>

                <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {status === 'loading' && <LoadingState text="Generando tu test..."/>}
                    {status === 'error' && <ErrorState onRetry={fetchQuestions} />}
                    {status === 'testing' && currentQuestion && (
                        <div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.3s' }}></div>
                            </div>
                            <p className="text-sm font-semibold text-primary mb-2">Pregunta {currentQuestionIndex + 1} de {questions.length}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">{currentQuestion.question}</h3>
                            <div className="space-y-4">
                                {currentQuestion.options.map((option, idx) => (
                                    <label key={idx} className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors duration-200 ${userAnswers[currentQuestion.id] === option ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-primary/50'}`}>
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestion.id}`}
                                            value={option}
                                            checked={userAnswers[currentQuestion.id] === option}
                                            onChange={() => handleAnswerSelect(currentQuestion.id, option)}
                                            className="h-5 w-5 text-primary focus:ring-primary"
                                        />
                                        <span className="ml-4 text-gray-700 font-medium">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    {status === 'submitting' && <LoadingState text="Evaluando tus respuestas..."/>}
                    {status === 'results' && finalResults && (
                        <div className="text-center">
                            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-3xl font-extrabold text-gray-900">¡Resultados Listos!</h3>
                            <p className="text-2xl font-semibold text-gray-700 mt-4">Tu Puntuación: <span className="text-primary">{finalResults.score} / {questions.length}</span></p>
                            <div className="mt-8 text-left bg-gray-50 p-6 rounded-lg max-w-2xl mx-auto">
                                <div className="flex items-start">
                                    <LightBulbIcon className="h-8 w-8 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">Feedback Personalizado:</h4>
                                        <p className="mt-2 text-gray-600">{finalResults.feedback}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 text-left max-w-2xl mx-auto">
                                <h4 className="font-bold text-gray-900 text-center mb-4">Temas recomendados para ti:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {EDUCATIONAL_TOPICS.filter(t => finalResults.recommendations.includes(t.title)).map(topic => (
                                        <div key={topic.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 bg-primary/10 rounded-md p-2">
                                                    <topic.icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <p className="ml-3 font-semibold text-gray-700">{topic.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <footer className="p-4 bg-gray-50 border-t border-gray-200">
                    {status === 'testing' && (
                        <div className="flex justify-end">
                            {currentQuestionIndex < questions.length - 1 ? (
                                <button
                                    onClick={handleNext}
                                    disabled={!userAnswers[currentQuestion.id]}
                                    className="px-6 py-2 bg-secondary text-black font-bold rounded-lg shadow-md hover:bg-secondary/90 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Siguiente
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!userAnswers[currentQuestion.id]}
                                    className="px-6 py-2 bg-secondary text-black font-bold rounded-lg shadow-md hover:bg-secondary/90 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Finalizar y Ver Resultados
                                </button>
                            )}
                        </div>
                    )}
                    {status === 'results' && (
                        <div className="text-center">
                            <button onClick={onClose} className="px-8 py-3 bg-secondary text-black font-bold rounded-lg shadow-md hover:bg-secondary/90">
                                Volver al Portal
                            </button>
                        </div>
                    )}
                </footer>
            </div>
        </div>
    );
};

export default FinancialTestModal;