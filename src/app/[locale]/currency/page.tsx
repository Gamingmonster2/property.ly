import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export default async function CurrencyPage() {
  const t = await getTranslations();
  return (
    <PlaceholderPage
      title={t("nav.currency")}
      description={t("placeholder.currencyDesc")}
    />
  );
}
