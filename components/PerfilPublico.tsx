import Image from 'next/image';
import Link from 'next/link';
import { CarouselModel } from './CarouselModel';
import { DataModels } from '@/types/types';
import { etniaMap } from '@/utils/etniaMap';
import { idiomasDisponibles } from '@/utils/idiomasMap';

interface PerfilPublicoProps {
  dataModel: DataModels;
}

export function PerfilPublico({ dataModel }: PerfilPublicoProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-10 py-0 lg:py-10 px-5">
      {/* CAROUSEL DE MODELOS */}
      <CarouselModel multimedias={dataModel.multimedias} />

      {/* ptra info */}
      <div className="flex flex-col justify-center items-center gap-5 w-full lg:w-[650px]">
        {/* Nombre */}
        <div className="flex flex-col justify-start items-start gap-5 border border-gray-200 p-5 rounded-xl bg-white">
          <h1 className="font-bold text-xl md:text-2xl">
            {dataModel.nombreCompleto}
          </h1>
          {/* Ubicacion */}
          <div className="flex flex-row justify-between items-center gap-5 w-full">
            <div className="flex gap-2 justify-center items-center">
              <Image
                src={'/location.svg'}
                width={25}
                height={25}
                alt="Icono de localización"
              />
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  dataModel.zona,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sm text-wrap"
              >
                {dataModel.zona}
              </Link>
            </div>
            {/* Edad */}
            <span className="font-semibold text-sm  text-wrap">
              Edad: {dataModel.edad} Años
            </span>
          </div>
          {/* Descripción */}
          <div className="py-2">
            <h3 className="font-bold text-lg">Descripción:</h3>
            <p className="text-wrap">{dataModel.descripcion}</p>
          </div>
          {/* Duraciones Adiccionale */}

          {dataModel.duracionesAdicionales && (
            <div className="py-2">
              <h3 className="font-bold text-base">Duraciones Adiccionales:</h3>
              <p className=" text-wrap">{dataModel.duracionesAdicionales}</p>
            </div>
          )}
          {/* Etnia */}
          <p className="">
            <span className="font-semibold">Etnia:</span> {''}{' '}
            {etniaMap[dataModel.etnia] || 'Etnia no especificada'}
          </p>
          {/* Idiomas */}
          <div>
            <span className="font-semibold">Idiomas:</span> {''}
            {dataModel.idiomas.length > 0
              ? dataModel.idiomas
                  .map((idioma) => {
                    const idiomaObj = idiomasDisponibles.find(
                      (i) => i.value === idioma,
                    );
                    return idiomaObj ? idiomaObj.label : idioma;
                  })
                  .join(', ')
              : 'No se han especificado idiomas'}
          </div>

          {/* Precio por Hora */}
          <p className="">
            <span className="font-semibold">Precio por Hora:</span> {''}
            {dataModel.precioHora} {''} € Euros
          </p>
          {/* WhatsApp */}
          <div>
            <h1 className="text-lg font-bold py-2">Telefono</h1>
            <div className="flex flex-row justify-center items-center gap-5">
              <Image
                src={'/whatsapp.svg'}
                width={30}
                height={30}
                alt="Icon WhatsApp"
                className="text-clip w-8 h-8"
              />
              <Link
                href={`https://wa.me/${dataModel.numeroContacto}?text=Hola,%20vengo%20de20%ModelMatch.`}
                className="font-semibold text-lg text-center text-clip"
              >
                {dataModel.numeroContacto}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
