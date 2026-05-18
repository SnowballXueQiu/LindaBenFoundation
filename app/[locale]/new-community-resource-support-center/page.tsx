import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import DonationCTA from "@/components/DonationCTA";
import ParallaxBg from "@/components/ParallaxBg";
import Image from "next/image";
import type { Metadata } from "next";
import { defaultLocale, getAlternates, isSupportedLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.resourceCenter;

  return {
    title: `${page.title} — LindaBen Foundation`,
    description: page.metaDescription,
    alternates: { canonical: `/${locale}/new-community-resource-support-center`, languages: getAlternates("/new-community-resource-support-center") },
  };
}

export default async function NewCommunityResourceSupportCenterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.resourceCenter;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
          <ParallaxBg
            src="/new-community-resource-support-center/hero.png"
            overlay="rgba(28,43,32,0.7)"
            speed={0.15}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h1
              className="text-3xl lg:text-5xl font-bold text-white mb-8 leading-tight"
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
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="space-y-8">
                <div className="space-y-6 text-lg leading-relaxed" style={{ color: "var(--text-mid)" }}>
                  {page.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              
              {/* Image */}
              <div className="relative">
                <Image
                  src="/new-community-resource-support-center/image.png"
                  alt={page.imageAlt}
                  width={600}
                  height={450}
                  className="w-full h-auto rounded-2xl shadow-lg"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Cards Section */}
        <section
          className="py-20 lg:py-28"
          style={{
            background: "linear-gradient(135deg, var(--cream) 0%, var(--warm-white) 100%)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {page.cards.map(([title, text], index) => (
              <div key={title} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--green-pale)" }}
                  >
                    <Image
                      src={`/new-community-resource-support-center/card_icon_${index + 1}.svg`}
                      alt={title}
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
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
