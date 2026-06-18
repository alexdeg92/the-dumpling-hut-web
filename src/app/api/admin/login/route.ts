import { NextResponse } from "next/server";

import {
  adminCredentials,
  adminSessionCookie,
  createSessionToken,
  verifyAdminLogin,
} from "@/lib/admin-session";

export async function POST(request: Request) {
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

export async function GET() {
  return NextResponse.json({ username: adminCredentials().username });
}
