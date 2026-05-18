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
  const page = dictionary.pages.communityPantry;

  return {
    title: `${page.title} — LindaBen Foundation`,
    description: page.metaDescription,
    alternates: { canonical: `/${locale}/community-pantry`, languages: getAlternates("/community-pantry") },
  };
}

export default async function CommunityPantryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.communityPantry;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
          <ParallaxBg
            src="/community-pantry/hero.png"
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
                    
                    <div className="bg-white rounded-xl p-6 border-l-4" style={{ borderColor: "var(--green-mid)" }}>
                      <p className="font-semibold text-lg mb-3" style={{ color: "var(--green-deep)" }}>
                        {page.impactTitle}
                      </p>
                      <p>
                        {page.impactText}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Locations */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>
                    {page.locationsTitle}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <h4 className="font-bold text-lg mb-3" style={{ color: "var(--green-deep)" }}>
                        {page.location1Title}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <Link 
                          href="https://maps.app.goo.gl/tgsaZq7Epn5Lma2E8"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block font-medium hover:underline"
                          style={{ color: "var(--green-deep)" }}
                        >
                          📍 {page.location1Address}
                        </Link>
                        <div className="space-y-1" style={{ color: "var(--text-mid)" }}>
                          {page.location1Times.map((time) => <p key={time}>• {time}</p>)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <h4 className="font-bold text-lg mb-3" style={{ color: "var(--green-deep)" }}>
                        {page.location2Title}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <Link 
                          href="https://maps.app.goo.gl/vk7ZQ6i5U1yi2TQm6"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block font-medium hover:underline"
                          style={{ color: "var(--green-deep)" }}
                        >
                          📍 {page.location2Address}
                        </Link>
                        <div className="space-y-1" style={{ color: "var(--text-mid)" }}>
                          {page.location2Times.map((time) => <p key={time}>• {time}</p>)}
                          <p className="text-xs italic">({page.scheduleNote})</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Partners */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-base mb-3" style={{ color: "var(--green-deep)" }}>
                    {page.supportedBy}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    {page.supporters}
                  </p>
                </div>
                
                {/* Contact Info */}
                <div className="text-sm">
                  <p style={{ color: "var(--text-mid)" }}>
                    {page.contactStart}{" "}
                    <Link 
                      href="mailto:info@lindabenfoundation.org"
                      className="font-medium hover:underline"
                      style={{ color: "var(--green-deep)" }}
                    >
                      info@lindabenfoundation.org
                    </Link>{" "}
                    {page.contactEnd}
                  </p>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="flex-1">
                    <Link
                      href="https://irp.cdn-website.com/a6dd7f97/files/uploaded/TLF_Food_Distribution_Schedule_2025_Calendar.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
                      style={{ background: "var(--green-deep)" }}
                    >
                      {page.foodDistribution}
                    </Link>
                    <p className="text-xs text-center mt-2" style={{ color: "var(--text-mid)" }}>
                      *{page.clickSchedule}*
                    </p>
                  </div>
                  <div className="flex-1">
                    <Link
                      href="https://signup.com/mobileweb/2.0/vspot.html?activitykey=961601806038#choose_event_page"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
                      style={{ background: "var(--green-mid)" }}
                    >
                      {page.signUpVolunteer}
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className="lg:col-span-2">
                <div className="sticky top-32">
                  <Image
                    src="/community-pantry/image.png"
                    alt={page.imageAlt}
                    width={500}
                    height={600}
                    className="w-full h-auto rounded-2xl shadow-xl"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
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
                      src={`/community-pantry/card_icon_${index + 1}.svg`}
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
                  
                  <div className="space-y-4 text-sm" style={{ color: "var(--text-mid)" }}>
                    <div>
                      <p className="font-semibold">LindaBen Community Food Hub</p>
                      <Link 
                        href="https://maps.app.goo.gl/tgsaZq7Epn5Lma2E8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        style={{ color: "var(--green-deep)" }}
                      >
                        {page.location1Address}
                      </Link>
                      {page.location1Times.map((time) => <p key={time}>{time}</p>)}
                    </div>
                    
                    <div>
                      <p className="font-semibold">Saint Bernard Catholic Church</p>
                      <Link 
                        href="https://maps.app.goo.gl/vk7ZQ6i5U1yi2TQm6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        style={{ color: "var(--green-deep)" }}
                      >
                        {page.location2Address}
                      </Link>
                      {page.location2Times.map((time) => <p key={time}>{time}</p>)}
                    </div>
                    
                    <p>
                      <Link href={withLocale("/contact", locale)} className="hover:underline" style={{ color: "var(--green-deep)" }}>{page.contactUs}</Link> {page.assistance}
                    </p>
                    
                    <p className="text-xs italic">
                      {index === 2 ? page.healthSchedule : text}
                    </p>
                  </div>
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
