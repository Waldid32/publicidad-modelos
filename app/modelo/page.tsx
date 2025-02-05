import { cookies } from "next/headers";
import { PerfilPublico } from "@/components/PerfilPublico";
import { DataModels } from "@/types/types";

export default async function Modelos() {
  const cookieStore = await cookies();
  const nombreUsuario = cookieStore.get("nombreUsuario")?.value;

  if (!nombreUsuario) {
    return <div>No hay usuario en cookies</div>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${nombreUsuario}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div>Error al obtener datos</div>;
  }

  const dataModel: DataModels = await res.json();

  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <PerfilPublico dataModel={dataModel} />
    </div>
  );
}
