"use client";

import { Suspense, useState } from "react";
import { useTranslations } from "next-intl";
import { Building2, Menu, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { key: "home", href: "/" },
  { key: "buy", href: "/properties?purpose=sale" },
  { key: "rent", href: "/properties?purpose=rent" },
  { key: "blog", href: "/blog" },
  { key: "marketStats", href: "/market-stats" },
  { key: "currency", href: "/currency" },
] as const;

export function SiteHeader() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Building2 className="size-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight">
              Property<span className="text-gold">.ly</span>
            </span>
            <span className="text-[10px] font-medium text-muted-foreground">
              {t("common.tagline")}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Button
              key={item.key}
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<Link href={item.href} className="text-sm font-medium" />}
            >
              {t(`nav.${item.key}`)}
            </Button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Suspense fallback={<span className="hidden h-7 w-16 sm:block" />}>
            <LocaleSwitcher />
          </Suspense>
          <Button
            size="sm"
            className="hidden gap-2 sm:inline-flex"
            nativeButton={false}
            render={<Link href="/add-listing" />}
          >
            <Plus className="size-4" />
            {t("nav.addListing")}
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="lg:hidden" />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col gap-1 p-4 pt-12">
                {navItems.map((item) => (
                  <Button
                    key={item.key}
                    variant="ghost"
                    className="justify-start text-base"
                    onClick={() => setOpen(false)}
                    nativeButton={false}
                    render={<Link href={item.href} />}
                  >
                    {t(`nav.${item.key}`)}
                  </Button>
                ))}
                <Button
                  className="mt-4 gap-2"
                  onClick={() => setOpen(false)}
                  nativeButton={false}
                  render={<Link href="/add-listing" />}
                >
                  <Plus className="size-4" />
                  {t("nav.addListing")}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
