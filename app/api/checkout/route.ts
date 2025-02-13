import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { userId, subscriptionType } = await req.json();

        if (!userId || !subscriptionType) {
            return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
        }

        // Llamar a la API de NestJS para crear la sesión de Stripe
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.JWT_SECRET}`, // Si usas autenticación
            },
            body: JSON.stringify({ userId, subscriptionType }),
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Error al crear la sesión' }, { status: 500 });
        }

        const { sessionId } = await response.json();

        // Redirigir al usuario a Stripe Checkout
        return NextResponse.json({ url: `https://checkout.stripe.com/pay/${sessionId}` });
    } catch (error) {
        console.error('Error en checkout:', error);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}
