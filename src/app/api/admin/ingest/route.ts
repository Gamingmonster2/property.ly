import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDB } from "@/lib/db";
import { convertToUsd } from "@/lib/format";

const MAX_IMAGES_PER_LISTING = 3;
const MAX_BODY_BYTES = 5 * 1024 * 1024;

interface IngestListing {
  external_id: string;
  source_name: string;
  source_url: string;
  purpose: "sale" | "rent";
  property_type: string;
  type_ar: string;
  type_en: string;
  title_ar: string;
  title_en?: string;
  description_ar?: string;
  price: number | null;
  currency: string | null;
  area_sqm?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  city_key: string;
  city_ar: string;
  city_en: string;
  neighborhood_en?: string | null;
  country_ar: string;
  country_en: string;
  scraped_at?: string | null;
  image_urls: string[];
}

function pick<T>(value: T | undefined | null, fallback: T): T {
  return value === undefined || value === null ? fallback : value;
}

// Private ingest endpoint used by the scraper (scripts/scrape-opensooq.mjs).
// Requires the X-Admin-Key header matching the ADMIN_INGEST_KEY secret.
export async function POST(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  const expectedKey = env.ADMIN_INGEST_KEY;
  const providedKey = request.headers.get("x-admin-key");

  if (!expectedKey || providedKey !== expectedKey) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const db = await getDB();
  if (!db) {
    return NextResponse.json({ error: "database_unavailable" }, { status: 503 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }

  let body: { listings: IngestListing[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  if (!Array.isArray(body?.listings)) {
    return NextResponse.json({ error: "missing_listings" }, { status: 400 });
  }

  let inserted = 0;
  let updated = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const item of body.listings.slice(0, 200)) {
    try {
      const externalId = String(item.external_id ?? "").slice(0, 64);
      if (!externalId) {
        skipped++;
        continue;
      }

      const existing = await db
        .prepare("SELECT id FROM listings WHERE external_id = ?")
        .bind(externalId)
        .first<{ id: number }>();

      const usdPrice =
        item.price && item.currency
          ? convertToUsd(item.price, item.currency)
          : null;

      const values = [
        pick(item.source_name, "OpenSooq").slice(0, 120),
        pick(item.source_url, "").slice(0, 500),
        item.purpose,
        pick(item.property_type, "other").slice(0, 40),
        pick(item.type_ar, "").slice(0, 60),
        pick(item.type_en, "").slice(0, 60),
        pick(item.title_ar, "").slice(0, 300),
        pick(item.title_en, null),
        pick(item.description_ar, null),
        item.price ?? null,
        item.currency ?? null,
        usdPrice,
        item.area_sqm ?? null,
        item.bedrooms ?? null,
        item.bathrooms ?? null,
        pick(item.city_key, "").slice(0, 60),
        pick(item.city_ar, "").slice(0, 80),
        pick(item.city_en, "").slice(0, 80),
        pick(item.neighborhood_en, null),
        pick(item.neighborhood_en, null),
        pick(item.country_ar, "").slice(0, 80),
        pick(item.country_en, "").slice(0, 80),
        pick(item.scraped_at, null),
      ];

      let listingId: number;
      if (existing) {
        listingId = existing.id;
        await db
          .prepare(
            `UPDATE listings SET
               source_name = ?, source_url = ?, purpose = ?, property_type = ?,
               type_ar = ?, type_en = ?, title_ar = ?, title_en = ?,
               description_ar = ?, price = ?, currency = ?, usd_price = ?,
               area_sqm = ?, bedrooms = ?, bathrooms = ?, city_key = ?,
               city_ar = ?, city_en = ?, neighborhood_ar = ?, neighborhood_en = ?,
               country_ar = ?, country_en = ?, scraped_at = ?
             WHERE id = ?`
          )
          .bind(...values, listingId)
          .run();
        updated++;
      } else {
        const slug = `p-${externalId}`;
        const res = await db
          .prepare(
            `INSERT INTO listings
              (external_id, slug, source, source_name, source_url, purpose,
               property_type, type_ar, type_en, title_ar, title_en,
               description_ar, price, currency, usd_price, area_sqm, bedrooms,
               bathrooms, city_key, city_ar, city_en, neighborhood_ar,
               neighborhood_en, country_ar, country_en, scraped_at, status)
             VALUES (?, ?, 'opensooq', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`
          )
          .bind(externalId, slug, ...values)
          .run();
        listingId = Number(res.meta?.last_row_id ?? 0);
        if (!listingId) {
          const row = await db
            .prepare("SELECT id FROM listings WHERE external_id = ?")
            .bind(externalId)
            .first<{ id: number }>();
          listingId = row?.id ?? 0;
        }
        inserted++;
      }

      // Fetch and store a few images (worker-side fetch avoids hotlinking)
      if (listingId && Array.isArray(item.image_urls)) {
        const existingImages = await db
          .prepare("SELECT COUNT(*) AS c FROM images WHERE listing_id = ?")
          .bind(listingId)
          .first<{ c: number }>();
        if ((existingImages?.c ?? 0) === 0) {
          const urls = item.image_urls
            .filter((u) => typeof u === "string" && u.startsWith("https://"))
            .slice(0, MAX_IMAGES_PER_LISTING);
          let position = 0;
          for (const url of urls) {
            try {
              const imgRes = await fetch(url, {
                headers: { "user-agent": "Mozilla/5.0 (compatible; Property.ly/1.0)" },
              });
              if (!imgRes.ok) continue;
              const buf = await imgRes.arrayBuffer();
              if (buf.byteLength === 0 || buf.byteLength > 2 * 1024 * 1024) continue;
              await db
                .prepare(
                  "INSERT INTO images (listing_id, position, url, content_type, data) VALUES (?, ?, ?, ?, ?)"
                )
                .bind(listingId, position++, url, imgRes.headers.get("content-type") ?? "image/jpeg", buf)
                .run();
              // Small pause to stay polite with the source CDN
              await new Promise((r) => setTimeout(r, 300));
            } catch {
              // skip this image
            }
          }
        }
      }
    } catch (e) {
      skipped++;
      errors.push(String((e as Error).message).slice(0, 200));
    }
  }

  return NextResponse.json({ ok: true, inserted, updated, skipped, errors });
}
