import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDB } from "@/lib/db";
import {
  SESSION_COOKIE,
  createSessionToken,
  hashPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  const db = await getDB();
  if (!db) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  const user = await db
    .prepare(
      "SELECT id, email, name, password_hash, salt FROM users WHERE email = ?"
    )
    .bind(email)
    .first<{
      id: number;
      email: string;
      name: string;
      password_hash: string;
      salt: string;
    }>();

  if (!user) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const hash = await hashPassword(password, user.salt);
  if (hash !== user.password_hash) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const token = await createSessionToken(user.id);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });

  return NextResponse.json({
    ok: true,
    user: { id: user.id, email: user.email, name: user.name },
  });
}
