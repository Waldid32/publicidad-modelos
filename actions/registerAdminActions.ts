"use server";

import axios from "axios";

export async function registerAdminAction(formData: {
    nombreCompleto: string;
    email: string;
    nombreUsuario: string;
    fechaNacimiento: string;
    password: string;
    confirmarPassword: string;
}) {
    try {
        // Convertir nombreUsuario a minúsculas
        const sanitizedFormData = {
            ...formData,
            nombreUsuario: formData.nombreUsuario.toLowerCase(),
            rol: "admin",
        };

        // Llamada al endpoint de registro
        //await axios.post(
        //    `${process.env.NEXT_PUBLIC_API_URL}/users/register/admin`,
        //    sanitizedFormData
        //);

        console.log(sanitizedFormData)

        return { success: true };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Error al registrar",
        };
    }
}
