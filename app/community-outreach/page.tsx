import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import DonationCTA from "@/components/DonationCTA";
import ParallaxBg from "@/components/ParallaxBg";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Outreach — LindaBen Foundation",
  description:
    "Uniting hands and hearts in service. Join our network of over 30 organizations working together to end childhood hunger and homelessness.",
};

export default function CommunityOutreachPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
          <ParallaxBg
            src="/community-outreach/hero.png"
            overlay="rgba(28,43,32,0.7)"
            speed={0.15}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-8"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              Community Outreach
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
                    Uniting Hands and Hearts in Service
                  </p>
                  
                  <h2
                    className="text-3xl lg:text-4xl font-bold leading-tight"
                    style={{
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-merriweather), serif",
                    }}
                  >
                    Lend Your Voice to a Cause That Echoes Through Communities
                  </h2>
                  
                  <div className="space-y-6 text-base leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    <p>
                      Our partnership with local and nonprofit agencies has been pivotal in our journey, allowing us to join forces with over 30 organizations within our inaugural year. Our common goal is to offer assistance that motivates and encourages the wider community to engage actively in the fight to end childhood hunger and homelessness.
                    </p>
                    
                    <p>
                      We extend an invitation for you to join our cause. Your participation aids us in building a formidable network to offer essential aid to those in dire need.
                    </p>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="flex-1">
                    <Link
                      href="/donations"
                      className="block w-full text-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
                      style={{ background: "var(--green-deep)" }}
                    >
                      Donate Hours
                    </Link>
                  </div>
                  <div className="flex-1">
                    <Link
                      href="/volunteer"
                      className="block w-full text-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
                      style={{ background: "var(--green-mid)" }}
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className="lg:col-span-2">
                <div className="sticky top-32">
                  <Image
                    src="/community-outreach/image.png"
                    alt="Community Outreach"
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