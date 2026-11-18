"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BlurFade } from "@/components/ui/blur-fade";
import { cityImages } from "@/data/properties";
import { formatNumber } from "@/lib/format";

const cities = [
  { key: "tripoli", count: 3240 },
  { key: "benghazi", count: 2150 },
  { key: "misrata", count: 980 },
  { key: "cairo", count: 4120 },
  { key: "dubai", count: 5360 },
  { key: "tunis", count: 1430 },
  { key: "casablanca", count: 1760 },
  { key: "riyadh", count: 2890 },
] as const;

export function CitiesSection() {
  const t = useTranslations("cities");
  const names = useTranslations("cities.names");
  const locale = useLocale();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
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

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {cities.map((city, i) => (
          <BlurFade key={city.key} delay={0.05 + i * 0.05} inView>
            <Link
              href={{ pathname: "/properties", query: { city: city.key } }}
              className="group relative block h-44 overflow-hidden rounded-2xl border sm:h-52"
            >
              <Image
                src={cityImages[city.key]}
                alt={names(city.key)}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                <div>
                  <p className="text-lg font-bold text-white">
                    {names(city.key)}
                  </p>
                  <p className="text-xs text-white/70">
                    {t("listingsCount", {
                      count: formatNumber(city.count, locale),
                    })}
                  </p>
                </div>
                <span className="flex size-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors group-hover:bg-gold group-hover:text-navy-deep">
                  <MapPin className="size-4" />
                </span>
              </div>
            </Link>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
