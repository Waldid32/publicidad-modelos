import Image from "next/image";

export function BoxModel({ dataModels }: any) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          {dataModels &&
            dataModels.map((data: any, index: number) => (
              <div
                className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
                key={index}
              >
                <a href="#">
                  <Image
                    width={240}
                    height={170}
                    className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                    src="/prueba.jpg"
                    alt="Bonnie Avatar"
                  />
                </a>
                <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">{data.nombreCompleto} </a>
                  </h3>
                  <span className="text-gray-500 dark:text-gray-400">
                    <strong>Enita:</strong> {data.edad}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {data.etnia}
                  </span>
                  <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                    {data.descripcion ??
                      "Bonnie drives the technical strategy of the flowbite platform and brand."}
                  </p>
                  <span className="text-gray-500 dark:text-gray-400">
                    {data.zona}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
