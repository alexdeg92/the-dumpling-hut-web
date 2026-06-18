import { NextResponse } from "next/server";

import {
  adminSessionCookie,
  createSessionToken,
  isAdminAuthConfigured,
  verifyAdminLogin,
} from "@/lib/admin-session";

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json({ error: "Admin login is not configured" }, { status: 503 });
  }

  const body = (await request.json()) as { username?: string; password?: string };
  const username = body.username?.trim() ?? "";
  const password = body.password ?? "";

  if (!verifyAdminLogin(username, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminSessionCookie.name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: adminSessionCookie.maxAge,
  });
  return response;
}
