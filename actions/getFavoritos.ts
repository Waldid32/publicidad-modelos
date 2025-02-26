import axios from 'axios';

export async function getFavoritos(token: string | null) {
  if (!token) {
    throw new Error('No se encontró el token de autenticación.');
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/favoritos-modelos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      },
    );
    return response.data;
  } catch {
    throw new Error('No se pudieron cargar los modelos favoritos.');
  }
}
