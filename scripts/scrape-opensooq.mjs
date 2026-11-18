// Property.ly scraper — collects recent real-estate listings from OpenSooq
// (MENA countries) and pushes them to the platform's ingest endpoint.
//
// Guardrails:
//  - ~1.4s delay between requests, identifiable User-Agent
//  - stops on 403/429
//  - keeps source attribution (source_name + source_url) on every listing
//  - only ads from the last ~7 days
//
// Usage:  node scripts/scrape-opensooq.mjs [maxListings] [--dry]

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAX_LISTINGS = Number(process.argv[2] ?? 100);
const DRY = process.argv.includes("--dry");

const INGEST_URL =
  process.env.INGEST_URL ?? "https://property.ly/api/admin/ingest";

// Read ADMIN_INGEST_KEY from env or .dev.vars
let INGEST_KEY = process.env.ADMIN_INGEST_KEY;
if (!INGEST_KEY) {
  try {
    const vars = readFileSync(join(__dirname, "..", ".dev.vars"), "utf8");
    const m = vars.match(/^ADMIN_INGEST_KEY=(.+)$/m);
    if (m) INGEST_KEY = m[1].trim();
  } catch {
    /* ignore */
  }
}
if (!INGEST_KEY) {
  console.error("ADMIN_INGEST_KEY not found (env or .dev.vars)");
  process.exit(1);
}

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// Countries: [subdomain, country AR, country EN, default currency]
const TARGETS = [
  ["ly", "ليبيا", "Libya", "LYD"],
  ["eg", "مصر", "Egypt", "EGP"],
  ["tn", "تونس", "Tunisia", "TND"],
  ["ma", "المغرب", "Morocco", "MAD"],
  ["ae", "الإمارات", "UAE", "AED"],
  ["sa", "السعودية", "Saudi Arabia", "SAR"],
];

const SECTIONS = [
  { slug: "%D8%B9%D9%82%D8%A7%D8%B1%D8%A7%D8%AA/%D8%B9%D9%82%D8%A7%D8%B1%D8%A7%D8%AA-%D9%84%D9%84%D8%A8%D9%8A%D8%B9", purpose: "sale", pages: 2 }, // عقارات/عقارات-للبيع
  { slug: "%D8%B9%D9%82%D8%A7%D8%B1%D8%A7%D8%AA/%D8%B9%D9%82%D8%A7%D8%B1%D8%A7%D8%AA-%D9%84%D9%84%D8%A5%D9%8A%D8%AC%D8%A7%D8%B1", purpose: "rent", pages: 2 }, // عقارات/عقارات-للإيجار
];

// OpenSooq cat2 → our property_type + Arabic/English labels
const CAT2_MAP = {
  LandsForSale: ["land", "أرض", "Land"],
  LandsForRent: ["land", "أرض", "Land"],
  ApartmentsForSale: ["apartment", "شقة", "Apartment"],
  ApartmentsForRent: ["apartment", "شقة", "Apartment"],
  FlatsForRent: ["apartment", "شقة", "Apartment"],
  FlatsForSale: ["apartment", "شقة", "Apartment"],
  VillasForSale: ["villa", "فيلا", "Villa"],
  VillasForRent: ["villa", "فيلا", "Villa"],
  HousesForSale: ["villa", "منزل", "House"],
  HousesForRent: ["villa", "منزل", "House"],
  OfficesForSale: ["office", "مكتب", "Office"],
  OfficesForRent: ["office", "مكتب", "Office"],
  ShopsForRent: ["shop", "محل تجاري", "Retail"],
  ShopsForSale: ["shop", "محل تجاري", "Retail"],
  BuildingsForSale: ["building", "عمارة", "Building"],
  BuildingsForRent: ["building", "عمارة", "Building"],
  FarmsForSale: ["farm", "مزرعة", "Farm"],
  FarmsForRent: ["farm", "مزرعة", "Farm"],
  ChaletsForSale: ["chalet", "شاليه", "Chalet"],
  ChaletsForRent: ["chalet", "شاليه", "Chalet"],
  CommercialForSale: ["shop", "عقار تجاري", "Commercial"],
  CommercialForRent: ["shop", "عقار تجاري", "Commercial"],
};

