import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import DonationCTA from "@/components/DonationCTA";
import ParallaxBg from "@/components/ParallaxBg";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partnerships — LindaBen Foundation", 
  description:
    "Building stronger communities through strategic partnerships. Learn about our collaborations with organizations like Capital Area Food Bank and Blessings in a Backpack.",
};

export default function PartnershipsPage() {
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
              Partnerships
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
                    Stronger Together
                  </p>
                  
                  <h2
                    className="text-3xl lg:text-4xl font-bold leading-tight"
                    style={{
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-merriweather), serif",
                    }}
                  >
                    Building Bridges for Better Communities
                  </h2>
                  
                  <div className="space-y-6 text-base leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    <p>
                      LindaBen Foundation has partnered with programs to provide food, supplies, and services to the vulnerable, for example the Capital Area Food Bank that helps our Community Pantry and Blessings in a Backpack that feeds school children.
                    </p>
                    
                    <p>
                      Through strategic partnerships and collaborative efforts, we multiply our impact and extend our reach to serve more families in need throughout Maryland and beyond.
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
                      Donate
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
                  <div className="relative w-full aspect-square max-w-md mx-auto">
                    <Image
                      src="/programs/6.png"
                      alt="Partnerships"
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
              {/* Blessings in a Backpack */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
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
                    Blessings in a Backpack
                  </h3>
                  
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    Providing weekend food programs for elementary school children who may not have access to adequate nutrition over the weekend.
                  </p>
                </div>
              </div>

              {/* Capital Area Food Bank */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--green-pale)" }}
                  >
                    <svg className="w-8 h-8" style={{ color: "var(--green-deep)" }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                    </svg>
                  </div>
                  
                  <h3
                    className="text-xl font-bold"
                    style={{
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-merriweather), serif",
                    }}
                  >
                    Capital Area Food Bank
                  </h3>
                  
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    Supporting our Community Pantry with fresh produce, pantry staples, and nutritious food items for families experiencing food insecurity.
                  </p>
                </div>
              </div>

              {/* Greater Riverdale Cares */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--green-pale)" }}
                  >
                    <svg className="w-8 h-8" style={{ color: "var(--green-deep)" }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"/>
                    </svg>
                  </div>
                  
                  <h3
                    className="text-xl font-bold"
                    style={{
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-merriweather), serif",
                    }}
                  >
                    Greater Riverdale Cares
                  </h3>
                  
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    Collaborating on community outreach initiatives and resource sharing to better serve families in the Greater Riverdale area.
                  </p>
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