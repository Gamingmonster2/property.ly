import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Returns the D1 database binding (works in dev via wrangler platform proxy
 * and in the deployed worker). Returns null when unavailable (e.g. during
 * build-time prerendering) — callers fall back to seed data.
 */
export async function getDB(): Promise<D1Database | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env.DB ?? null;
  } catch {
    return null;
  }
}

export interface ListingRow {
  id: number;
  external_id: string | null;
  slug: string;
  source: string;
  source_name: string | null;
  source_url: string | null;
  purpose: "sale" | "rent";
  property_type: string | null;
  type_ar: string | null;
  type_en: string | null;
  title_ar: string;
  title_en: string | null;
  description_ar: string | null;
  description_en: string | null;
  price: number | null;
  currency: string | null;
  usd_price: number | null;
  area_sqm: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  city_key: string | null;
  city_ar: string | null;
  city_en: string | null;
  neighborhood_ar: string | null;
  neighborhood_en: string | null;
  country_ar: string | null;
  country_en: string | null;
  phone: string | null;
  scraped_at: string | null;
  created_at: string;
  status: string;
}

export interface ImageRow {
  id: number;
  listing_id: number;
  position: number;
  url: string | null;
  content_type: string | null;
}
