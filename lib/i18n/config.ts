export const DEFAULT_SUPPORTED_LOCALES = ["en", "es", "fa", "fr", "ur", "ko", "ps", "zh"] as const;

export type Locale = (typeof DEFAULT_SUPPORTED_LOCALES)[number] | string;

const LOCALE_PATTERN = /^[a-z]{2}(?:-[A-Z]{2})?$/;

function parseLocales(value: string | undefined) {
  const locales = value
    ?.split(",")
    .map((locale) => locale.trim())
    .filter((locale) => LOCALE_PATTERN.test(locale));

  return locales?.length ? locales : [...DEFAULT_SUPPORTED_LOCALES];
}

export const supportedLocales = parseLocales(process.env.SUPPORTED_LOCALES);
export const defaultLocale = supportedLocales.includes(process.env.DEFAULT_LOCALE || "")
  ? process.env.DEFAULT_LOCALE!
  : supportedLocales[0];

export const localeLabels: Record<string, string> = {
  en: "English",
  es: "Español",
  fa: "Farsi",
  fr: "Français",
  ur: "اُردو",
  ko: "한국어",
  ps: "Pashto",
  zh: "汉语",
};

export const rtlLocales = new Set(["fa", "ur", "ps"]);

export function getLocaleLabel(locale: Locale) {
  return localeLabels[locale] || locale;
}

export function getTextDirection(locale: Locale) {
  return rtlLocales.has(locale) ? "rtl" : "ltr";
}

export function isSupportedLocale(locale: string | undefined): locale is Locale {
  return Boolean(locale && supportedLocales.includes(locale));
}

export function withLocale(path: string, locale: Locale) {
  if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:") || path.startsWith("#")) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  const segments = normalized.split("/").filter(Boolean);

  if (segments[0] && supportedLocales.includes(segments[0])) {
    segments[0] = locale;
    return `/${segments.join("/")}${normalized.endsWith("/") ? "/" : ""}`;
  }

  return `/${locale}${normalized === "/" ? "" : normalized}`;
}

export function stripLocale(path: string) {
  const segments = path.split("/").filter(Boolean);
  if (segments[0] && supportedLocales.includes(segments[0])) {
    return `/${segments.slice(1).join("/")}`;
  }
  return path;
}

export function getAlternates(path: string) {
  return Object.fromEntries(
    supportedLocales.map((locale) => [locale, withLocale(stripLocale(path), locale)]),
  );
}
