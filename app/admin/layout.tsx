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
        <div className="bg-bgPrimaryGradiante h-[100vh]">
            <NavBarLogin role={role} nombreCompleto={nombreCompleto} />
            <main>{children}</main>
        </div>
    );
}
