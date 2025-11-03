import { createI18n } from "vue-i18n";
import { messages, defaultLocale } from "@/locales";
import { defaultMessages } from "@wallacesw11/base-lib/locales";

// Create i18n instance with project messages or fallback to lib's default
export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: "en-US",
  messages: messages || defaultMessages,
  globalInjection: true,
  missingWarn: false,
  fallbackWarn: false,
});

export default i18n;
