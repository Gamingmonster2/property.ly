import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Plus } from "lucide-react";
import { getDB } from "@/lib/db";
import { SESSION_COOKIE, getUserByToken } from "@/lib/auth";
import { mapListingRow } from "@/lib/listings";
import type { ImageRow, ListingRow } from "@/lib/db";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function MyListingsPage() {
  const cookieStore = await cookies();
  const user = await getUserByToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!user) {
    redirect("/login");
  }

  const t = await getTranslations("auth");
  const db = await getDB();
  const rows = db
    ? (
        (
          await db
            .prepare(
              "SELECT * FROM listings WHERE user_id = ? ORDER BY created_at DESC, id DESC"
            )
            .bind(user.id)
            .all<ListingRow>()
        ).results
      )
    : [];

  const items = rows.map((row) => mapListingRow(row, null as ImageRow | null));

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            {t("welcome")}، {user.name} 👋
          </h1>
          <p className="mt-1 text-muted-foreground">{user.email}</p>
        </div>
        <Button className="gap-2" nativeButton={false} render={<Link href="/add-listing" />}>
          <Plus className="size-4" />
          {t("addNew")}
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <p className="text-lg font-semibold">{t("noListings")}</p>
          <p className="max-w-md text-sm text-muted-foreground">
            {t("noListingsHint")}
          </p>
          <Button className="mt-2" nativeButton={false} render={<Link href="/add-listing" />}>
            {t("addNew")}
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>
      )}
    </div>
  );
}
