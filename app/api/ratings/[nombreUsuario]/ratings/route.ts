import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ nombreUsuario: string }> },
) {
  // Extraer el parámetro explícitamente
  const nombreUsuario = (await params).nombreUsuario;

  // En la función GET
  const ratings = await axios.get(
    `${process.env.API_URL}/models/${nombreUsuario}/ratings`,
  );
  return NextResponse.json(ratings.data);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ nombreUsuario: string }> },
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  // Extraer el parámetro explícitamente
  const nombreUsuario = (await params).nombreUsuario;

  if (!token) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  // Obtener los datos del body de la petición (calificación y comentario)
  const body = await request.json();
  const { rating, comment } = body;

  // En la función POST
  await axios.post(
    `${process.env.API_URL}/models/${nombreUsuario}/ratings`,
    { rating, comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  );

  return NextResponse.json(
    { message: 'Calificación guardada' },
    { status: 200 },
  );
}
