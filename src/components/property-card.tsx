"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Bath, BedDouble, ExternalLink, MapPin, Maximize, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";
import { BorderBeam } from "@/components/ui/border-beam";
import type { ListingCard } from "@/lib/types";
import { formatNumber, formatPrice } from "@/lib/format";

export function PropertyCard({ property }: { property: ListingCard }) {
  const t = useTranslations("featured");
  const sourceT = useTranslations("browse");
  const locale = useLocale();
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
      <div className="relative m-[1.5px] flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-2xl)-1.5px)] bg-card">
        {property.featured && (
          <BorderBeam
            size={180}
            duration={6}
            delay={3}
            className="pointer-events-none"
          />
        )}

        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          {property.image ? (
            <Image
              src={property.image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-secondary text-muted-foreground">
              <MapPin className="size-8" />
            </div>
          )}
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
            <div className="min-w-0">
              <h3 className="line-clamp-2 font-bold leading-snug">{title}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3.5 shrink-0" />
                <span className="truncate">
                  {[city, country].filter(Boolean).join(" · ")}
                </span>
              </p>
            </div>
            <Badge variant="outline" className="shrink-0 text-[10px]">
              {type}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {(property.bedrooms ?? 0) > 0 && (
              <span className="flex items-center gap-1">
                <BedDouble className="size-4" />
                {property.bedrooms} {t("bedrooms")}
              </span>
            )}
            {(property.bathrooms ?? 0) > 0 && (
              <span className="flex items-center gap-1">
                <Bath className="size-4" />
                {property.bathrooms} {t("bathrooms")}
              </span>
            )}
            {(property.areaSqm ?? 0) > 0 && (
              <span className="flex items-center gap-1">
                <Maximize className="size-4" />
                {formatNumber(property.areaSqm!, locale)} {t("areaUnit")}
              </span>
            )}
          </div>

          <div className="mt-auto flex items-end justify-between gap-2 border-t pt-3">
            <div className="min-w-0">
              {property.price != null && property.currency ? (
                <>
                  <p className="truncate text-lg font-black text-gold">
                    {formatPrice(property.price, property.currency, locale)}
                  </p>
                  {property.usdPrice != null && (
                    <p className="text-[11px] text-muted-foreground">
                      {t("priceInUsd", {
                        price: formatNumber(property.usdPrice, locale),
                      })}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm font-semibold text-muted-foreground">
                  {t("priceOnRequest")}
                </p>
              )}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
              nativeButton={false}
              render={<Link href={`/property/${property.slug}`} />}
            >
              {t("viewProperty")}
            </Button>
          </div>

          {/* Source attribution (small print) */}
          {property.sourceName && (
            <p className="flex items-center gap-1.5 border-t border-dashed pt-2 text-[10px] leading-4 text-muted-foreground/80">
              <span>
                {sourceT("source")} {property.sourceName}
                {property.scrapedAt ? ` · ${property.scrapedAt}` : ""}
              </span>
              {property.sourceUrl && (
                <a
                  href={property.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-0.5 font-medium text-muted-foreground hover:text-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="size-3" />
                  {sourceT("viewOriginal")}
                </a>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
