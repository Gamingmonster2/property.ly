"use client";

import { useTranslations } from "next-intl";
import { Camera, Megaphone, UserRoundPlus } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export function AddListingCta() {
  const t = useTranslations("addCta");
  const router = useRouter();

  const steps = [
    { icon: UserRoundPlus, label: t("steps.0") },
    { icon: Camera, label: t("steps.1") },
    { icon: Megaphone, label: t("steps.2") },
  ];

  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 text-white">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.08}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "absolute inset-0 h-full w-full"
        )}
      />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-4 text-center sm:px-6">
        <BlurFade inView>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <p className="max-w-2xl text-white/70">{t("subtitle")}</p>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {steps.map((step, i) => (
              <span
                key={step.label}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm"
              >
                <step.icon className="size-4 text-gold" />
                {step.label}
                {i < steps.length - 1 && (
                  <span className="ms-2 text-white/30">←</span>
                )}
              </span>
            ))}
          </div>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <ShimmerButton
            shimmerColor="#ffffff"
            background="#c9a24b"
            className="rounded-full px-8 py-3 text-base font-bold text-navy-deep shadow-2xl shadow-gold/30"
            onClick={() => router.push("/add-listing")}
          >
            {t("button")}
          </ShimmerButton>
        </BlurFade>
      </div>
    </section>
  );
}
