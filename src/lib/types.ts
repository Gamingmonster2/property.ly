export interface ListingCard {
  id: string;
  slug: string;
  purpose: "sale" | "rent";
  titleAr: string;
  titleEn: string;
  typeAr: string;
  typeEn: string;
  cityAr: string;
  cityEn: string;
  countryAr: string;
  countryEn: string;
  price: number | null;
  currency: string | null;
  usdPrice: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  areaSqm: number | null;
  image: string | null;
  featured: boolean;
  sourceName?: string | null;
  sourceUrl?: string | null;
  scrapedAt?: string | null;
  descriptionAr?: string | null;
  descriptionEn?: string | null;
  phone?: string | null;
  neighborhoodAr?: string | null;
  neighborhoodEn?: string | null;
  imageId?: number | null;
}

export interface CityInfo {
  key: string;
  ar: string;
  en: string;
}
