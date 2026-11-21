import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, getUserByToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const user = await getUserByToken(cookieStore.get(SESSION_COOKIE)?.value);
  return NextResponse.json({ user });
}
