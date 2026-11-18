import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export default async function TermsPage() {
  const t = await getTranslations();
  return (
    <PlaceholderPage
      title={t("footer.terms")}
      description={t("placeholder.legalDesc")}
    />
  );
}
