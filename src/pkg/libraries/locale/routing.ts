import { defineRouting } from "next-intl/routing";

//constant
/**
 * Routing configuration for locale-aware navigation.
 */
export const routing = defineRouting({
  locales: ["en", "uk"],
  localePrefix: "as-needed",
  localeDetection: false,
  defaultLocale: "en",
});
