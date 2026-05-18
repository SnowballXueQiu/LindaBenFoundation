import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import DonationCTA from "@/components/DonationCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { defaultLocale, isSupportedLocale, withLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const volunteerLinks = [
  "/community-pantry-intake",
  "/join-us",
  "https://forms.gle/buQF6i8S4UCu61Mj8",
  "https://signup.com/group/923356834027",
  "https://drive.google.com/drive/folders/1gi9B5kg8SQLtRtGFGAokoEZgq6Lzeo1l?usp=drive_link",
  "https://docs.google.com/forms/d/e/1FAIpQLSeI70JZPUWARA5Oqe31pQatYf64q2j0OWWmJ0rs3VGxLVM0tw/viewform",
];

export default async function VolunteerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.volunteer;
  const linkLabels = [
    page.signUpHere,
    page.signUpHere,
    page.logHoursHere,
    page.seeMoreHere,
    page.visitSharedFolder,
    page.diaperLogLink,
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <section className="relative pt-20 lg:pt-32 pb-16 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/volunteer/hero.png" alt={page.heroAlt} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center text-white">
          <h1
            className="text-4xl lg:text-6xl font-bold mb-8 leading-tight"
            style={{ fontFamily: "var(--font-merriweather), serif" }}
          >
            {page.title}
          </h1>
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-base lg:text-lg leading-relaxed italic mb-6">
              &ldquo;{page.quote}&rdquo;
            </blockquote>
            <cite className="text-sm lg:text-base font-semibold">- {page.cite}</cite>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="space-y-12">
            {page.sections.map(([title, text], index) => {
              const href = volunteerLinks[index];
              const isExternal = href.startsWith("http");
              const className = "text-lg font-medium underline underline-offset-4 transition-colors duration-200 hover:opacity-70";
              const label = `${linkLabels[index]} -> >>`;

              return (
                <div
                  key={title}
                  className={index === page.sections.length - 1 ? "pb-12" : "pb-12 border-b"}
                  style={{ borderColor: "var(--green-pale)" }}
                >
                  <h3
                    className="text-2xl lg:text-3xl font-bold mb-6"
                    style={{ color: "var(--text-dark)", fontFamily: "var(--font-merriweather), serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-base lg:text-lg leading-relaxed mb-8 max-w-4xl" style={{ color: "var(--text-dark)" }}>
                    {text}
                  </p>
                  <div className="flex justify-end">
                    {isExternal ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={{ color: "var(--text-mid)" }}>
                        {label}
                      </a>
                    ) : (
                      <Link href={withLocale(href, locale)} className={className} style={{ color: "var(--text-mid)" }}>
                        {label}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="py-16" />

      <section className="relative w-full">
        <Image
          src="/volunteer/image.png"
          alt={page.imageAlt}
          width={1920}
          height={600}
          className="w-full h-auto"
          style={{ maxHeight: "600px", objectFit: "cover" }}
        />
      </section>

      <DonationCTA />
      <ContactForm />
      <Footer />
    </div>
  );
}
