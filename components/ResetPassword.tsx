'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { resetPasswordAction } from '@/actions/resetPasswordAction';

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // Obtener el token desde la URL

  const [newPassword, setNewPassword] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error('Token no válido');
      return;
    }

    setIsPending(true);
    const result = await resetPasswordAction(token, newPassword);
    setIsPending(false);

    if (result.success) {
      toast.success(result.message);
      router.push('/login'); // Redirigir a login después de éxito
    } else {
      toast.error(result.message);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="bg-white rounded-lg shadow sm:max-w-md">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900">
              Restablecer Contraseña
            </h1>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary hover:bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={isPending}
              >
                {isPending ? 'Cargando...' : 'Restablecer Contraseña'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
