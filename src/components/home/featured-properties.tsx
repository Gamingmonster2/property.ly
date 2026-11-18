"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Bath, BedDouble, MapPin, Maximize, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShineBorder } from "@/components/ui/shine-border";
import { BorderBeam } from "@/components/ui/border-beam";
import { properties, type SeedProperty } from "@/data/properties";
import { formatPrice } from "@/lib/format";

function PropertyCard({
  property,
  locale,
  t,
}: {
  property: SeedProperty;
  locale: string;
  t: (key: string, values?: Record<string, string>) => string;
}) {
  const isAr = locale === "ar";
  const title = isAr ? property.titleAr : property.titleEn;
  const city = isAr ? property.cityAr : property.cityEn;
  const country = isAr ? property.countryAr : property.countryEn;
  const type = isAr ? property.typeAr : property.typeEn;

  return (
    <div className="group relative rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-lg">
      <ShineBorder
        borderWidth={1.5}
        shineColor={["#c9a24b", "#1e3a5f"]}
        className="rounded-2xl"
      />
      <div className="relative m-[1.5px] flex flex-col overflow-hidden rounded-[calc(var(--radius-2xl)-1.5px)] bg-card">
        {property.featured && (
          <BorderBeam
            size={180}
            duration={6}
            delay={3}
            className="pointer-events-none"
          />
        )}
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={property.image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
            <Badge
              className={
                property.purpose === "sale"
                  ? "bg-gold text-navy-deep hover:bg-gold"
                  : "bg-primary text-primary-foreground hover:bg-primary"
              }
            >
              {property.purpose === "sale" ? t("saleBadge") : t("rentBadge")}
            </Badge>
            {property.featured && (
              <Badge
                variant="secondary"
                className="gap-1 bg-background/85 backdrop-blur"
              >
                <Star className="size-3 fill-gold text-gold" />
                {t("featuredBadge")}
              </Badge>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="line-clamp-1 font-bold">{title}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3.5" />
                {city} · {country}
              </p>
            </div>
            <Badge variant="outline" className="shrink-0 text-[10px]">
              {type}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <BedDouble className="size-4" />
                {property.bedrooms} {t("bedrooms")}
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bath className="size-4" />
                {property.bathrooms} {t("bathrooms")}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Maximize className="size-4" />
              {property.areaSqm.toLocaleString(isAr ? "ar-LY" : "en-US")} {t("areaUnit")}
            </span>
          </div>

          <div className="mt-auto flex items-end justify-between border-t pt-3">
            <div>
              <p className="text-lg font-black text-gold">
                {formatPrice(property.price, property.currency, locale)}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {t("priceInUsd", {
                  price: formatPrice(property.usdPrice, "USD", locale),
                })}
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              nativeButton={false}
              render={<Link href={`/property/${property.slug}`} />}
            >
              {t("viewProperty")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProperties() {
  const t = useTranslations("featured");
  const locale = useLocale();
  const featured = properties.filter((p) => p.featured).slice(0, 6);

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
          {featured.map((property, i) => (
            <BlurFade key={property.id} delay={0.05 + i * 0.06} inView>
              <PropertyCard property={property} locale={locale} t={t} />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