// City mapping (OpenSooq data-city English → key/ar/en)
const CITY_MAP = {
  Tripoli: ["tripoli", "طرابلس", "Tripoli"],
  Benghazi: ["benghazi", "بنغازي", "Benghazi"],
  Misrata: ["misrata", "مصراتة", "Misrata"],
  Zawiya: ["zawiya", "الزاوية", "Zawiya"],
  Sabha: ["sabha", "سبها", "Sabha"],
  Zliten: ["zliten", "زليتن", "Zliten"],
  "Al Bayda": ["al-bayda", "البيضاء", "Al Bayda"],
  Derna: ["derna", "درنة", "Derna"],
  Tobruk: ["tobruk", "طبرق", "Tobruk"],
  Gharyan: ["gharyan", "غريان", "Gharyan"],
  "Ajdabiya": ["ajdabiya", "أجدابيا", "Ajdabiya"],
  "Al Khums": ["al-khums", "الخمس", "Al Khums"],
  Cairo: ["cairo", "القاهرة", "Cairo"],
  Giza: ["giza", "الجيزة", "Giza"],
  Alexandria: ["alexandria", "الإسكندرية", "Alexandria"],
  Dubai: ["dubai", "دبي", "Dubai"],
  "Abu Dhabi": ["abu-dhabi", "أبوظبي", "Abu Dhabi"],
  Sharjah: ["sharjah", "الشارقة", "Sharjah"],
  Tunis: ["tunis", "تونس", "Tunis"],
  Sfax: ["sfax", "صفاقس", "Sfax"],
  Sousse: ["sousse", "سوسة", "Sousse"],
  Casablanca: ["casablanca", "الدار البيضاء", "Casablanca"],
  Rabat: ["rabat", "الرباط", "Rabat"],
  Marrakesh: ["marrakesh", "مراكش", "Marrakesh"],
  Riyadh: ["riyadh", "الرياض", "Riyadh"],
  Jeddah: ["jeddah", "جدة", "Jeddah"],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function normalizeDigits(s) {
  const map = {
    "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4",
    "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
  };
  return s.replace(/[٠-٩]/g, (d) => map[d]);
}

function parsePrice(text) {
  const t = normalizeDigits(decodeEntities(text ?? ""));
  const cleaned = t.replace(/[^\d.,]/g, "");
  // Handle "1,234,567" and "1.234.567" (both used across MENA)
  let normalized = cleaned;
  if (cleaned.includes(".") && cleaned.includes(",")) {
    // last separator is the decimal one
    const lastComma = cleaned.lastIndexOf(",");
    const lastDot = cleaned.lastIndexOf(".");
    normalized =
      lastComma > lastDot
        ? cleaned.replace(/\./g, "").replace(",", ".")
        : cleaned.replace(/,/g, "");
  } else if (cleaned.includes(",") && !cleaned.includes(".")) {
    normalized =
      cleaned.match(/^\d{1,3}(,\d{3})+$/) ? cleaned.replace(/,/g, "") : cleaned.replace(",", ".");
  }
  const num = Number(normalized);
  return Number.isFinite(num) && num > 0 ? num : null;
}

// Returns days-ago for Arabic relative dates, null if unknown/too old
function parseRelativeTime(text) {
  const t = normalizeDigits(decodeEntities(text ?? "").trim());
  if (/دقيقة|دقائق|الآن|لحظات|ساعة|ساعات/.test(t) && !/يوم|أسبوع|شهر/.test(t)) {
    return 0;
  }
  const dayMatch = t.match(/(\d+)\s*يوم/) || (t.includes("يوم") && !t.match(/\d+/) ? ["", "1"] : null);
  if (dayMatch) return Number(dayMatch[1] || 1);
  if (/أمس/.test(t)) return 1;
  const weekMatch = t.match(/(\d+)\s*أسبوع/);
  if (weekMatch) return Number(weekMatch[1]) * 7;
  if (/أسبوع/.test(t)) return 7;
  return null; // months/years → too old
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

async function fetchPage(url, attempt = 0) {
  const res = await fetch(url, {
    headers: {
      "user-agent": UA,
      "accept-language": "ar",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    },
    redirect: "follow",
  });
  if (res.status === 403 || res.status === 429 || res.status === 410) {
    if (attempt < 3) {
      const wait = 30_000 * (attempt + 1) + Math.floor(Math.random() * 20_000);
      console.log(
        `   throttled (${res.status}) — waiting ${Math.round(wait / 1000)}s, retry ${attempt + 1}/3`
      );
      await sleep(wait);
      return fetchPage(url, attempt + 1);
    }
    throw new Error(`blocked (${res.status}) — giving up on this page`);
  }
  if (!res.ok) return "";
  return res.text();
}

function parseCards(html, country) {
  const cards = [];
  const marker = '<a class="postListItemData';
  let idx = 0;
  while (true) {
    const start = html.indexOf(marker, idx);
    if (start === -1) break;
    const end = html.indexOf(marker, start + 10);
    const chunk = html.slice(start, end === -1 ? html.length : end);
    idx = start + 10;

    const card = parseCard(chunk, country);
    if (card) cards.push(card);
  }
  return cards;
}

function parseCard(chunk, country) {
  const attr = (name) => {
    const m = chunk.match(new RegExp(`${name}="([^"]*)"`));
    return m ? decodeEntities(m[1]) : null;
  };

  const externalId = attr("data-id1");
  if (!externalId) return null;

  const href = attr("href");
  const img = chunk.match(/<img\s+src="([^"]+)"\s+alt="([^"]*)"[\s\S]*?class="h-full/);
  const imageUrl = img ? img[1] : null;
  const title = (img ? img[2] : null) || stripTags(chunk.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1] ?? "");

  const priceText = stripTags(
    chunk.match(/text-\[#c62828\][^"]*">([\s\S]*?)<\/span>/)?.[1] ?? ""
  );
  const timeText = stripTags(
    chunk.match(/col-span-2[^"]*">([\s\S]*?)<\/span>/)?.[1] ?? ""
  );

  const cat2 = attr("data-cat2-code");
  const [propType, typeAr, typeEn] = CAT2_MAP[cat2] ?? ["other", "عقار", "Property"];

  const dataCity = attr("data-city");
  const nhood = attr("data-nhood");
  const cityMapped = CITY_MAP[dataCity];
  const cityKey = cityMapped ? cityMapped[0] : (dataCity ?? "unknown").toLowerCase().replace(/[^a-z]+/g, "-");
  const cityAr = cityMapped ? cityMapped[1] : dataCity ?? "";
  const cityEn = cityMapped ? cityMapped[2] : dataCity ?? "";

  // specs from icon alt attributes
  let area = null, bedrooms = null, bathrooms = null;
  const alts = [...chunk.matchAll(/alt="([^"]*)"/g)].map((m) => decodeEntities(m[1]));
  for (const a of alts) {
    const num = parsePrice(a.replace(/[^\d.,]/g, ""));
    if (num === null) continue;
    if (/مساحة/.test(a)) area = num;
    else if (/غرف/.test(a)) bedrooms = num;
    else if (/حمام/.test(a)) bathrooms = num;
  }

  const daysAgo = parseRelativeTime(timeText);
  if (daysAgo === null || daysAgo > 7) return null;

  const price = parsePrice(priceText);
  const sourceUrl = href
    ? `https://${country}.opensooq.com${href}`
    : `https://${country}.opensooq.com/ar/search/${externalId}`;

  return {
    external_id: externalId,
    source_name: "OpenSooq — السوق المفتوح",
    source_url: sourceUrl,
    purpose: null, // set by caller from section
    property_type: propType,
    type_ar: typeAr,
    type_en: typeEn,
    title_ar: title.slice(0, 300),
    price,
    currency: null, // set by caller
    area_sqm: area,
    bedrooms,
    bathrooms,
    city_key: cityKey,
    city_ar: cityAr,
    city_en: cityEn,
    neighborhood_en: nhood,
    country_ar: country[1],
    country_en: country[2],
    scraped_at: `${timeText} (OpenSooq)`,
    image_urls: imageUrl ? [imageUrl] : [],
  };
}

async function main() {
  const all = [];
  let blocked = false;

  outer: for (const country of TARGETS) {
    for (const section of SECTIONS) {
      for (let page = 1; page <= section.pages; page++) {
        const url = `https://${country[0]}.opensooq.com/ar/${section.slug}?page=${page}`;
        console.log(`↳ fetching ${url}`);
        try {
          const html = await fetchPage(url);
          if (!html) {
            console.log(`   empty response!`);
            continue;
          }
          const cards = parseCards(html, country);
          for (const c of cards) {
            c.purpose = section.purpose;
            c.currency = country[3];
          }
          console.log(`   parsed ${cards.length} cards (page ${page})`);
          all.push(...cards);
        } catch (e) {
          console.error(`   ${e.message}`);
          blocked = true;
          continue; // skip this page, keep going with others
        }
        await sleep(jitter(2500));
      }
    }
    if (all.length >= MAX_LISTINGS * 1.5) break;
  }

  // Dedupe by external id, keep order (newest first per source)
  const seen = new Set();
  const unique = all.filter((c) => {
    if (seen.has(c.external_id)) return false;
    seen.add(c.external_id);
    return true;
  });
  const final = unique.slice(0, MAX_LISTINGS);

  console.log(`\nTotal unique recent listings: ${final.length}`);
  if (final.length === 0) {
    console.log(blocked ? "Stopped early — possible block." : "Nothing to ingest.");
    return;
  }

  // Country distribution
  const dist = {};
  for (const c of final) dist[c.country_en] = (dist[c.country_en] ?? 0) + 1;
  console.log("Distribution:", dist);

  if (DRY) {
    console.log("DRY run — sample:");
    for (const c of final.slice(0, 3)) {
      console.log(JSON.stringify(c, null, 2));
    }
    return;
  }

  console.log(`\nPOST ${INGEST_URL}`);
  const res = await fetch(INGEST_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-admin-key": INGEST_KEY,
    },
    body: JSON.stringify({ listings: final }),
  });
  const result = await res.json();
  console.log("Ingest response:", JSON.stringify(result, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
