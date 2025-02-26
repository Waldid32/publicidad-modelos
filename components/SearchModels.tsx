'use client';
import { searhModels } from '@/actions/searhModels';
import { ModelData } from '@/types/types';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface SearchModelsProps {
  setDataModels: (data: ModelData[]) => void;
}

interface Ubicacion {
  lat: number | null;
  lon: number | null;
}

interface Filters {
  nombreCompleto: string;
  etnia: string;
  idiomas: string;
  edad: number | '' | undefined;
  precio: number | null | undefined;
  distancia: number;
  ubicacion?: Ubicacion;
  zona?: string;
}

export function SearchModels({ setDataModels }: SearchModelsProps) {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    etnia: '',
    idiomas: '',
    edad: '' as number | '',
    precio: null as number | null,
    distancia: 10, // Distancia por defecto en km
  });

  const [userLocation, setUserLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  const [usarUbicacion, setUsarUbicacion] = useState(true); // Nuevo estado para controlar si se usa ubicación

  // Obtener la ubicación del usuario si la opción está activada
  useEffect(() => {
    if (usarUbicacion && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          toast.error('No se pudo obtener tu ubicación.');
        },
      );
    }
  }, [usarUbicacion]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'precio') {
      const numericValue = parseFloat(value);
      setFormData((prev) => ({
        ...prev,
        [name]: isNaN(numericValue) ? null : numericValue,
      }));
    } else if (name === 'edad') {
      setFormData((prev) => ({
        ...prev,
        [name]: value === '' ? '' : Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (usarUbicacion && (!userLocation.latitude || !userLocation.longitude)) {
      return toast.error('No se ha detectado tu ubicación.');
    }

    const filters: Filters = {
      nombreCompleto: formData.nombreCompleto,
      etnia: formData.etnia,
      idiomas: formData.idiomas,
      edad: formData.edad !== '' ? Number(formData.edad) : undefined,
      precio: formData.precio !== null ? Number(formData.precio) : undefined,
      distancia: formData.distancia,
    };

    if (usarUbicacion) {
      filters.ubicacion = {
        lat: userLocation.latitude,
        lon: userLocation.longitude,
      };
      filters.zona = 'Cercano'; // Para cumplir con la estructura de searhModels
    }

    try {
      const result = await searhModels(filters);
      if (!Array.isArray(result)) {
        return toast.error('No se encontraron modelos o hubo un error.');
      }

      setDataModels(result);
    } catch {
      setDataModels([]);
      toast.error('No se encontraron modelos o hubo un error.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 items-center justify-between gap-5 px-6 md:grid-cols-3 md:px-10"
    >
      {/* Nombre Completo */}
      <div>
        <label
          htmlFor="nombreCompleto"
          className="mb-2 block text-sm font-medium text-black"
        >
          Buscar
        </label>
        <input
          type="text"
          name="nombreCompleto"
          id="nombreCompleto"
          value={formData.nombreCompleto}
          onChange={handleChange}
          placeholder="Nombre en especial"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary lg:w-full"
        />
      </div>

      {/* Edad */}
      <div>
        <label
          htmlFor="edad"
          className="mb-2 block text-sm font-medium text-black"
        >
          Edad
        </label>
        <input
          type="number"
          name="edad"
          id="edad"
          value={formData.edad}
          onChange={handleChange}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary lg:w-full"
          max={90}
        />
      </div>

      {/* Filtro de distancia */}
      <div>
        <label
          htmlFor="distancia"
          className="mb-2 block text-sm font-medium text-black"
        >
          Rango de distancia (km)
        </label>
        <input
          type="range"
          name="distancia"
          id="distancia"
          min={1}
          max={50}
          value={formData.distancia}
          onChange={(e) =>
            setFormData({ ...formData, distancia: Number(e.target.value) })
          }
          className="w-full"
        />
        <span className="block text-sm text-gray-700">
          {formData.distancia} km
        </span>
      </div>

      {/* Etnia */}
      <div>
        <label className="mb-2 block text-sm font-medium text-black">
          Etnia
        </label>
        <select
          name="etnia"
          id="etnia"
          value={formData.etnia}
          onChange={handleChange}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-primary focus:ring-primary lg:w-full"
        >
          <option value="">Selecciona una opción</option>
          <optgroup label="Europa">
            <option value="occidental_europea">
              Europea occidental (España, Francia, Italia)
            </option>
            <option value="este_europeo">
              Europea del este (Rusia, Ucrania, Polonia)
            </option>
          </optgroup>
          <optgroup label="Asia">
            <option value="arabe">Árabe (Egipto, Siria, Líbano)</option>
            <option value="kurda">Kurda (Turquía, Irak, Siria)</option>
            <option value="persa">Persa (Irán)</option>
            <option value="asiatica">Asiática</option>
          </optgroup>
          <optgroup label="América">
            <option value="latina">Latina</option>
            <option value="afrodescendiente">Afrodescendiente</option>
          </optgroup>
          <optgroup label="África">
            <option value="subsahariana">Subsahariana</option>
            <option value="norteafricana">Norteafricana</option>
          </optgroup>
        </select>
      </div>

      {/* Idioma */}
      <div>
        <label
          htmlFor="idiomas"
          className="block text-sm font-medium text-black"
        >
          Idioma
        </label>
        <select
          id="idiomas"
          name="idiomas"
          value={formData.idiomas}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 lg:w-full"
        >
          <option value="">Seleccione un idioma</option>
          <option value="es">Español (Castellano)</option>
          <option value="en">Ingles</option>
          <option value="ca">Catalán</option>
          <option value="eu">Euskera</option>
          <option value="gl">Gallego</option>
          <option value="ast">Asturiano</option>
          <option value="ar">Aragonés</option>
          <option value="oc">Aranés (Occitano)</option>
        </select>
      </div>

      {/* Opción para habilitar/deshabilitar la búsqueda por ubicación */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="usarUbicacion"
          checked={usarUbicacion}
          onChange={() => setUsarUbicacion(!usarUbicacion)}
          className="mr-2"
        />
        <label
          htmlFor="usarUbicacion"
          className="text-sm font-medium text-black"
        >
          Buscar por ubicación
        </label>
      </div>

      <div className="flex items-center justify-center md:justify-start">
        <button
          type="submit"
          className="w-72 rounded-lg bg-segundary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary lg:w-32"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
