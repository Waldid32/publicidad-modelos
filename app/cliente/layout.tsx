import NavBarLogin from "@/components/NavBarLogin";
import { cookies } from "next/headers";

export const metadata = {
  title: "Interfaz Clientes",
};

export default async function ModeloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const role = cookieStore.get("role")?.value || "";
  const nombreCompleto = cookieStore.get("nombreCompleto")?.value || "";

  return (
    <div className="bg-bgPrimaryGradiante h-[100vh]">
      <NavBarLogin role={role} nombreCompleto={nombreCompleto} />
      <main className="bg-slate-400">{children}</main>
    </div>
  );
}
