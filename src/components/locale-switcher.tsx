"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("common");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const otherLocale = locale === "ar" ? "en" : "ar";

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2"
      nativeButton={false}
      render={
        <Link
          href={{
            pathname,
            query: Object.fromEntries(searchParams.entries()),
          }}
          locale={otherLocale}
        />
      }
    >
      <Languages className="size-4" />
      <span className="text-sm font-semibold">{t("language")}</span>
    </Button>
  );
}
