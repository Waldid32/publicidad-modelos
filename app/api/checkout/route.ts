import { NextResponse } from 'next/server';
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("access_token")?.value;
        const userId = cookieStore.get("userId")?.value;

        if (!token) {
            return NextResponse.json({ error: 'No autorizado. Inicie sesión.' }, { status: 401 });
        }

        if (!userId) {
            return NextResponse.json({ error: 'Sesión inválida. Inicie sesión.' }, { status: 400 });
        }

        const { subscriptionType } = await req.json();

        if (!subscriptionType) {
            return NextResponse.json({ error: 'Tipo de suscripción no especificado' }, { status: 400 });
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                userId,
                subscriptionType
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: 'Error al procesar el pago.' }, { status: response.status });
        }

        const { sessionId } = responseData;

        if (!sessionId) {
            return NextResponse.json({ error: 'Error al crear la sesión de pago' }, { status: 500 });
        }

        return NextResponse.json({ url: sessionId });
    } catch {
        return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
    }
}
