"use client";

import { useTranslations } from "next-intl";
import { Building2 } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

export function PartnersMarquee() {
  const t = useTranslations("partners");
  const names = t.raw("names") as string[];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-center text-sm font-medium text-muted-foreground">
        {t("title")}
      </p>
      <div className="relative mt-8 [--duration:35s] [--gap:1rem]">
        <Marquee pauseOnHover className="[--duration:35s]">
          {names.map((name) => (
            <span
              key={name}
              className="flex items-center gap-2 rounded-full border bg-card px-6 py-3 text-sm font-semibold text-muted-foreground"
            >
              <Building2 className="size-4 text-gold" />
              {name}
            </span>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 start-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
