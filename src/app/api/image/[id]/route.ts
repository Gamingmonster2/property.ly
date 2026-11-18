import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

interface ImageRowRaw {
  data: unknown;
  content_type: string | null;
}

/**
 * D1 BLOBs can come back from the runtime as an ArrayBuffer, a Uint8Array,
 * or (through some proxies) a plain object with numeric keys. Normalize.
 */
function toBytes(data: unknown): Uint8Array<ArrayBuffer> | null {
  if (data instanceof Uint8Array) return new Uint8Array(data);
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  if (typeof data === "object" && data !== null) {
    const keys = Object.keys(data);
    if (keys.length > 0 && keys.every((k) => /^\d+$/.test(k))) {
      const bytes = new Uint8Array(keys.length);
      const obj = data as Record<string, unknown>;
      for (const k of keys) bytes[Number(k)] = Number(obj[k]);
      return bytes;
    }
  }
  return null;
}

// Serves stored listing images (blobs in D1) with long-lived caching.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    return new NextResponse("Not found", { status: 404 });
  }

  const db = await getDB();
  if (!db) {
    return new NextResponse("Not found", { status: 404 });
  }

  const row = await db
    .prepare("SELECT data, content_type FROM images WHERE id = ?")
    .bind(numericId)
    .first<ImageRowRaw>();

  const bytes = row?.data ? toBytes(row.data) : null;
  if (!row || !bytes || bytes.byteLength === 0) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new Response(bytes, {
    status: 200,
    headers: {
      "content-type": row.content_type || "image/jpeg",
      "content-length": String(bytes.byteLength),
      "cache-control": "public, max-age=604800, immutable",
    },
  });
}
