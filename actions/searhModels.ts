"use server";

import axios from "axios";

export async function searhModels(formData: {
  nombreCompleto: string;
  etnia: string;
  zona: string;
  idiomas: string;
}) {
  try {
    const result = await axios.post(
      `${process.env.API_URL}/users/models/filter`,
      {
        ...formData,
      }
    );
    return result.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Busqueda fallida",
    };
  }
}
