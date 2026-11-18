"use client";

import { useTranslations } from "next-intl";
import { BlurFade } from "@/components/ui/blur-fade";
import { PropertyCard } from "@/components/property-card";
import type { ListingCard } from "@/lib/types";

export function FeaturedProperties({ items }: { items: ListingCard[] }) {
  const t = useTranslations("featured");

  if (items.length === 0) return null;

  return (
    <section className="bg-card/40">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <BlurFade inView>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <p className="max-w-2xl text-muted-foreground">{t("subtitle")}</p>
          </BlurFade>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((property, i) => (
            <BlurFade key={property.id} delay={0.05 + i * 0.06} inView>
              <PropertyCard property={property} />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
