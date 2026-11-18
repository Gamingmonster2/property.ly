"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Search } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WordRotate } from "@/components/ui/word-rotate";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

const cities = ["tripoli", "benghazi", "misrata", "cairo", "dubai", "tunis", "casablanca", "riyadh"] as const;

const propertyTypes = [
  { value: "apartment", key: "typeApartment" },
  { value: "villa", key: "typeVilla" },
  { value: "land", key: "typeLand" },
  { value: "office", key: "typeOffice" },
  { value: "shop", key: "typeShop" },
] as const;

export function HeroSection() {
  const t = useTranslations("hero");
  const citiesT = useTranslations("cities.names");
  const router = useRouter();

  const [city, setCity] = useState("all");
  const [type, setType] = useState("all");
  const [purpose, setPurpose] = useState("any");
  const [query, setQuery] = useState("");

  const rotateWords = t.raw("rotateWords") as string[];
  const popularTags = t.raw("popularTags") as string[];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (city !== "all") params.set("city", city);
    if (type !== "all") params.set("type", type);
    if (purpose !== "any") params.set("purpose", purpose);
    router.push({
      pathname: "/properties",
      query: Object.fromEntries(params.entries()),
    });
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background grid */}
      <AnimatedGridPattern
        numSquares={40}
        maxOpacity={0.12}
        duration={2.5}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          "absolute inset-x-0 -top-24 h-[720px] w-full skew-y-3"
        )}
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
        <BlurFade delay={0.1} inView>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-gold" />
            </span>
            {t("badge")}
          </span>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t("titleStart")}{" "}
            <WordRotate
              words={rotateWords}
              className="text-gold"
              duration={2400}
            />
          </h1>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {t("subtitle")}
          </p>
        </BlurFade>

        {/* Search panel */}
        <BlurFade delay={0.4} inView className="mt-10 w-full max-w-4xl">
          <form
            onSubmit={handleSearch}
            className="grid w-full gap-3 rounded-2xl border bg-card/90 p-4 shadow-lg shadow-navy/5 backdrop-blur sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto]"
          >
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="ps-9 h-12"
              />
            </div>

            <Select value={city} onValueChange={(v) => setCity(v ?? "all")}>
              <SelectTrigger className="h-12 w-full gap-2 sm:w-44">
                <MapPin className="size-4 shrink-0 text-muted-foreground" />
                <SelectValue placeholder={t("city")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allCities")}</SelectItem>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>
                    {citiesT(c)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={type} onValueChange={(v) => setType(v ?? "all")}>
              <SelectTrigger className="h-12 w-full sm:w-40">
                <SelectValue placeholder={t("type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allTypes")}</SelectItem>
                {propertyTypes.map((pt) => (
                  <SelectItem key={pt.value} value={pt.value}>
                    {t(pt.key)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Select value={purpose} onValueChange={(v) => setPurpose(v ?? "any")}>
                <SelectTrigger className="h-12 w-full sm:w-32">
                  <SelectValue placeholder={t("purpose")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">{t("any")}</SelectItem>
                  <SelectItem value="sale">{t("sale")}</SelectItem>
                  <SelectItem value="rent">{t("rent")}</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" size="lg" className="h-12 gap-2 px-6">
                <Search className="size-4" />
                <span className="hidden sm:inline">{t("search")}</span>
              </Button>
            </div>
          </form>
        </BlurFade>

        {/* Popular tags */}
        <BlurFade delay={0.5} inView>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">{t("popular")}</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-gold/60 hover:text-foreground"
              >
                {tag}
              </button>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
