import "server-only";

import en from "@/dictionaries/en.json";
import es from "@/dictionaries/es.json";
import fa from "@/dictionaries/fa.json";
import fr from "@/dictionaries/fr.json";
import ko from "@/dictionaries/ko.json";
import ps from "@/dictionaries/ps.json";
import ur from "@/dictionaries/ur.json";
import zh from "@/dictionaries/zh.json";
import { defaultLocale, isSupportedLocale, type Locale } from "./config";

export type Dictionary = typeof en;

const bundledDictionaries: Record<string, Dictionary> = {
  en,
  es: es as Dictionary,
  fa: fa as Dictionary,
  fr: fr as Dictionary,
  ko: ko as Dictionary,
  ps: ps as Dictionary,
  ur: ur as Dictionary,
  zh: zh as Dictionary,
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  if (isSupportedLocale(locale) && bundledDictionaries[locale]) {
    return bundledDictionaries[locale];
  }

  return bundledDictionaries[defaultLocale] || en;
}
