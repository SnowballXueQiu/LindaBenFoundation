import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import DonationCTA from "@/components/DonationCTA";
import ParallaxBg from "@/components/ParallaxBg";
import ScrollAnimatedImage from "@/components/ScrollAnimatedImage";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { defaultLocale, getAlternates, isSupportedLocale, withLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.foodAsMedicine;

  return {
    title: `${page.title} — LindaBen Foundation`,
    description: page.metaDescription,
    alternates: { canonical: `/${locale}/food-as-medicine`, languages: getAlternates("/food-as-medicine") },
  };
}

export default async function FoodAsMedicinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.foodAsMedicine;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden"
        >
          <ParallaxBg
            src="/food-as-medicine/hero.png"
            overlay="rgba(28,43,32,0.6)"
            speed={0.15}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-8"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              {page.title}
            </h1>
          </div>
        </section>

        {/* Section 1: Nourishing Families */}
        <section
          className="py-20 lg:py-28"
          style={{ background: "var(--cream)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left - Content */}
              <div className="order-2 lg:order-1">
                <p
                  className="text-sm font-semibold tracking-[0.18em] uppercase mb-4"
                  style={{ color: "var(--green-mid)" }}
                >
                  {page.eyebrow1}
                </p>
                
                <h2
                  className="text-3xl lg:text-4xl font-bold mb-8 leading-snug"
                  style={{
                    color: "var(--green-deep)",
                    fontFamily: "var(--font-merriweather), serif",
                  }}
                >
                  {page.sectionTitle1}
                </h2>
                
                <div className="space-y-8">
                  {page.blocks.map(([title, text]) => (
                  <div key={title}>
                    <h3
                      className="text-xl font-bold mb-4"
                      style={{ 
                        color: "var(--green-deep)",
                        fontFamily: "var(--font-merriweather), serif" 
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-base leading-relaxed mb-8"
                      style={{ color: "var(--text-mid)" }}
                    >
                      {text}
                    </p>
                  </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={withLocale("/blogs", locale)}
                    className="inline-block px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 text-center"
                    style={{ background: "var(--green-deep)" }}
                  >
                    {page.blog}
                  </Link>
                  <Link
                    href={withLocale("/contact", locale)}
                    className="inline-block px-7 py-3.5 rounded-full font-semibold transition-all duration-200 hover:opacity-90 text-center border-2"
                    style={{ 
                      color: "var(--green-deep)", 
                      borderColor: "var(--green-deep)" 
                    }}
                  >
                    {page.contactInfo}
                  </Link>
                </div>
              </div>

              {/* Right - Animated Image */}
              <div className="order-1 lg:order-2 flex justify-center">
                <ScrollAnimatedImage
                  src="/food-as-medicine/1.png"
                  alt={page.imageAlt1}
                  width={320}
                  height={320}
                  animationDelay={0.2}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Eat Well, Feel Better */}
        <section
          className="py-20 lg:py-28"
          style={{ background: "var(--warm-white)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left - Animated Image */}
              <div className="flex justify-center">
                <ScrollAnimatedImage
                  src="/food-as-medicine/2.png"
                  alt={page.imageAlt2}
                  width={320}
                  height={320}
                  animationDelay={0.3}
                />
              </div>

              {/* Right - Content */}
              <div>
                <p
                  className="text-sm font-semibold tracking-[0.18em] uppercase mb-4"
                  style={{ color: "var(--green-mid)" }}
                >
                  {page.eyebrow2}
                </p>
                
                <h2
                  className="text-3xl lg:text-4xl font-bold mb-6 leading-snug"
                  style={{
                    color: "var(--green-deep)",
                    fontFamily: "var(--font-merriweather), serif",
                  }}
                >
                  {page.sectionTitle2}
                </h2>

                <p
                  className="text-base lg:text-lg leading-relaxed mb-8"
                  style={{ color: "var(--text-mid)" }}
                >
                  {page.sectionText2}
                </p>

                <div className="space-y-6 mb-8">
                  <div>
                    <h4
                      className="text-lg font-bold mb-2"
                      style={{ color: "var(--green-deep)" }}
                    >
                      {page.cost}
                    </h4>
                    <p
                      className="text-base"
                      style={{ color: "var(--text-dark)" }}
                    >
                      {page.costValue}
                    </p>
                  </div>

                  <div>
                    <h4
                      className="text-lg font-bold mb-2"
                      style={{ color: "var(--green-deep)" }}
                    >
                      {page.locations}
                    </h4>
                    <p
                      className="text-base"
                      style={{ color: "var(--text-dark)" }}
                    >
                      {page.locationsValue}
                    </p>
                  </div>

                  <div>
                    <h4
                      className="text-lg font-bold mb-2"
                      style={{ color: "var(--green-deep)" }}
                    >
                      {page.supportedBy}
                    </h4>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "var(--text-dark)" }}
                    >
                      {page.supportedByValue}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <Link
                    href={withLocale("/donations", locale)}
                    className="inline-block px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90"
                    style={{ background: "var(--green-deep)" }}
                  >
                    {dictionary.common.donate}
                  </Link>
                  <a
                    href="https://signup.com/go/QhdcRuv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-all duration-200 hover:opacity-90"
                  >
                    <Image
                      src="/food-as-medicine/signup.png"
                      alt={page.signupAlt}
                      width={120}
                      height={48}
                      className="h-12 w-auto"
                      style={{
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                        mixBlendMode: "multiply"
                      }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Donation CTA */}
        <DonationCTA />

        {/* Divider */}
        <div
          className="h-px"
          style={{ background: "var(--green-pale)" }}
        />

        {/* Contact Section */}
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
