import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { getArticleBySlug } from "@/data/articles";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(locale, slug);
  if (!article) return { title: "Property.ly" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(locale, slug);
  if (!article) notFound();

  const t = await getTranslations("blog");

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← {t("back")}
      </Link>

      {/* Glass hero image */}
      <div className="relative overflow-hidden rounded-2xl border shadow-lg">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/25 to-transparent" />
          {/* Glossy window reflection */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent" />
          {/* Frosted glass caption */}
          <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/25 bg-white/10 p-4 shadow-lg backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-5">
            <Badge className="bg-gold text-navy-deep hover:bg-gold">
              {article.category}
            </Badge>
            <h1 className="mt-2.5 text-xl font-black leading-snug text-white sm:text-2xl">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="size-4 text-gold" />
          {article.date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-4 text-gold" />
          {article.readTime} {t("readingTime")}
        </span>
      </div>

      {/* Body */}
      <article className="mt-8 space-y-6">
        {article.content.map((paragraph, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "text-lg font-medium leading-8 text-foreground"
                : "leading-8 text-foreground/85"
            }
          >
            {paragraph}
          </p>
        ))}
      </article>
    </div>
  );
}
