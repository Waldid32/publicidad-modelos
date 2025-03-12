'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

export async function changePasswordAction({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token');

    if (!token) {
      return {
        success: false,
        message: 'No autorizado. Inicia sesión primero.',
      };
    }

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
      { currentPassword, newPassword },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return { success: true, message: 'Contraseña cambiada exitosamente' };
  } catch {
    return {
      success: false,
      message: 'Error al cambiar la contraseña',
    };
  }
}
