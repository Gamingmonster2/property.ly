import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export default async function PropertyDetailPage() {
  const t = await getTranslations();
  return (
    <PlaceholderPage
      title={t("placeholder.propertyTitle")}
      description={t("placeholder.propertyDesc")}
    />
  );
}
