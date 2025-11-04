import React, { useState } from 'react';
import AdvisoryFormModal from './AdvisoryFormModal';

const InfoSection: React.FC<{ title: string; subtitle: string; children: React.ReactNode }> = ({ title, subtitle, children }) => (
    <div className="border-t border-gray-200 pt-6 first:border-t-0 first:pt-0">
        <h2 className="text-2xl font-bold text-primary mb-2">{title}</h2>
        <p className="text-md font-semibold text-gray-600 mb-4 italic">{subtitle}</p>
        <div className="text-gray-700 space-y-4">
            {children}
        </div>
    </div>
);


const FinancialPlanningInfoView: React.FC = () => {
    const [isAdvisoryModalOpen, setIsAdvisoryModalOpen] = useState(false);

    return (
        <>
            <div className="space-y-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                
                <InfoSection
                    title="1. EL SISTEMA DE AFORES EN MÉXICO."
                    subtitle="Con el Sistema de Afores, podrías recibir tan solo el 56.7% de tu último sueldo."
                >
                    <p>
                        El Sistema de Afores en México, implementado en 1997, ha sido objeto de numerosas reformas y ajustes. Sin embargo, la realidad que enfrentan los milenials y futuras generaciones respecto a su retiro es preocupante.
                    </p>
                </InfoSection>

                <InfoSection
                    title="2. EL AHORRO VOLUNTARIO."
                    subtitle="Ahorro voluntario: ¿Podrías vivir en tu vejez con la mitad de tu último salario? Los Fondos de tu Afore serán insuficientes."
                >
                    <p>
                        Es común escuchar recomendaciones sobre la importancia del Ahorro Voluntario en tu Afore o la búsqueda de productos complementarios, como los Planes Personales de Retiro o Planes de Previsión Financiera. La razón es sencilla: el dinero acumulado en la cuenta individual administrada por una Afore no será suficiente para mantener el mismo estilo de vida al retirase.
                    </p>
                </InfoSection>

                <InfoSection
                    title="3. ¿Podrías vivir tu vejez con la mitad de tu último salario?"
                    subtitle="El Sistema de Pensiones no garantiza que un trabajador reciba el 100% de su último salario."
                >
                    <p>
                        Por todo esto, es esencial que tomes conciencia de la importancia del ahorro para el retiro. La Educación Financiera es una herramienta crucial para asegurar tu vejez.
                    </p>
                </InfoSection>

                <InfoSection
                    title="4. Maneras de invertir ahorrando"
                    subtitle="Independientemente de la estrategia, lo que debes hacer, es ahorrar. Mientras más pronto, mejor."
                >
                    <p>
                        Es una estrategia que permite diversificar tus ahorros y aprovechar los rendimientos del mercado financiero, es una combinación de acciones, bonos y otros instrumentos financieros.
                    </p>
                    <p>
                        GANESHA Capital, ofrece dichos Planes, que están diseñados para fomentar el ahorro a mediano y largo plazo mediante tasas de interés competitivas y beneficios fiscales.
                    </p>
                    <ul className="list-disc list-inside space-y-3 pl-4">
                        <li><span className="font-semibold">Seguridad:</span> Proporciona tranquilidad y estabilidad.</li>
                        <li><span className="font-semibold">Personalización:</span> Puedes elegir entre varias opciones, el monto de las aportaciones y la forma en que recibirás los pagos (mensuales o en una sola exhibición).</li>
                        <li>
                            <span className="font-semibold">Beneficios Fiscales:</span> Las aportaciones pueden ser deducibles de impuestos, lo que representa un doble beneficio:
                            <ul className="list-disc list-inside space-y-1 pl-6 mt-1">
                                <li>Aumentas tu fondo de Previsión Financiera.</li>
                                <li>Reduces tu carga fiscal.</li>
                            </ul>
                        </li>
                        <li><span className="font-semibold">Facilidad de Manejo:</span> Son fáciles de administrar, en GANESHA Capital, puedes encontrar Planes con flexibilidad de plazo y liquidez, son seguros y tienen acceso a diferentes alternativas de inversión.</li>
                        <li><span className="font-semibold">Cobertura Adicional:</span> Los Planes de Previsión Financiera incluyen beneficios adicionales como cobertura por fallecimiento, protegiendo a tus seres queridos.</li>
                        <li><span className="font-semibold">Mayores Rendimientos:</span> Los Planes de Previsión Financiera tienen mejores rendimientos que las Afores.</li>
                    </ul>

                    <div className="my-6 overflow-x-auto">
                        <table className="w-full border-collapse border-2 border-gray-600 text-gray-800">
                            <thead>
                                <tr>
                                    <th className="bg-primary text-white p-3 text-lg font-semibold border-2 border-gray-600 text-center">Fondos de inversión</th>
                                    <th className="bg-primary text-white p-3 text-lg font-semibold border-2 border-gray-600 text-center">Plan de previsión financiera</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-2 border-gray-600 p-3 text-center">Diversificación</td>
                                    <td className="border-2 border-gray-600 p-3 text-center">Seguridad</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-gray-600 p-3 text-center">Accesibilidad</td>
                                    <td className="border-2 border-gray-600 p-3 text-center">Personalización</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-gray-600 p-3 text-center">Potencial de Rendimiento.</td>
                                    <td className="border-2 border-gray-600 p-3 text-center">Beneficios Fiscales</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-gray-600 p-3"></td>
                                    <td className="border-2 border-gray-600 p-3 text-center">Facilidad de Manejo</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-gray-600 p-3"></td>
                                    <td className="border-2 border-gray-600 p-3 text-center">Cobertura Adicional</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-gray-600 p-3"></td>
                                    <td className="border-2 border-gray-600 p-3 text-center">Mayores Rendimientos</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800">Conclusión:</h3>
                        <p className="mt-4">
                            Planificar tu retiro es una tarea esencial que no debe ser
                            postergada. Al explorar y combinar diferentes
                            mecánicas de ahorro e inversión, puedes construir un
                            fondo robusto que te permita disfrutar una vejez
                            tranquila y financieramente segura.
                        </p>
                        <h4 className="mt-4 text-md font-semibold text-gray-600 italic">
                            La clave es iniciar lo antes posible y ser constante en tus aportaciones.
                        </h4>
                        <p className="mt-4">
                            Más de 10 años en el Sector Financiero, promoviendo
                            servicios bancarios y bursátiles de manera amigable y
                            accesible.
                            Brindamos experiencia eficiente, basada en Educación
                            Financiera.
                            Nuestro objetivo es ayudar a más personas a alcanzar
                            su Libertad Financiera.
                        </p>
                    </div>

                </InfoSection>
                
                <div className="mt-6 bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg text-center">
                    <h4 className="text-2xl font-bold text-primary">¿Estás listo para tomar el control?</h4>
                    <p className="text-primary/90 mt-2 max-w-2xl mx-auto">El primer paso es el más importante. Agenda una asesoría gratuita con uno de nuestros expertos y comienza a construir el futuro que deseas.</p>
                    <button 
                        onClick={() => setIsAdvisoryModalOpen(true)}
                        className="mt-6 px-8 py-3 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-secondary/90 transition-transform transform hover:scale-105"
                    >
                        Agendar Asesoría Gratuita
                    </button>
                </div>
            </div>
            {isAdvisoryModalOpen && <AdvisoryFormModal onClose={() => setIsAdvisoryModalOpen(false)} />}
        </>
    );
};

export default FinancialPlanningInfoView;