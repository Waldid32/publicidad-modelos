'use client';

import { useEffect, useState } from 'react';
import { ModelData } from '@/types/types';
import { toast } from 'sonner';

export function useFetchModels(apiUrl: string) {
  const [models, setModels] = useState<ModelData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error al obtener los modelos');

        const rawData = await response.json();
        setModels(rawData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          toast.error(err.message);
        } else {
          setError('Error desconocido');
          toast.error('Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { models, loading, error };
}
