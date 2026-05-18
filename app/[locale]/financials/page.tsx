import Image from "next/image";
import Header from "@/components/Header";
import DonationCTA from "@/components/DonationCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function FinancialsPage() {
  const financialReports = [
    {
      year: "FY 2022",
      type: "Form 990",
      url: "https://irp.cdn-website.com/a6dd7f97/files/uploaded/Form990Package-2022.pdf"
    },
    {
      year: "FY 2022", 
      type: "Form 8453",
      url: "https://irp.cdn-website.com/a6dd7f97/files/uploaded/Form8453TESigned-2022.pdf"
    },
    {
      year: "FY 2021",
      type: "Form 990", 
      url: "https://irp.cdn-website.com/a6dd7f97/files/uploaded/2021-lindaben-irs-990.pdf"
    },
    {
      year: "FY 2021",
      type: "Form 8453",
      url: "https://irp.cdn-website.com/a6dd7f97/files/uploaded/2021-lindaben-form8453-eo.pdf"
    },
    {
      year: "FY 2020",
      type: "Form 990",
      url: "https://irp.cdn-website.com/a6dd7f97/files/uploaded/2020-lindaben-irs-990.pdf"
    },
    {
      year: "FY 2020", 
      type: "Form 8453",
      url: "https://irp.cdn-website.com/a6dd7f97/files/uploaded/2020-lindaben-form8453-eo.pdf"
    }
  ];

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
            Financials
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2
                className="text-3xl lg:text-4xl font-bold mb-8"
                style={{
                  color: "var(--green-deep)",
                  fontFamily: "var(--font-merriweather), serif",
                }}
              >
                Download Our Financial Reports
              </h2>
              <div className="space-y-6">
                {financialReports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                    style={{ borderColor: "var(--green-pale)" }}
                  >
                    <div>
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: "var(--green-deep)" }}
                      >
                        {report.year} {report.type}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: "var(--text-mid)" }}
                      >
                        Financial report for fiscal year
                      </p>
                    </div>
                    <a
                      href={report.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-white transition-all duration-200 hover:opacity-90"
                      style={{ background: "var(--green-deep)" }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download PDF
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/financials/image.png"
                  alt="Financial Reports"
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

      {/* Donation CTA */}
      <DonationCTA />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}