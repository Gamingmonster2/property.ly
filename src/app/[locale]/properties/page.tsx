import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BlurFade } from "@/components/ui/blur-fade";
import { PropertyCard } from "@/components/property-card";
import { FiltersBar } from "@/components/filters-bar";
import { getListings } from "@/lib/listings";
import { seedCards } from "@/lib/seed";
import { cities } from "@/data/cities";
import type { ListingCard } from "@/lib/types";

const PAGE_SIZE = 24;

function filterSeed(items: ListingCard[], params: Record<string, string>) {
  return items.filter((item) => {
    if (params.purpose && params.purpose !== "any" && item.purpose !== params.purpose) return false;
    if (params.type && params.type !== "all" && item.slug === params.type) return false;
    if (params.q) {
      const q = params.q.toLowerCase();
      const hay = `${item.titleAr} ${item.titleEn} ${item.cityEn}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/properties">): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "تصفح العقارات" : "Browse properties",
  };
}

export default async function PropertiesPage({
  searchParams,
}: PageProps<"/[locale]/properties">) {
  const sp = await searchParams;
  const purpose = String(sp.purpose ?? "any");
  const city = String(sp.city ?? "all");
  const type = String(sp.type ?? "all");
  const q = String(sp.q ?? "");
  const page = Math.max(1, Number(sp.page ?? 1));

  const browseT = await getTranslations("browse");

  const live = await getListings({
    purpose,
    city,
    type,
    q,
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  });

  // DB fallback (dev or empty DB): use seed data with naive filtering
  const hasLive = live.length > 0 || page > 1;
  const items: ListingCard[] = hasLive
    ? live
    : filterSeed(seedCards, { purpose, type, q }).slice(0, PAGE_SIZE);

  const count = items.length;
  const hasNext = count === PAGE_SIZE;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <BlurFade inView>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
          {browseT("title")}
        </h1>
      </BlurFade>
      <BlurFade delay={0.05} inView>
        <p className="mt-2 text-muted-foreground">{browseT("subtitle")}</p>
      </BlurFade>

      <div className="mt-8">
        <FiltersBar
          purpose={purpose}
          city={city}
          type={type}
          q={q}
          cities={cities.slice(0, 30)}
        />
      </div>

      <p className="mt-6 text-sm font-medium text-muted-foreground">
        {browseT("resultsCount", { count })}
      </p>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <p className="text-lg font-semibold">{browseT("noResults")}</p>
          <p className="max-w-md text-sm text-muted-foreground">
            {browseT("noResultsHint")}
          </p>
        </div>
      ) : (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>
      )}

      {hasNext && (
        <div className="mt-10 text-center">
          <a
            href={`?${new URLSearchParams({
              ...(purpose !== "any" ? { purpose } : {}),
              ...(city !== "all" ? { city } : {}),
              ...(type !== "all" ? { type } : {}),
              ...(q ? { q } : {}),
              page: String(page + 1),
            }).toString()}`}
            className="text-sm font-semibold text-gold hover:underline"
          >
            {browseT("viewMore")}
          </a>
        </div>
      )}
    </div>
  );
}
