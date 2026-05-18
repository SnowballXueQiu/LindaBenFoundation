"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/client";
import { withLocale } from "@/lib/i18n/config";

export default function DonationCTA() {
  const { locale, dictionary } = useI18n();
  const home = dictionary.home;

  return (
    <section
      id="donate"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: "var(--green-pale)" }}
    >
      {/* Decorative leaf shapes */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-30 -translate-y-1/2 translate-x-1/2"
        style={{ background: "var(--green-light)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-20 translate-y-1/2 -translate-x-1/2"
        style={{ background: "var(--green-mid)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <p
          className="text-sm font-semibold tracking-[0.18em] uppercase mb-4"
          style={{ color: "var(--green-deep)" }}
        >
          {home.donationEyebrow}
        </p>
        <h2
          className="text-3xl lg:text-5xl font-bold mb-6 leading-tight"
          style={{
            color: "var(--green-deep)",
            fontFamily: "var(--font-merriweather), serif",
          }}
        >
          {home.donationTitle}
        </h2>
        <p
          className="text-base lg:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ color: "var(--text-mid)" }}
        >
          {home.donationText}
        </p>

        <Link
          href={withLocale("/donations", locale)}
          className="inline-block px-10 py-4 rounded-full font-bold text-white text-base shadow-lg transition-all duration-200 hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
          style={{ background: "var(--green-deep)" }}
        >
          {home.donationButton}
        </Link>
      </div>
    </section>
  );
}
