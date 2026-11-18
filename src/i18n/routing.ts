import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Arabic is the primary market language
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
