"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "./dictionaries";
import { defaultLocale, type Locale } from "./config";
import en from "@/dictionaries/en.json";

type I18nContextValue = {
  locale: Locale;
  dictionary: Dictionary;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  dictionary,
  children,
}: I18nContextValue & {
  children: React.ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ locale, dictionary }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext) || { locale: defaultLocale, dictionary: en };
}
