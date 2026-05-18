import Header from "@/components/Header";
import DonationCTA from "@/components/DonationCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function JoinUsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-32 pb-16 lg:pb-20" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <h1
            className="text-4xl lg:text-6xl font-bold leading-tight"
            style={{
              color: "var(--green-deep)",
              fontFamily: "var(--font-merriweather), serif",
            }}
          >
            Join Us
          </h1>
        </div>
      </section>

      {/* Main Content - Google Form */}
      <section className="py-16" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdLX72Q4miud_B0vhDekhNzAp02f3bQlLeivW-ZlADw0uR4AA/viewform?embedded=true"
              width="100%"
              height="3018"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Join Us Form"
            >
              Loading&hellip;
            </iframe>
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