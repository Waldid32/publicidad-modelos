'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { loginAction } from '@/actions/loginAction';
import Link from 'next/link';

export default function Login() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Llama a la server action
    startTransition(async () => {
      const result = await loginAction({ nombreUsuario, password });

      if (result.success) {
        toast.success(`Bienvenido, ${result.username}`);

        // Redirige según el rol
        if (result.role === 'admin') router.push('/admin');
        if (result.role === 'cliente') router.push('/cliente');
        if (result.role === 'modelo') router.push('/modelo');
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Inicia sesión en tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  name="nombreUsuario"
                  id="nombreUsuario"
                  value={nombreUsuario}
                  onChange={(e) =>
                    setNombreUsuario(e.target.value.toLowerCase())
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 lowercase"
                  placeholder="Nombre de usuario"
                  required
                  autoCapitalize="none"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                  required
                  autoCapitalize="none"
                  autoCorrect="off"
                />
              </div>
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary "
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 ">Acuérdate de mí</label>
                  </div>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-segundary hover:underline "
                >
                  ¿Has olvidado tu contraseña?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-segundary hover:bg-primary hover:text-black focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                disabled={isPending}
              >
                {isPending ? 'Cargando...' : 'Iniciar Sesión'}
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
