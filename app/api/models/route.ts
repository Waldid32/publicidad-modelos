import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Aquí llamas a tu API externa u otro microservicio
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/models`);
    if (!response.ok) {
      throw new Error(
        "Error en la consulta de las modelos, intente mas tarde!"
      );
    }
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error en la consulta de las modelos, intente mas tarde!" },
      { status: 500 }
    );
  }
}
