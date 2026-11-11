/**
 * Sesión del panel de administración.
 *
 * Es un esquema de usuario único: la contraseña vive en `ADMIN_PASSWORD` y la
 * sesión es un token firmado con HMAC que se guarda en una cookie httpOnly.
 */
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "nodo_admin_session";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

function getPassword() {
  const password = process.env.ADMIN_PASSWORD;
  return password && password.length > 0 ? password : null;
}

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? getPassword() ?? "";
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

/** Compara en tiempo constante para no filtrar información por el tiempo de respuesta. */
function safeEqual(a: string, b: string) {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}

function createToken() {
  const payload = `${Date.now() + SESSION_MAX_AGE_SECONDS * 1000}.${randomBytes(12).toString("base64url")}`;
  return `${payload}.${sign(payload)}`;
}

function isTokenValid(token: string | undefined) {
  if (!token || !getSecret()) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [expiresAt, nonce, signature] = parts;
  if (!safeEqual(signature, sign(`${expiresAt}.${nonce}`))) return false;

  const expiry = Number(expiresAt);
  return Number.isFinite(expiry) && expiry > Date.now();
}

export function isAdminConfigured() {
  return getPassword() !== null;
}

export function verifyPassword(candidate: string) {
  const password = getPassword();
  if (!password) return false;
  return safeEqual(candidate, password);
}

export async function createSession() {
  const store = await cookies();
  store.set(SESSION_COOKIE, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function isAuthenticated() {
  const store = await cookies();
  return isTokenValid(store.get(SESSION_COOKIE)?.value);
}

/**
 * Corta la ejecución si quien llama no tiene sesión válida.
 * Debe invocarse al inicio de cada Server Action del panel: las acciones son
 * accesibles por POST directo, no solo desde la interfaz.
 */
export async function requireAdmin() {
  if (!(await isAuthenticated())) {
    throw new Error("No autorizado");
  }
}
