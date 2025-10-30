import { createI18n } from "vue-i18n";
import { messages, defaultLocale } from "@/locales";

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: "en-US",
  messages,
  globalInjection: true,
  missingWarn: false,
  fallbackWarn: false,
});

export default i18n;
