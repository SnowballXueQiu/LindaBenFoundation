"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/client";
import { withLocale } from "@/lib/i18n/config";

const cards = [
  {
    titleKey: "donate",
    textKey: "donateHelp",
    img: "/you_can_help/donate.png",
    href: "/donations",
  },
  {
    titleKey: "volunteer",
    textKey: "volunteerHelp",
    img: "/you_can_help/volunteer.png",
    href: "/volunteer",
  },
  {
    titleKey: "subscribe",
    textKey: "subscribeHelp",
    img: "/you_can_help/subscribe.png",
    href: "/newsletter",
  },
] as const;

export default function HowToHelp() {
  const { locale, dictionary } = useI18n();
  const home = dictionary.home;

  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: "var(--warm-white)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-sm font-semibold tracking-[0.18em] uppercase mb-3"
            style={{ color: "var(--green-mid)" }}
          >
            {home.helpEyebrow}
          </p>
          <h2
            className="text-3xl lg:text-4xl font-bold"
            style={{
              color: "var(--green-deep)",
              fontFamily: "var(--font-merriweather), serif",
            }}
          >
            {home.helpTitle}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => {
            const title = card.titleKey === "donate" ? dictionary.common.donate : home[card.titleKey];
            return (
            <Link
              key={card.titleKey}
              href={withLocale(card.href, locale)}
              className="group relative rounded-2xl overflow-hidden block"
              style={{ aspectRatio: "4/5" }}
            >
              {/* Image */}
              <Image
                src={card.img}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Hover overlay - green semi-transparent */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "rgba(45,106,79,0.85)",
                }}
              >
                <h3
                  className="text-3xl lg:text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-merriweather), serif" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-white/90 max-w-xs">
                  {home[card.textKey]}
                </p>
              </div>
            </Link>
          )})}
        </div>

        {/* Equal opportunity note */}
        <p
          className="text-center text-xs font-semibold tracking-[0.12em] uppercase mt-14 opacity-60"
          style={{ color: "var(--text-mid)" }}
        >
          {home.equalOpportunity}
        </p>
      </div>
    </section>
  );
}
