// Phase 0 seed data — realistic placeholder listings across MENA.
// Will be replaced by the database (Phase 1) and live feeds (Phase 2).

export type PropertyPurpose = "sale" | "rent";

export interface SeedProperty {
  id: string;
  slug: string;
  purpose: PropertyPurpose;
  typeAr: string;
  typeEn: string;
  titleAr: string;
  titleEn: string;
  cityKey: string;
  cityAr: string;
  cityEn: string;
  countryAr: string;
  countryEn: string;
  price: number;
  currency: string; // ISO code
  usdPrice: number;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  image: string;
  featured?: boolean;
}

export const properties: SeedProperty[] = [
  {
    id: "p1",
    slug: "sea-view-villa-tripoli",
    purpose: "sale",
    typeAr: "فيلا",
    typeEn: "Villa",
    titleAr: "فيلا فاخرة مطلة على البحر",
    titleEn: "Luxury villa with sea view",
    cityKey: "tripoli",
    cityAr: "طرابلس",
    cityEn: "Tripoli",
    countryAr: "ليبيا",
    countryEn: "Libya",
    price: 2850000,
    currency: "LYD",
    usdPrice: 570000,
    bedrooms: 5,
    bathrooms: 6,
    areaSqm: 650,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "p2",
    slug: "modern-3br-benghazi",
    purpose: "rent",
    typeAr: "شقة",
    typeEn: "Apartment",
    titleAr: "شقة حديثة بثلاث غرف",
    titleEn: "Modern 3-bedroom apartment",
    cityKey: "benghazi",
    cityAr: "بنغازي",
    cityEn: "Benghazi",
    countryAr: "ليبيا",
    countryEn: "Libya",
    price: 4500,
    currency: "LYD",
    usdPrice: 900,
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 180,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "p3",
    slug: "residential-land-andalus",
    purpose: "sale",
    typeAr: "أرض",
    typeEn: "Land",
    titleAr: "أرض سكنية في حي الأندلس",
    titleEn: "Residential plot in Al-Andalus",
    cityKey: "tripoli",
    cityAr: "طرابلس",
    cityEn: "Tripoli",
    countryAr: "ليبيا",
    countryEn: "Libya",
    price: 950000,
    currency: "LYD",
    usdPrice: 190000,
    bedrooms: 0,
    bathrooms: 0,
    areaSqm: 800,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "p4",
    slug: "family-apartment-cairo",
    purpose: "sale",
    typeAr: "شقة",
    typeEn: "Apartment",
    titleAr: "شقة عائلية في التجمع الخامس",
    titleEn: "Family apartment in New Cairo",
    cityKey: "cairo",
    cityAr: "القاهرة",
    cityEn: "Cairo",
    countryAr: "مصر",
    countryEn: "Egypt",
    price: 4200000,
    currency: "EGP",
    usdPrice: 84000,
    bedrooms: 3,
    bathrooms: 3,
    areaSqm: 165,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "p5",
    slug: "marina-penthouse-dubai",
    purpose: "sale",
    typeAr: "بنتهاوس",
    typeEn: "Penthouse",
    titleAr: "بنتهاوس على المارينا",
    titleEn: "Marina penthouse",
    cityKey: "dubai",
    cityAr: "دبي",
    cityEn: "Dubai",
    countryAr: "الإمارات",
    countryEn: "UAE",
    price: 3900000,
    currency: "AED",
    usdPrice: 1062000,
    bedrooms: 4,
    bathrooms: 5,
    areaSqm: 320,
    image:
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "p6",
    slug: "furnished-apartment-tunis",
    purpose: "rent",
    typeAr: "شقة",
    typeEn: "Apartment",
    titleAr: "شقة مفروشة في قلب العاصمة",
    titleEn: "Furnished apartment downtown",
    cityKey: "tunis",
    cityAr: "تونس",
    cityEn: "Tunis",
    countryAr: "تونس",
    countryEn: "Tunisia",
    price: 2200,
    currency: "TND",
    usdPrice: 700,
    bedrooms: 2,
    bathrooms: 1,
    areaSqm: 110,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    featured: false,
  },
  {
    id: "p7",
    slug: "city-center-apartment-casablanca",
    purpose: "sale",
    typeAr: "شقة",
    typeEn: "Apartment",
    titleAr: "شقة في وسط المدينة",
    titleEn: "City-center apartment",
    cityKey: "casablanca",
    cityAr: "الدار البيضاء",
    cityEn: "Casablanca",
    countryAr: "المغرب",
    countryEn: "Morocco",
    price: 1650000,
    currency: "MAD",
    usdPrice: 165000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 140,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    featured: false,
  },
  {
    id: "p8",
    slug: "contemporary-villa-misrata",
    purpose: "sale",
    typeAr: "فيلا",
    typeEn: "Villa",
    titleAr: "فيلا معاصرة بحوض سباحة",
    titleEn: "Contemporary villa with pool",
    cityKey: "misrata",
    cityAr: "مصراتة",
    cityEn: "Misrata",
    countryAr: "ليبيا",
    countryEn: "Libya",
    price: 1400000,
    currency: "LYD",
    usdPrice: 280000,
    bedrooms: 4,
    bathrooms: 4,
    areaSqm: 480,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
];

export const cityImages: Record<string, string> = {
  tripoli:
    "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=900&auto=format&fit=crop",
  benghazi:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=900&auto=format&fit=crop",
  misrata:
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=900&auto=format&fit=crop",
  cairo:
    "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=900&auto=format&fit=crop",
  dubai:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=900&auto=format&fit=crop",
  tunis:
    "https://images.unsplash.com/photo-1553603227-2358aabe821e?q=80&w=900&auto=format&fit=crop",
  casablanca:
    "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=900&auto=format&fit=crop",
  riyadh:
    "https://images.unsplash.com/photo-1564386413415-8a44e17cd30b?q=80&w=900&auto=format&fit=crop",
};

export interface ExchangeRateSeed {
  code: string;
  nameKey: string;
  rateToUsd: number; // 1 USD = rateToUsd units (approximate)
}

// Indicative rates (Phase 0). Live feed comes in Phase 2 via frankfurter.app
export const exchangeRates: ExchangeRateSeed[] = [
  { code: "LYD", nameKey: "usdToLyd", rateToUsd: 5.05 },
  { code: "EUR", nameKey: "eur", rateToUsd: 0.92 },
  { code: "EGP", nameKey: "egp", rateToUsd: 50.4 },
  { code: "AED", nameKey: "aed", rateToUsd: 3.67 },
  { code: "SAR", nameKey: "sar", rateToUsd: 3.75 },
  { code: "TRY", nameKey: "try", rateToUsd: 42.6 },
];
