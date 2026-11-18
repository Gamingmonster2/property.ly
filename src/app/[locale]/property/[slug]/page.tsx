import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import {
  Bath,
  BedDouble,
  ExternalLink,
  MapPin,
  Maximize,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getListingDetail } from "@/lib/listings";
import { formatNumber, formatPrice } from "@/lib/format";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/property/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getListingDetail(slug);
  if (!detail) return { title: "Property.ly" };
  return {
    title: detail.card.titleAr || detail.card.titleEn,
    description:
      detail.card.descriptionAr?.slice(0, 160) ?? detail.card.titleAr,
  };
}

export default async function PropertyDetailPage({
  params,
}: PageProps<"/[locale]/property/[slug]">) {
  const { locale, slug } = await params;
  const detail = await getListingDetail(slug);

  if (!detail) notFound();

  const { card, imageIds } = detail;
  const isAr = locale === "ar";
  const t = await getTranslations("detail");
  const featuredT = await getTranslations("featured");

  const title = isAr ? card.titleAr : card.titleEn;
  const city = isAr ? card.cityAr : card.cityEn;
  const country = isAr ? card.countryAr : card.countryEn;
  const type = isAr ? card.typeAr : card.typeEn;
  const description = isAr
    ? card.descriptionAr || card.descriptionEn
    : card.descriptionEn || card.descriptionAr;
  const neighborhood = isAr
    ? card.neighborhoodAr || card.neighborhoodEn
    : card.neighborhoodEn || card.neighborhoodAr;

  const phoneDigits = (card.phone ?? "").replace(/[^\d+]/g, "");
  const whatsappUrl = phoneDigits
    ? `https://wa.me/${phoneDigits.replace(/^\+/, "")}`
    : null;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb-ish back link */}
      <Link
        href="/properties"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        ← {t("backToListings")}
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Main column */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              className={
                card.purpose === "sale"
                  ? "bg-gold text-navy-deep"
                  : "bg-primary text-primary-foreground"
              }
            >
              {card.purpose === "sale"
                ? featuredT("saleBadge")
                : featuredT("rentBadge")}
            </Badge>
            <Badge variant="outline">{type}</Badge>
            {card.sourceName && (
              <Badge variant="secondary" className="text-[10px]">
                {t("scrapedListing")} {card.sourceName}
              </Badge>
            )}
          </div>

          <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight sm:text-3xl">
            {title}
          </h1>

          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {[neighborhood, city, country].filter(Boolean).join(" · ")}
          </p>

          {card.price != null && card.currency && (
            <div className="mt-4">
              <p className="text-3xl font-black text-gold">
                {formatPrice(card.price, card.currency, locale)}
              </p>
              {card.usdPrice != null && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {featuredT("priceInUsd", {
                    price: formatNumber(card.usdPrice, locale),
                  })}
                </p>
              )}
            </div>
          )}

          {/* Gallery */}
          {imageIds.length > 0 && (
            <div className="mt-6 overflow-hidden rounded-2xl border">
              <div className="relative aspect-[16/10]">
                <Image
                  src={`/api/image/${imageIds[0]}`}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                />
              </div>
              {imageIds.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-2">
                  {imageIds.slice(1, 5).map((imgId) => (
                    <div key={imgId} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={`/api/image/${imgId}`}
                        alt=""
                        fill
                        sizes="25vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Specs */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(card.bedrooms ?? 0) > 0 && (
              <Spec icon={BedDouble} label={featuredT("bedrooms")} value={String(card.bedrooms)} />
            )}
            {(card.bathrooms ?? 0) > 0 && (
              <Spec icon={Bath} label={featuredT("bathrooms")} value={String(card.bathrooms)} />
            )}
            {(card.areaSqm ?? 0) > 0 && (
              <Spec
                icon={Maximize}
                label={featuredT("areaUnit")}
                value={formatNumber(card.areaSqm!, locale)}
              />
            )}
            {card.scrapedAt && (
              <Spec icon={MapPin} label={t("posted")} value={card.scrapedAt} />
            )}
          </div>

          {/* Description */}
          {description && (
            <div className="mt-10">
              <h2 className="text-lg font-bold">{t("description")}</h2>
              <p className="mt-3 whitespace-pre-line leading-7 text-muted-foreground">
                {description}
              </p>
            </div>
          )}

          {/* Source attribution */}
          {card.sourceName && (
            <div className="mt-10 rounded-2xl border border-dashed p-4 text-xs leading-5 text-muted-foreground">
              <p className="font-semibold">{t("source")}</p>
              <p className="mt-1">
                {card.sourceName}
                {card.scrapedAt ? ` · ${card.scrapedAt}` : ""}
              </p>
              {card.sourceUrl && (
                <a
                  href={card.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="mt-2 inline-flex items-center gap-1.5 font-semibold text-gold hover:underline"
                >
                  <ExternalLink className="size-3.5" />
                  {t("viewOriginal")}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-bold">{t("contact")}</h2>

            {card.sourceName ? (
              <>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("scrapedListing")} {card.sourceName}. {featuredT("contactViaSource")}
                </p>
                {card.sourceUrl && (
                  <Button
                    className="mt-4 w-full gap-2"
                    nativeButton={false}
                    render={
                      <a
                        href={card.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      />
                    }
                  >
                    <ExternalLink className="size-4" />
                    {t("viewOriginal")}
                  </Button>
                )}
              </>
            ) : card.phone ? (
              <>
                <p className="mt-2 break-all text-sm text-muted-foreground" dir="ltr">
                  {card.phone}
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    className="w-full gap-2"
                    nativeButton={false}
                    render={<a href={`tel:${phoneDigits}`} />}
                  >
                    <Phone className="size-4" />
                    {t("call")}
                  </Button>
                  {whatsappUrl && (
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      nativeButton={false}
                      render={
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />
                      }
                    >
                      {t("whatsapp")}
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                {featuredT("contactViaSource")}
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BedDouble;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold">{value}</p>
        <p className="truncate text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
