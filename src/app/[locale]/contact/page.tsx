import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export default async function ContactPage() {
  const t = await getTranslations();
  return (
    <PlaceholderPage
      title={t("footer.contact")}
      description={t("placeholder.contactDesc")}
    />
  );
}
