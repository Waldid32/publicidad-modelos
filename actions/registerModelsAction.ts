"use server";

import axios from "axios";

export async function registerModelsAction(formData: {
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
    return {
      success: false,
      message: error.response?.data?.message || "Error al registrar",
    };
  }
}
