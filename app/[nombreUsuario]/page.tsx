"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { PerfilPublico } from "@/components/PerfilPublico";
import { DataModels } from "@/types/types";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { toast } from "sonner";

export default function ModelInfoPage() {
    const { nombreUsuario } = useParams();
    const [dataModel, setDataModel] = useState<DataModels | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!nombreUsuario) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${nombreUsuario}`);
                setDataModel(response.data);
            } catch {
                toast.error("Error al obtener datos");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [nombreUsuario]);

    if (loading) return <div>Cargando...</div>;

    if (!dataModel) {
        return <div>No se encontró información para esta modelo.</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="pt-24 flex flex-col justify-center items-center">
                <PerfilPublico dataModel={dataModel} />;
            </div>
        </div>
    )
}
