import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Extrae la data del request
    const formData = await request.json();
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    const sanitizedFormData = {
      ...formData,
      nombreUsuario: formData.nombreUsuario.toLowerCase(),
      rol: 'admin',
    };

    // Realiza la llamada a la API externa
    const apiResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/register/admin`,
      sanitizedFormData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json({ success: true, data: apiResponse.data });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Error al registrar el administrador' },
      { status: 500 }
    );
  }
}
