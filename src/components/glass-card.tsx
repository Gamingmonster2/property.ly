"use client";

import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ShineBorder } from "@/components/ui/shine-border";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

interface GlassCardProps {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: number;
  readTimeLabel: string;
}

/**
 * Premium glass card: photo with a frosted-glass caption panel, a glossy
 * top reflection and a shine sweep on hover. Fully responsive.
 */
export function GlassCard({
  slug,
  title,
  excerpt,
  image,
  category,
  date,
  readTime,
  readTimeLabel,
}: GlassCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group relative block rounded-2xl bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <ShineBorder
        borderWidth={1.5}
        shineColor={["#c9a24b", "#ffffff"]}
        className="rounded-2xl"
      />

      {/* Image */}
      <div className="relative m-[1.5px] overflow-hidden rounded-[calc(var(--radius-2xl)-1.5px)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Depth gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/20 to-transparent" />

          {/* Glossy window reflection (static top sheen) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent opacity-70" />

          {/* Shine sweep on hover */}
          <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="h-full w-full animate-glass-shine bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>

          {/* Frosted glass caption */}
          <div className="absolute inset-x-2.5 bottom-2.5 rounded-xl border border-white/25 bg-white/10 p-3.5 shadow-lg backdrop-blur-md transition-colors duration-300 group-hover:bg-white/15">
            <AnimatedShinyText
              shimmerWidth={80}
              className="block text-start text-[11px] font-semibold text-gold"
            >
              {category}
            </AnimatedShinyText>
            <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-white sm:text-base">
              {title}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-2.5 p-4">
          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
            {excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5 text-gold" />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-gold" />
              {readTime} {readTimeLabel}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
