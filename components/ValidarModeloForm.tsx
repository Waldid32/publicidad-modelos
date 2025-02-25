"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ValidarFormProps {
    nombreCompleto: string;
    nombreUsuario: string;
}

export default function ValidarModeloForm({ nombreCompleto, nombreUsuario }: ValidarFormProps) {
    const [estadoValidar, setEstadoValidar] = useState("validado"); // "validado" o "rechazado"
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Convertir el string a boolean: por ejemplo, "validado" -> true, "rechazado" -> false
        const estado = estadoValidar === "validado";

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/validate/${nombreUsuario}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ nombreUsuario, estadoValidar: estado }),
                }
            );

            if (!res.ok) {
                throw new Error("Error al actualizar la validación");
            }

            toast.success("Modelo validado correctamente");
            router.push("/admin"); // Regresar al home del admin
        } catch (error: any) {
            toast.error(error.message || "Error al validar el modelo");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Validar Modelo</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Nombre Completo</label>
                    <input
                        type="text"
                        value={nombreCompleto}
                        disabled
                        className="border rounded p-2 w-full bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block font-medium">Nombre de Usuario</label>
                    <input
                        type="text"
                        value={nombreUsuario}
                        disabled
                        className="border rounded p-2 w-full bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block font-medium">Estado de Validación</label>
                    <select
                        value={estadoValidar}
                        onChange={(e) => setEstadoValidar(e.target.value)}
                        className="border rounded p-2 w-full"
                    >
                        <option value="validado">Validado</option>
                        <option value="rechazado">Rechazado</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Enviar Validación
                </button>
            </form>
        </div>
    );
}
