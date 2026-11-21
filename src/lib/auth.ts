import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDB } from "@/lib/db";

const encoder = new TextEncoder();

async function sessionSecret(): Promise<string> {
  const { env } = await getCloudflareContext({ async: true });
  // Reuse the random admin key as the HMAC signing key (single env secret).
  return env.ADMIN_INGEST_KEY || "dev-secret";
}

function toBase64url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function randomSalt(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return toBase64url(bytes.buffer);
}

/** PBKDF2-SHA256 password hashing (100k iterations). */
export async function hashPassword(
  password: string,
  salt: string
): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: 100_000,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );
  return toBase64url(bits);
}

async function sign(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(await sessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return toBase64url(sig);
}

const SESSION_COOKIE = "pl_session";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export async function createSessionToken(userId: number): Promise<string> {
  const expiry = Date.now() + SESSION_TTL_MS;
  const payload = `${userId}.${expiry}`;
  return `${payload}.${await sign(payload)}`;
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<number | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [userIdStr, expiryStr, sig] = parts;
  if (!/^\d+$/.test(userIdStr) || !/^\d+$/.test(expiryStr)) return null;
  if (Date.now() > Number(expiryStr)) return null;
  const expected = await sign(`${userIdStr}.${expiryStr}`);
  if (expected !== sig) return null;
  return Number(userIdStr);
}

export interface SessionUser {
  id: number;
  email: string;
  name: string;
}

export async function getUserByToken(
  token: string | undefined | null
): Promise<SessionUser | null> {
  const userId = await verifySessionToken(token);
  if (!userId) return null;
  const db = await getDB();
  if (!db) return null;
  const row = await db
    .prepare("SELECT id, email, name FROM users WHERE id = ?")
    .bind(userId)
    .first<SessionUser>();
  return row ?? null;
}

export { SESSION_COOKIE };
