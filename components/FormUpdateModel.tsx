"use client";

import React, { useState, ChangeEvent } from "react";
import { etniaMap } from "@/utils/etniaMap";
import { toast } from "sonner";

interface FormUpdateModelProps {
  dataModel: any; // Podrías tipar esto mejor, por ejemplo con un UserModel
}

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg"];
const MAX_VIDEO_SIZE = 20 * 1024 * 1024; // 20 MB (ejemplo)
const ALLOWED_VIDEO_TYPES = ["video/mp4"];

// Componente Client
export function FormUpdateModel({ dataModel }: FormUpdateModelProps) {
  // Extrae los campos iniciales de dataModel
  const {
    ciudad,
    duracionesAdicionales,
    edad,
    email,
    etnia,
    fotos,
    idiomas,
    nombreCompleto,
    nombreUsuario,
    numeroContacto,
    password,
    precioHora,
    rol,
    videos,
    zona,
    descripcion,
  } = dataModel;

  // Crea un objeto de estado inicial
  const [formData, setFormData] = useState({
    ciudad: ciudad || "",
    duracionesAdicionales: duracionesAdicionales || "",
    edad: edad || "",
    email: email || "",
    etnia: etniaMap[etnia] || etnia, // Formateas aquí o guardas la clave real
    idiomas: idiomas || "",
    nombreCompleto: nombreCompleto || "",
    nombreUsuario: nombreUsuario || "",
    numeroContacto: numeroContacto || "",
    precioHora: precioHora || "",
    zona: zona || "",
    descripcion: descripcion || "",
    // Para los archivos, guardaremos un arreglo de FileList o algo similar:
    fotos: [] as File[],
    videos: [] as File[],
  });

  // Manejador para cambios en campos de texto
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Cambia tu handleFileChange a algo así:
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files) return;

    const fileArray = Array.from(files);

    // 1. Verifica si alguno no cumple las reglas
    //    Si hay al menos uno inválido, limpias la selección y sales
    for (const file of fileArray) {
      if (name === "fotos") {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
          toast.error(`Tipo de imagen no permitido`);
          e.target.value = ""; // Limpia el input de archivos
          return; // Salimos sin actualizar el estado
        }
        if (file.size > MAX_IMAGE_SIZE) {
          toast.error(
            `La imagen excede los ${MAX_IMAGE_SIZE / (1024 * 1024)} MB`
          );
          e.target.value = "";
          return;
        }
      } else if (name === "videos") {
        if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
          toast.error(`Tipo de video no permitido`);
          e.target.value = "";
          return;
        }
        if (file.size > MAX_VIDEO_SIZE) {
          toast.error(
            `El video excede los ${MAX_VIDEO_SIZE / (1024 * 1024)} MB`
          );
          e.target.value = "";
          return;
        }
      }
    }

    // 2. Si todos son válidos, actualiza el estado
    setFormData((prev) => ({
      ...prev,
      [name]: fileArray, // Se almacenan todos porque pasaron la validación
    }));
  };

  // Manejador submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // En este punto, formData contiene todos los campos
    // + arrays con los archivos seleccionados

    // Ejemplo: Convertir a JSON (sin archivos)
    // (OJO: si realmente quieres subir archivos, usa FormData en lugar de JSON)
    const dataToSend = {
      ...formData,
      // Si quisieras guardar la clave original de etnia,
      // tendrías que almacenarla por separado,
      // pues ahorita guardamos la descripción.
    };

    console.log("Datos a enviar:", dataToSend);

    // OPCIÓN A: Llamar Server Action
    // startTransition(async () => {
    //   await updateModelAction(dataToSend);
    // });

    // OPCIÓN B: fetch() a tu endpoint
    // fetch("/api/update-model", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(dataToSend),
    // }).then(...).catch(...);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 w-full">
      <h1 className="font-bold text-lg">EDITAR PERFIL</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-10 lg:px-52"
      >
        {/* nombreCompleto */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="nombreCompleto"
            id="nombreCompleto"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 peer uppercase"
            value={formData.nombreCompleto}
            onChange={handleChange}
            disabled
          />
        </div>

        {/* email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
        </div>

        {/* etnia (formateada) */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="etnia"
            id="etnia"
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2 border-gray-300"
            value={formData.etnia}
            onChange={handleChange}
            disabled
          />
        </div>

        {/* zona */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="zona"
            id="zona"
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2 border-gray-300"
            value={formData.zona}
            onChange={handleChange}
            disabled
          />
        </div>

        {/* ciudad */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="ciudad"
            id="ciudad"
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2 border-gray-300"
            value={formData.ciudad}
            onChange={handleChange}
            disabled
          />
        </div>

        {/* idiomas */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="idiomas"
            id="idiomas"
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2"
            value={formData.idiomas}
            onChange={handleChange}
          />
          <label
            htmlFor="idiomas"
            className="peer-focus:font-medium text-sm text-gray-500"
          >
            Idiomas
          </label>
        </div>

        {/* numeroContacto */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="numeroContacto"
            id="numeroContacto"
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2"
            value={formData.numeroContacto}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="numeroContacto"
            className="peer-focus:font-medium text-sm text-gray-500"
          >
            Número de contacto
          </label>
        </div>

        {/* edad */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="edad"
            id="edad"
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2"
            value={formData.edad}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="edad"
            className="peer-focus:font-medium text-sm text-gray-500"
          >
            Edad
          </label>
        </div>

        {/* descripcion */}
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            name="descripcion"
            id="descripcion"
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2"
            value={formData.descripcion}
            onChange={handleChange}
            required
          ></textarea>
          <label
            htmlFor="descripcion"
            className="peer-focus:font-medium text-sm text-gray-500"
          >
            Descripción
          </label>
        </div>

        {/* precioHora */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="precioHora"
            id="precioHora"
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2"
            value={formData.precioHora}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="precioHora"
            className="peer-focus:font-medium text-sm text-gray-500"
          >
            Precio por Hora
          </label>
        </div>

        {/* duracionesAdicionales */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="duracionesAdicionales"
            id="duracionesAdicionales"
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2"
            value={formData.duracionesAdicionales}
            onChange={handleChange}
          />
          <label
            htmlFor="duracionesAdicionales"
            className="peer-focus:font-medium text-sm text-gray-500"
          >
            Duraciones Adicionales
          </label>
        </div>

        {/* Fotos (File) */}
        <div className="relative z-0 w-full mb-5 group">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="fotos"
          >
            Fotos
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="fotos"
            name="fotos"
            type="file"
            accept="image/png, image/jpeg"
            multiple
            onChange={handleFileChange}
            required
          ></input>
        </div>

        {/* Videos (File) */}
        <div className="relative z-0 w-full mb-5 group">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="videos"
          >
            Videos
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="videos"
            name="videos"
            type="file"
            accept="video/mp4"
            multiple
            onChange={handleFileChange}
          ></input>
        </div>

        {/* Botón submit */}
        <div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 
              focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
              rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
