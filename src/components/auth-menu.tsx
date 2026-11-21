"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FolderHeart, LogIn, LogOut, UserRound } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

interface Me {
  id: number;
  email: string;
  name: string;
}

export function AuthMenu() {
  const t = useTranslations("auth");
  const [user, setUser] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((r) => r.json() as Promise<{ user: Me | null }>)
      .then((data) => {
        if (!cancelled) setUser(data.user ?? null);
      })
      .catch(() => {
        /* not signed in */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      /* ignore */
    }
    setUser(null);
    window.location.reload();
  }

  if (loading) {
    return <span className="hidden h-7 w-20 sm:block" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="hidden gap-2 md:inline-flex"
          nativeButton={false}
          render={<Link href="/my-listings" />}
        >
          <FolderHeart className="size-4" />
          {t("myListings")}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("logout")}
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
        </Button>
        <span className="hidden items-center gap-1.5 text-xs font-semibold text-muted-foreground lg:flex">
          <UserRound className="size-3.5 text-gold" />
          {user.name}
        </span>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2"
      nativeButton={false}
      render={<Link href="/login" />}
    >
      <LogIn className="size-4" />
      <span className="hidden sm:inline">{t("signIn")}</span>
    </Button>
  );
}
