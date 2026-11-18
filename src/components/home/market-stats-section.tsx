import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlurFade } from "@/components/ui/blur-fade";
import { Globe2, Landmark, TrendingUp } from "lucide-react";

const cards = [
  { key: "libya", icon: Landmark },
  { key: "mena", icon: TrendingUp },
  { key: "global", icon: Globe2 },
] as const;

export async function MarketStatsSection() {
  const t = await getTranslations("market");

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

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cards.map((card, i) => (
          <BlurFade key={card.key} delay={0.05 + i * 0.08} inView>
            <Card className="group relative h-full overflow-hidden transition-shadow hover:shadow-lg">
              <CardHeader className="relative">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                  <card.icon className="size-5" />
                </span>
                <CardTitle className="pt-2 text-lg">
                  {t(`cards.${card.key}.title`)}
                </CardTitle>
                <CardDescription className="leading-6">
                  {t(`cards.${card.key}.desc`)}
                </CardDescription>
                <Badge
                  variant="secondary"
                  className="absolute end-4 top-4 text-[10px]"
                >
                  {t("comingSoon")}
                </Badge>
              </CardHeader>
            </Card>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
