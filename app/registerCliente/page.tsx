'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { registerClienteAction } from '@/actions/registerClienteAction';

export default function RegisterCliente() {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    nombreUsuario: '',
    fechaNacimiento: '',
    password: '',
    confirmarPassword: '',
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Calcular la fecha máxima permitida (hoy - 18 años)
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  )
    .toISOString()
    .split('T')[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'nombreUsuario' ? value.toLowerCase() : value,
    }));
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
      toast.error('Debes tener al menos 18 años para registrarte.');
      return;
    }

    startTransition(async () => {
      const result = await registerClienteAction(formData);

      if (result.success) {
        toast.success('Registro exitoso. Ahora puedes iniciar sesión.');
        router.push('/login');
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Registro de Cliente
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
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
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
                  value={formData.nombreUsuario}
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
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  max={maxDate}
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
                  className="block mb-2 text-sm font-medium text-gray-900"
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
                {isPending ? 'Registrando...' : 'Registrarse'}
              </button>
              <button
                type="button"
                className="w-full text-white bg-segundary hover:bg-primary hover:text-black focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={() => router.push('/')}
              >
                Rregresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
