import Image from "next/image";
import Header from "@/components/Header";
import DonationCTA from "@/components/DonationCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function VolunteerPage() {
  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-32 pb-16 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/volunteer/hero.png"
            alt="Volunteer Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center text-white">
          <h1
            className="text-4xl lg:text-6xl font-bold mb-8 leading-tight"
            style={{ fontFamily: "var(--font-merriweather), serif" }}
          >
            Volunteer and Signup Opportunities
          </h1>
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-base lg:text-lg leading-relaxed italic mb-6">
              &ldquo;What good is it, my brothers and sisters, if someone claims to have faith but has no deeds? Can such faith save them? Suppose a brother or a sister is without clothes and daily food. If one of you says to them, &lsquo;Go in peace; keep warm and well fed,&rsquo; but does nothing about their physical needs, what good is it? In the same way, faith by itself, if it is not accompanied by action, is dead. But someone will say, &lsquo;You have faith; I have deeds.&rsquo; Show me your faith without deeds, and I will show you my faith by my deeds.&rdquo;
            </blockquote>
            <cite className="text-sm lg:text-base font-semibold">– James 2:18</cite>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="space-y-12">
            {/* Community Pantry Intake */}
            <div className="pb-12 border-b" style={{ borderColor: "var(--green-pale)" }}>
              <h3
                className="text-2xl lg:text-3xl font-bold mb-6"
                style={{ color: "var(--text-dark)", fontFamily: "var(--font-merriweather), serif" }}
              >
                Community Pantry Intake
              </h3>
              <p className="text-base lg:text-lg leading-relaxed mb-8 max-w-4xl" style={{ color: "var(--text-dark)" }}>
                We currently have a high need for drivers to pick up food donations and messages for families who are unable to visit our pantry. With unpredictable COVID surges, we try to prepare for worst scenarios. In the past, we relied on municipal police to assist us in the delivery.
              </p>
              <div className="flex justify-end">
                <a
                  href="/community-pantry-intake"
                  className="text-lg font-medium underline underline-offset-4 transition-colors duration-200 hover:opacity-70"
                  style={{ color: "var(--text-mid)" }}
                >
                  Sign Up Here → &gt;&gt;
                </a>
              </div>
            </div>

            {/* Join Us */}
            <div className="pb-12 border-b" style={{ borderColor: "var(--green-pale)" }}>
              <h3
                className="text-2xl lg:text-3xl font-bold mb-6"
                style={{ color: "var(--text-dark)", fontFamily: "var(--font-merriweather), serif" }}
              >
                Join Us
              </h3>
              <p className="text-base lg:text-lg leading-relaxed mb-8 max-w-4xl" style={{ color: "var(--text-dark)" }}>
                LindaBen seeks like-minded individuals to help provide the momentum that effects change in the local community. Our volunteers perform numerous tasks to support our mission. If you can volunteer your time, let us know the ways you can help us and help those in need!
              </p>
              <div className="flex justify-end">
                <a
                  href="/join-us"
                  className="text-lg font-medium underline underline-offset-4 transition-colors duration-200 hover:opacity-70"
                  style={{ color: "var(--text-mid)" }}
                >
                  Sign Up Here → &gt;&gt;
                </a>
              </div>
            </div>

            {/* Volunteer Hours & Time Tracker */}
            <div className="pb-12 border-b" style={{ borderColor: "var(--green-pale)" }}>
              <h3
                className="text-2xl lg:text-3xl font-bold mb-6"
                style={{ color: "var(--text-dark)", fontFamily: "var(--font-merriweather), serif" }}
              >
                Volunteer Hours & Time Tracker
              </h3>
              <p className="text-base lg:text-lg leading-relaxed mb-8 max-w-4xl" style={{ color: "var(--text-dark)" }}>
                Already volunteering or working for us? Do you need to keep track of volunteer time or log your time? We have a convenient online form to help you log your hours of volunteer time. LindaBen will review, approve, and help record your hours towards your credit for you organization or school.
              </p>
              <div className="flex justify-end">
                <a
                  href="https://forms.gle/buQF6i8S4UCu61Mj8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium underline underline-offset-4 transition-colors duration-200 hover:opacity-70"
                  style={{ color: "var(--text-mid)" }}
                >
                  Log Hours Here → &gt;&gt;
                </a>
              </div>
            </div>

            {/* Other Opportunities to Signup! */}
            <div className="pb-12 border-b" style={{ borderColor: "var(--green-pale)" }}>
              <h3
                className="text-2xl lg:text-3xl font-bold mb-6"
                style={{ color: "var(--text-dark)", fontFamily: "var(--font-merriweather), serif" }}
              >
                Other Opportunities to Signup!
              </h3>
              <p className="text-base lg:text-lg leading-relaxed mb-8 max-w-4xl" style={{ color: "var(--text-dark)" }}>
                Join the LindaBen Foundation Volunteer Community!
              </p>
              <div className="flex justify-end">
                <a
                  href="https://signup.com/group/923356834027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium underline underline-offset-4 transition-colors duration-200 hover:opacity-70"
                  style={{ color: "var(--text-mid)" }}
                >
                  See More Here → &gt;&gt;
                </a>
              </div>
            </div>

            {/* Documents For Volunteers */}
            <div className="pb-12 border-b" style={{ borderColor: "var(--green-pale)" }}>
              <h3
                className="text-2xl lg:text-3xl font-bold mb-6"
                style={{ color: "var(--text-dark)", fontFamily: "var(--font-merriweather), serif" }}
              >
                Documents For Volunteers
              </h3>
              <p className="text-base lg:text-lg leading-relaxed mb-8 max-w-4xl" style={{ color: "var(--text-dark)" }}>
                Google sign in required.
              </p>
              <div className="flex justify-end">
                <a
                  href="https://drive.google.com/drive/folders/1gi9B5kg8SQLtRtGFGAokoEZgq6Lzeo1l?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium underline underline-offset-4 transition-colors duration-200 hover:opacity-70"
                  style={{ color: "var(--text-mid)" }}
                >
                  Visit Shared Folder → &gt;&gt;
                </a>
              </div>
            </div>

            {/* Diaper Distribution Log */}
            <div className="pb-12">
              <h3
                className="text-2xl lg:text-3xl font-bold mb-6"
                style={{ color: "var(--text-dark)", fontFamily: "var(--font-merriweather), serif" }}
              >
                Diaper Distribution Log
              </h3>
              <p className="text-base lg:text-lg leading-relaxed mb-8 max-w-4xl" style={{ color: "var(--text-dark)" }}>
                Baby Essentials
              </p>
              <div className="flex justify-end">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeI70JZPUWARA5Oqe31pQatYf64q2j0OWWmJ0rs3VGxLVM0tw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium underline underline-offset-4 transition-colors duration-200 hover:opacity-70"
                  style={{ color: "var(--text-mid)" }}
                >
                  Diaper Distribution Log → &gt;&gt;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="py-16"></div>

      {/* Full Width Image */}
      <section className="relative w-full">
        <Image
          src="/volunteer/image.png"
          alt="Volunteer Community"
          width={1920}
          height={600}
          className="w-full h-auto"
          style={{ maxHeight: "600px", objectFit: "cover" }}
        />
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
