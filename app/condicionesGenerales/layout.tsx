import { Navbar } from '@/components/Navbar';

export const metadata = {
  title: 'Condiciones Generales',
};

export default async function ModeloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-bgPrimaryGradiante h-full">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
