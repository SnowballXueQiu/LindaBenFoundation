import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import DonationCTA from "@/components/DonationCTA";
import CardFlipCarousel from "@/components/CardFlipCarousel";
import ParallaxBg from "@/components/ParallaxBg";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { defaultLocale, getAlternates, isSupportedLocale, withLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const boardMembers = [
  "Anna S. Beavan",
  "James Beavan III",
  "Keith Hinds",
  "Ana Cortes",
  "Sister Carmen Sotto, CCV",
  "Brenda Castellano",
  "Janice Irizarry",
  "Noralyn Talavera",
  "Jeannette Mendy",
  "Kerry Jones",
  "Beth Manrique",
];

const operationsTeam = [
  "Anna Beavan",
  "James Beavan III",
  "Harvey Li",
  "James Beavan IV",
  "Ken Coleman",
  "Abdul Rahim",
  "Jennette Mendy",
  "Pastor Willie Walker",
  "Randel Robinson",
  "Johanes / Jordan / Jackie",
  "Petal Sampson",
  "Mary Payton",
  "Yahzee Carino",
  "Jose Ramirez",
  "Cindy Dookhantee",
  "Lisette Martinez",
  "Iczel Herrera Perea",
  "Heidi Morales",
  "Margarita Rosas Crespo",
  "Maria Contreras",
  "Juan Morales",
  "Ivie Ebhojiaye",
  "Kevin Oliver",
  "Yeti",
  "Elder Sheila Tinker",
  "Olivia De Jesus",
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.aboutUs;
  return {
    title: `${page.title} — LindaBen Foundation`,
    description: page.metaDescription,
    alternates: { canonical: `/${locale}/about-us`, languages: getAlternates("/about-us") },
  };
}

export default async function AboutUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.aboutUs;

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
          <ParallaxBg src="/about_us/hero.png" overlay="rgba(28,43,32,0.55)" speed={0.15} offset="0px 200px" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8" style={{ fontFamily: "var(--font-merriweather), serif" }}>
              {page.title}
            </h1>
            <p className="text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: "var(--green-pale)" }}>
              {page.heroText}
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28" style={{ background: "var(--cream)" }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20">
            {[
              [page.missionTitle, page.missionText],
              [page.visionTitle, page.visionText],
            ].map(([title, text]) => (
              <div key={title}>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-snug" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>
                  {title}
                </h2>
                <p className="text-base lg:text-lg leading-relaxed" style={{ color: "var(--text-mid)" }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 lg:py-28" style={{ background: "var(--warm-white)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: "var(--green-mid)" }}>{page.historyEyebrow}</p>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-snug" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>{page.historyTitle}</h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-mid)" }}>{page.historyText}</p>
              <Link href={withLocale("/our-history", locale)} className="inline-block px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90" style={{ background: "var(--green-deep)" }}>
                {page.fullStory}
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl" style={{ background: "var(--green-pale)" }} />
              <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "4/3" }}>
                <Image src="/our_history/hero.png" alt={page.historyAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28" style={{ background: "var(--cream)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <CardFlipCarousel />
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: "var(--green-mid)" }}>{page.leadersEyebrow}</p>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-snug" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>{page.leadershipTitle}</h2>
              {page.leadershipTexts.map((text) => (
                <p key={text} className="text-base leading-relaxed mb-6" style={{ color: "var(--text-mid)" }}>{text}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28" style={{ background: "var(--warm-white)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: "var(--green-mid)" }}>{page.peopleEyebrow}</p>
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 leading-snug" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>{page.peopleTitle}</h2>
            </div>
            <PeopleGrid title={page.boardTitle} names={boardMembers} role={page.boardRole} />
            <PeopleGrid title={page.operationsTitle} names={operationsTeam} role={page.teamRole} compact />
          </div>
        </section>

        <DonationCTA />
        <div className="h-px" style={{ background: "var(--green-pale)" }} />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

function PeopleGrid({ title, names, role, compact = false }: { title: string; names: string[]; role: string; compact?: boolean }) {
  return (
    <div className={compact ? "" : "mb-20"}>
      <div className="text-center mb-12">
        <h3 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>{title}</h3>
        <div className="w-24 h-0.5 bg-emerald-400 mx-auto" />
      </div>
      <div className={compact ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "grid md:grid-cols-2 lg:grid-cols-3 gap-8"}>
        {names.map((name) => (
          <div key={name} className={`text-center border border-gray-200 ${compact ? "p-4 rounded-lg" : "p-6 rounded-xl"}`}>
            <h4 className={`${compact ? "text-base" : "text-lg"} font-bold mb-2`} style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>{name}</h4>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
