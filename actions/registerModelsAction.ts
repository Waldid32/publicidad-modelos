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
    await axios.post(`${process.env.API_URL}/users/register/modelo`, {
      ...formData,
      rol: "modelo",
    });

    return { success: true };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.response?.data?.message || "Error al registrar",
    };
  }
}
