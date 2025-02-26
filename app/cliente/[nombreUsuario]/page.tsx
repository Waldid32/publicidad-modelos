'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { PerfilPublico } from '@/components/PerfilPublico';
import { DataModels } from '@/types/types';
import { useParams } from 'next/navigation';

export default function ModelInfoClientPage() {
  const { nombreUsuario } = useParams();
  const [dataModel, setDataModel] = useState<DataModels | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nombreUsuario) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${nombreUsuario}`,
        );
        setDataModel(response.data);
      } catch {
        setError('Error al obtener datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nombreUsuario]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  if (!dataModel) {
    return <div>No se encontró información para esta modelo.</div>;
  }

  return (
    <div>
      <div className="pt-24 flex flex-col justify-center items-center">
        <PerfilPublico dataModel={dataModel} />;
      </div>
    </div>
  );
}
