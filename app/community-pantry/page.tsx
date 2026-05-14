import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import DonationCTA from "@/components/DonationCTA";
import ParallaxBg from "@/components/ParallaxBg";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Pantry — LindaBen Foundation",
  description:
    "Addressing hunger head-on through our Community Pantry program. Serving over 850 households monthly with fresh food and essential resources.",
};

export default function CommunityPantryPage() {
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
              Community Pantry
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
                    Addressing Hunger Head-On
                  </p>
                  
                  <h2
                    className="text-3xl lg:text-4xl font-bold leading-tight"
                    style={{
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-merriweather), serif",
                    }}
                  >
                    Nourishing Our Community
                  </h2>
                  
                  <div className="space-y-6 text-base leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    <p>
                      In the United States, hunger remains a pressing concern, with approximately one in six children at risk due to the economic impact of recent global events, including the coronavirus pandemic. It is reported by Feeding America that 84% of households are purchasing less expensive, often less nutritious food to stretch their budgets further.
                    </p>
                    
                    <p>
                      At LindaBen Foundation, we respond to these challenges through direct intervention and support methodologies that are linked to community resources.
                    </p>
                    
                    <div className="bg-white rounded-xl p-6 border-l-4" style={{ borderColor: "var(--green-mid)" }}>
                      <p className="font-semibold text-lg mb-3" style={{ color: "var(--green-deep)" }}>
                        Our Impact
                      </p>
                      <p>
                        With the partnership of the Capital Area Food Bank, Whole Foods, Costco, Amazon, Passion & Compassion and public-school systems in Howard and Prince George&apos;s County, Maryland, our community pantries proudly serve an average of <strong>30,000 lbs of food monthly</strong>. This effort translates to supporting over <strong>850 households</strong> and feeding around <strong>3,000 individuals</strong> every month.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Locations */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>
                    Our Service Locations
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <h4 className="font-bold text-lg mb-3" style={{ color: "var(--green-deep)" }}>
                        Location #1: LindaBen Community Food Hub
                      </h4>
                      <div className="space-y-2 text-sm">
                        <Link 
                          href="https://maps.app.goo.gl/tgsaZq7Epn5Lma2E8"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block font-medium hover:underline"
                          style={{ color: "var(--green-deep)" }}
                        >
                          📍 10739 Tucker St, ste 222, Beltsville, MD 20705
                        </Link>
                        <div className="space-y-1" style={{ color: "var(--text-mid)" }}>
                          <p>• Tuesday: 4:30pm - 6:00pm</p>
                          <p>• Wednesday: 4:30pm - 6:00pm</p>
                          <p>• Saturday: 10:00am - 11:30am</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <h4 className="font-bold text-lg mb-3" style={{ color: "var(--green-deep)" }}>
                        Location #2: Saint Bernard Catholic Church
                      </h4>
                      <div className="space-y-2 text-sm">
                        <Link 
                          href="https://maps.app.goo.gl/vk7ZQ6i5U1yi2TQm6"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block font-medium hover:underline"
                          style={{ color: "var(--green-deep)" }}
                        >
                          📍 5700 St Bernard Dr, Riverdale, MD 20737
                        </Link>
                        <div className="space-y-1" style={{ color: "var(--text-mid)" }}>
                          <p>• Tuesday: 11:00am - 1:00pm</p>
                          <p className="text-xs italic">(See 2025 Food Distribution Schedule below for details)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Partners */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-base mb-3" style={{ color: "var(--green-deep)" }}>
                    Supported By:
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    Capital Area Food Bank, Maryland Diaper Bank, MD State Community Development, Prince Georges Health Department, Celestial Manna, FDC, Central Union Mission, Amazon Local Good, UMD Ext SNAP Ed
                  </p>
                </div>
                
                {/* Contact Info */}
                <div className="text-sm">
                  <p style={{ color: "var(--text-mid)" }}>
                    For other community resources need in your area, contact us at{" "}
                    <Link 
                      href="mailto:info@lindabenfoundation.org"
                      className="font-medium hover:underline"
                      style={{ color: "var(--green-deep)" }}
                    >
                      info@lindabenfoundation.org
                    </Link>{" "}
                    for accommodations
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
                      Food Distribution 2025
                    </Link>
                    <p className="text-xs text-center mt-2" style={{ color: "var(--text-mid)" }}>
                      *Click Here for Schedule*
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
                      Sign Up to Volunteer
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className="lg:col-span-2">
                <div className="sticky top-32">
                  <Image
                    src="/community-pantry/image.png"
                    alt="Community Pantry"
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
              {/* Food Distribution Schedule */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--green-pale)" }}
                  >
                    <Image
                      src="/community-pantry/card_icon_1.svg"
                      alt="Food Distribution Schedule"
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
                    Food Distribution Schedule
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
                        10739 Tucker St, ste 222, Beltsville, MD 20705
                      </Link>
                      <p>Tuesday: 4:30pm - 6pm</p>
                      <p>Wednesday: 4:30pm - 6pm</p>
                      <p>Saturdays: 10:00am - 11:30am</p>
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
                        5700 St Bernard Dr, Riverdale, MD 20737
                      </Link>
                      <p>Tuesdays: 11am - 1pm</p>
                    </div>
                    
                    <p>
                      <Link href="/contact" className="hover:underline" style={{ color: "var(--green-deep)" }}>Contact us</Link> for assistance or further details.
                    </p>
                    
                    <p className="text-xs italic">
                      Offering hunger-relief with dignity, the Community Pantry welcomes vulnerable families every Tuesday for food support
                    </p>
                  </div>
                </div>
              </div>

              {/* Diaper Distribution */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--green-pale)" }}
                  >
                    <Image
                      src="/community-pantry/card_icon_2.svg"
                      alt="Diaper Distribution"
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
                    Diaper Distribution
                  </h3>
                  
                  <div className="space-y-4 text-sm" style={{ color: "var(--text-mid)" }}>
                    <div>
                      <Link 
                        href="https://maps.app.goo.gl/tgsaZq7Epn5Lma2E8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline"
                        style={{ color: "var(--green-deep)" }}
                      >
                        10739 Tucker St, ste 222, Beltsville, MD 20705
                      </Link>
                      <p>Tuesdays: 5pm - 6pm</p>
                      <p>Wednesdays: 4:30pm - 6pm</p>
                    </div>
                    
                    <p>
                      <Link href="/contact" className="hover:underline" style={{ color: "var(--green-deep)" }}>Contact us</Link> for assistance or further details.
                    </p>
                    
                    <p className="text-xs italic">
                      We ensure infants and toddlers have the essentials.
                    </p>
                  </div>
                </div>
              </div>

              {/* Community Health Partners */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--green-pale)" }}
                  >
                    <Image
                      src="/community-pantry/card_icon_3.svg"
                      alt="Community Health Partners"
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
                    Community Health Partners
                  </h3>
                  
                  <div className="space-y-4 text-sm" style={{ color: "var(--text-mid)" }}>
                    <p>Every Tuesdays and Wednesdays using offsite & onsite.</p>
                    
                    <p>
                      <Link href="/contact" className="hover:underline" style={{ color: "var(--green-deep)" }}>Contact us</Link> for assistance or further details.
                    </p>
                    
                    <p className="text-xs italic">
                      Committed to whole-person care, we collaborate with health partners for complementary support during alternate pantry sessions.
                    </p>
                  </div>
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