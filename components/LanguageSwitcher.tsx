"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleLabel, supportedLocales, withLocale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const { locale, dictionary } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[--green-pale] bg-white px-3 text-xs font-semibold text-[#1c2b20] shadow-sm transition-colors hover:border-[--green-mid] hover:text-[#2d6a4f]"
        aria-label={dictionary.common.changeLanguage}
        aria-expanded={open}
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
        </svg>
        <span>{locale.toUpperCase()}</span>
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>
      <div className="absolute right-0 top-full z-40 h-3 w-52" />
      <div
        className={`absolute right-0 top-full z-50 mt-1 w-52 overflow-hidden rounded-lg border border-[--green-pale] bg-white py-2 shadow-xl ring-1 ring-black/5 transition-all duration-150 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
        }`}
      >
        {supportedLocales.map((item) => (
          <Link
            key={item}
            href={withLocale(pathname, item)}
            onClick={() => setOpen(false)}
            className={`flex items-center justify-between px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-[--green-pale] ${
              item === locale ? "text-[--green-deep]" : "text-[--text-dark]"
            }`}
          >
            <span>{getLocaleLabel(item)}</span>
            {item === locale && (
              <svg className="h-4 w-4 text-[--green-mid]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8l3 3 7-7" />
              </svg>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
