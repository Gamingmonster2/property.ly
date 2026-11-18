import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export default async function AboutPage() {
  const t = await getTranslations();
  return (
    <PlaceholderPage
      title={t("footer.about")}
      description={t("placeholder.aboutDesc")}
    />
  );
}
