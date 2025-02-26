import { FormUpdateModel } from '@/components/FormUpdateModel';
import { cookies } from 'next/headers';

interface Props {
  params: {
    nombreUsuario: string;
  };
}

export default async function GestionarModelosPage({ params }: Props) {
  const { nombreUsuario } = params;
  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value || '';

  if (!nombreUsuario) {
    return <div>No hay usuario en la ruta</div>;
  }

  // Hacemos el fetch a tu API, usando la variable de entorno y la ruta adecuada
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${nombreUsuario}`,
    {
      method: 'GET',
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    return <div>Error al obtener datos</div>;
  }

  const dataModel = await res.json();

  return (
    <div className="flex flex-col md:flex-row gap-5 justify-center items-center w-full">
      <FormUpdateModel dataModel={dataModel} role={role} />
    </div>
  );
}
