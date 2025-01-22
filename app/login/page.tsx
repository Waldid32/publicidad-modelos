"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginAction } from "@/actions/loginAction";

export default function Login() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Llama a la server action
    startTransition(async () => {
      const result = await loginAction({ nombreUsuario, password });

      if (result.success) {
        toast.success(`Bienvenido, ${result.username}`);

        // Redirige según el rol
        if (result.role === "admin") router.push("/admin");
        if (result.role === "cliente") router.push("/cliente");
        if (result.role === "modelo") router.push("/modelo");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h1>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={nombreUsuario}
        onChange={(e) => setNombreUsuario(e.target.value)}
        className="block w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full p-2 mb-4 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isPending}
      >
        {isPending ? "Cargando..." : "Iniciar Sesión"}
      </button>
    </form>
  );
}
