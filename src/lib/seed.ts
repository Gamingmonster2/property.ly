import { properties as seedProperties, type SeedProperty } from "@/data/properties";
import type { ListingCard } from "@/lib/types";

function seedToCard(p: SeedProperty): ListingCard {
  return {
    id: p.id,
    slug: p.slug,
    purpose: p.purpose,
    titleAr: p.titleAr,
    titleEn: p.titleEn,
    typeAr: p.typeAr,
    typeEn: p.typeEn,
    cityAr: p.cityAr,
    cityEn: p.cityEn,
    countryAr: p.countryAr,
    countryEn: p.countryEn,
    price: p.price,
    currency: p.currency,
    usdPrice: p.usdPrice,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    areaSqm: p.areaSqm,
    image: p.image,
    featured: p.featured ?? false,
  };
}

export const seedCards: ListingCard[] = seedProperties.map(seedToCard);
