import React, { useState, useEffect } from 'react';
import type { FinancialProduct } from '../types';
import { supabase } from '../services/supabase';
import InterestFormModal from './InterestFormModal';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const FinancialPlansView: React.FC = () => {
    const [products, setProducts] = useState<FinancialProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<FinancialProduct | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!supabase) {
                setError("No se pudo conectar a la base de datos para cargar los planes financieros.");
                setLoading(false);
                return;
            }
            const { data, error } = await supabase
                .from('financial_products')
                .select('*')
                .eq('status', 'Activo');

            if (error) {
                setError(error.message);
                console.error(error);
            } else {
                setProducts(data as FinancialProduct[]);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const handleInterestClick = (product: FinancialProduct) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const ProductCard: React.FC<{ product: FinancialProduct }> = ({ product }) => (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col hover:shadow-lg transition-shadow duration-300">
            <div className="p-6 text-center bg-primary text-white">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="text-white/80">{product.type}</p>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-center items-center text-center">
                <p className="text-sm font-medium text-gray-500">Aportación mensual</p>
                <p className="text-4xl font-extrabold text-gray-900 my-2">${product.monthlyContribution.toLocaleString()}</p>
                
                <p className="text-sm font-medium text-gray-500 mt-4">Terminarás con</p>
                <p className="text-2xl font-bold text-secondary">${product.finalValue.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{product.finalValueDescription}</p>
            </div>
            <div className="p-4 border-t border-gray-200 mt-auto bg-gray-50">
                <button 
                    onClick={() => handleInterestClick(product)}
                    className="w-full bg-secondary text-white font-bold py-3 px-4 rounded-lg hover:bg-secondary/90 transition-transform transform hover:scale-105"
                >
                    Me Interesa
                </button>
            </div>
        </div>
    );

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Planes de Previsión Financiera</h1>
                    <p className="text-gray-500 mt-1">Descubre los planes y fondos que tenemos para ayudarte a alcanzar tus metas.</p>
                </div>
                
                {loading && (
                    <div className="flex justify-center items-center p-10">
                        <ArrowPathIcon className="h-8 w-8 text-primary animate-spin" />
                        <span className="ml-3 text-gray-600">Cargando planes...</span>
                    </div>
                )}
                
                {error && <p className="text-center text-red-500">Error al cargar los planes: {error}</p>}

                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            {isModalOpen && selectedProduct && (
                <InterestFormModal 
                    product={selectedProduct} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </>
    );
};

export default FinancialPlansView;
