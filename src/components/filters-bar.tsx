"use client";

import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { CityInfo } from "@/lib/types";

interface Props {
  purpose: string;
  city: string;
  type: string;
  q: string;
  cities: CityInfo[];
}

const types = [
  { value: "apartment", key: "form.typeApartment" },
  { value: "villa", key: "form.typeVilla" },
  { value: "land", key: "form.typeLand" },
  { value: "office", key: "form.typeOffice" },
  { value: "shop", key: "form.typeShop" },
  { value: "building", key: "form.typeBuilding" },
  { value: "farm", key: "form.typeFarm" },
  { value: "chalet", key: "form.typeChalet" },
] as const;

export function FiltersBar({ purpose, city, type, q, cities }: Props) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  function update(params: Record<string, string | undefined>) {
    const next = new URLSearchParams();
    const merged: Record<string, string> = {
      purpose,
      city,
      type,
      q,
      ...params,
    };
    for (const [k, v] of Object.entries(merged)) {
      if (v && v !== "all" && v !== "any" && v !== "") next.set(k, v);
    }
    router.replace({ pathname, query: Object.fromEntries(next.entries()) });
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          defaultValue={q}
          placeholder={t("hero.searchPlaceholder")}
          className="ps-9"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              update({ q: (e.target as HTMLInputElement).value });
            }
          }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Select value={purpose} onValueChange={(v) => update({ purpose: v ?? "any" })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("form.purpose")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">{t("hero.any")}</SelectItem>
            <SelectItem value="sale">{t("form.sale")}</SelectItem>
            <SelectItem value="rent">{t("form.rent")}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={city} onValueChange={(v) => update({ city: v ?? "all" })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("form.city")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("hero.allCities")}</SelectItem>
            {cities.map((c) => (
              <SelectItem key={c.key} value={c.key}>
                {c.ar} · {c.en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={type} onValueChange={(v) => update({ type: v ?? "all" })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("form.type")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("hero.allTypes")}</SelectItem>
            {types.map((pt) => (
              <SelectItem key={pt.value} value={pt.value}>
                {t(pt.key)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {(purpose !== "any" || city !== "all" || type !== "all" || q) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            router.replace({ pathname, query: {} })
          }
        >
          {t("browse.clearFilters")}
        </Button>
      )}
    </div>
  );
}
