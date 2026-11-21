import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDB } from "@/lib/db";
import {
  SESSION_COOKIE,
  createSessionToken,
  hashPassword,
  randomSalt,
} from "@/lib/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const db = await getDB();
  if (!db) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  let body: { name?: string; email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 80);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 120);
  const password = String(body.password ?? "");

  if (name.length < 2) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "weak_password" }, { status: 400 });
  }

  const existing = await db
    .prepare("SELECT id FROM users WHERE email = ?")
    .bind(email)
    .first<{ id: number }>();
  if (existing) {
    return NextResponse.json({ error: "email_taken" }, { status: 409 });
  }

  const salt = randomSalt();
  const passwordHash = await hashPassword(password, salt);

  const res = await db
    .prepare(
      "INSERT INTO users (email, name, password_hash, salt) VALUES (?, ?, ?, ?)"
    )
    .bind(email, name, passwordHash, salt)
    .run();
  const userId = Number(res.meta?.last_row_id ?? 0);
  if (!userId) {
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }

  const token = await createSessionToken(userId);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });

  return NextResponse.json({ ok: true, user: { id: userId, email, name } });
}
