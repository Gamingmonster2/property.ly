import { getDB, type ImageRow, type ListingRow } from "@/lib/db";
import type { ListingCard } from "@/lib/types";

export interface ListingFilters {
  purpose?: string;
  city?: string;
  type?: string;
  q?: string;
  limit?: number;
  offset?: number;
}

function mapRow(
  row: ListingRow,
  image: ImageRow | null,
  isAr: boolean
): ListingCard {
  const fallbackTitleEn =
    row.title_en ||
    `${row.type_en ?? "Property"}${row.city_en ? ` · ${row.city_en}` : ""}`;
  return {
    id: String(row.id),
    slug: row.slug,
    purpose: row.purpose,
    titleAr: row.title_ar,
    titleEn: fallbackTitleEn,
    typeAr: row.type_ar ?? (isAr ? "عقار" : "Property"),
    typeEn: row.type_en ?? "Property",
    cityAr: row.city_ar ?? row.city_en ?? "",
    cityEn: row.city_en ?? row.city_ar ?? "",
    countryAr: row.country_ar ?? "",
    countryEn: row.country_en ?? "",
    price: row.price,
    currency: row.currency,
    usdPrice: row.usd_price,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    areaSqm: row.area_sqm,
    image: image ? `/api/image/${image.id}` : null,
    imageId: image?.id ?? null,
    featured: row.source !== "user" || row.id % 3 === 0,
    sourceName: row.source_name,
    sourceUrl: row.source_url,
    scrapedAt: row.scraped_at,
    descriptionAr: row.description_ar,
    descriptionEn: row.description_en,
    phone: row.phone,
    neighborhoodAr: row.neighborhood_ar ?? undefined,
    neighborhoodEn: row.neighborhood_en ?? undefined,
  };
}

export async function getListings(
  filters: ListingFilters = {}
): Promise<ListingCard[]> {
  const db = await getDB();
  if (!db) return [];

  const conditions: string[] = ["status = 'active'"];
  const params: unknown[] = [];

  if (filters.purpose && filters.purpose !== "any") {
    conditions.push("purpose = ?");
    params.push(filters.purpose);
  }
  if (filters.city && filters.city !== "all") {
    conditions.push("city_key = ?");
    params.push(filters.city);
  }
  if (filters.type && filters.type !== "all") {
    conditions.push("property_type = ?");
    params.push(filters.type);
  }
  if (filters.q) {
    conditions.push("(title_ar LIKE ? OR title_en LIKE ? OR city_en LIKE ?)");
    const like = `%${filters.q}%`;
    params.push(like, like, like);
  }

  const limit = Math.min(filters.limit ?? 48, 100);
  const offset = filters.offset ?? 0;
  params.push(limit, offset);

  const sql = `
    SELECT * FROM listings
    WHERE ${conditions.join(" AND ")}
    ORDER BY created_at DESC, id DESC
    LIMIT ? OFFSET ?`;

  const { results } = await db
    .prepare(sql)
    .bind(...params)
    .all<ListingRow>();

  if (results.length === 0) return [];

  // One cover image per listing
  const ids = results.map((r) => r.id);
  const placeholders = ids.map(() => "?").join(",");
  const imgStmt = db
    .prepare(
      `SELECT * FROM images WHERE listing_id IN (${placeholders}) ORDER BY listing_id, position`
    )
    .bind(...ids);
  const imgRes = await imgStmt.all<ImageRow>();
  const imageByListing = new Map<number, ImageRow>();
  for (const img of imgRes.results) {
    if (!imageByListing.has(img.listing_id)) {
      imageByListing.set(img.listing_id, img);
    }
  }

  const isAr = true; // mapping is locale-agnostic; fallbacks are bilingual
  return results.map((row) => mapRow(row, imageByListing.get(row.id) ?? null, isAr));
}

export async function getListingBySlug(
  slug: string
): Promise<ListingCard | null> {
  const db = await getDB();
  if (!db) return null;

  const { results } = await db
    .prepare("SELECT * FROM listings WHERE slug = ? AND status = 'active'")
    .bind(slug)
    .all<ListingRow>();
  if (results.length === 0) return null;
  const row = results[0];

  const imgs = await db
    .prepare("SELECT * FROM images WHERE listing_id = ? ORDER BY position")
    .bind(row.id)
    .all<ImageRow>();
  const cover = imgs.results[0] ?? null;

  return mapRow(row, cover, false);
}

export async function getListingImages(
  listingId: number
): Promise<ImageRow[]> {
  const db = await getDB();
  if (!db) return [];
  const { results } = await db
    .prepare("SELECT * FROM images WHERE listing_id = ? ORDER BY position")
    .bind(listingId)
    .all<ImageRow>();
  return results;
}

export async function getListingDetail(
  slug: string
): Promise<{ card: ListingCard; imageIds: number[] } | null> {
  const db = await getDB();
  if (!db) return null;

  const { results } = await db
    .prepare("SELECT * FROM listings WHERE slug = ? AND status = 'active'")
    .bind(slug)
    .all<ListingRow>();
  if (results.length === 0) return null;
  const row = results[0];

  const imgs = await db
    .prepare("SELECT * FROM images WHERE listing_id = ? ORDER BY position")
    .bind(row.id)
    .all<ImageRow>();

  return {
    card: mapRow(row, imgs.results[0] ?? null, false),
    imageIds: imgs.results.map((i) => i.id),
  };
}

export async function countListings(
  filters: ListingFilters = {}
): Promise<number> {
  const db = await getDB();
  if (!db) return 0;
  const conditions: string[] = ["status = 'active'"];
  const params: unknown[] = [];
  if (filters.purpose && filters.purpose !== "any") {
    conditions.push("purpose = ?");
    params.push(filters.purpose);
  }
  if (filters.city && filters.city !== "all") {
    conditions.push("city_key = ?");
    params.push(filters.city);
  }
  if (filters.type && filters.type !== "all") {
    conditions.push("property_type = ?");
    params.push(filters.type);
  }
  if (filters.q) {
    conditions.push("(title_ar LIKE ? OR title_en LIKE ?)");
    const like = `%${filters.q}%`;
    params.push(like, like);
  }
  const { results } = await db
    .prepare(`SELECT COUNT(*) AS c FROM listings WHERE ${conditions.join(" AND ")}`)
    .bind(...params)
    .all<{ c: number }>();
  return results[0]?.c ?? 0;
}
