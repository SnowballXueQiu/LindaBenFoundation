import Image from "next/image";
import Header from "@/components/Header";
import ParallaxBg from "@/components/ParallaxBg";
import DonationCTA from "@/components/DonationCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { defaultLocale, isSupportedLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const surveyLinks = [
  ["https://docs.google.com/forms/d/e/1FAIpQLSdJqrEOOSod3y3gMkT4GDYliNrTlvTVWqGhvcLgpRp_A3nAGg/viewform"],
  ["https://forms.gle/2N3BcXEXwuU8zQgM8", "https://forms.gle/4bcKt6wjyDNjkqGH8"],
  ["https://docs.google.com/forms/d/e/1FAIpQLSeoCuM_R4bR1YlRAMyKkr35Utg3M5EZOI3y8B-tDxU4XPvr7Q/viewform"],
  ["https://docs.google.com/forms/d/e/1FAIpQLSdsJlX93jmCtahl4L4-S7sVtz6IhGjSPgFvrir2ub-sGmHCjg/viewform"],
  ["https://forms.gle/PXciQrQefCj7bNFX9"],
  ["https://surveys.levitate.ai/#/survey/eyJhbGciOiJIUzUxMiIsImtpZCI6ImQ3MzUwMWI1LTk4MzItNGMyYS04YmMyLTMzMTIxMTdlYWFhMyIsInR5cCI6IkpXVCJ9.eyJhaWQiOiJkMjg1NmNhZS0xZGNkLTQzYzktOWFmMS1lOTMyNmY2YmM2YjgiLCJzdWIiOiI4NGNiNWQyZi1lMzU4LTRlZmQtOWYxMC00MWEzYjIzODk1MGYiLCJuYmYiOjE3MTU3OTcyNjksImV4cCI6MjUzNDAyMzAwODAwLCJpYXQiOjE3MTU3OTcyNjksImlzcyI6Imh0dHBzOi8vYXBpLmxldml0YXRlLmFpLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmxldml0YXRlLmFpLyJ9.TUkPznWDyup2EcPTCXp3Etpdrf0BFRFW-WW24rRm6jTsV97N2_1FBzIC61Jt79er9_O_X9KvZgh2kppFSXOqpg"],
];

const serviceImages = [
  { name: "CAREAPP", image: "/resources/1.png", url: null },
  { name: "MARYLAND DIAPER BANK", image: "/resources/2.png", url: "https://docs.google.com/forms/d/e/1FAIpQLSeI70JZPUWARA5Oqe31pQatYf64q2j0OWWmJ0rs3VGxLVM0tw/viewform" },
  { name: "findhelp", image: "/resources/3.png", url: "https://www.findhelp.org/" },
];

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.resources;

  return (
    <div className="min-h-screen">
      <Header />
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
        <ParallaxBg src="/resources/hero.png" overlay="rgba(28,43,32,0.55)" speed={0.15} position="center center" offset="0px 400px" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white" style={{ fontFamily: "var(--font-merriweather), serif" }}>
            {page.title}
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-mid)" }}>
            {page.intro}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>
            {dictionary.nav.surveys}
          </h2>
          <div className="space-y-8">
            {page.items.map((title, index) => (
              <div key={`survey-${index}`} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow duration-300" style={{ borderColor: "var(--green-pale)" }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--green-deep)" }}>{title}</h3>
                <div className="flex flex-wrap gap-3">
                  {surveyLinks[index].map((href) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full font-medium text-white transition-all duration-200 hover:opacity-90" style={{ background: "var(--green-deep)" }}>
                      {page.surveyButton}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>
            {page.cardsTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {serviceImages.map((service) => {
              const image = <Image src={service.image} alt={service.name} width={300} height={200} loading="eager" className="h-32 w-auto object-contain mx-auto" />;
              return (
                <div key={service.name} className="text-center">
                  {service.url ? (
                    <a href={service.url} target="_blank" rel="noopener noreferrer" className="block hover:opacity-90 transition-opacity duration-200">
                      {image}
                    </a>
                  ) : image}
                  <h3 className="text-lg font-semibold mt-4" style={{ color: "var(--green-deep)" }}>{service.name}</h3>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>
              {page.diabetesTitle}
            </h3>
            <div className="space-y-4">
              {[
                ["GETTING HEALTHY - DIABETES", "https://howard.md.networkofcare.org/mh/library/learning-center.aspx?lc=diabetes"],
                ["LIVING WELL DIABETES SELF-MANAGEMENT PROGRAM", "https://www.princegeorgescountymd.gov/3396/Diabetes-Self-Management-Program"],
              ].map(([label, href]) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="block text-lg font-semibold hover:underline transition-colors duration-200" style={{ color: "var(--green-mid)" }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DonationCTA />
      <ContactForm />
      <Footer />
    </div>
  );
}
