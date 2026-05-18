import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import DonationCTA from "@/components/DonationCTA";
import ParallaxBg from "@/components/ParallaxBg";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Youth Volunteerism — LindaBen Foundation",
  description:
    "Empowering the next generation of change-makers. Join our youth volunteers in fighting childhood hunger and homelessness in local communities.",
};

export default function YouthVolunteerismPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
          <ParallaxBg
            src="/youth-volunteerism/hero.png"
            overlay="rgba(28,43,32,0.7)"
            speed={0.15}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-8"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              Youth Volunteerism
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
                    Empowering the Next Generation
                  </p>
                  
                  <h2
                    className="text-3xl lg:text-4xl font-bold leading-tight"
                    style={{
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-merriweather), serif",
                    }}
                  >
                    Join a Movement of Change-makers
                  </h2>
                  
                  <div className="space-y-6 text-base leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    <p>
                      At the LindaBen Foundation, youth volunteers are on an important mission to make a positive difference by fighting childhood hunger and homelessness in schools and local areas. With more than 30 young volunteers, making up 40% of our team, we aim to greatly reduce the difficulties faced by those in need.
                    </p>
                    
                    <p>
                      Our volunteers are crucial to our summer programs and other activities. We invite you to create lasting solutions that benefit both land and marine environments.
                    </p>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="flex-1">
                    <Link
                      href="/volunteer-hours-impact-log"
                      className="block w-full text-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
                      style={{ background: "var(--green-deep)" }}
                    >
                      Submit Hours
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
                      src="/youth-volunteerism/image.png"
                      alt="Youth Volunteerism"
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

        {/* Services Cards Section */}
        <section
          className="py-20 lg:py-28"
          style={{
            background: "linear-gradient(135deg, var(--cream) 0%, var(--warm-white) 100%)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {/* Make a Difference */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--green-pale)" }}
                  >
                    <Image
                      src="/youth-volunteerism/card_icon_1.svg"
                      alt="Make a Difference"
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
                    Make a Difference
                  </h3>
                  
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    Volunteering offers you the unique opportunity to directly contribute to alleviating hunger and improving community well-being.
                  </p>
                </div>
              </div>

              {/* Build Your Skills */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--green-pale)" }}
                  >
                    <Image
                      src="/youth-volunteerism/card_icon_2.svg"
                      alt="Build Your Skills"
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
                    Build Your Skills
                  </h3>
                  
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    Engage in diverse roles from food rescue to social media advocacy, enhancing your skill set while making meaningful contributions.
                  </p>
                </div>
              </div>

              {/* Create Impactful Connections */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--green-pale)" }}
                  >
                    <Image
                      src="/youth-volunteerism/card_icon_3.svg"
                      alt="Create Impactful Connections"
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
                    Create Impactful Connections
                  </h3>
                  
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    Meet like-minded individuals, weaving a network of people dedicated to fostering growth and advancing communal well-being.
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