import Image from "next/image";
import Header from "@/components/Header";
import ParallaxBg from "@/components/ParallaxBg";
import DonationCTA from "@/components/DonationCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const surveys = [
  {
    title: "Food as Medicine, Fresh Produce Box Pre Survey",
    buttons: [
      { text: "Take the Survey in English/Spanish", href: "https://docs.google.com/forms/d/e/1FAIpQLSdJqrEOOSod3y3gMkT4GDYliNrTlvTVWqGhvcLgpRp_A3nAGg/viewform" }
    ]
  },
  {
    title: "Food as Medicine, Fresh Produce Box Post Survey",
    buttons: [
      { text: "Take the Survey in English", href: "https://forms.gle/2N3BcXEXwuU8zQgM8" },
      { text: "Take the Survey in Spanish", href: "https://forms.gle/4bcKt6wjyDNjkqGH8" }
    ]
  },
  {
    title: "Eat Well Be Well",
    description: "(Healthier Choices Workshop Post Survey)",
    buttons: [
      { text: "Student Post Workshop Survey", href: "https://docs.google.com/forms/d/e/1FAIpQLSeoCuM_R4bR1YlRAMyKkr35Utg3M5EZOI3y8B-tDxU4XPvr7Q/viewform" }
    ]
  },
  {
    title: "Eat Well Be Well",
    description: "(PE Class, Shake It Up)",
    buttons: [
      { text: "Student Post Workshop Survey", href: "https://docs.google.com/forms/d/e/1FAIpQLSdsJlX93jmCtahl4L4-S7sVtz6IhGjSPgFvrir2ub-sGmHCjg/viewform" }
    ]
  },
  {
    title: "Community Food & Nutrition Security Survey",
    buttons: [
      { text: "Take this survey", href: "https://forms.gle/PXciQrQefCj7bNFX9" }
    ]
  },
  {
    title: "Levitate TLF Surveys",
    description: "(Customer Satisfaction)",
    buttons: [
      { text: "Take this Survey", href: "https://surveys.levitate.ai/#/survey/eyJhbGciOiJIUzUxMiIsImtpZCI6ImQ3MzUwMWI1LTk4MzItNGMyYS04YmMyLTMzMTIxMTdlYWFhMyIsInR5cCI6IkpXVCJ9.eyJhaWQiOiJkMjg1NmNhZS0xZGNkLTQzYzktOWFmMS1lOTMyNmY2YmM2YjgiLCJzdWIiOiI4NGNiNWQyZi1lMzU4LTRlZmQtOWYxMC00MWEzYjIzODk1MGYiLCJuYmYiOjE3MTU3OTcyNjksImV4cCI6MjUzNDAyMzAwODAwLCJpYXQiOjE3MTU3OTcyNjksImlzcyI6Imh0dHBzOi8vYXBpLmxldml0YXRlLmFpLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmxldml0YXRlLmFpLyJ9.TUkPznWDyup2EcPTCXp3Etpdrf0BFRFW-WW24rRm6jTsV97N2_1FBzIC61Jt79er9_O_X9KvZgh2kppFSXOqpg" }
    ]
  }
];

const serviceImages = [
  { name: "CAREAPP", image: "/resources/1.png", url: null },
  { name: "MARYLAND DIAPER BANK", image: "/resources/2.png", url: "https://docs.google.com/forms/d/e/1FAIpQLSeI70JZPUWARA5Oqe31pQatYf64q2j0OWWmJ0rs3VGxLVM0tw/viewform" },
  { name: "findhelp", image: "/resources/3.png", url: "https://www.findhelp.org/" }
];

