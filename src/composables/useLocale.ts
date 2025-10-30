import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { availableLocales, type LocaleCode } from "@/locales";

function loadSavedLocale(): LocaleCode | null {
  const savedLocale = localStorage.getItem("locale") as LocaleCode | null;
  return savedLocale &&
    availableLocales.some((l: { code: string }) => l.code === savedLocale)
    ? savedLocale
    : null;
}

export function useLocale() {
  const { locale, t } = useI18n();

  const currentLocale = computed({
    get: () => locale.value as LocaleCode,
    set: (value: LocaleCode) => {
      locale.value = value;
      localStorage.setItem("locale", value);
    },
  });

  const locales = availableLocales;

  const setLocale = (newLocale: LocaleCode) => {
    currentLocale.value = newLocale;
  };

  const savedLocale = loadSavedLocale();
  if (savedLocale) {
    locale.value = savedLocale;
  }

  return {
    locale: currentLocale,
    locales,
    setLocale,
    t,
  };
}
