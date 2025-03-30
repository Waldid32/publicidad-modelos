import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ nombreUsuario: string }> },
) {
  try {
    const nombreUsuario = (await params).nombreUsuario;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/models/${nombreUsuario}/ratings`,
    );
    return NextResponse.json(response.data);
  } catch {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
