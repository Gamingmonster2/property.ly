import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export default async function PrivacyPage() {
  const t = await getTranslations();
  return (
    <PlaceholderPage
      title={t("footer.privacy")}
      description={t("placeholder.legalDesc")}
    />
  );
}
