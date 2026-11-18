import type { CityInfo } from "@/lib/types";

// Shared city registry used by the listing form, filters and scraped-data mapping.
export const cities: CityInfo[] = [
  // Libya
  { key: "tripoli", ar: "طرابلس", en: "Tripoli" },
  { key: "benghazi", ar: "بنغازي", en: "Benghazi" },
  { key: "misrata", ar: "مصراتة", en: "Misrata" },
  { key: "zawiya", ar: "الزاوية", en: "Zawiya" },
  { key: "sabha", ar: "سبها", en: "Sabha" },
  { key: "zliten", ar: "زليتن", en: "Zliten" },
  { key: "al-bayda", ar: "البيضاء", en: "Al Bayda" },
  { key: "derna", ar: "درنة", en: "Derna" },
  { key: "tobruk", ar: "طبرق", en: "Tobruk" },
  { key: "gharyan", ar: "غريان", en: "Gharyan" },
  { key: "ajdabiya", ar: "أجدابيا", en: "Ajdabiya" },
  { key: "al-khums", ar: "الخمس", en: "Al Khums" },
  // Egypt
  { key: "cairo", ar: "القاهرة", en: "Cairo" },
  { key: "giza", ar: "الجيزة", en: "Giza" },
  { key: "alexandria", ar: "الإسكندرية", en: "Alexandria" },
  // UAE
  { key: "dubai", ar: "دبي", en: "Dubai" },
  { key: "abu-dhabi", ar: "أبوظبي", en: "Abu Dhabi" },
  { key: "sharjah", ar: "الشارقة", en: "Sharjah" },
  // Tunisia
  { key: "tunis", ar: "تونس", en: "Tunis" },
  { key: "sfax", ar: "صفاقس", en: "Sfax" },
  { key: "sousse", ar: "سوسة", en: "Sousse" },
  // Morocco
  { key: "casablanca", ar: "الدار البيضاء", en: "Casablanca" },
  { key: "rabat", ar: "الرباط", en: "Rabat" },
  { key: "marrakesh", ar: "مراكش", en: "Marrakesh" },
  // Saudi Arabia
  { key: "riyadh", ar: "الرياض", en: "Riyadh" },
  { key: "jeddah", ar: "جدة", en: "Jeddah" },
  // Jordan
  { key: "amman", ar: "عمّان", en: "Amman" },
  // Qatar
  { key: "doha", ar: "الدوحة", en: "Doha" },
  // Kuwait
  { key: "kuwait", ar: "مدينة الكويت", en: "Kuwait City" },
  // Oman
  { key: "muscat", ar: "مسقط", en: "Muscat" },
  // Bahrain
  { key: "manama", ar: "المنامة", en: "Manama" },
  // Lebanon
  { key: "beirut", ar: "بيروت", en: "Beirut" },
  // Iraq
  { key: "baghdad", ar: "بغداد", en: "Baghdad" },
  { key: "basra", ar: "البصرة", en: "Basra" },
  // Algeria
  { key: "algiers", ar: "الجزائر", en: "Algiers" },
  // Turkey
  { key: "istanbul", ar: "إسطنبول", en: "Istanbul" },
  // Other
  { key: "other", ar: "مدينة أخرى", en: "Other" },
];

const byKey = new Map(cities.map((c) => [c.key, c]));

export function getCity(key: string | null | undefined): CityInfo | undefined {
  if (!key) return undefined;
  const direct = byKey.get(key.toLowerCase());
  if (direct) return direct;
  // Try matching by English name (used when mapping scraped data-city)
  const en = key.trim().toLowerCase();
  return cities.find((c) => c.en.toLowerCase() === en);
}

export function cityKeyFromEnglishName(name: string): string {
  return (
    getCity(name)?.key ??
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}

const COUNTRY: Record<string, { ar: string; en: string }> = {
  tripoli: { ar: "ليبيا", en: "Libya" },
  benghazi: { ar: "ليبيا", en: "Libya" },
  misrata: { ar: "ليبيا", en: "Libya" },
  zawiya: { ar: "ليبيا", en: "Libya" },
  sabha: { ar: "ليبيا", en: "Libya" },
  zliten: { ar: "ليبيا", en: "Libya" },
  "al-bayda": { ar: "ليبيا", en: "Libya" },
  derna: { ar: "ليبيا", en: "Libya" },
  tobruk: { ar: "ليبيا", en: "Libya" },
  gharyan: { ar: "ليبيا", en: "Libya" },
  ajdabiya: { ar: "ليبيا", en: "Libya" },
  "al-khums": { ar: "ليبيا", en: "Libya" },
  cairo: { ar: "مصر", en: "Egypt" },
  giza: { ar: "مصر", en: "Egypt" },
  alexandria: { ar: "مصر", en: "Egypt" },
  dubai: { ar: "الإمارات", en: "UAE" },
  "abu-dhabi": { ar: "الإمارات", en: "UAE" },
  sharjah: { ar: "الإمارات", en: "UAE" },
  tunis: { ar: "تونس", en: "Tunisia" },
  sfax: { ar: "تونس", en: "Tunisia" },
  sousse: { ar: "تونس", en: "Tunisia" },
  casablanca: { ar: "المغرب", en: "Morocco" },
  rabat: { ar: "المغرب", en: "Morocco" },
  marrakesh: { ar: "المغرب", en: "Morocco" },
  riyadh: { ar: "السعودية", en: "Saudi Arabia" },
  jeddah: { ar: "السعودية", en: "Saudi Arabia" },
  amman: { ar: "الأردن", en: "Jordan" },
  doha: { ar: "قطر", en: "Qatar" },
  kuwait: { ar: "الكويت", en: "Kuwait" },
  muscat: { ar: "عُمان", en: "Oman" },
  manama: { ar: "البحرين", en: "Bahrain" },
  beirut: { ar: "لبنان", en: "Lebanon" },
  baghdad: { ar: "العراق", en: "Iraq" },
  basra: { ar: "العراق", en: "Iraq" },
  algiers: { ar: "الجزائر", en: "Algeria" },
  istanbul: { ar: "تركيا", en: "Turkey" },
  other: { ar: "", en: "" },
};

export function getCityCountry(key: string): { ar: string; en: string } {
  return COUNTRY[key] ?? { ar: "", en: "" };
}
