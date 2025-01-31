"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registerModelsAction } from "@/actions/registerModelsAction";

interface FormData {
  nombreCompleto: string;
  email: string;
  nombreUsuario: string;
  fechaNacimiento: string;
  password: string;
  confirmarPassword: string;
  etnia: string;
  zona: string;
  ciudad: string;
}

interface OpenCageResult {
  formatted: string;
}

interface OpenCageResponse {
  results: OpenCageResult[];
}

export default function RegisterModel() {
  const [formData, setFormData] = useState<FormData>({
    nombreCompleto: "",
    email: "",
    nombreUsuario: "",
    fechaNacimiento: "",
    password: "",
    confirmarPassword: "",
    etnia: "",
    zona: "",
    ciudad: "",
  });
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const router = useRouter();

  // Calcular la fecha máxima permitida (hoy - 18 años)
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Forzar a minúsculas si es el campo "nombreUsuario"
    if (name === "nombreUsuario") {
      setFormData({
        ...formData,
        [name]: value.toLowerCase(),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name === "zona") {
      if (debounceTimer) clearTimeout(debounceTimer); // Limpiar el temporizador previo
      const timer = setTimeout(() => fetchLocations(value), 500); // Consultar después de 500ms
      setDebounceTimer(timer); // Guardar el nuevo temporizador
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const birthDate = new Date(formData.fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      toast.error("Debes tener al menos 18 años para registrarte.");
      return;
    }

    startTransition(async () => {
      const result = await registerModelsAction(formData);

      if (result.success) {
        toast.success("Registro exitoso. Ahora puedes iniciar sesión.");
        router.push("/login");
      } else {
        toast.error(result.message);
      }
    });
  };

  const fetchLocations = async (query: string) => {
    if (!query || query.trim().length < 3) {
      setSuggestions([]); // No buscar si la consulta es demasiado corta
      return;
    }

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&limit=50&countrycode=es&language=es`
      );
      const data: OpenCageResponse = await response.json();

      if (data.results) {
        const formattedSuggestions = data.results.map(
          (result: OpenCageResult) => result.formatted
        );
        setSuggestions(formattedSuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching locations:", error); // Utilizar 'error' para depuración
      toast.error("Error buscando ubicaciones. Intenta de nuevo.");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const ciudadExtraida = suggestion.split(",").pop()?.trim() || "";

    setFormData({ ...formData, zona: suggestion, ciudad: ciudadExtraida });
    setSuggestions([]);
  };

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:w-[750px] xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Registro de Modelos
            </h1>
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
              {/* Nombre Completo */}
              <div>
                <label
                  htmlFor="nombreCompleto"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="nombreCompleto"
                  id="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  required
                />
              </div>

              {/* Nombre de Usuario */}
              <div>
                <label
                  htmlFor="nombreUsuario"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  name="nombreUsuario"
                  id="nombreUsuario"
                  value={formData.nombreUsuario}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 lowercase"
                  required
                />
              </div>

              {/* Fecha de Nacimiento */}
              <div>
                <label
                  htmlFor="fechaNacimiento"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  id="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  max={maxDate}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  required
                />
              </div>

              {/* Etnia */}
              <div className="user-box">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Etnia
                </label>
                <select
                  name="etnia"
                  id="etnia"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                  required
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

              {/* Zona */}
              <div>
                <label
                  htmlFor="zona"
                  className="block mb-2 text-sm font-medium text-gray-900"
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
                    fetchLocations(e.target.value); // Llamada a OpenCage mientras escriben
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                  required
                />
                {/* Sugerencias */}
                {suggestions.length > 0 && (
                  <ul className="bg-white border border-gray-300 rounded-lg mt-2 max-h-40 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Ciudad */}
              <div>
                <label
                  htmlFor="ciudad"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Ciudad
                </label>
                <input
                  type="text"
                  name="ciudad"
                  id="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                  required
                />
              </div>

              {/* Contraseña */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                  required
                />
              </div>

              {/* Confirmar Contraseña */}
              <div>
                <label
                  htmlFor="confirmarPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  name="confirmarPassword"
                  id="confirmarPassword"
                  value={formData.confirmarPassword}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                  required
                />
              </div>
              <div></div>

              <button
                type="submit"
                className="w-full text-white bg-segundary hover:bg-primary hover:text-black focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                disabled={isPending}
              >
                {isPending ? "Registrando..." : "Registrarse"}
              </button>
              <button
                type="button"
                className="w-full text-white bg-segundary hover:bg-primary  hover:text-black focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={() => router.push("/")}
              >
                Regresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
