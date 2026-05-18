import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import DonationCTA from "@/components/DonationCTA";
import ParallaxBg from "@/components/ParallaxBg";
import ScrollAnimatedImage from "@/components/ScrollAnimatedImage";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food as Medicine — LindaBen Foundation",
  description:
    "Transform meals into healing moments with our Food as Medicine program. Free nutritious food boxes designed to meet unique nutritional needs.",
};

export default function FoodAsMedicinePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden"
        >
          <ParallaxBg
            src="/food-as-medicine/hero.png"
            overlay="rgba(28,43,32,0.6)"
            speed={0.15}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-8"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              Food as Medicine
            </h1>
          </div>
        </section>

        {/* Section 1: Nourishing Families */}
        <section
          className="py-20 lg:py-28"
          style={{ background: "var(--cream)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left - Content */}
              <div className="order-2 lg:order-1">
                <p
                  className="text-sm font-semibold tracking-[0.18em] uppercase mb-4"
                  style={{ color: "var(--green-mid)" }}
                >
                  Nourishing Families, One Box at a Time
                </p>
                
                <h2
                  className="text-3xl lg:text-4xl font-bold mb-8 leading-snug"
                  style={{
                    color: "var(--green-deep)",
                    fontFamily: "var(--font-merriweather), serif",
                  }}
                >
                  Food as Medicine Produce Box
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3
                      className="text-xl font-bold mb-4"
                      style={{ 
                        color: "var(--green-deep)",
                        fontFamily: "var(--font-merriweather), serif" 
                      }}
                    >
                      What We Curate:
                    </h3>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "var(--text-mid)" }}
                    >
                      Each family receives two boxes filled with fresh fruits, vegetables, eggs, 
                      pantry staples like pasta kits, oils, seasonings, ready-to-eat meals, rice, 
                      beans, and flour. When available, premium meat and fish are also included.
                    </p>
                  </div>

                  <div>
                    <h3
                      className="text-xl font-bold mb-4"
                      style={{ 
                        color: "var(--green-deep)",
                        fontFamily: "var(--font-merriweather), serif" 
                      }}
                    >
                      Customizable to Fit Your Needs:
                    </h3>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "var(--text-mid)" }}
                    >
                      We adapt our offerings based on your budget and capacity. By listening to 
                      your feedback, we create food options that are culturally sensitive and 
                      meet the unique needs of your community.
                    </p>
                  </div>

                  <div>
                    <h3
                      className="text-xl font-bold mb-4"
                      style={{ 
                        color: "var(--green-deep)",
                        fontFamily: "var(--font-merriweather), serif" 
                      }}
                    >
                      Supporting Local Agriculture:
                    </h3>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "var(--text-mid)" }}
                    >
                      We prioritize organic, regionally sourced produce, ensuring high-quality 
                      food while supporting local farmers and promoting sustainability.
                    </p>
                  </div>

                  <div>
                    <h3
                      className="text-xl font-bold mb-4"
                      style={{ 
                        color: "var(--green-deep)",
                        fontFamily: "var(--font-merriweather), serif" 
                      }}
                    >
                      Education Beyond Nutrition:
                    </h3>
                    <p
                      className="text-base leading-relaxed mb-8"
                      style={{ color: "var(--text-mid)" }}
                    >
                      Each box includes a bilingual guide with cooking tips, nutritional 
                      information, and life-skills to encourage healthier lifestyle choices 
                      for students and families.
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/newsletter"
                    className="inline-block px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 text-center"
                    style={{ background: "var(--green-deep)" }}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-block px-7 py-3.5 rounded-full font-semibold transition-all duration-200 hover:opacity-90 text-center border-2"
                    style={{ 
                      color: "var(--green-deep)", 
                      borderColor: "var(--green-deep)" 
                    }}
                  >
                    Contact for Information
                  </Link>
                </div>
              </div>

              {/* Right - Animated Image */}
              <div className="order-1 lg:order-2 flex justify-center">
                <ScrollAnimatedImage
                  src="/food-as-medicine/1.png"
                  alt="Fresh nutritious food boxes"
                  width={320}
                  height={320}
                  animationDelay={0.2}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Eat Well, Feel Better */}
        <section
          className="py-20 lg:py-28"
          style={{ background: "var(--warm-white)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left - Animated Image */}
              <div className="flex justify-center">
                <ScrollAnimatedImage
                  src="/food-as-medicine/2.png"
                  alt="Mobile market and community support"
                  width={320}
                  height={320}
                  animationDelay={0.3}
                />
              </div>

              {/* Right - Content */}
              <div>
                <p
                  className="text-sm font-semibold tracking-[0.18em] uppercase mb-4"
                  style={{ color: "var(--green-mid)" }}
                >
                  Eat Well, Feel Better, Live Fully
                </p>
                
                <h2
                  className="text-3xl lg:text-4xl font-bold mb-6 leading-snug"
                  style={{
                    color: "var(--green-deep)",
                    fontFamily: "var(--font-merriweather), serif",
                  }}
                >
                  Fuel Your Body with Nature&rsquo;s Best
                </h2>

                <p
                  className="text-base lg:text-lg leading-relaxed mb-8"
                  style={{ color: "var(--text-mid)" }}
                >
                  Our Food as Medicine (FAM) Rx Program is designed to transform meals into 
                  healing moments. Tailored to meet unique nutritional needs, this program 
                  ensures every bite counts, helping you feel better and live fully.
                </p>

                <div className="space-y-6 mb-8">
                  <div>
                    <h4
                      className="text-lg font-bold mb-2"
                      style={{ color: "var(--green-deep)" }}
                    >
                      Cost:
                    </h4>
                    <p
                      className="text-base"
                      style={{ color: "var(--text-dark)" }}
                    >
                      Free
                    </p>
                  </div>

                  <div>
                    <h4
                      className="text-lg font-bold mb-2"
                      style={{ color: "var(--green-deep)" }}
                    >
                      Mobile Market Locations:
                    </h4>
                    <p
                      className="text-base"
                      style={{ color: "var(--text-dark)" }}
                    >
                      Bryant Woods, Blue Heron Ln, Columbia, MD
                    </p>
                  </div>

                  <div>
                    <h4
                      className="text-lg font-bold mb-2"
                      style={{ color: "var(--green-deep)" }}
                    >
                      Supported by:
                    </h4>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "var(--text-dark)" }}
                    >
                      Howard County Innovation Grant, MyVeggieVan.org, MikeandMelCruiseIn.com, 
                      St. Francis Fulton, HCPSS, LHIC, and more.
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <Link
                    href="/donations"
                    className="inline-block px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90"
                    style={{ background: "var(--green-deep)" }}
                  >
                    Donate
                  </Link>
                  <a
                    href="https://signup.com/go/QhdcRuv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-all duration-200 hover:opacity-90"
                  >
                    <Image
                      src="/food-as-medicine/signup.png"
                      alt="Sign up for Food as Medicine program"
                      width={120}
                      height={48}
                      className="h-12 w-auto"
                      style={{
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                        mixBlendMode: "multiply"
                      }}
                    />
                  </a>
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
