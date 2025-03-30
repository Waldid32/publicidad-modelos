import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ nombreUsuario: string }> },
) {
  // Extraer el parámetro explícitamente
  const nombreUsuario = (await params).nombreUsuario;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/models/${nombreUsuario}/average-rating`,
    );

    return NextResponse.json({
      average: response.data.average,
      count: response.data.count,
    });
  } catch {
    return NextResponse.json(
      { error: 'Error al obtener las estadísticas de calificación' },
      { status: 500 },
    );
  }
}
