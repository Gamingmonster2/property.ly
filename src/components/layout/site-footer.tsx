import { getTranslations } from "next-intl/server";
import { connection } from "next/server";
import { Building2 } from "lucide-react";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  // Prerendered with Cache Components: reading the current year is
  // unstable during prerender, so mark the footer as request-time.
  await connection();
  const t = await getTranslations("footer");

  const quickLinks = [
    { label: t("buy"), href: "/properties" },
    { label: t("rent"), href: "/properties" },
    { label: t("marketStats"), href: "/market-stats" },
    { label: t("currency"), href: "/currency" },
  ];

  const companyLinks = [
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
    { label: t("privacy"), href: "/privacy" },
    { label: t("terms"), href: "/terms" },
  ];

  return (
    <footer className="border-t bg-card/50">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Building2 className="size-5" />
              </span>
              <span className="text-lg font-bold">
                Property<span className="text-gold">.ly</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              {t("desc")}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">{t("countries")}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold">{t("quickLinks")}</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">{t("company")}</h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} Property.ly — {t("rights")}
          </p>
          <p className="flex items-center gap-1.5">
            <Building2 className="size-3.5 text-gold" />
            {t("browse")}
          </p>
        </div>
      </div>
    </footer>
  );
}
