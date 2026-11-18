import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { CitiesSection } from "@/components/home/cities-section";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { AddListingCta } from "@/components/home/add-listing-cta";
import { MarketStatsSection } from "@/components/home/market-stats-section";
import { CurrencySection } from "@/components/home/currency-section";
import { PartnersMarquee } from "@/components/home/partners-marquee";
import { getListings } from "@/lib/listings";
import { seedCards } from "@/lib/seed";

export default async function HomePage() {
  // Live listings from D1; fall back to seed data while the DB is empty
  // (e.g. local dev without bindings).
  const live = await getListings({ limit: 6 });
  const items = live.length > 0 ? live : seedCards;

  return (
    <>
      <HeroSection />
      <StatsSection />
      <CitiesSection />
      <FeaturedProperties items={items} />
      <AddListingCta />
      <MarketStatsSection />
      <CurrencySection />
      <PartnersMarquee />
    </>
  );
}
