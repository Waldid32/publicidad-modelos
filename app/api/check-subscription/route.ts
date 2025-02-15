import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const nombreUsuario = searchParams.get("nombreUsuario");

        if (!nombreUsuario) {
            return NextResponse.json(
                { error: "El nombre de usuario es requerido" },
                { status: 400 }
            );
        }

        // Hacer la consulta a la API backend
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/check-subscription/${nombreUsuario}`
        );

        if (!response.ok) {
            throw new Error("Error al obtener la suscripción");
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error en la API de Next.js:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
