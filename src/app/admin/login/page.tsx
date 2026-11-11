import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/app/admin/login/LoginForm";
import { isAdminConfigured, isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ingresar al panel",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  if (await isAuthenticated()) {
    redirect("/admin/");
  }

  const { from } = await searchParams;

  return (
    <main className="bg-sky flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <p className="text-overline text-brass-ink">Nodo</p>
        <h1 className="text-charcoal mt-3 text-3xl font-bold">Panel de administración</h1>
        <p className="text-graphite mt-3 text-base leading-relaxed">
          Ingresá la contraseña para administrar proyectos y contenidos del sitio.
        </p>

        {isAdminConfigured() ? null : (
          <p className="border-brass/40 bg-brass/10 text-charcoal mt-6 border p-4 text-sm leading-relaxed">
            Todavía no hay contraseña configurada. Creá un archivo{" "}
            <code className="font-mono">.env.local</code> con{" "}
            <code className="font-mono">ADMIN_PASSWORD</code> y reiniciá el servidor.
          </p>
        )}

        <LoginForm from={typeof from === "string" ? from : ""} />
      </div>
    </main>
  );
}
