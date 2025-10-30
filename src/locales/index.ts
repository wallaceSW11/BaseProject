import ptBR from "@/locales/pt-BR";
import enUS from "@/locales/en-US";

export const messages = {
  "pt-BR": ptBR,
  "en-US": enUS,
};

export const availableLocales = [
  { code: "pt-BR", name: "Português (Brasil)", flag: "🇧🇷" },
  { code: "en-US", name: "English (US)", flag: "🇺🇸" },
] as const;

export type LocaleCode = keyof typeof messages;

export const defaultLocale: LocaleCode = "pt-BR";
