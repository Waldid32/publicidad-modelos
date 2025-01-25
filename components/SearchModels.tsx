"use client";
import { searhModels } from "@/actions/searhModels";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function SearchModels({ setDataModels }: any) {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    etnia: "",
    zona: "",
    idiomas: "",
    edad: 0,
    precio: 0,
  });
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "precio") {
      // Procesar el precio
      const rawValue = value.replace(/[^\d.,]/g, "").replace(",", ".");
      const numericValue = parseFloat(rawValue);

      if (!isNaN(numericValue) && numericValue >= 0) {
        setFormData({
          ...formData,
          [name]: numericValue, // Guardar solo el número puro
        });
      } else {
        setFormData({
          ...formData,
          [name]: 0, // Si el valor es inválido, guardar 0
        });
      }
    } else if (name === "edad") {
      // Validar edad (debe estar entre 18 y 90)
      const numericValue = parseInt(value, 10);
      if (numericValue >= 18 && numericValue <= 90) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      // Manejo normal para otros campos
      setFormData({ ...formData, [name]: value });

      // Activar debounce solo para el campo "zona"
      if (name === "zona") {
        if (debounceTimer) clearTimeout(debounceTimer);
        const timer = setTimeout(() => fetchLocations(value), 1000);
        setDebounceTimer(timer);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      console.log({ formData });
      const result = await searhModels(formData);
      setDataModels(result);
    });
  };

  const fetchLocations = async (query: string) => {
    if (!query || query.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&limit=50&countrycode=es&language=es`
      );
      const data = await response.json();

      if (data.results) {
        const formattedSuggestions = data.results.map(
          (result: any) => result.formatted
        );
        setSuggestions(formattedSuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      toast.error("Error buscando ubicaciones. Intenta de nuevo.");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormData({ ...formData, zona: suggestion });
    setSuggestions([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-5 px-6 md:px-10 "
    >
      {/* Nombre Completo */}
      <div>
        <label
          htmlFor="nombreCompleto"
          className="block mb-2 text-sm font-medium text-black"
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
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block p-2.5 w-96 lg:w-full"
        />
      </div>

      {/* Edsad */}
      <div>
        <label
          htmlFor="edad"
          className="block mb-2 text-sm font-medium text-black"
        >
          Edad
        </label>
        <input
          type="number"
          name="edad"
          id="edad"
          value={formData.edad}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block p-2.5 w-96 lg:w-full"
          max={90}
        />
      </div>

      {/* Zona */}
      <div>
        <label
          htmlFor="zona"
          className="block mb-2 text-sm font-medium text-black"
        >
          Zona / Dirección
        </label>
        <input
          type="text"
          name="zona"
          id="zona"
          value={formData.zona}
          onChange={(e) => {
            handleChange(e);
            fetchLocations(e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block p-2.5 w-96 lg:w-full"
        />
        {/* Sugerencias */}
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto z-10 shadow-md">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 hover:bg-gray-200 cursor-pointer w-96"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Etnia */}
      <div className="user-box">
        <label className="block mb-2 text-sm font-medium text-black">
          Etnia
        </label>
        <select
          name="etnia"
          id="etnia"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary focus:border-primary block p-2.5 w-96 lg:w-full"
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
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-96 lg:w-full"
          onChange={handleChange}
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

      {/* Precio */}
      <div>
        <label
          htmlFor="edad"
          className="block mb-2 text-sm font-medium text-black"
        >
          Precio (Solo Precio por hora)
        </label>
        <input
          type="number"
          name="precio"
          id="precio"
          value={formData.precio}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block p-2.5 w-96 lg:w-full"
        />
      </div>

      <div className="flex items-center justify-center md:justify-start">
        <button
          type="submit"
          className="text-white bg-segundary hover:bg-primary hover:border-2 hover:border-segundary hover:text-black focus:ring-2 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center w-72 lg:w-32"
          //   disabled={isPending}
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
