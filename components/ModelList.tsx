'use client';

import { ModelData } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

interface ModelListProps {
  dataModels: ModelData[];
  favoritos?: ModelData[];
  toggleFavorito?: (modelo: ModelData) => void;
  isLoggedIn?: boolean;
}

export function ModelList({
  dataModels,
  favoritos = [],
  toggleFavorito,
  isLoggedIn = false,
}: ModelListProps) {
  if (dataModels.length === 0) {
    return <p className="text-center text-lg">No hay modelos disponibles.</p>;
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-10 py-10 px-5 bg-white">
      {dataModels.map((data, index) => (
        <div
          key={index}
          className="relative border-2 border-primary rounded-lg p-4 gap-4 lg:w-[550px] w-full lg:h-80"
        >
          <Link
            href={
              isLoggedIn
                ? `/cliente/${data.nombreUsuario}`
                : `/${data.nombreUsuario}`
            }
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {/* Columna imagen */}
            <div className="flex justify-center items-center">
              <Image
                src={data.multimedias[0]}
                alt={data.nombreCompleto}
                width={250}
                height={250}
                className="rounded-2xl object-cover w-[250px] h-[250px]"
                unoptimized
              />
            </div>

            {/* Columna información */}
            <div className="flex flex-col w-full">
              <h3 className="text-xl font-bold tracking-tight text-gray-900">
                {data.nombreCompleto}
              </h3>
              <span className="text-black">
                <strong>Edad:</strong> {data.edad} Años
              </span>
              <p className="font-light text-gray-500 line-clamp-3 overflow-hidden py-5">
                {data.descripcion ?? 'Descripción no disponible.'}
              </p>
              <span className="text-gray-500 font-semibold py-10">
                {data.zona}
              </span>
            </div>
          </Link>

          {/* ⭐ Mostrar estrella solo si el usuario está logueado */}
          {isLoggedIn && toggleFavorito && (
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorito(data);
              }}
              className="absolute top-2 right-2"
            >
              <Image
                src={
                  favoritos.some(
                    (fav) => fav.nombreUsuario === data.nombreUsuario,
                  )
                    ? '/star-solid.svg'
                    : '/star.svg'
                }
                width={30}
                height={30}
                alt="Icon Star"
              />
            </button>
          )}
        </div>
      ))}
    </section>
  );
}
