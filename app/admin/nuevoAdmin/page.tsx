'use client'

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export default function NuevoAdminPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nombreCompleto: "",
        email: "",
        nombreUsuario: "",
        fechaNacimiento: "",
        password: "",
        confirmarPassword: "",
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "nombreUsuario" ? value.toLowerCase() : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const response = await fetch('/api/register-admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            toast.success('Registro exitoso.');
            router.push('/admin');
        } else {
            toast.error(result.message || 'Error al crear el administrador, intente más tarde');
        }
    };

    return (
        <section className="bg-bgPrimaryGradiante">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Registro de Administrador
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            {/* Nombre Completo */}
                            <div>
                                <label
                                    htmlFor="nombreCompleto"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    name="nombreCompleto"
                                    id="nombreCompleto"
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
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
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 lowercase"
                                    required
                                    autoCapitalize="none"
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
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                                    required
                                />
                            </div>

                            {/* Contraseña */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                                    required
                                />
                            </div>

                            {/* Confirmar Contraseña */}
                            <div>
                                <label
                                    htmlFor="confirmarPassword"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Confirmar Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="confirmarPassword"
                                    id="confirmarPassword"
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                                    required
                                />
                            </div>
                            <div></div>

                            <button
                                type="submit"
                                className="w-full text-white bg-segundary hover:bg-primary hover:text-black focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            >
                                Crear Admin
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
