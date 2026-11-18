"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, PartyPopper } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlurFade } from "@/components/ui/blur-fade";
import { toast } from "sonner";
import { cities } from "@/data/cities";

const types = [
  { value: "apartment", key: "typeApartment" },
  { value: "villa", key: "typeVilla" },
  { value: "land", key: "typeLand" },
  { value: "office", key: "typeOffice" },
  { value: "shop", key: "typeShop" },
  { value: "building", key: "typeBuilding" },
  { value: "farm", key: "typeFarm" },
  { value: "chalet", key: "typeChalet" },
  { value: "other", key: "typeOther" },
] as const;

const currencies = ["LYD", "USD", "EUR", "EGP", "AED", "SAR", "TND", "MAD"];

export function AddListingForm() {
  const t = useTranslations("form");
  const [purpose, setPurpose] = useState("sale");
  const [type, setType] = useState("apartment");
  const [city, setCity] = useState("");
  const [currency, setCurrency] = useState("LYD");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [district, setDistrict] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          purpose,
          type,
          title,
          description,
          price: Number(price),
          currency,
          city,
          district,
          phone,
          area: Number(area),
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms),
          website,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; slug?: string; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "failed");
      }
      setSlug(data.slug ?? null);
      if (!data.slug) {
        // honeypot triggered — silently pretend success
        setSlug(null);
      }
    } catch {
      toast.error(t("errorTitle"), { description: t("errorDesc") });
    } finally {
      setSubmitting(false);
    }
  }

  if (slug) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 py-20 text-center">
        <BlurFade inView>
          <span className="flex size-16 items-center justify-center rounded-3xl bg-gold/10 text-gold">
            <PartyPopper className="size-8" />
          </span>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <h1 className="text-3xl font-black tracking-tight">
            {t("successTitle")}
          </h1>
        </BlurFade>
        <BlurFade delay={0.2} inView>
          <p className="max-w-md text-muted-foreground">{t("successDesc")}</p>
        </BlurFade>
        <BlurFade delay={0.3} inView className="flex gap-3">
          <Button nativeButton={false} render={<Link href={`/property/${slug}`} />}>
            <CheckCircle2 className="size-4" />
            {t("viewListing")}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSlug(null);
              setTitle("");
              setDescription("");
              setPrice("");
            }}
          >
            {t("addAnother")}
          </Button>
        </BlurFade>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <BlurFade inView>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {t("subtitle")}
          </p>
        </BlurFade>
      </div>

      <BlurFade delay={0.15} inView>
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
        >
          {/* Honeypot — hidden from humans */}
          <div className="hidden" aria-hidden="true">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("purpose")}</Label>
              <Select value={purpose} onValueChange={(v) => setPurpose(v ?? "sale")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">{t("sale")}</SelectItem>
                  <SelectItem value="rent">{t("rent")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("type")}</Label>
              <Select value={type} onValueChange={(v) => setType(v ?? "apartment")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {types.map((pt) => (
                    <SelectItem key={pt.value} value={pt.value}>
                      {t(pt.key)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">
              {t("titleLabel")} <span className="text-gold">*</span>
            </Label>
            <Input
              id="title"
              required
              minLength={8}
              maxLength={300}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("titlePlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t("descriptionLabel")}</Label>
            <Textarea
              id="description"
              rows={5}
              maxLength={3000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("descriptionPlaceholder")}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="price">
                {t("priceLabel")} <span className="text-gold">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                required
                min={1}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("currency")}</Label>
              <Select value={currency} onValueChange={(v) => setCurrency(v ?? "LYD")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">{t("areaLabel")}</Label>
              <Input
                id="area"
                type="number"
                min={1}
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">{t("bedrooms")}</Label>
              <Input
                id="bedrooms"
                type="number"
                min={0}
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">{t("bathrooms")}</Label>
              <Input
                id="bathrooms"
                type="number"
                min={0}
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("city")} <span className="text-gold">*</span></Label>
              <Select value={city} onValueChange={(v) => setCity(v ?? "")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((c) => (
                    <SelectItem key={c.key} value={c.key}>
                      {c.ar} · {c.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="district">{t("districtLabel")}</Label>
              <Input
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder={t("districtPlaceholder")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                {t("phoneLabel")} <span className="text-gold">*</span>
              </Label>
              <Input
                id="phone"
                required
                minLength={8}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("phonePlaceholder")}
                dir="ltr"
                className="text-left"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full gap-2 text-base"
            disabled={submitting}
          >
            {submitting ? t("submitting") : t("submit")}
          </Button>
        </form>
      </BlurFade>
    </div>
  );
}
