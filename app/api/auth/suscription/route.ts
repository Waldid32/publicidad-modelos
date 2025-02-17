import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const suscripcionBasica = cookieStore.get("suscripcionBasica")?.value;
    const suscripcionPremiun = cookieStore.get("suscripcionPremiun")?.value;

    if (!suscripcionBasica) {
        return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    if (!suscripcionPremiun) {
        return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }


    try {
        return NextResponse.json({
            suscripcionBasica,
            suscripcionPremiun
        }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "No hay suscripciones" }, { status: 401 });
    }
}
