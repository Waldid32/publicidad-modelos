"use client";

import { ModelData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface BoxModelProps {
  dataModels: ModelData[];
}

export function BoxModel({ dataModels }: BoxModelProps) {
  // Verificar que sea array antes de mapear
  const modelsArray = Array.isArray(dataModels) ? dataModels : [];

  return (
    <section className="grid sm:grid-cols-2 justify-center items-center gap-10 mx-auto py-10 px-5 bg-white">
      {modelsArray.map((data: ModelData, index: number) => (
        <div
          key={index}
          className="
            grid grid-cols-1 md:grid-cols-2
            border-2 border-primary rounded-lg p-4
            gap-4 sm:w-[750px]
          "
        >
          {/* Columna imagen */}
          <div className="flex justify-center items-center">
            <Image
              src={data.multimedias[0]}
              alt={data.nombreCompleto}
              width={170}
              height={240}
              className="
                rounded-2xl
                object-cover
                w-[170px] h-[240px]
              "
            />
          </div>

          {/* Columna información */}
          <div className="flex flex-col w-full">
            {/* Nombre + Edad */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-xl font-bold tracking-tight text-gray-900">
                {data.nombreCompleto}
              </h3>
              <span className="text-black">
                <strong>Edad:</strong> {data.edad} Años
              </span>
            </div>

            {/* Descripción con truncado */}
            <p
              className="
                font-light text-gray-500
                line-clamp-3
                overflow-hidden
                py-5
              "
            >
              {data.descripcion ?? "Descripción no disponible."}
            </p>

            {/* Zona */}
            <span className="text-gray-500 font-semibold py-10">
              {data.zona}
            </span>
            {/* WhatsApp */}
            <div className="flex items-center gap-2 mt-3">
              <Image
                src={"/whatsapp.svg"}
                width={30}
                height={30}
                alt="Icon WhatsApp"
              />
              <Link
                href={`https://wa.me/${data.numeroContacto}?text=Hola,%20vengo%20de%20ModelMatch.`}
                className="font-semibold text-lg"
              >
                {data.numeroContacto}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