export default function SurveysPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
        <ParallaxBg
          src="/resources/hero.png"
          overlay="rgba(28,43,32,0.55)"
          speed={0.15}
          position="center center"
          offset="0px 400px"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h1
            className="text-4xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-merriweather), serif" }}
          >
            Help & Resources
          </h1>
        </div>
      </section>

      {/* Section 1: We Need Your Help */}
      <section className="py-16 lg:py-24" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-8">
            <p
              className="text-sm font-semibold tracking-[0.18em] uppercase mb-3"
              style={{ color: "var(--green-mid)" }}
            >
              Support Our Mission
            </p>
            <h2
              className="text-3xl lg:text-4xl font-bold mb-8"
              style={{
                color: "var(--green-deep)",
                fontFamily: "var(--font-merriweather), serif",
              }}
            >
              We Need Your Help
            </h2>
            <div className="space-y-4" style={{ color: "var(--text-mid)" }}>
              <p className="text-lg leading-relaxed">
                LindaBen is committed to helping individuals and families improve the quality of their lives, and in doing so, we offer this list to locate additional community resources for food, housing, supplies, transit, health, money, education, employment, legal, and general care.
              </p>
              <p className="text-lg leading-relaxed">
                If you or someone you know is in crisis, call or text 988 to reach the Suicide and Crisis Lifeline, chat with them online via their website, or text HOME to 741741 (multiple languages available). If you have a critical emergency, please call 911.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Surveys */}
      <section className="py-16 lg:py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <h2
            className="text-3xl lg:text-4xl font-bold text-center mb-12"
            style={{
              color: "var(--green-deep)",
              fontFamily: "var(--font-merriweather), serif",
            }}
          >
            Surveys
          </h2>
          <div className="space-y-8">
            {surveys.map((survey, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow duration-300"
                style={{ borderColor: "var(--green-pale)" }}
              >
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "var(--green-deep)" }}
                >
                  {survey.title}
                </h3>
                {survey.description && (
                  <p
                    className="text-sm mb-4"
                    style={{ color: "var(--text-mid)" }}
                  >
                    {survey.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-3">
                  {survey.buttons.map((button, btnIndex) => (
                    <a
                      key={btnIndex}
                      href={button.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-full font-medium text-white transition-all duration-200 hover:opacity-90"
                      style={{ background: "var(--green-deep)" }}
                    >
                      {button.text}
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Join Our Team */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/resources/image.png)",
            filter: "brightness(0.3)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2
            className="text-3xl lg:text-4xl font-bold text-white mb-8"
            style={{ fontFamily: "var(--font-merriweather), serif" }}
          >
            Join Our Team
          </h2>
          <p className="text-lg leading-relaxed text-white mb-8">
            At LindaBen Foundation, we believe that every helping hand makes a difference. Whether you&rsquo;re looking to volunteer your time or become a part of our dedicated staff, your involvement is crucial in the fight against food insecurity. Together, we can uplift our community and create lasting change. Sign up today to make an impact!
          </p>
          <a
            href="https://fmy.jem.mybluehost.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--green-deep)" }}
          >
            Get Involved
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* Section 4: Services */}
      <section className="py-16 lg:py-24" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <h2
            className="text-3xl lg:text-4xl font-bold text-center mb-12"
            style={{
              color: "var(--green-deep)",
              fontFamily: "var(--font-merriweather), serif",
            }}
          >
            Services for food, health, housing, transit, education, employment, & more.
          </h2>
          
          {/* Service Images */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {serviceImages.map((service, index) => (
              <div key={index} className="text-center">
                {service.url ? (
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity duration-200"
                  >
                    <Image
                      src={service.image}
                      alt={service.name}
                      width={300}
                      height={200}
                      loading="eager"
                      className="h-32 w-auto object-contain mx-auto"
                    />
                  </a>
                ) : (
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={300}
                    height={200}
                    loading="eager"
                    className="h-32 w-auto object-contain mx-auto"
                  />
                )}
                <h3
                  className="text-lg font-semibold mt-4"
                  style={{ color: "var(--green-deep)" }}
                >
                  {service.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Diabetes Resources */}
          <div className="text-center">
            <h3
              className="text-2xl font-bold mb-6"
              style={{
                color: "var(--green-deep)",
                fontFamily: "var(--font-merriweather), serif",
              }}
            >
              Diabetes Awareness Resources
            </h3>
            <div className="space-y-4">
              <div>
                <a
                  href="https://howard.md.networkofcare.org/mh/library/learning-center.aspx?lc=diabetes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold hover:underline transition-colors duration-200"
                  style={{ color: "var(--green-mid)" }}
                >
                  GETTING HEALTHY – DIABETES
                </a>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-mid)" }}
                >
                  (HOWARD CO, MARYLAND)
                </p>
              </div>
              <div>
                <a
                  href="https://www.princegeorgescountymd.gov/3396/Diabetes-Self-Management-Program"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold hover:underline transition-colors duration-200"
                  style={{ color: "var(--green-mid)" }}
                >
                  LIVING WELL DIABETES SELF-MANAGEMENT PROGRAM
                </a>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-mid)" }}
                >
                  (PRINCE GEORGE'S CO, MARYLAND)
                </p>
              </div>
            </div>
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