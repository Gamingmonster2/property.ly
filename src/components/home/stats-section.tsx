"use client";

import { useTranslations } from "next-intl";
import { Building2, Globe2, MapPinned, Users } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";

export function StatsSection() {
  const t = useTranslations("stats");

  const stats = [
    { icon: Building2, value: 12000, suffix: "+", label: t("listings") },
    { icon: MapPinned, value: 45, suffix: "", label: t("cities") },
    { icon: Globe2, value: 8, suffix: "", label: t("countries") },
    { icon: Users, value: 25000, suffix: "+", label: t("visitors") },
  ];

  return (
    <section className="border-y bg-card/40">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat, i) => (
          <BlurFade key={stat.label} delay={0.1 + i * 0.08} inView>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <stat.icon className="size-5" />
              </span>
              <p className="text-3xl font-black tracking-tight">
                <NumberTicker value={stat.value} />
                {stat.suffix}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
