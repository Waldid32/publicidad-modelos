import NavBarLogin from "@/components/NavBarLogin";
import { cookies } from "next/headers";

export const metadata = {
    title: "Interfaz Administrador",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();

    const role = cookieStore.get("role")?.value || "";
    const nombreCompleto = cookieStore.get("nombreCompleto")?.value || "";

    return (
        <>
            <NavBarLogin role={role} nombreCompleto={nombreCompleto} />
            <main className="bg-slate-400">{children}</main>
        </>
    );
}
