import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export default async function PropertiesPage() {
  const t = await getTranslations();
  return (
    <PlaceholderPage
      title={t("nav.buy")}
      description={t("placeholder.propertiesDesc")}
    />
  );
}
