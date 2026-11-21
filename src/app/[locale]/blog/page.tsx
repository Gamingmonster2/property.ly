import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { BlurFade } from "@/components/ui/blur-fade";
import { GlassCard } from "@/components/glass-card";
import { getArticlesByLocale } from "@/data/articles";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "المدونة" : "Blog",
  };
}

export default async function BlogPage() {
  const locale = await getLocale();
  const t = await getTranslations("blog");
  const items = getArticlesByLocale(locale);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <BlurFade inView>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            {t("subtitle")}
          </p>
        </BlurFade>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((article, i) => (
          <BlurFade key={article.slug} delay={0.05 + i * 0.06} inView>
            <GlassCard
              slug={article.slug}
              title={article.title}
              excerpt={article.excerpt}
              image={article.image}
              category={article.category}
              date={article.date}
              readTime={article.readTime}
              readTimeLabel={t("readingTime")}
            />
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
