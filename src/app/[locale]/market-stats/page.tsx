import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export default async function MarketStatsPage() {
  const t = await getTranslations();
  return (
    <PlaceholderPage
      title={t("nav.marketStats")}
      description={t("placeholder.marketDesc")}
    />
  );
}
