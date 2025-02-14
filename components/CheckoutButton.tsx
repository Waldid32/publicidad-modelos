"use client"

import { useState } from "react";

interface CheckoutButtonProps {
    subscriptionType: 'SEMANAL' | 'DESTACADA';
}

export function CheckoutButton({ subscriptionType }: CheckoutButtonProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheckout = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ subscriptionType }),
                credentials: 'same-origin'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error en el checkout');
            }

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No se recibió URL de checkout');
            }
        } catch (error) {
            console.error('Error en checkout:', error);
            setError(error instanceof Error ? error.message : 'Error en el proceso de checkout');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            {error && (
                <div className="text-red-500 text-sm mb-2">
                    {error}
                </div>
            )}
            <button
                type="button"
                onClick={handleCheckout}
                disabled={loading}
                className="inline-flex w-full justify-center rounded-lg bg-segundary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:opacity-50"
            >
                {loading ? 'Procesando...' : 'Comprar'}
            </button>
        </div>
    );
}