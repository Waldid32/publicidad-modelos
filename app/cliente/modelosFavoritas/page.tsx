'use client';

import { useEffect, useState } from 'react';
import { ModelList } from '@/components/ModelList';
import { ModelData } from '@/types/types';
import { eliminarDeFavoritos } from '@/actions/favoritos';
import { toast } from 'sonner';

// Función para obtener los datos del usuario (token, userId)
const fetchUserData = async () => {
  try {
    const response = await fetch('/api/auth/token', {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      toast.error('No autenticado');
    }
    const data = await response.json();
    return { token: data.token, userId: data.decoded?.id };
  } catch {
    return { token: null, userId: null };
  }
};

export default function ModelosFavoritasClient() {
  const [favoritos, setFavoritos] = useState<ModelData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<{
    token: string | null;
    userId: string | null;
  }>({
    token: null,
    userId: null,
  });

  // Obtener datos del usuario al montar el componente
  useEffect(() => {
    async function initUserData() {
      const data = await fetchUserData();
      setUserData(data);
    }
    initUserData();
  }, []);

  // Obtener la lista de favoritos
  useEffect(() => {
    async function fetchFavoritos() {
      try {
        const res = await fetch('/api/favoritos', { credentials: 'include' });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Error al obtener favoritos');
        }
        setFavoritos(data.favoritos);
      } catch {
        toast.error('Error al cargar los modelos favoritos');
      } finally {
        setLoading(false);
      }
    }
    fetchFavoritos();
  }, []);

  // Función para remover un modelo de la lista de favoritos
  const toggleFavorito = async (modelo: ModelData) => {
    if (!userData.token || !userData.userId) {
      return toast.error('Usuario no autenticado');
    }
    try {
      // Llamada a la acción para eliminar de favoritos
      await eliminarDeFavoritos(userData.userId, modelo.id, userData.token);
      // Actualizamos el estado eliminando el modelo removido
      setFavoritos((prev) => prev.filter((fav) => fav.id !== modelo.id));
    } catch {
      toast.error('Error al eliminar el modelo de favoritos');
    }
  };

  if (loading) return <p>Cargando modelos favoritos...</p>;
  if (favoritos.length === 0)
    return <p className="text-center">No tienes modelos favoritos</p>;

  return (
    <div className="flex flex-col justify-center items-center bg-white">
      <h1 className="text-2xl font-bold text-center p-5 bg-segundary w-full text-white">
        Mis Modelos Favoritas
      </h1>
      <div className="bg-white">
        <ModelList
          dataModels={favoritos}
          favoritos={favoritos}
          toggleFavorito={toggleFavorito}
          isLoggedIn={true}
        />
      </div>
    </div>
  );
}
