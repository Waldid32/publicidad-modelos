"use server";
import axios from "axios";

export async function updateModelAction(
  nombreUsuario: string,
  formData: FormData
) {
  const uri = `${process.env.API_URL}/users/models/${nombreUsuario}`;

  try {
    const result = await axios.patch(uri, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { success: true, data: result.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Actualización Fallida",
    };
  }
}
