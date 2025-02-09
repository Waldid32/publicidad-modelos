"use client";

import { ModelList } from "@/components/ModelList";
import { SearchModels } from "@/components/SearchModels";
import { TopModels } from "@/components/TopModels";
import { ModelData } from "@/types/types";
import { useState, useEffect } from "react";
import { agregarAFavoritos, eliminarDeFavoritos } from "@/actions/favoritos";
import { toast } from "sonner";

const fetchUserData = async () => {
  try {
    const response = await fetch("/api/auth/token", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      toast.error("No autenticado");
    }

    const data = await response.json();
    return { token: data.token, userId: data.decoded?.id };
  } catch {
    return { token: null, userId: null };
  }
};


interface UserData {
  token: string | null;
  userId: string | null;
}

export default function Cliente() {
  const [dataModels, setDataModels] = useState<ModelData[]>([]);
  const [favoritos, setFavoritos] = useState<ModelData[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData>({ token: null, userId: null });

  useEffect(() => {
    const initializeAuth = async () => {
      const data = await fetchUserData();
      setUserData(data);
      setIsLoggedIn(!!data.token && !!data.userId);
    };

    initializeAuth();
  }, []);

  const toggleFavorito = async (modelo: ModelData) => {
    if (!isLoggedIn || !userData.token || !userData.userId) {
      return toast.error("Usuario no autenticado");
    }

    try {
      if (favoritos.some(fav => fav.id === modelo.id)) {
        const response = await eliminarDeFavoritos(
          userData.userId,
          modelo.id,
          userData.token
        );
        setFavoritos((prev) => prev.filter(fav => fav.id !== modelo.id));
      } else {
        const response = await agregarAFavoritos(
          userData.userId,
          modelo.id,
          userData.token
        );
        setFavoritos((prev) => [...prev, modelo]);
      }
    } catch (error: any) {
      if (error.status === 409) {
        return toast.error("El modelo ya está en favoritos");
      }
    }
  };

  return (
    <div>
      <div className="py-5 border-b border-gray-200 bg-transparent">
        <SearchModels setDataModels={setDataModels} />
      </div>
      <div className="bg-white">
        <h1 className="font-bold text-2xl text-center py-5 bg-segundary text-white">
          Top de Modelos
        </h1>
        {dataModels.length === 0 ? (
          <div className="flex justify-center items-center">
            <TopModels
              favoritos={favoritos}
              toggleFavorito={toggleFavorito}
              isLoggedIn={isLoggedIn}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <ModelList
              dataModels={dataModels}
              favoritos={favoritos}
              toggleFavorito={toggleFavorito}
              isLoggedIn={isLoggedIn}
            />
          </div>
        )}
      </div>
    </div>
  );
}