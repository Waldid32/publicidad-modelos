"use client";

import { useState } from "react";
import { etniaMap } from "@/utils/etniaMap";
import { toast } from "sonner";
import { updateModelAction } from "@/actions/updateModelAction";
import { idiomasDisponibles } from "@/utils/idiomasMap";
import { useRouter } from "next/navigation";

interface FormUpdateModelProps {
  dataModel: any; // Podrías tipar esto mejor, por ejemplo con un UserModel
}

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg"];
const MAX_VIDEO_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_VIDEO_TYPES = ["video/mp4"];

export function FormUpdateModel({ dataModel }: FormUpdateModelProps) {
  const {
    duracionesAdicionales,
    edad,
    fotos,
    idiomas,
    nombreUsuario,
    numeroContacto,
    precioHora,
    rol,
    videos,
    zona,
    descripcion,
  } = dataModel;

  // Crea un objeto de estado inicial
  const [formData, setFormData] = useState({
    duracionesAdicionales: duracionesAdicionales || "",
    edad: edad || "",
    idiomas: Array.isArray(idiomas) ? idiomas : idiomas ? [idiomas] : [],
    numeroContacto: numeroContacto || "",
    precioHora: precioHora || "",
    zona: zona || "",
    descripcion: descripcion || "",
    fotos: [] as File[],
    videos: [] as File[],
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Si es un select múltiple llamado "idiomas"
    if (
      e.target instanceof HTMLSelectElement &&
      e.target.multiple &&
      name === "idiomas"
    ) {
      // Obtenemos todos los valores seleccionados
      const selectedValues = Array.from(e.target.options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);

      setFormData((prev) => ({
        ...prev,
        [name]: selectedValues,
      }));
    } else {
      // Inputs normales (text, number, textarea, etc.)
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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

    setFormData((prev) => ({
      ...prev,
      [name]: fileArray,
    }));
  };

  // Manejador submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();

    // Convertimos edad y precioHora a números
    const edadNumerica = parseInt(formData.edad, 10);
    const precioHoraNumerico = parseFloat(formData.precioHora);

    // Verificamos que los valores sean válidos antes de enviar
    if (isNaN(edadNumerica) || isNaN(precioHoraNumerico)) {
      toast.error("Edad o precio por hora no válidos");
      return;
    }

    // Asegúrate de pasar los valores como cadenas, pero a partir de números válidos
    fd.append("edad", edadNumerica.toString());
    fd.append("precioHora", precioHoraNumerico.toString());

    // El resto de los campos se mantienen igual
    fd.append("descripcion", formData.descripcion);
    fd.append("duracionesAdicionales", formData.duracionesAdicionales);
    fd.append("numeroContacto", formData.numeroContacto);
    formData.idiomas.forEach((idioma) => {
      fd.append("idiomas", idioma);
    });
    formData.fotos.forEach((file) => {
      fd.append("fotos", file);
    });
    formData.videos.forEach((file) => {
      fd.append("videos", file);
    });

    try {
      const response = await updateModelAction(nombreUsuario, fd);

      if (response.success) {
        toast.success("Información actualizada exitosamente");
        router.push("/modelo");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error al actualizar la información");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 w-full">
      <h1 className="font-bold text-lg">EDITAR PERFIL</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-10 lg:px-52"
      >
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
            Presentación de modelo
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
            $ Precio por Hora
          </label>
        </div>

        {/* idiomas */}
        <div className="relative z-0 w-full mb-5 group">
          <select
            multiple
            name="idiomas"
            id="idiomas"
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2"
            value={formData.idiomas} // <-- formData.idiomas es un array
            onChange={handleChange}
          >
            {idiomasDisponibles.map((idioma) => (
              <option key={idioma.value} value={idioma.value}>
                {idioma.label}
              </option>
            ))}
          </select>
          <label
            htmlFor="idiomas"
            className="peer-focus:font-medium text-sm text-gray-500"
          >
            Idiomas
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
            Duraciones Adicionales / de servicios
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
            Actualizar Información
          </button>
        </div>
      </form>
    </div>
  );
}
