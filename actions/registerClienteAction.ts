'use server';

import axios from 'axios';

export async function registerClienteAction(formData: {
  nombreCompleto: string;
  email: string;
  nombreUsuario: string;
  fechaNacimiento: string;
  password: string;
  confirmarPassword: string;
}) {
  try {
    // Convertir nombreUsuario a minúsculas
    const sanitizedFormData = {
      ...formData,
      nombreUsuario: formData.nombreUsuario.toLowerCase(),
      rol: 'cliente', // Asegura que el rol sea siempre "cliente"
    };

    // Llamada al endpoint de registro
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/register/cliente`,
      sanitizedFormData,
    );

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Error al registrar',
    };
  }
}
