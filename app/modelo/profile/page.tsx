import { FormUpdateModel } from "@/components/FormUpdateModel";
import { cookies } from "next/headers";

export default async function ProfilePageModel() {
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

  const dataModel = await res.json();

  return (
    <div className="flex flex-col md:flex-row gap-5 justify-center items-center w-full">
      <FormUpdateModel dataModel={dataModel} />
    </div>
  );
}
