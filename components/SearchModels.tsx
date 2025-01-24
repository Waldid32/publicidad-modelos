import React from "react";

export default function SearchModels() {
  return (
    <form
      action=""
      className="flex flex-col lg:flex-row justify-center items-center gap-5 w-full"
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
          // value={formData.nombreCompleto}
          // onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-96 lg:w-full"
          required
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
          // value={formData.zona}
          // onChange={(e) => {
          //   handleChange(e);
          //   fetchLocations(e.target.value); // Llamada a OpenCage mientras escriben
          // }}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-96 lg:w-full"
          required
        />
        {/* Sugerencias */}
        {/* {suggestions.length > 0 && (
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
          )} */}
      </div>

      {/* Etnia */}
      <div className="user-box">
        <label className="block mb-2 text-sm font-medium text-black">
          Etnia
        </label>
        <select
          name="etnia"
          id="etnia"
          // onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-96 lg:w-full"
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

      <div>
        <label
          htmlFor="idiomas"
          className="block text-sm font-medium text-black mb-1"
        >
          Idioma
        </label>
        <select
          id="idiomas"
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-96 lg:w-full"
        >
          <option value="">Seleccione un idioma</option>
          <option value="es">Español (Castellano)</option>
          <option value="ca">Catalán</option>
          <option value="eu">Euskera</option>
          <option value="gl">Gallego</option>
          <option value="ast">Asturiano</option>
          <option value="ar">Aragonés</option>
          <option value="oc">Aranés (Occitano)</option>
        </select>
      </div>

      <button
        type="submit"
        className="text-white bg-segundary hover:bg-primary hover:border-2 hover:border-segundary hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-72 lg:w-52"
        //   disabled={isPending}
      >
        Buscar
      </button>
    </form>
  );
}
