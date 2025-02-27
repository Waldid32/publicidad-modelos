// app/api/auth/user/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get('access_token')?.value;
  const userId = cookieStore.get('userId')?.value;
  const role = cookieStore.get('role')?.value;
  const nombreUsuario = cookieStore.get('nombreUsuario')?.value;
  const nombreCompleto = cookieStore.get('nombreCompleto')?.value;
  const suscripcionBasica = cookieStore.get('suscripcionBasica')?.value;
  const suscripcionPremiun = cookieStore.get('suscripcionPremiun')?.value;
  const jwtSecret = process.env.JWT_SECRET!;

  if (!token) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  if (!jwtSecret) {
    return NextResponse.json(
      { error: 'Error de configuración del servidor' },
      { status: 500 },
    );
  }

  try {
    // Verificamos que el token sea válido
    jwt.verify(token, jwtSecret);

    // Devolvemos todos los datos de autenticación
    return NextResponse.json(
      {
        isAuthenticated: true,
        userId,
        role,
        username: nombreUsuario,
        nombreCompleto,
        suscripcionBasica: suscripcionBasica === 'true',
        suscripcionPremiun: suscripcionPremiun === 'true',
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }
}
