"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Lock, UserRound } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BlurFade } from "@/components/ui/blur-fade";
import { toast } from "sonner";

export function RegisterForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        toast.error(t("errorTitle"), {
          description: t(`errors.${data.error ?? "unavailable"}`),
        });
        return;
      }
      toast.success(t("registered"));
      router.push("/add-listing");
    } catch {
      toast.error(t("errorTitle"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-14 sm:px-6">
      <div className="text-center">
        <BlurFade inView>
          <h1 className="text-3xl font-black tracking-tight">
            {t("registerTitle")}
          </h1>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <p className="mt-2 text-muted-foreground">{t("registerSubtitle")}</p>
        </BlurFade>
      </div>

      <BlurFade delay={0.15} inView>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl border bg-card p-6 shadow-sm"
        >
          <div className="space-y-2">
            <Label htmlFor="name">{t("name")}</Label>
            <div className="relative">
              <UserRound className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                required
                minLength={2}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                className="ps-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                className="ps-9"
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("passwordPlaceholder")}
                className="ps-9"
                dir="ltr"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={busy}>
            {busy ? t("busy") : t("submitRegister")}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {t("haveAccount")}{" "}
            <Link href="/login" className="font-semibold text-gold hover:underline">
              {t("signIn")}
            </Link>
          </p>
        </form>
      </BlurFade>
    </div>
  );
}
