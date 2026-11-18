import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { getCity, getCityCountry } from "@/data/cities";
import { convertToUsd } from "@/lib/format";

const PURPOSES = ["sale", "rent"];
const TYPES = [
  "apartment",
  "villa",
  "land",
  "office",
  "shop",
  "building",
  "farm",
  "chalet",
  "other",
];
const TYPE_LABELS: Record<string, { ar: string; en: string }> = {
  apartment: { ar: "شقة", en: "Apartment" },
  villa: { ar: "فيلا", en: "Villa" },
  land: { ar: "أرض", en: "Land" },
  office: { ar: "مكتب", en: "Office" },
  shop: { ar: "محل تجاري", en: "Retail" },
  building: { ar: "عمارة", en: "Building" },
  farm: { ar: "مزرعة", en: "Farm" },
  chalet: { ar: "شاليه", en: "Chalet" },
  other: { ar: "عقار آخر", en: "Other property" },
};

// Public endpoint: users submit their own listings for free.
export async function POST(request: Request) {
  const db = await getDB();
  if (!db) {
    return NextResponse.json(
      { error: "database_unavailable" },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot — bots fill every field; humans never see this one.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true, slug: null });
  }

  const purpose = String(body.purpose ?? "");
  const type = String(body.type ?? "");
  const title = String(body.title ?? "").trim().slice(0, 300);
  const description = String(body.description ?? "").trim().slice(0, 3000);
  const price = Number(body.price);
  const currency = String(body.currency ?? "LYD").slice(0, 3).toUpperCase();
  const cityKey = String(body.city ?? "");
  const district = String(body.district ?? "").trim().slice(0, 120);
  const phone = String(body.phone ?? "").trim().slice(0, 40);
  const bedrooms = Number(body.bedrooms) > 0 ? Number(body.bedrooms) : null;
  const bathrooms = Number(body.bathrooms) > 0 ? Number(body.bathrooms) : null;
  const areaSqm = Number(body.area) > 0 ? Number(body.area) : null;

  if (!PURPOSES.includes(purpose)) {
    return NextResponse.json({ error: "invalid_purpose" }, { status: 400 });
  }
  if (!TYPES.includes(type)) {
    return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  }
  if (title.length < 8) {
    return NextResponse.json({ error: "title_too_short" }, { status: 400 });
  }
  if (!Number.isFinite(price) || price <= 0) {
    return NextResponse.json({ error: "invalid_price" }, { status: 400 });
  }
  if (phone.length < 8) {
    return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
  }

  const city = getCity(cityKey);
  if (!city) {
    return NextResponse.json({ error: "invalid_city" }, { status: 400 });
  }

  const typeLabel = TYPE_LABELS[type];
  const country = getCityCountry(city.key);
  const slug = `u-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  try {
    await db
      .prepare(
        `INSERT INTO listings
          (slug, source, purpose, property_type, type_ar, type_en,
           title_ar, title_en, description_ar, description_en,
           price, currency, usd_price, area_sqm, bedrooms, bathrooms,
           city_key, city_ar, city_en, neighborhood_ar, neighborhood_en,
           country_ar, country_en, phone, status)
         VALUES (?, 'user', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`
      )
      .bind(
        slug,
        purpose,
        type,
        typeLabel.ar,
        typeLabel.en,
        title,
        title,
        description,
        description,
        price,
        currency,
        convertToUsd(price, currency),
        areaSqm,
        bedrooms,
        bathrooms,
        city.key,
        city.ar,
        city.en,
        district,
        district,
        country.ar,
        country.en
      )
      .run();
  } catch (e) {
    console.error("insert listing failed", e);
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, slug }, { status: 201 });
}
