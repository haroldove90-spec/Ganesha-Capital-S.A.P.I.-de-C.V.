import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import { PaperAirplaneIcon, ChatBubbleOvalLeftEllipsisIcon, XMarkIcon, UserPlusIcon } from '@heroicons/react/24/solid';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: 'bot', text: '¡Hola! Soy tu asistente financiero de GANESHA Capital. ¿En qué puedo ayudarte hoy?', timestamp: new Date().toISOString() }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: userInput,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const botResponseText = await getChatbotResponse(userInput);
      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to get bot response:", error);
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'Lo siento, algo salió mal. Por favor, intenta de nuevo.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRequestAgent = () => {
    const botMessage: ChatMessage = {
      id: Date.now(),
      sender: 'bot',
      text: '¡Entendido! Un agente de GANESHA Capital se pondrá en contacto contigo a la brevedad para darte asistencia personalizada. Normalmente te contactarán por email en las próximas 2 horas hábiles.',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <>
      <div className={`fixed bottom-5 right-5 z-30 transition-all duration-300 ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          aria-label="Open chat"
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8" />
        </button>
      </div>

      <div className={`fixed bottom-5 right-5 z-40 w-full max-w-sm h-[70vh] bg-white rounded-xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <header className="flex items-center justify-between p-4 bg-primary text-white rounded-t-xl">
          <h3 className="font-bold text-lg">Asistente GANESHA</h3>
          <div className="flex items-center space-x-2">
            <button onClick={handleRequestAgent} className="hover:bg-primary/90 p-1 rounded-full" aria-label="Hablar con un agente">
                <UserPlusIcon className="h-6 w-6" title="Hablar con un agente"/>
            </button>
            <button onClick={() => setIsOpen(false)} className="hover:bg-primary/90 p-1 rounded-full" aria-label="Close chat">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                  <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                  <div className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
                      <div className="flex items-center space-x-1">
                          <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                      </div>
                  </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
          <div className="flex items-center bg-gray-100 rounded-lg">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1 bg-transparent px-4 py-2 text-sm text-gray-800 focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="p-2 text-primary disabled:text-gray-400 hover:text-primary/90"
              disabled={isLoading || !userInput.trim()}
              aria-label="Send message"
            >
              <PaperAirplaneIcon className="h-6 w-6" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;