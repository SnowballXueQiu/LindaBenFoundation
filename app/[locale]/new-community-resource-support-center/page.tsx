import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import DonationCTA from "@/components/DonationCTA";
import ParallaxBg from "@/components/ParallaxBg";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Community Resource Support Center — LindaBen Foundation",
  description:
    "Our innovative Community Resource Support Center addresses food insecurity and social determinants of health through personalized emergency assistance and educational programs.",
};

export default function NewCommunityResourceSupportCenterPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
          <ParallaxBg
            src="/new-community-resource-support-center/hero.png"
            overlay="rgba(28,43,32,0.7)"
            speed={0.15}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h1
              className="text-3xl lg:text-5xl font-bold text-white mb-8 leading-tight"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              New Community Resource Support Center
            </h1>
          </div>
        </section>

        {/* Main Content Section */}
        <section
          className="py-20 lg:py-28"
          style={{ background: "var(--warm-white)" }}
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="space-y-8">
                <div className="space-y-6 text-lg leading-relaxed" style={{ color: "var(--text-mid)" }}>
                  <p>
                    The LindaBen Foundation (TLF) is excited to announce the opening of our new Community Resource Support Center. This innovative program aims to address food insecurity and social determinants of health in underserved communities in Prince George&apos;s County, Howard County and beyond by providing accessible supplemental emergency food and other community-based support.
                  </p>
                  
                  <p>
                    Our new location will serve as a hub where individuals and families can make appointments to receive emergency food assistance tailored to their availability. In addition, our center will offer information on various community resources, events, and workshops designed to empower residents and improve their overall well-being.
                  </p>
                  
                  <p>
                    At the core of our mission is the belief that ending hunger requires more than just providing food; it involves educating and uplifting the community. Our Resource Center will offer access to nutrition education, cooking classes, and health workshops to help residents make healthier food choices and lead more productive lives.
                  </p>
                </div>
              </div>
              
              {/* Image */}
              <div className="relative">
                <Image
                  src="/new-community-resource-support-center/image.png"
                  alt="New Community Resource Support Center"
                  width={600}
                  height={450}
                  className="w-full h-auto rounded-2xl shadow-lg"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
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
              {/* Emergency Food Assistance */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--green-pale)" }}
                  >
                    <Image
                      src="/new-community-resource-support-center/card_icon_1.svg"
                      alt="Emergency Food Assistance"
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
                    Emergency Food Assistance
                  </h3>
                  
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    Scheduled appointments for personalized support.
                  </p>
                </div>
              </div>

              {/* Resource Hub */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--green-pale)" }}
                  >
                    <Image
                      src="/new-community-resource-support-center/card_icon_2.svg"
                      alt="Resource Hub"
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
                    Resource Hub
                  </h3>
                  
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    Access to information on local events, workshops, and community resources.
                  </p>
                </div>
              </div>

              {/* Access to Educational Programs */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--green-pale)" }}
                  >
                    <Image
                      src="/new-community-resource-support-center/card_icon_3.svg"
                      alt="Access to Educational Programs"
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
                    Access to Educational Programs
                  </h3>
                  
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    Nutrition education, gardening opportunities, cooking classes, and health workshops to promote healthy living.
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