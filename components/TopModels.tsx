"use client";

import { useFetchModels } from "@/hooks/useFetchModels";
import { ModelList } from "./ModelList";
import { ModelData } from "@/types/types";

interface TopModelsProps {
  favoritos?: ModelData[];
  toggleFavorito?: (modelo: ModelData) => void;
  isLoggedIn?: boolean;
}


export function TopModels({ favoritos, toggleFavorito, isLoggedIn }: TopModelsProps) {
  const { models, loading, error } = useFetchModels("/api/models");

  if (loading) return <p className="text-center text-lg">Cargando modelos...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <ModelList
      dataModels={models}
      favoritos={favoritos}
      toggleFavorito={toggleFavorito}
      isLoggedIn={isLoggedIn}
    />
  );
}
