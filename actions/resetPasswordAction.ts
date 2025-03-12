'use server';

import axios from 'axios';

export async function resetPasswordAction(token: string, newPassword: string) {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      { token, newPassword },
    );

    return { success: true, message: data.message };
  } catch {
    return {
      success: false,
      message: 'Error al restablecer contraseña',
    };
  }
}
