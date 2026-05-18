import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import DonationCTA from "@/components/DonationCTA";
import ParallaxBg from "@/components/ParallaxBg";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { defaultLocale, getAlternates, isSupportedLocale, withLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.partnershipsPrograms;

  return {
    title: `${page.title} — LindaBen Foundation`,
    description: page.metaDescription,
    alternates: { canonical: `/${locale}/partnerships-programs`, languages: getAlternates("/partnerships-programs") },
  };
}

export default async function PartnershipsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.partnershipsPrograms;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
          <ParallaxBg
            src="/programs/6.png"
            overlay="rgba(28,43,32,0.7)"
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

        {/* Main Content Section */}
        <section
          className="py-20 lg:py-28"
          style={{ background: "var(--warm-white)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
              {/* Content */}
              <div className="lg:col-span-3 space-y-8">
                <div className="space-y-6">
                  <p
                    className="text-sm font-semibold tracking-[0.18em] uppercase"
                    style={{ color: "var(--green-mid)" }}
                  >
                    {page.eyebrow}
                  </p>
                  
                  <h2
                    className="text-3xl lg:text-4xl font-bold leading-tight"
                    style={{
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-merriweather), serif",
                    }}
                  >
                    {page.heading}
                  </h2>
                  
                  <div className="space-y-6 text-base leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    {page.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="flex-1">
                    <Link
                      href={withLocale("/donations", locale)}
                      className="block w-full text-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
                      style={{ background: "var(--green-deep)" }}
                    >
                      {dictionary.common.donate}
                    </Link>
                  </div>
                  <div className="flex-1">
                    <Link
                      href={withLocale("/volunteer", locale)}
                      className="block w-full text-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
                      style={{ background: "var(--green-mid)" }}
                    >
                      {dictionary.pages.youthVolunteerism.signUp}
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className="lg:col-span-2">
                <div className="sticky top-32">
                  <div className="relative w-full aspect-square max-w-md mx-auto">
                    <Image
                      src="/programs/6.png"
                      alt={page.imageAlt}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover rounded-full shadow-xl"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Cards Section */}
        <section
          className="py-20 lg:py-28"
          style={{
            background: "linear-gradient(135deg, var(--cream) 0%, var(--warm-white) 100%)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {page.cards.map(([title, text]) => (
              <div key={title} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--green-pale)" }}
                  >
                    <svg className="w-8 h-8" style={{ color: "var(--green-deep)" }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  
                  <h3
                    className="text-xl font-bold"
                    style={{
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-merriweather), serif",
                    }}
                  >
                    {title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    {text}
                  </p>
                </div>
              </div>
              ))}
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
