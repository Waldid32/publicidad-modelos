import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CarouselModel } from "./CarouselModel";
import { DataModels } from "@/types/types";

interface PerfilPublicoProps {
  dataModel: DataModels;
}

export function PerfilPublico({ dataModel }: PerfilPublicoProps) {
  return (
    <div className="flex flex-col gap-10 justify-center items-center py-20">
      <h1 className="font-bold text-xl md:text-2xl">Mi PERFIL PUBLICO</h1>
      {/* SECTION IMAGENES */}
      <div>
        <CarouselModel multimedias={dataModel.multimedias} />
      </div>
      {/* INFO MODEL */}
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-xl md:text-2xl">
          {dataModel.nombreCompleto}
        </h1>
        <div className="flex flex-col items-start gap-5 w-96 md:w-[650px] border border-gray-200 p-5 rounded-xl bg-white">
          <div className="flex flex-row justify-between items-center gap-5 w-full">
            <div className="flex gap-2 justify-center items-center">
              <Image
                src={"/location.svg"}
                width={25}
                height={25}
                alt="Icono de localización"
              />
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  dataModel.zona
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sm text-wrap"
              >
                {dataModel.zona}
              </Link>
            </div>
            <span className="font-semibold text-sm  text-wrap">
              Edad: {dataModel.edad} Años
            </span>
          </div>
          <p className=" text-wrap">{dataModel.descripcion}</p>
          {dataModel.duracionesAdicionales && (
            <p className=" text-wrap">{dataModel.duracionesAdicionales}</p>
          )}
        </div>

        <div className="flex flex-col justify-start items-start gap-5 border border-gray-200 p-5 rounded-xl bg-white">
          <h1 className="text-lg font-bold">Telefono</h1>
          <div className="flex flex-row justify-center items-center gap-5">
            <Image
              src={"/whatsapp.svg"}
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
  );
}
