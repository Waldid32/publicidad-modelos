'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Skeleton } from './ui/skeleton';

interface Rating {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  client: {
    nombreUsuario: string;
    nombreCompleto: string;
  };
}

export function RatingList({ nombreUsuario }: { nombreUsuario: string }) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const { data, status } = await axios.get(
          `/api/models/${nombreUsuario}/ratings`,
        );

        if (status !== 200) throw new Error(data.error || 'Error del servidor');
        setRatings(data);
      } catch {
        setError('Error al cargar las reseñas');
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [nombreUsuario]);

  if (loading) {
    return (
      <div className="w-full space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between mb-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
        <div className="flex flex-col gap-2 text-center">
          <h3 className="text-red-600 font-medium">Error de conexión</h3>
          <p className="text-red-500 text-sm">
            No se pudieron cargar las reseñas
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            Intentar nuevamente →
          </button>
        </div>
      </div>
    );
  }

  if (ratings.length === 0) {
    return (
      <div className="p-6 bg-blue-50 rounded-xl text-center">
        <p className="text-gray-600">Aún no hay reseñas disponibles</p>
        <p className="text-sm text-gray-500 mt-1">Sé el primero en opinar</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-96">
      {ratings.map((rating) => (
        <div
          key={rating.id}
          className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            {/* Sección izquierda */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < rating.rating ? '★' : '☆'}</span>
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  {rating.rating}.0
                </span>
              </div>
              <h4 className="text-gray-900 font-medium">
                {rating.client.nombreCompleto}
              </h4>
            </div>

            {/* Sección derecha */}
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {new Date(rating.createdAt)
                  .toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                  .replace(/ /g, ' ')}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                @{rating.client.nombreUsuario}
              </p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed border-t pt-3 mt-3">
            {rating.comment}
          </p>
        </div>
      ))}
    </div>
  );
}
