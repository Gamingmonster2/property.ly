import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { CitiesSection } from "@/components/home/cities-section";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { AddListingCta } from "@/components/home/add-listing-cta";
import { MarketStatsSection } from "@/components/home/market-stats-section";
import { CurrencySection } from "@/components/home/currency-section";
import { PartnersMarquee } from "@/components/home/partners-marquee";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CitiesSection />
      <FeaturedProperties />
      <AddListingCta />
      <MarketStatsSection />
      <CurrencySection />
      <PartnersMarquee />
    </>
  );
}
