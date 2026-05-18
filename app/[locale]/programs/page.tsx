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

const programItems = [
  { titleKey: "foodAsMedicine", href: "/food-as-medicine", image: "/programs/1.png", reverse: false },
  { titleKey: "communityPantry", href: "/community-pantry", image: "/programs/2.png", reverse: true },
  { titleKey: "resourceSupportCenter", href: "/new-community-resource-support-center", image: "/programs/3.png", reverse: false },
  { titleKey: "youthVolunteerism", href: "/youth-volunteerism", image: "/programs/4.png", reverse: true },
  { titleKey: "communityOutreach", href: "/community-outreach", image: "/programs/5.png", reverse: false },
  { titleKey: "partnerships", href: "/partnerships-programs", image: "/programs/6.png", reverse: true },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);

  return {
    title: `${dictionary.nav.ourPrograms} — LindaBen Foundation`,
    description: dictionary.pages.programs.metaDescription,
    alternates: { canonical: `/${locale}/programs`, languages: getAlternates("/programs") },
  };
}

export default async function ProgramsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.programs;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
          <ParallaxBg
            src="/programs/hero.png"
            overlay="rgba(28,43,32,0.7)"
            speed={0.15}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-8"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              {dictionary.nav.ourPrograms}
            </h1>
          </div>
        </section>

        {/* Introduction Section */}
        <section
          className="py-20 lg:py-28"
          style={{
            background: "linear-gradient(135deg, var(--cream) 0%, var(--warm-white) 100%)",
          }}
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <p
              className="text-sm font-semibold tracking-[0.18em] uppercase mb-6"
              style={{ color: "var(--green-mid)" }}
            >
              {page.eyebrow}
            </p>

            <h2
              className="text-3xl lg:text-5xl font-bold mb-8 leading-tight"
              style={{
                color: "var(--green-deep)",
                fontFamily: "var(--font-merriweather), serif",
              }}
            >
              {page.introTitle}
            </h2>

            <p
              className="text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: "var(--text-mid)" }}
            >
              {page.intro}
            </p>
          </div>
        </section>

        {/* Programs Section */}
        <section
          className="py-20 lg:py-28"
          style={{ background: "var(--warm-white)" }}
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="space-y-16 lg:space-y-20">
              {programItems.map((item, index) => {
                const title = dictionary.nav[item.titleKey];
                return (
                  <div key={item.href} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className={`relative overflow-hidden rounded-lg shadow-md ${item.reverse ? "lg:order-2" : ""}`}>
                      <Image
                        src={item.image}
                        alt={title}
                        width={500}
                        height={350}
                        className="w-full h-auto object-cover"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                    </div>
                    <div className={`space-y-6 ${item.reverse ? "lg:order-1" : ""}`}>
                      <h3
                        className="text-3xl lg:text-4xl font-bold"
                        style={{
                          color: "var(--green-deep)",
                          fontFamily: "var(--font-merriweather), serif",
                        }}
                      >
                        {title}
                      </h3>
                      <p className="text-lg leading-relaxed" style={{ color: "var(--text-mid)" }}>
                        {page.descriptions[index]}
                      </p>
                      <Link
                        href={withLocale(item.href, locale)}
                        className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
                        style={{ background: "var(--green-deep)" }}
                      >
                        {dictionary.common.learnMore}
                      </Link>
                    </div>
                  </div>
                );
              })}
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
