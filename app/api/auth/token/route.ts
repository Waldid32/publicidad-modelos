import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
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
    const decoded = jwt.verify(token, jwtSecret);
    return NextResponse.json(
      {
        token,
        decoded,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }
}
