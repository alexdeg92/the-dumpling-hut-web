import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "dumpling_admin";
const MAX_AGE_SEC = 60 * 60 * 24 * 7;

export function isAdminAuthConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_USERNAME?.trim() &&
      process.env.ADMIN_PASSWORD &&
      process.env.ADMIN_SECRET,
  );
}

function adminSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SECRET is not set");
  }
  return secret;
}

export function adminCredentials(): { username: string; password: string } | null {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) return null;
  return { username, password };
}

function sign(payload: string): string {
  return createHmac("sha256", adminSecret()).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SEC;
  const payload = `admin:${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!isAdminAuthConfigured() || !token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  let expected: string;
  try {
    expected = sign(payload);
  } catch {
    return false;
  }

  try {
    if (signature.length !== expected.length) return false;
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  } catch {
    return false;
  }

  const [, expRaw] = payload.split(":");
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  return payload.startsWith("admin:");
}

export function verifyAdminLogin(username: string, password: string): boolean {
  if (!isAdminAuthConfigured()) return false;
  const creds = adminCredentials();
  if (!creds) return false;
  return username === creds.username && password === creds.password;
}

export async function isAdminSession(): Promise<boolean> {
  const jar = await cookies();
  return verifySessionToken(jar.get(COOKIE_NAME)?.value);
}

export const adminSessionCookie = {
  name: COOKIE_NAME,
  maxAge: MAX_AGE_SEC,
} as const;
