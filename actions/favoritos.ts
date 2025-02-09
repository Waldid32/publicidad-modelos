import axios from "axios";

export async function agregarAFavoritos(userId: string, modeloId: string, token: string) {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/users/favoritos`,
            { modeloId },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
}

export async function eliminarDeFavoritos(userId: string, modeloId: string, token: string) {
    if (!token || !userId) {
        throw new Error("Credenciales no disponibles");
    }

    try {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/users/favoritos/${modeloId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Error en eliminarDeFavoritos:", error);
        throw error.response?.data || error;
    }
}
