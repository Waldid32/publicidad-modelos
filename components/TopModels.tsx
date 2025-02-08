"use client";

import { useFetchModels } from "@/hooks/useFetchModels";
import { ModelList } from "./ModelList";

export function TopModels() {
  const { models, loading, error } = useFetchModels("/api/models");

  if (loading) return <p className="text-center text-lg">Cargando modelos...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return <ModelList dataModels={models} />;
}
