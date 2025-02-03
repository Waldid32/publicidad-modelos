import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Obtener el query de los parámetros de la URL
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query || query.trim().length < 3) {
      return NextResponse.json(
        {
          message:
            "El parámetro 'query' es requerido y debe tener al menos 3 caracteres.",
        },
        { status: 400 }
      );
    }

    // Llamar a la API externa (OpenCage API)
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${process.env.OPENCAGE_API_KEY}&limit=50&countrycode=es&language=es`
    );

    if (!response.ok) {
      throw new Error("Error al llamar a la API de OpenCage.");
    }

    const data = await response.json();

    // Formatear las sugerencias
    const suggestions =
      data.results?.map((result: any) => result.formatted) || [];

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("Error en la API de ubicaciones:", error);
    return NextResponse.json(
      { message: "Error en la consulta de ubicaciones. Intente más tarde." },
      { status: 500 }
    );
  }
}
