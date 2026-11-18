import { getTranslations } from "next-intl/server";
import { ArrowDownUp, RefreshCw } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { exchangeRates } from "@/data/properties";

export async function CurrencySection() {
  const t = await getTranslations("currency");
  const commonT = await getTranslations("common");

  return (
    <section className="border-y bg-card/40">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <div className="flex flex-col items-start gap-4">
            <BlurFade inView>
              <span className="flex size-11 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <ArrowDownUp className="size-5" />
              </span>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                {t("title")}
              </h2>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <p className="max-w-lg text-muted-foreground">{t("subtitle")}</p>
            </BlurFade>
          </div>

          {/* Rates panel */}
          <BlurFade delay={0.25} inView>
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between border-b pb-4">
                <p className="font-bold">{t("usdToLyd")}</p>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <RefreshCw className="size-3" />
                  {commonT("currencyDisclaimer")}
                </span>
              </div>
              <ul className="divide-y">
                {exchangeRates.map((rate) => (
                  <li
                    key={rate.code}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-xs font-black">
                        {rate.code}
                      </span>
                      <span className="text-sm font-medium">
                        {t(rate.nameKey)}
                      </span>
                    </div>
                    <span className="font-mono text-sm font-semibold">
                      1 USD = {rate.rateToUsd.toLocaleString("en-US")} {rate.code}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
