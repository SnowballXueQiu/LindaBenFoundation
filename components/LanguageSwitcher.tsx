"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleLabel, supportedLocales, withLocale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const { locale } = useI18n();

  return (
    <div className="relative group">
      <button
        type="button"
        className="inline-flex min-w-12 items-center justify-center rounded px-2 py-2 text-sm font-semibold text-[#1c2b20] hover:text-[#2d6a4f]"
        aria-label="Change language"
      >
        {locale.toUpperCase()}
      </button>
      <div className="pointer-events-none absolute right-0 top-full z-50 w-44 overflow-hidden rounded-b-md border-t-2 border-[--green-mid] bg-[#2eb3d0] py-0 opacity-0 shadow-lg transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        {supportedLocales.map((item, index) => (
          <Link
            key={item}
            href={withLocale(pathname, item)}
            className={`block px-5 py-4 text-center text-lg font-bold text-white transition-colors hover:bg-[#263033] ${
              item === locale ? "bg-[#263033]" : ""
            } ${index > 0 ? "border-t border-[#1c7f93]" : ""}`}
          >
            {getLocaleLabel(item)}
          </Link>
        ))}
      </div>
    </div>
  );
}
