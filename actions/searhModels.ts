'use server';

import axios from 'axios';

export async function searhModels(formData: {
  nombreCompleto: string;
  etnia: string;
  zona: string;
  idiomas: string;
  edad: number | undefined;
  precio: number | undefined;
}) {
  try {
    console.log(formData);
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/models/filter`,
      {
        ...formData,
      },
    );
    return result.data;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: 'Busqueda fallida',
    };
  }
}
