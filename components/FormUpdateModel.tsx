"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateModelAction } from "@/actions/updateModelAction";
import { idiomasDisponibles } from "@/utils/idiomasMap";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FormUpdateModelProps {
  dataModel: {
    duracionesAdicionales: string;
    edad: string;
    multimedias: (string | File)[];
    idiomas: string;
    nombreUsuario: string;
    numeroContacto: string;
    precioHora: string;
    rol: string;
    descripcion: string;
    suscripcionBasica: boolean;
    suscripcionPremiun: boolean;
  };
}

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg"];
const MAX_VIDEO_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_VIDEO_TYPES = ["video/mp4"];

export function FormUpdateModel({ dataModel }: FormUpdateModelProps) {
  const [formData, setFormData] = useState<{
    duracionesAdicionales: string;
    edad: string;
    idiomas: string[];
    numeroContacto: string;
    precioHora: string;
    descripcion: string;
    multimedias: (string | File)[];
  }>({
    duracionesAdicionales: dataModel.duracionesAdicionales || "",
    edad: dataModel.edad?.toString() || "",
    idiomas: Array.isArray(dataModel.idiomas) ? dataModel.idiomas : [],
    numeroContacto: dataModel.numeroContacto || "",
    precioHora: dataModel.precioHora?.toString() || "",
    descripcion: dataModel.descripcion || "",
    multimedias: dataModel.multimedias || [],
  });

  const { nombreUsuario } = dataModel;
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (
      e.target instanceof HTMLSelectElement &&
      e.target.multiple &&
      name === "idiomas"
    ) {
      const selectedValues = Array.from(e.target.options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);

      setFormData((prev) => ({
        ...prev,
        [name]: selectedValues,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files).filter((file) => {
      if (file.type.startsWith("image/")) {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
          toast.error(`Tipo de imagen no permitido: ${file.type}`);
          return false;
        }
        if (file.size > MAX_IMAGE_SIZE) {
          toast.error(
            `La imagen excede el tamaño permitido (${MAX_IMAGE_SIZE / 1024 / 1024
            } MB)`
          );
          return false;
        }
      } else if (file.type.startsWith("video/")) {
        if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
          toast.error(`Tipo de video no permitido: ${file.type}`);
          return false;
        }
        if (file.size > MAX_VIDEO_SIZE) {
          toast.error(
            `El video excede el tamaño permitido (${MAX_VIDEO_SIZE / 1024 / 1024
            } MB)`
          );
          return false;
        }
      } else {
        toast.error(`Tipo de archivo no permitido: ${file.type}`);
        return false;
      }
      return true;
    });

    setFormData((prev) => ({
      ...prev,
      multimedias: [...prev.multimedias, ...fileArray],
    }));
  };

  const handleRemoveMedia = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      multimedias: prev.multimedias.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("edad", formData.edad);
    fd.append("precioHora", formData.precioHora);
    fd.append("descripcion", formData.descripcion);
    fd.append("duracionesAdicionales", formData.duracionesAdicionales);
    fd.append("numeroContacto", formData.numeroContacto);

    formData.idiomas.forEach((idioma) => fd.append("idiomas[]", idioma));

    formData.multimedias.forEach((media) => {
      if (typeof media === "string") {
        fd.append("multimedias", media);
      } else {
        fd.append("multimedias", media);
      }
    });

    // Verificamos si el usuario NO tiene suscripción básica:
    if (!dataModel.suscripcionBasica) {
      toast.error(
        "Debes tener una suscripción básica activa para publicar tu perfil."
      );
      return;
    }

    try {
      const response = await updateModelAction(nombreUsuario, fd);
      if (response.success) {
        toast.success("Información actualizada exitosamente");
        router.push("/modelo");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      toast.error("Error al actualizar la información");
    }
  };

  const isVideo = (file: string | File) => {
    if (typeof file === "string") {
      return file.match(/\.(mp4)$/i);
    }
    return file.type.startsWith("video/");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 w-full pt-5 pb-10">
      <h1 className="font-bold text-lg">EDITAR PERFIL</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-10 lg:px-52"
      >
        {/* numeroContacto */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="numeroContacto"
            id="numeroContacto"
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2 rounded-lg"
            value={formData.numeroContacto}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="numeroContacto"
            className="peer-focus:font-medium text-sm text-black font-semibold"
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
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2 rounded-lg"
            value={formData.edad}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="edad"
            className="peer-focus:font-medium text-sm text-black font-semibold"
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
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2 rounded-lg"
            value={formData.precioHora}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="precioHora"
            className="peer-focus:font-medium text-sm text-black font-semibold"
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
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2 rounded-lg"
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
            className="peer-focus:font-medium text-sm text-black font-semibold"
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
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2 rounded-lg"
            value={formData.duracionesAdicionales}
            onChange={handleChange}
          />
          <label
            htmlFor="duracionesAdicionales"
            className="peer-focus:font-medium text-sm text-black font-semibold"
          >
            Duraciones Adicionales / de servicios
          </label>
        </div>

        {/* descripcion */}
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            name="descripcion"
            id="descripcion"
            className="block py-2.5 px-0 w-full text-sm uppercase border-0 border-b-2 rounded-lg h-32"
            value={formData.descripcion}
            onChange={handleChange}
            required
          ></textarea>
          <label
            htmlFor="descripcion"
            className="peer-focus:font-medium text-sm text-black font-semibold"
          >
            Presentación de modelo
          </label>
        </div>

        {/* Multimedia */}
        <div className="relative z-0 w-full mb-5 group">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="multimedia"
          >
            Multimedias (Imágenes y Videos)
          </label>
          <input
            type="file"
            multiple
            accept="image/png, image/jpeg, video/mp4"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            onChange={handleFileChange}
          />
          <div className="flex gap-3 mt-3 flex-wrap">
            {formData.multimedias.map((media, index) => (
              <div key={index} className="relative">
                {isVideo(media) ? (
                  // Render video preview
                  <video
                    src={
                      typeof media === "string"
                        ? media
                        : URL.createObjectURL(media)
                    }
                    className="w-40 h-48 object-cover"
                    controls
                  />
                ) : // Render image preview
                  typeof media === "string" ? (
                    <Image
                      src={
                        media.startsWith("http")
                          ? media
                          : `http://${process.env.NEXT_PUBLIC_API_URL}${media}`
                      }
                      alt={`Media ${index + 1}`}
                      width={160}
                      height={160}
                      unoptimized
                    />
                  ) : (
                    <Image
                      src={URL.createObjectURL(media)}
                      alt={`Nueva media ${index + 1}`}
                      className="w-20 h-20 object-cover"
                      width={160}
                      height={160}
                      unoptimized
                    />
                  )}
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Botón submit */}
        <div>
          <button
            type="submit"
            className="text-white bg-segundary hover:bg-primary 
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
