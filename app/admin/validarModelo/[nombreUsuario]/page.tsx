import ValidarModeloForm from "@/components/ValidarModeloForm";

interface Params {
    params: {
        nombreUsuario: string;
    };
}

export default async function ValidarModeloPage({ params }: Params) {
    const { nombreUsuario } = params;

    // Realiza el fetch para obtener la info del modelo (por ejemplo, nombreCompleto)
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${nombreUsuario}`,
        { method: "GET", cache: "no-store" }
    );

    if (!res.ok) {
        return <div>Error al obtener datos</div>;
    }

    const dataModel = await res.json();

    return (
        <div className="flex justify-center items-center py-10">
            <ValidarModeloForm
                nombreCompleto={dataModel.nombreCompleto}
                nombreUsuario={dataModel.nombreUsuario}
            />
        </div>
    );
}
