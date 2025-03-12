'use server';

import axios from 'axios';

export async function forgotPasswordAction(email: string) {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      { email },
    );

    return { success: true };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: 'Error al solicitar recuperación',
    };
  }
}
