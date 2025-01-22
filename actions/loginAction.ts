"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function loginAction({
  nombreUsuario,
  password,
}: {
  nombreUsuario: string;
  password: string;
}) {
  try {
    // Llamada al endpoint de autenticación
    const { data } = await axios.post(`${process.env.API_URL}/auth/login`, {
      nombreUsuario,
      password,
    });

    // Almacena el token y el rol en cookies
    (await cookies()).set("access_token", data.access_token, {
      httpOnly: true,
    });
    (await cookies()).set("role", data.user.rol, { httpOnly: true });

    // Devuelve el rol para redireccionar
    return {
      success: true,
      role: data.user.rol,
      username: data.user.nombreUsuario,
    };
  } catch (error) {
    // Manejo de errores
    return { success: false, message: "Credenciales incorrectas" };
  }
}
