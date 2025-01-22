"use server";

import axios from "axios";

export async function registerClienteAction(formData: {
  nombreCompleto: string;
  email: string;
  nombreUsuario: string;
  fechaNacimiento: string;
  password: string;
  confirmarPassword: string;
}) {
  try {
    // Llamada al endpoint de registro
    await axios.post(`${process.env.API_URL}/users/register/cliente`, {
      ...formData,
      rol: "cliente", // Asegura que el rol sea siempre "cliente"
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Error al registrar",
    };
  }
}
