"use client";

import { useTranslations } from "next-intl";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BlurFade } from "@/components/ui/blur-fade";

export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const t = useTranslations("placeholder");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 py-20 text-center">
      <BlurFade inView>
        <span className="flex size-16 items-center justify-center rounded-3xl bg-gold/10 text-gold">
          <Construction className="size-8" />
        </span>
      </BlurFade>
      <BlurFade delay={0.1} inView>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
          {title}
        </h1>
      </BlurFade>
      <BlurFade delay={0.2} inView>
        <p className="max-w-lg text-muted-foreground">{description}</p>
      </BlurFade>
      <BlurFade delay={0.25} inView>
        <span className="rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold">
          {t("soon")}
        </span>
      </BlurFade>
      <BlurFade delay={0.3} inView>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/" />}
        >
          {t("back")}
        </Button>
      </BlurFade>
    </div>
  );
}
