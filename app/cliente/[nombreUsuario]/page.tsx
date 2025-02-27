'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { PerfilPublico } from '@/components/PerfilPublico';
import { DataModels } from '@/types/types';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

interface Rating {
  rating: number;
  comment?: string;
  client: {
    id: string;
    nombreUsuario: string;
    nombreCompleto: string;
  };
}

export default function ModelInfoClientPage() {
  const { nombreUsuario } = useParams();
  const [dataModel, setDataModel] = useState<DataModels | null>(null);

  // Estados para la calificación
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [hover, setHover] = useState<number>(0);
  const { userId } = useAuth(); // Solo usamos userId para identificar la calificación del usuario

  // Cargar datos del modelo
  useEffect(() => {
    if (!nombreUsuario) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${nombreUsuario}`,
        );
        setDataModel(response.data);
      } catch (error) {
        toast.error('Error al obtener datos');
        console.error(error);
      }
    };

    fetchData();
  }, [nombreUsuario]);

  // Obtener la calificación del usuario autenticado (si ya ha calificado)
  useEffect(() => {
    if (!nombreUsuario || !userId) return;

    const fetchUserRating = async () => {
      try {
        const response = await axios.get<Rating[]>(
          `/api/models/${nombreUsuario}/ratings`,
          { withCredentials: true },
        );
        const myRating = response.data.find((r) => r.client.id === userId);
        if (myRating) {
          setRating(myRating.rating);
          setComment(myRating.comment || '');
        }
      } catch (error) {
        console.error('Error al obtener tu calificación', error);
      }
    };

    fetchUserRating();
  }, [nombreUsuario, userId]);

  // Manejo del envío de la calificación
  const handleSubmitRating = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        `/api/models/${nombreUsuario}/ratings`,
        { rating, comment },
        { withCredentials: true },
      );
      toast.success('Calificación enviada con éxito!');
    } catch (error) {
      toast.error('Error al enviar la calificación');
      console.error(error);
    }
  };

  if (!dataModel) {
    return <div>No se encontró información para esta modelo.</div>;
  }

  return (
    <div className="pt-24 flex flex-col justify-center items-center gap-10 py-10">
      <div>
        <PerfilPublico dataModel={dataModel} />
      </div>
      <div className="flex flex-col justify-center items-center gap-5 border border-gray-200 p-5 rounded-xl bg-white w-full lg:w-[650px] px-10">
        <h2 className="text-2xl font-bold mb-4">Califica a la modelo</h2>
        <form
          onSubmit={handleSubmitRating}
          className="flex flex-col gap-5 w-full"
        >
          <div>
            <span className="font-medium">Selecciona la calificación:</span>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onMouseEnter={() => setHover(value)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(value)}
                  className="p-1"
                >
                  <svg
                    aria-hidden="true"
                    className={`w-8 h-8 transition-colors ${
                      (hover || rating) >= value
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.382 2.46a1 1 0 00-.363 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.382-2.46a1 1 0 00-1.175 0l-3.382 2.46c-.784.57-1.84-.197-1.54-1.118l1.286-3.967a1 1 0 00-.363-1.118l-3.382-2.46c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <div>
            <textarea
              placeholder="Deja un comentario"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full border p-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-segundary hover:bg-bgPrimaryGradiante hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
