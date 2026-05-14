import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import DonationCTA from "@/components/DonationCTA";
import CardFlipCarousel from "@/components/CardFlipCarousel";
import ParallaxBg from "@/components/ParallaxBg";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — LindaBen Foundation",
  description:
    "Learn about LindaBen Foundation's mission to be a channel of safe haven for the homeless, at-risk population & underserved community.",
};

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden"
        >
          <ParallaxBg
            src="/about_us/hero.png"
            overlay="rgba(28,43,32,0.55)"
            speed={0.15}
            offset="0px 200px"
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-8"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              About Us
            </h1>
            <p
              className="text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: "var(--green-pale)" }}
            >
              Lindaben foundation provides Child and Family Stability Services and 
              Affordable Housing Support for local communities and our partnered school&rsquo;s 
              families-in-transition (Homeless and At-Risk). We provide &lsquo;sustainable&rsquo; healthy 
              access to food, wrap around services such as housing support and pathways towards 
              self-sufficiency programs. We operate well through our outreach activities and 
              ongoing collaboration with our strategic community partners to achieve the greatest 
              impact and increasing the quality of life of the child and families we serve. The 
              foundation employs like-minded members and volunteers to provide the momentum that 
              helps us affect change in our community. We take our convictions and turn them into action.
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section
          className="py-20 lg:py-28"
          style={{ background: "var(--cream)" }}
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Our Mission */}
              <div>
                <h2
                  className="text-3xl lg:text-4xl font-bold mb-6 leading-snug"
                  style={{
                    color: "var(--green-deep)",
                    fontFamily: "var(--font-merriweather), serif",
                  }}
                >
                  Our Mission
                </h2>
                <p
                  className="text-base lg:text-lg leading-relaxed"
                  style={{ color: "var(--text-mid)" }}
                >
                  To be a channel of safe haven for the homeless, at-risk population & 
                  underserved community by uplifting their conditions and providing wrap 
                  around services founded in love and friendship.
                </p>
              </div>

              {/* Our Vision */}
              <div>
                <h2
                  className="text-3xl lg:text-4xl font-bold mb-6 leading-snug"
                  style={{
                    color: "var(--green-deep)",
                    fontFamily: "var(--font-merriweather), serif",
                  }}
                >
                  Our Vision
                </h2>
                <p
                  className="text-base lg:text-lg leading-relaxed"
                  style={{ color: "var(--text-mid)" }}
                >
                  To empower those in need and invisible by providing means to improve 
                  their quality of life in a community where they feel worthy, safe and accepted.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Journey of Compassion Section */}
        <section
          className="py-20 lg:py-28"
          style={{ background: "var(--warm-white)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Text side */}
              <div>
                <p
                  className="text-sm font-semibold tracking-[0.18em] uppercase mb-4"
                  style={{ color: "var(--green-mid)" }}
                >
                  Journey of Compassion
                </p>
                <h2
                  className="text-3xl lg:text-4xl font-bold mb-6 leading-snug"
                  style={{
                    color: "var(--green-deep)",
                    fontFamily: "var(--font-merriweather), serif",
                  }}
                >
                  Our History
                </h2>
                <p
                  className="text-base leading-relaxed mb-8"
                  style={{ color: "var(--text-mid)" }}
                >
                  LindaBen Foundation was created in memory and honor of Anna S. Beavan&rsquo;s 
                  parents Linda Santos (1945 – 1997) and Ben Dimatangal (1950 -2019) and 
                  for those people who died homeless or those who suffered in poverty, severe 
                  depression, mental health illness as well as drug and alcohol addiction. 
                  Linda and Ben were both funny and generous people who loved ballroom dancing 
                  and were always longing to be loved. In their honor, the foundation began its 
                  journey to uplift and save discarded lives whom suffer a similar fate just 
                  like her parents.
                </p>
                <a
                  href="/our-history"
                  className="inline-block px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90"
                  style={{ background: "var(--green-deep)" }}
                >
                  See The Full Story
                </a>
              </div>

              {/* Image side */}
              <div className="relative">
                <div
                  className="absolute -top-4 -right-4 w-full h-full rounded-2xl"
                  style={{ background: "var(--green-pale)" }}
                />
                <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src="/our_history/hero.png"
                    alt="LindaBen Foundation history"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Servant Leaders Section */}
        <section
          className="py-20 lg:py-28"
          style={{ background: "var(--cream)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image carousel side */}
              <CardFlipCarousel />

              {/* Text side */}
              <div>
                <p
                  className="text-sm font-semibold tracking-[0.18em] uppercase mb-4"
                  style={{ color: "var(--green-mid)" }}
                >
                  Servant Leaders
                </p>
                <h2
                  className="text-3xl lg:text-4xl font-bold mb-6 leading-snug"
                  style={{
                    color: "var(--green-deep)",
                    fontFamily: "var(--font-merriweather), serif",
                  }}
                >
                  Leadership
                </h2>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: "var(--text-mid)" }}
                >
                  Successful leadership begins with a sincere desire to sincerely serve 
                  for the benefit of others and be stewards of the cause.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--text-mid)" }}
                >
                  Our Board members and volunteers play crucial roles in improving the 
                  lives of those in need and carrying forth our mission, and subscribe 
                  to that stewardship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our People Section */}
        <section
          className="py-20 lg:py-28 relative"
          style={{ background: "var(--warm-white)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <p
                className="text-sm font-semibold tracking-[0.18em] uppercase mb-4"
                style={{ color: "var(--green-mid)" }}
              >
                Stewards of Hope
              </p>
              <h2
                className="text-3xl lg:text-4xl font-bold mb-8 leading-snug"
                style={{
                  color: "var(--green-deep)",
                  fontFamily: "var(--font-merriweather), serif",
                }}
              >
                Our People
              </h2>
            </div>

            {/* Board of Directors */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h3
                  className="text-2xl lg:text-3xl font-bold mb-4"
                  style={{ 
                    color: "var(--green-deep)",
                    fontFamily: "var(--font-merriweather), serif" 
                  }}
                >
                  Board of Directors
                </h3>
                <div className="w-24 h-0.5 bg-amber-400 mx-auto"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { name: "Anna S. Beavan", title: "Founder/ Board Chair /Executive Director" },
                  { name: "James Beavan III", title: "Vice-Chair for Internal Affair Chief Finance Officer" },
                  { name: "Keith Hinds", title: "Board of Director" },
                  { name: "Ana Cortes", title: "Board of Director" },
                  { name: "Sister Carmen Sotto, CCV", title: "Board of Director" },
                  { name: "Brenda Castellano", title: "Co-Founder Vice-Chair for External Affairs" },
                  { name: "Janice Irizarry", title: "Board of Director – Secretary/External Affairs" },
                  { name: "Noralyn Talavera", title: "Vice-Chair for External Affairs, Donor Management & Public Relations" },
                  { name: "Jeannette Mendy", title: "Board of Director- Internal Affairs Director of Community Pantry" },
                  { name: "Kerry Jones", title: "Board of Director- External Affairs" },
                  { name: "Beth Manrique", title: "Board of Director -Governance and People" }
                ].map((person, index) => (
                  <div key={index} className="text-center p-6 border border-gray-200 rounded-xl">
                    <h4 
                      className="font-bold text-lg mb-2" 
                      style={{ 
                        color: "var(--green-deep)",
                        fontFamily: "var(--font-merriweather), serif" 
                      }}
                    >
                      {person.name}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                      {person.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Operations Team */}
            <div>
              <div className="text-center mb-12">
                <h3
                  className="text-2xl lg:text-3xl font-bold mb-4"
                  style={{ 
                    color: "var(--green-deep)",
                    fontFamily: "var(--font-merriweather), serif" 
                  }}
                >
                  Our Operations Team
                </h3>
                <div className="w-24 h-0.5 bg-emerald-400 mx-auto"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                  { name: "Anna Beavan", title: "Executive Director" },
                  { name: "James Beavan III", title: "CFO" },
                  { name: "Harvey Li", title: "Web App AI Intern (Lead)" },
                  { name: "James Beavan IV", title: "Web App AI Intern" },
                  { name: "Ken Coleman", title: "Food as Medicine (Rx) Delivery Manager" },
                  { name: "Abdul Rahim", title: "Food as Medicine (Rx) Packing Manager" },
                  { name: "Jennette Mendy", title: "Food Rescue Manager/Volunteer Coordinator/ TEFAP Inventory Manager" },
                  { name: "Pastor Willie Walker", title: "Food Rescue Specialist" },
                  { name: "Randel Robinson", title: "Food Rescue Team" },
                  { name: "Johanes / Jordan / Jackie", title: "Food Rescue Team" },
                  { name: "Petal Sampson", title: "Family Essentials Manager/Volunteer Coordinator/ Tuesday Team Lead" },
                  { name: "Mary Payton", title: "Intake Manager/Volunteer Coordinator/ Wed & Sat Team Lead" },
                  { name: "Yahzee Carino", title: "Volunteer Coordinator/ Intake Specialist/ Wednesday Team Lead" },
                  { name: "Jose Ramirez", title: "Community Pantry Team Lead" },
                  { name: "Cindy Dookhantee", title: "Community Pantry Team Lead" },
                  { name: "Lisette Martinez", title: "Food as Medicine (Rx) Delivery and Packing Team" },
                  { name: "Iczel Herrera Perea", title: "Food as Medicine (Rx) Packing Team Lead" },
                  { name: "Heidi Morales", title: "Food as Medicine (Rx) Packing Team Lead / TEFAP Team Lead" },
                  { name: "Margarita Rosas Crespo", title: "Food as Medicine (Rx) Packing Team" },
                  { name: "Maria Contreras", title: "Food as Medicine (Rx) Packing Team" },
                  { name: "Juan Morales", title: "Food as Medicine (Rx) Packing Team" },
                  { name: "Ivie Ebhojiaye", title: "Food as Medicine (Rx) Packing Team" },
                  { name: "Kevin Oliver", title: "Food as Medicine (Rx) Delivery Team" },
                  { name: "Yeti", title: "Community Pantry Team" },
                  { name: "Elder Sheila Tinker", title: "Community Pantry Team" },
                  { name: "Olivia De Jesus", title: "Community Pantry Team/ Rx Outreach specialist" }
                ].map((person, index) => (
                  <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                    <h4 
                      className="font-bold text-base mb-1" 
                      style={{ 
                        color: "var(--green-deep)",
                        fontFamily: "var(--font-merriweather), serif" 
                      }}
                    >
                      {person.name}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-mid)" }}>
                      {person.title}
                    </p>
                  </div>
                ))}
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