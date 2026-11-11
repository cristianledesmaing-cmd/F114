"use server";

import { redirect } from "next/navigation";

import {
  createSession,
  destroySession,
  isAdminConfigured,
  verifyPassword,
} from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return { error: "Falta definir ADMIN_PASSWORD en el archivo .env.local." };
  }

  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    return { error: "Contraseña incorrecta." };
  }

  await createSession();

  const from = String(formData.get("from") ?? "");
  redirect(from.startsWith("/admin") && !from.startsWith("/admin/login") ? from : "/admin/");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login/");
}
