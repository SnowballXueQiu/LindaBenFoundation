import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import DonationCTA from "@/components/DonationCTA";
import ParallaxBg from "@/components/ParallaxBg";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Programs — LindaBen Foundation",
  description:
    "Transforming lives through compassionate programs. From food as medicine to youth volunteerism, discover how we're building a brighter future for our community.",
};

export default function ProgramsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
          <ParallaxBg
            src="/programs/hero.png"
            overlay="rgba(28,43,32,0.7)"
            speed={0.15}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-8"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              Our Programs
            </h1>
          </div>
        </section>

        {/* Introduction Section */}
        <section
          className="py-20 lg:py-28"
          style={{
            background: "linear-gradient(135deg, var(--cream) 0%, var(--warm-white) 100%)",
          }}
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <p
              className="text-sm font-semibold tracking-[0.18em] uppercase mb-6"
              style={{ color: "var(--green-mid)" }}
            >
              Acts of Love in Action
            </p>

            <h2
              className="text-3xl lg:text-5xl font-bold mb-8 leading-tight"
              style={{
                color: "var(--green-deep)",
                fontFamily: "var(--font-merriweather), serif",
              }}
            >
              Transforming Lives Through Compassionate Programs
            </h2>

            <p
              className="text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: "var(--text-mid)" }}
            >
              At LindaBen Foundation, our programs are designed to uplift and empower our 
              community. We provide essential services that foster stability, health, and 
              growth for children and families in need. From offering nutritious food and 
              housing support to promoting youth volunteerism and community outreach, our 
              initiatives aim to create lasting, positive change. Together with our partners 
              and volunteers, we are dedicated to building a brighter future for everyone.
            </p>
          </div>
        </section>

        {/* Programs Section */}
        <section
          className="py-20 lg:py-28"
          style={{ background: "var(--warm-white)" }}
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="space-y-16 lg:space-y-20">
              {/* Food as Medicine */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative overflow-hidden rounded-lg shadow-md">
                  <Image
                    src="/programs/1.png"
                    alt="Food as Medicine"
                    width={500}
                    height={350}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                <div className="space-y-6">
                  <h3
                    className="text-3xl lg:text-4xl font-bold"
                    style={{
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-merriweather), serif",
                    }}
                  >
                    Food as Medicine
                  </h3>
                  <p
                    className="text-lg leading-relaxed"
                    style={{ color: "var(--text-mid)" }}
                  >
                    Our Food as Medicine (FAM Rx) program goes beyond simply providing food. It offers nutrition education and intervention, giving people access to fresh, nutritious produce at little to no cost, while empowering them with the knowledge to make healthier choices for lasting well-being.
                  </p>
                  <Link
                    href="/food-as-medicine"
                    className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
                    style={{ background: "var(--green-deep)" }}
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Community Pantry */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative overflow-hidden rounded-lg shadow-md lg:order-2">
                  <Image
                    src="/programs/2.png"
                    alt="Community Pantry"
                    width={500}
                    height={350}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                <div className="space-y-6 lg:order-1">
                  <h3
                    className="text-3xl lg:text-4xl font-bold"
                    style={{
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-merriweather), serif",
                    }}
                  >
                    Community Pantry
                  </h3>
                  <p
                    className="text-lg leading-relaxed"
                    style={{ color: "var(--text-mid)" }}
                  >
                    Our Community Pantry partners with Howard County Schools and Prince George&apos;s County, Maryland to provide hunger relief and healthy access to food for vulnerable families.
                  </p>
                  <Link
                    href="/community-pantry"
                    className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
                    style={{ background: "var(--green-deep)" }}
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Resource Center */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative overflow-hidden rounded-lg shadow-md">
                  <Image
                    src="/programs/3.png"
                    alt="Community Resource Support Center"
                    width={500}
                    height={350}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                <div className="space-y-6">
                  <h3
                    className="text-3xl lg:text-4xl font-bold"
                    style={{
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-merriweather), serif",
                    }}
                  >
                    New Community Resource Support Center
                  </h3>
                  <p
                    className="text-lg leading-relaxed"
                    style={{ color: "var(--text-mid)" }}
                  >
                    Our Youth and Family Stability program offers wrap around services for vulnerable parents and children affected by the loss of jobs and loved ones, eviction, transitional events, major medical illness and other difficult times.
                  </p>
                  <Link
                    href="/new-community-resource-support-center"
                    className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
                    style={{ background: "var(--green-deep)" }}
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Youth Volunteerism */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative overflow-hidden rounded-lg shadow-md lg:order-2">
                  <Image
                    src="/programs/4.png"
                    alt="Youth Volunteerism"
                    width={500}
                    height={350}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                <div className="space-y-6 lg:order-1">
                  <h3
                    className="text-3xl lg:text-4xl font-bold"
                    style={{
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-merriweather), serif",
                    }}
                  >
                    Youth Volunteerism
                  </h3>
                  <p
                    className="text-lg leading-relaxed"
                    style={{ color: "var(--text-mid)" }}
                  >
                    LindaBen Foundation Youth Volunteers have the ability to change the world with missions like ending childhood hunger and homelessness in their school and local communities where they live.
                  </p>
                  <Link
                    href="/youth-volunteerism"
                    className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
                    style={{ background: "var(--green-deep)" }}
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Community Outreach */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative overflow-hidden rounded-lg shadow-md">
                  <Image
                    src="/programs/5.png"
                    alt="Community Outreach"
                    width={500}
                    height={350}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                <div className="space-y-6">
                  <h3
                    className="text-3xl lg:text-4xl font-bold"
                    style={{
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-merriweather), serif",
                    }}
                  >
                    Community Outreach
                  </h3>
                  <p
                    className="text-lg leading-relaxed"
                    style={{ color: "var(--text-mid)" }}
                  >
                    Connect with like-minded Individuals and Community-Based Organizations to share their own stories, insights, resources to provide assistance and inspire others to help and be a part of a solution in ending childhood hunger and childhood homelessness.
                  </p>
                  <Link
                    href="/community-outreach"
                    className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
                    style={{ background: "var(--green-deep)" }}
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Partnerships */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative overflow-hidden rounded-lg shadow-md lg:order-2">
                  <Image
                    src="/programs/6.png"
                    alt="Partnerships"
                    width={500}
                    height={350}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                <div className="space-y-6 lg:order-1">
                  <h3
                    className="text-3xl lg:text-4xl font-bold"
                    style={{
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-merriweather), serif",
                    }}
                  >
                    Partnerships
                  </h3>
                  <p
                    className="text-lg leading-relaxed"
                    style={{ color: "var(--text-mid)" }}
                  >
                    LindaBen Foundation has partnered with programs to provide food, supplies, and services to the vulnerable, for example the Capital Area Food Bank that helps our Community Pantry and Blessings in a Backpack that feeds school children.
                  </p>
                  <Link
                    href="/partnerships-programs"
                    className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
                    style={{ background: "var(--green-deep)" }}
                  >
                    Learn More
                  </Link>
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