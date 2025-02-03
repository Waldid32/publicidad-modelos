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

    // Almacena el token, el rol y el nombreUsuario en cookies
    const cookieStore = cookies();

    (await cookieStore).set("access_token", data.access_token, {
      httpOnly: true,
    });

    (await cookieStore).set("role", data.user.rol, {
      httpOnly: true,
    });

    (await cookieStore).set("nombreUsuario", data.user.nombreUsuario, {
      httpOnly: true,
    });

    (await cookieStore).set("nombreCompleto", data.user.nombreCompleto, {
      httpOnly: true,
    });

    (await cookieStore).set("suscripcionBasica", data.user.suscripcionBasica, {
      httpOnly: true,
    });

    (await cookieStore).set(
      "suscripcionPremiun",
      data.user.suscripcionPremiun,
      {
        httpOnly: true,
      }
    );

    return {
      success: true,
      role: data.user.rol,
      username: data.user.nombreUsuario,
      nombreCompleto: data.user.nombreCompleto,
      suscripcionBasica: data.user.suscripcionBasica,
      suscripcionPremiun: data.user.suscripcionPremiun,
    };
  } catch (error) {
    return { success: false, message: "Credenciales incorrectas" };
  }
}
