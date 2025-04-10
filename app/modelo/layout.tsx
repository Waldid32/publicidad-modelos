import NavBarLogin from '@/components/NavBarLogin';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Sección Modelos',
};

export default async function ModeloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Este componente es un Server Component por defecto en Next 13/14
  const cookieStore = await cookies();

  const role = cookieStore.get('role')?.value || '';
  const nombreCompleto = cookieStore.get('nombreCompleto')?.value || '';

  return (
    <div className="bg-bgPrimaryGradiante min-h-[100vh]">
      <NavBarLogin role={role} nombreCompleto={nombreCompleto} />
      <main className="pt-10 pb-11">{children}</main>
    </div>
  );
}
