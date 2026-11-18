import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export default async function AddListingPage() {
  const t = await getTranslations();
  return (
    <PlaceholderPage
      title={t("nav.addListing")}
      description={t("placeholder.addListingDesc")}
    />
  );
}
