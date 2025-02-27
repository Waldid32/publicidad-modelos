import NavBarLogin from '@/components/NavBarLogin';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Interfaz Clientes',
};

export default async function ModeloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const role = cookieStore.get('role')?.value || '';
  const nombreCompleto = cookieStore.get('nombreCompleto')?.value || '';

  return (
    <div className="bg-bgPrimaryGradiante h-full">
      <NavBarLogin role={role} nombreCompleto={nombreCompleto} />
      <main>{children}</main>
    </div>
  );
}
