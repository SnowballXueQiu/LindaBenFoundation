import Image from "next/image";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ParallaxBg from "@/components/ParallaxBg";
import type { Metadata } from "next";
import { defaultLocale, getAlternates, isSupportedLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.history;
  return {
    title: `${page.title} — LindaBen Foundation`,
    description: page.metaDescription,
    alternates: { canonical: `/${locale}/our-history`, languages: getAlternates("/our-history") },
  };
}

export default async function OurHistoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.history;

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
          <ParallaxBg src="/our_history/hero.png" overlay="rgba(28,43,32,0.55)" speed={0.15} position="center bottom" offset="0px 800px" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8" style={{ fontFamily: "var(--font-merriweather), serif" }}>
              {page.title}
            </h1>
            <blockquote className="max-w-2xl mx-auto">
              <p className="text-lg lg:text-xl leading-relaxed italic mb-4" style={{ color: "var(--green-pale)" }}>
                &ldquo;{page.quote}&rdquo;
              </p>
              <cite className="text-sm font-semibold not-italic tracking-wide" style={{ color: "var(--green-light)" }}>
                - {page.cite}
              </cite>
            </blockquote>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ background: "var(--cream)" }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-12 text-center lg:text-left leading-snug" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>
              {page.messageTitle}
            </h2>

            <HistoryBlock image="/our_history/1.png" alt={page.imageAlt1} text={page.paragraphs[0]} />
            <HistoryBlock image="/our_history/2.png" alt={page.imageAlt2} text={page.paragraphs[1]} reverse />
            {page.paragraphs.slice(2).map((paragraph) => (
              <div key={paragraph} className="mb-16">
                <p className="text-base lg:text-[17px] leading-[1.85] max-w-3xl mx-auto" style={{ color: "var(--text-mid)", fontFamily: "var(--font-merriweather), serif" }}>
                  {paragraph}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px" style={{ background: "var(--green-pale)" }} />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

function HistoryBlock({ image, alt, text, reverse = false }: { image: string; alt: string; text: string; reverse?: boolean }) {
  return (
    <div className={`grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 mb-16 items-start ${reverse ? "lg:grid-cols-[1fr_320px]" : ""}`}>
      <div className={`relative w-full aspect-4/5 rounded-2xl overflow-hidden shadow-lg ${reverse ? "lg:order-2" : ""}`}>
        <Image src={image} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 320px" />
      </div>
      <p className={`text-base lg:text-[17px] leading-[1.85] ${reverse ? "lg:order-1" : ""}`} style={{ color: "var(--text-mid)", fontFamily: "var(--font-merriweather), serif" }}>
        {text}
      </p>
    </div>
  );
}
