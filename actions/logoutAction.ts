"use server";

import { cookies } from "next/headers";

export async function logoutAction() {
  const cookieStore = cookies();
  (await cookieStore).delete("access_token");
  (await cookieStore).delete("role");
  (await cookieStore).delete("nombreCompleto");
  (await cookieStore).delete("nombreUsuario");
  return { success: true };
}
