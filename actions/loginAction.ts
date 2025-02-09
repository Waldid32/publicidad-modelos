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
    const nombreUsuarioMin = nombreUsuario.toLowerCase();
    // Llamada al endpoint de autenticación
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        nombreUsuario: nombreUsuarioMin,
        password,
      }
    );

    // Almacena el token y el ID en cookies
    const cookieStore = await cookies();

    cookieStore.set("access_token", data.access_token, {
      httpOnly: true,
      path: "/",
    });

    cookieStore.set("userId", data.user.id, {
      httpOnly: true,
      path: "/",
    });

    cookieStore.set("role", data.user.rol, {
      httpOnly: true,
      path: "/",
    });
    cookieStore.set("nombreUsuario", data.user.nombreUsuario, {
      httpOnly: true,
      path: "/",
    });
    cookieStore.set("nombreCompleto", data.user.nombreCompleto, {
      httpOnly: true,
      path: "/",
    });
    cookieStore.set("suscripcionBasica", data.user.suscripcionBasica, {
      httpOnly: true,
      path: "/",
    });
    cookieStore.set("suscripcionPremiun", data.user.suscripcionPremiun, {
      httpOnly: true,
      path: "/",
    });

    return {
      success: true,
      role: data.user.rol,
      userId: data.user.id,
      username: data.user.nombreUsuario,
      nombreCompleto: data.user.nombreCompleto,
    };
  } catch (error) {
    return { success: false, message: "Credenciales incorrectas" };
  }
}
