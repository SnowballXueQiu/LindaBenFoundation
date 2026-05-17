import Image from "next/image";
import Header from "@/components/Header";
import ParallaxBg from "@/components/ParallaxBg";
import DonationCTA from "@/components/DonationCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { partners } from "@/lib/partners";

export default function OurPartnersPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
        <ParallaxBg
          src="/our-partners/hero.png"
          overlay="rgba(28,43,32,0.55)"
          speed={0.15}
          position="center center"
          offset="0px 400px"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h1
            className="text-4xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-merriweather), serif" }}
          >
            Collaborative Partners
          </h1>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 lg:py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p
              className="text-lg lg:text-xl leading-relaxed"
              style={{ color: "var(--text-mid)" }}
            >
              LindaBen Foundation partners with several allies to further its mission and goal.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-full h-28 rounded-lg bg-white p-4 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                title={partner.name}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={96}
                  height={64}
                  loading="eager"
                  className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <DonationCTA />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}