import { FormUpdateModel } from "@/components/FormUpdateModel";

interface Params {
    params: {
        nombreUsuario: string;
    };
}

export default async function GestionarModelosPage({ params }: Params) {
    const { nombreUsuario } = params;

    if (!nombreUsuario) {
        return <div>No hay usuario en la ruta</div>;
    }

    // Hacemos el fetch a tu API, usando la variable de entorno y la ruta adecuada
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
