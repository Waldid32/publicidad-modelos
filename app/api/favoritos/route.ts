import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getFavoritos } from '@/actions/getFavoritos';

export async function GET() {
  const token = (await cookies()).get('access_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  try {
    const favoritos = await getFavoritos(token);
    return NextResponse.json({ favoritos });
  } catch {
    return NextResponse.json(
      { error: 'Error al obtener favoritos' },
      { status: 500 },
    );
  }
}
