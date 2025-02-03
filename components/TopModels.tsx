"use client";

import { ModelData } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BoxModel } from "./BoxModel";

export function TopModels() {
  const [models, setModels] = useState<ModelData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/models");

        if (!response.ok) throw new Error("Error al consultar");

        const rawData = await response.json();

        const transformedData: ModelData[] = rawData.map((item: any) => {
          return {
            nombreCompleto: item.nombreCompleto,
            edad: item.edad,
            descripcion: item.descripcion,
            etnia: item.etnia,
            zona: item.zona,
            multimedias: item.multimedias,
            numeroContacto: item.numeroContacto,
          };
        });

        setModels(transformedData);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Error desconocido");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-2xl text-center py-5 bg-segundary text-white">
        Top Models
      </h1>

      <BoxModel dataModels={models} />
    </div>
  );
}
