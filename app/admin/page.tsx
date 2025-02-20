"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { toast } from "sonner";

interface Modelo {
  nombre: string;
  estado: string;
  suscripcion: string;
}

export default function AdminHome() {
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchModelos() {
      try {
        const response = await axios.get("/api/models");
        setModelos(response.data);
      } catch (error: any) {
        setModelos([])
        toast.error('No hay modelos registrados / Ocurrió un error al cargar los modelos.')
      }
    }
    fetchModelos();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-10 py-10 px-10">
      <div>
        <h1 className="text-2xl font-bold mb-4">Administración de Modelos</h1>
      </div>
      {
        <div className="overflow-x-auto lg:w-full lg:px-5">
          <Table>
            <Table.Head>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Estado</Table.HeadCell>
              <Table.HeadCell>Suscripción</Table.HeadCell>
              <Table.HeadCell>Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {modelos.map((modelo, index) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="px-4 py-2 border">{modelo.nombre}</Table.Cell>
                  <Table.Cell className="px-4 py-2 border">{modelo.estado}</Table.Cell>
                  <Table.Cell className="px-4 py-2 border">{modelo.suscripcion}</Table.Cell>
                  <Table.Cell className="px-4 py-2 border">
                    <button
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => router.push(`/admin/gestionarModelos/${modelo.nombre}`)}
                    >
                      Gestionar
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      }
    </div>
  );
}
