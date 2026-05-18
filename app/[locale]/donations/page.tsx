import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { defaultLocale, getAlternates, isSupportedLocale, withLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const donationLinks = [
  "https://secure.givelively.org/donate/lindaben-foundation-inc",
  "https://www.lindabenfoundation.org/donate-goods",
  "https://www.lindabenfoundation.org/donate-goods",
  "https://www.lindabenfoundation.org/donate-goods",
  "https://www.lindabenfoundation.org/volunteer",
  "https://www.lindabenfoundation.org/donate-goods",
];

const donationImages = [
  "/donations/1.png",
  "/donations/2.png",
  "/donations/3.png",
  "/donations/4.png",
  "/donations/5.png",
  "/donations/6.png",
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.donations;

  return {
    title: `${page.heroTitle} — LindaBen Foundation`,
    description: page.metaDescription,
    alternates: { canonical: `/${locale}/donations`, languages: getAlternates("/donations") },
  };
}

export default async function DonationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.donations;

  const donationStats = [
    { number: "$487,140", label: page.stats[0] },
    { number: "$316,498", label: page.stats[1] },
    { number: "2400+", label: page.stats[2] },
  ];

  const donationCards = page.cards.map(([title, content], index) => ({
    image: donationImages[index],
    title,
    content,
    link: donationLinks[index],
  }));

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-32 pb-16 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/donations/hero.png"
            alt={page.heroAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center text-white">
          <h1
            className="text-4xl lg:text-6xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-merriweather), serif" }}
          >
            {page.heroTitle}
          </h1>
        </div>
      </section>

      {/* Section 1 - Ways to Give */}
      <section className="py-16 lg:py-24" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--green-mid)" }}
              >
                {page.eyebrow}
              </p>
              <h2
                className="text-3xl lg:text-4xl font-bold mb-6"
                style={{ 
                  color: "var(--green-deep)",
                  fontFamily: "var(--font-merriweather), serif"
                }}
              >
                {page.waysTitle}
              </h2>
              <div className="space-y-4 mb-8">
                <p className="text-lg leading-relaxed" style={{ color: "var(--text-dark)" }}>
                  {page.intro}
                </p>
                <p className="text-lg leading-relaxed font-semibold" style={{ color: "var(--text-dark)" }}>
                  <strong>{page.donateOnce}</strong>
                </p>
                <p className="text-lg leading-relaxed" style={{ color: "var(--text-dark)" }}>
                  {page.donateOnceText}
                </p>
              </div>
              <a
                href="https://secure.givelively.org/donate/lindaben-foundation-inc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90"
                style={{ background: "var(--green-deep)" }}
              >
                {page.donateOnline} →
              </a>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/donations/section1.png"
                  alt={page.sectionAlt}
                  width={320}
                  height={320}
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Donation Cards */}
      <section className="py-16 lg:py-24" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {donationCards.map((card, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg overflow-hidden shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                style={{ borderColor: "var(--green-pale)" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "var(--green-deep)" }}
                  >
                    {card.title}
                  </h3>
                  <p 
                    className="text-base leading-relaxed mb-6 whitespace-pre-line"
                    style={{ color: "var(--text-mid)" }}
                  >
                    {card.content}
                  </p>
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90"
                    style={{ background: "var(--green-deep)" }}
                  >
                    {page.learnMoreDonate}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - Give In Other Ways */}
      <section className="py-16" style={{ background: "var(--green-pale)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2
            className="text-3xl lg:text-4xl font-bold mb-8"
            style={{ 
              color: "var(--green-deep)",
              fontFamily: "var(--font-merriweather), serif"
            }}
          >
            {page.otherWaysTitle}
          </h2>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-dark)" }}>
              <Link 
                href={withLocale("/contact", locale)}
                className="underline hover:opacity-70 transition-opacity"
                style={{ color: "var(--green-deep)" }}
              >
                {page.contactUs}
              </Link>{" "}
              {page.otherWaysText}
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-dark)" }}>
              {page.textCode} <strong>MORETHANFOOD</strong> {page.toPhone}
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 - Statistics */}
      <section className="py-16 lg:py-24" style={{ background: "var(--green-deep)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {donationStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-4xl lg:text-5xl font-bold mb-4"
                  style={{
                    color: "var(--green-light)",
                    fontFamily: "var(--font-merriweather), serif",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-lg font-medium text-white/80"
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 - 501(c)(3) Status */}
      <section className="py-16 lg:py-24" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--green-mid)" }}
              >
                {page.trustEyebrow}
              </p>
              <h2
                className="text-3xl lg:text-4xl font-bold mb-6"
                style={{ 
                  color: "var(--green-deep)",
                  fontFamily: "var(--font-merriweather), serif"
                }}
              >
                {page.statusTitle}
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-dark)" }}>
                {page.statusText}
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/donations/section5.png"
                  alt={page.statusAlt}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}
