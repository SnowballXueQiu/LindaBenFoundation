import Image from "next/image";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
export default function DonationsPage() {
  const donationStats = [
    { number: "$487,140", label: "In Monetary Donations" },
    { number: "$316,498", label: "In Kind Donations" },
    { number: "Over 2400", label: "Hours of Volunteer Time" },
  ];

  const donationCards = [
    {
      image: "/donations/1.png",
      title: "Donate Once or Monthly",
      content: "Create a dependable source of income we greatly appreciate by becoming a monthly donor, and help continue our mission.",
      link: "https://secure.givelively.org/donate/lindaben-foundation-inc"
    },
    {
      image: "/donations/2.png", 
      title: "Provide Hunger-Free Weekends",
      content: "Support Blessings in a Backpack to provide food every Friday to children who may go hungry over the weekend.",
      link: "https://www.lindabenfoundation.org/donate-goods"
    },
    {
      image: "/donations/3.png",
      title: "Give Wishlist Items", 
      content: "Purchase and donate items from our Amazon Wishlist to help our community pantry we provide.",
      link: "https://www.lindabenfoundation.org/donate-goods"
    },
    {
      image: "/donations/4.png",
      title: "Donate Easily Electronically",
      content: "Give hope to individuals and families in need. Thank you for helping us continue our service.",
      link: "https://www.lindabenfoundation.org/donate-goods"
    },
    {
      image: "/donations/5.png",
      title: "Help Individual Fundraising",
      content: "Our peer-to-peer fundraising improves the life of individuals and families we serve.",
      link: "https://www.lindabenfoundation.org/volunteer"
    },
    {
      image: "/donations/6.png",
      title: "Send Cash or Check",
      content: "LindaBen Foundation\n11720 Beltsville Dr., Ste 500-M8\nBeltsville, MD 20705\n\nMake checks payable to:\nLindaBen Foundation, Inc.",
      link: "https://www.lindabenfoundation.org/donate-goods"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-32 pb-16 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/donations/hero.png"
            alt="Donations Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center text-white">
          <h1
            className="text-4xl lg:text-6xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-merriweather), serif" }}
          >
            Donations
          </h1>
        </div>
      </section>

      {/* Section 1 - Ways to Give */}
      <section className="py-16 lg:py-24" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--green-mid)" }}
              >
                Bless Others, Be Blessed
              </p>
              <h2
                className="text-3xl lg:text-4xl font-bold mb-6"
                style={{ 
                  color: "var(--green-deep)",
                  fontFamily: "var(--font-merriweather), serif"
                }}
              >
                Ways to Give
              </h2>
              <div className="space-y-4 mb-8">
                <p className="text-lg leading-relaxed" style={{ color: "var(--text-dark)" }}>
                  Your generosity allows us to improve the conditions of individuals and families we serve and help our mission.
                </p>
                <p className="text-lg leading-relaxed font-semibold" style={{ color: "var(--text-dark)" }}>
                  <strong>Donate Once or Monthly</strong>
                </p>
                <p className="text-lg leading-relaxed" style={{ color: "var(--text-dark)" }}>
                  Create a dependable source of income we greatly appreciate by becoming a monthly donor, and help continue our mission.
                </p>
              </div>
              <a
                href="https://secure.givelively.org/donate/lindaben-foundation-inc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90"
                style={{ background: "var(--green-deep)" }}
              >
                Donate Online →
              </a>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/donations/section1.png"
                  alt="Donation Ways"
                  width={320}
                  height={320}
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Donation Cards */}
      <section className="py-16 lg:py-24" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {donationCards.map((card, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg overflow-hidden shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                style={{ borderColor: "var(--green-pale)" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "var(--green-deep)" }}
                  >
                    {card.title}
                  </h3>
                  <p 
                    className="text-base leading-relaxed mb-6 whitespace-pre-line"
                    style={{ color: "var(--text-mid)" }}
                  >
                    {card.content}
                  </p>
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90"
                    style={{ background: "var(--green-deep)" }}
                  >
                    Learn More & Donate
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - Give In Other Ways */}
      <section className="py-16" style={{ background: "var(--green-pale)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2
            className="text-3xl lg:text-4xl font-bold mb-8"
            style={{ 
              color: "var(--green-deep)",
              fontFamily: "var(--font-merriweather), serif"
            }}
          >
            Give In Other Ways
          </h2>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-dark)" }}>
              <a 
                href="/contact" 
                className="underline hover:opacity-70 transition-opacity"
                style={{ color: "var(--green-deep)" }}
              >
                Contact us
              </a>{" "}
              directly to make donations in kind today and support those in need.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-dark)" }}>
              Text the code <strong>MORETHANFOOD</strong> to (240) 461-9442
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 - Statistics */}
      <section className="py-16 lg:py-24" style={{ background: "var(--green-deep)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {donationStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-4xl lg:text-5xl font-bold mb-4"
                  style={{
                    color: "var(--green-light)",
                    fontFamily: "var(--font-merriweather), serif",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-lg font-medium text-white/80"
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 - 501(c)(3) Status */}
      <section className="py-16 lg:py-24" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--green-mid)" }}
              >
                Giving with Trust
              </p>
              <h2
                className="text-3xl lg:text-4xl font-bold mb-6"
                style={{ 
                  color: "var(--green-deep)",
                  fontFamily: "var(--font-merriweather), serif"
                }}
              >
                Our 501(c)(3) Status
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-dark)" }}>
                LindaBen Foundation is a registered 501(c)(3) nonprofit organization, ensuring that your donations are tax-deductible and used directly to support our mission. Your contributions help us provide essential services and programs to those in need, making a real difference in our community. Trust in our commitment to transparency and impact as we work together to create positive change.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/donations/section5.png"
                  alt="501(c)(3) Status"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}