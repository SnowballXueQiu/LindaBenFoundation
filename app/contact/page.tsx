import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import DonationCTA from "@/components/DonationCTA";
import ParallaxBg from "@/components/ParallaxBg";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — LindaBen Foundation",
  description:
    "Get in touch with LindaBen Foundation. We're here to help and listen. Contact us today!",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden"
        >
          <ParallaxBg
            src="/contact/hero.png"
            overlay="rgba(28,43,32,0.6)"
            speed={0.15}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-8"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              Contact Us
            </h1>
          </div>
        </section>

        {/* Main Content Section */}
        <section
          className="py-20 lg:py-28"
          style={{ background: "var(--warm-white)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left Side - Maps */}
              <div className="space-y-8">
                {/* Main Office Map */}
                <div>
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ 
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-merriweather), serif" 
                    }}
                  >
                    Main Office Location
                  </h3>
                  <div className="rounded-xl overflow-hidden shadow-lg" style={{ aspectRatio: "16/9" }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.0756474760854!2d-76.9186868!3d39.0355539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c6b7b7b7b7b7%3A0x1234567890abcdef!2s10739%20Tucker%20St%20%23222%2C%20Beltsville%2C%20MD%2020705!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Main Office Location"
                    />
                  </div>
                  <p className="text-sm mt-2" style={{ color: "var(--text-mid)" }}>
                    10739 Tucker St #222, Beltsville, MD 20705
                  </p>
                </div>

                {/* Other Mailing Address Map */}
                <div>
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ 
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-merriweather), serif" 
                    }}
                  >
                    Other Mailing Address
                  </h3>
                  <div className="rounded-xl overflow-hidden shadow-lg" style={{ aspectRatio: "16/9" }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3095.123456789012!2d-76.8512345!3d39.1634567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c81c6c6c6c6c6c%3A0x9876543210fedcba!2s9770%20Patuxent%20Woods%20Dr%2C%20Columbia%2C%20MD%2021046!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Other Mailing Address"
                    />
                  </div>
                  <p className="text-sm mt-2" style={{ color: "var(--text-mid)" }}>
                    9770 Patuxent Woods Dr, Columbia, MD 21046
                  </p>
                </div>
              </div>

              {/* Right Side - Contact Info */}
              <div>
                <p
                  className="text-sm font-semibold tracking-[0.18em] uppercase mb-4"
                  style={{ color: "var(--green-mid)" }}
                >
                  Reach Out
                </p>
                <h2
                  className="text-3xl lg:text-4xl font-bold mb-6 leading-snug"
                  style={{
                    color: "var(--green-deep)",
                    fontFamily: "var(--font-merriweather), serif",
                  }}
                >
                  We&rsquo;re here to help & listen. Get in touch today!
                </h2>

                <div className="space-y-8 mb-10">
                  {/* Phone Number */}
                  <div>
                    <h4
                      className="text-lg font-bold mb-2"
                      style={{ color: "var(--green-deep)" }}
                    >
                      Phone Number:
                    </h4>
                    <a
                      href="tel:+12404619442"
                      className="text-lg font-medium hover:underline"
                      style={{ color: "var(--text-dark)" }}
                    >
                      +1-240-461-9442
                    </a>
                  </div>

                  {/* Email Address */}
                  <div>
                    <h4
                      className="text-lg font-bold mb-2"
                      style={{ color: "var(--green-deep)" }}
                    >
                      Email Address:
                    </h4>
                    <a
                      href="mailto:info@lindabenfoundation.org"
                      className="text-lg font-medium hover:underline break-all"
                      style={{ color: "var(--text-dark)" }}
                    >
                      info@lindabenfoundation.org
                    </a>
                  </div>

                  {/* Main Office Address */}
                  <div>
                    <h4
                      className="text-lg font-bold mb-2"
                      style={{ color: "var(--green-deep)" }}
                    >
                      Main Office Address:
                    </h4>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "var(--text-dark)" }}
                    >
                      10739 Tucker St, Ste 222, Beltsville, MD 20705
                    </p>
                  </div>

                  {/* Other Mailing Address */}
                  <div>
                    <h4
                      className="text-lg font-bold mb-2"
                      style={{ color: "var(--green-deep)" }}
                    >
                      Other Mailing Address:
                    </h4>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "var(--text-dark)" }}
                    >
                      9770 Patuxent Woods Dr, Ste 333, Columbia, MD 21046
                    </p>
                  </div>
                </div>

                {/* Connect With Us */}
                <div className="mb-8">
                  <h4
                    className="text-lg font-bold mb-4"
                    style={{ color: "var(--green-deep)" }}
                  >
                    Connect With Us:
                  </h4>
                  <div className="flex items-center gap-4">
                    {[
                      {
                        name: "Facebook",
                        href: "https://facebook.com/LindabenFoundation",
                        path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                      },
                      {
                        name: "X",
                        href: "https://twitter.com/lindabenfoundationinc/",
                        path: "M4 4l16 16M20 4L4 20",
                      },
                      {
                        name: "Instagram",
                        href: "https://www.instagram.com/lindabenfoundationinc/",
                        path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01M6.5 3.5h11a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3v-11a3 3 0 0 1 3-3z",
                      },
                      {
                        name: "YouTube",
                        href: "https://www.youtube.com/channel/UCe_VwbY0U_0pRo-NH9eSLyQ",
                        path: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
                      },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-150 hover:bg-opacity-80"
                        style={{ background: "var(--green-deep)" }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d={social.path} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Make an Appointment Button */}
                <a
                  href="https://meeting.levitate.ai/#/095fd9-8h1a0r/LindaBen-Family-Resource-Support-Center--Appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: "var(--green-deep)" }}
                >
                  Make an Appointment
                </a>
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