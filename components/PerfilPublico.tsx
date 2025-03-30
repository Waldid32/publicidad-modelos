import Image from 'next/image';
import Link from 'next/link';
import { CarouselModel } from './CarouselModel';
import { DataModels } from '@/types/types';
import { etniaMap } from '@/utils/etniaMap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { idiomasDisponibles } from '@/utils/idiomasMap';

interface PerfilPublicoProps {
  dataModel: DataModels;
}

interface RatingStats {
  average: number;
  count: number;
}

export function PerfilPublico({ dataModel }: PerfilPublicoProps) {
  const [ratingStats, setRatingStats] = useState<RatingStats>({
    average: 0,
    count: 0,
  });

  useEffect(() => {
    const fetchRatingStats = async () => {
      try {
        const response = await axios.get<RatingStats>(
          `/api/models/${dataModel.nombreUsuario}/average-rating`,
        );
        setRatingStats({
          average: response.data.average,
          count: response.data.count,
        });
      } catch (error) {
        console.error('Error obteniendo calificaciones:', error);
      }
    };

    fetchRatingStats();
  }, [dataModel.nombreUsuario]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-10 py-0 lg:py-10 px-5">
      {/* CAROUSEL DE MODELOS */}
      <CarouselModel multimedias={dataModel.multimedias} />

      {/* Información del perfil */}
      <div className="flex flex-col justify-center items-center gap-5 w-full lg:w-[650px]">
        <div className="flex flex-col justify-start items-start gap-5 border border-gray-200 p-5 rounded-xl bg-white w-full">
          {/* Sección Superior */}
          <div className="w-full">
            <h1 className="font-bold text-xl md:text-2xl mb-4">
              {dataModel.nombreCompleto}
            </h1>

            {/* Edad */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-primary/10 px-3 py-1 rounded-full">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="font-bold ml-1">
                    {ratingStats.average.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-600 text-sm">
                  ({ratingStats.count} reseñas)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-semibold">
                  {dataModel.edad} años
                </span>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="py-2 border-t border-gray-100 w-full">
            <h3 className="font-bold text-lg mb-2">Descripción</h3>
            <p className="text-gray-600 leading-relaxed">
              {dataModel.descripcion}
            </p>
          </div>

          {/* Detalles Adicionales */}
          <div className="w-full space-y-4">
            {/* Etnia */}
            <div className="flex items-center gap-2">
              <span className="font-semibold min-w-[70px]">Etnia:</span>
              <span className="text-gray-600">
                {etniaMap[dataModel.etnia] || 'No especificada'}
              </span>
            </div>

            {/* Idiomas */}
            <div className="flex items-start gap-2">
              <span className="font-semibold min-w-[70px]">Idiomas:</span>
              <div className="flex flex-wrap gap-2">
                {dataModel.idiomas.map((idioma) => (
                  <span
                    key={idioma}
                    className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-600"
                  >
                    {idiomasDisponibles.find((i) => i.value === idioma)
                      ?.label || idioma}
                  </span>
                ))}
              </div>
            </div>

            {/* Precio */}
            <div className="flex items-center gap-2">
              <span className="font-semibold min-w-[70px]">Tarifa:</span>
              <span className="text-gray-600">
                {dataModel.precioHora} €/hora
              </span>
            </div>

            {/* WhatsApp */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Image
                  src={'/whatsapp.svg'}
                  width={30}
                  height={30}
                  alt="WhatsApp"
                  className="shrink-0"
                />
                <Link
                  href={`https://wa.me/${dataModel.numeroContacto}`}
                  className="font-semibold text-primary hover:text-primary-dark transition-colors"
                  target="_blank"
                >
                  Contactar por WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
