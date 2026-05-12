"use client";

import { useState } from "react";

export default function ContactForm() {
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Background image with dark green tint */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/get_in_touch/image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3) saturate(1.2)",
        }}
      />
      {/* Green overlay for brand feel + bottom gradient to fade into footer */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(29,67,50,0.75) 0%, rgba(29,67,50,0.9) 70%, rgba(29,67,50,1) 100%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left — info */}
          <div>
            <p
              className="text-sm font-semibold tracking-[0.18em] uppercase mb-4"
              style={{ color: "var(--green-light)" }}
            >
              Reach Out
            </p>
            <h2
              className="text-3xl lg:text-4xl font-bold mb-4 leading-snug text-white"
              style={{
                fontFamily: "var(--font-merriweather), serif",
              }}
            >
              We Want to
              <br />
              Get In Touch
            </h2>
            <p className="text-base mb-10" style={{ color: "var(--green-pale)" }}>
              Whether you have a question, want to volunteer, or simply want to
              say hello — we&rsquo;d love to hear from you.
            </p>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "var(--green-pale)" }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="var(--green-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--green-light)" }}>Phone</div>
                  <a href="tel:+12404619442" className="text-base font-medium hover:underline text-white">
                    +1-240-461-9442
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "var(--green-pale)" }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="var(--green-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--green-light)" }}>Email</div>
                  <a href="mailto:info@lindabenfoundation.org" className="text-base font-medium hover:underline break-all text-white">
                    info@lindabenfoundation.org
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "var(--green-pale)" }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="var(--green-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--green-light)" }}>Main Office</div>
                  <p className="text-sm leading-relaxed text-white">
                    10739 Tucker St, Ste 222<br />
                    Beltsville, MD 20705
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div
            className="rounded-2xl p-8 lg:p-10 shadow-sm"
            style={{ background: "var(--warm-white)", border: "1px solid var(--green-pale)" }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "var(--green-pale)" }}
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="var(--green-deep)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>
                  Message Received!
                </h3>
                <p className="text-sm" style={{ color: "var(--text-mid)" }}>
                  Thank you for reaching out. We&rsquo;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold mb-6" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>
                  Contact Us!
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-mid)" }}>
                      Full Name <span style={{ color: "var(--green-mid)" }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                      style={{
                        background: "white",
                        border: "1.5px solid var(--green-pale)",
                        color: "var(--text-dark)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--green-mid)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--green-pale)")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-mid)" }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (240) 000-0000"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{
                        background: "white",
                        border: "1.5px solid var(--green-pale)",
                        color: "var(--text-dark)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--green-mid)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--green-pale)")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-mid)" }}>
                    Email <span style={{ color: "var(--green-mid)" }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: "white",
                      border: "1.5px solid var(--green-pale)",
                      color: "var(--text-dark)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--green-mid)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--green-pale)")}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-mid)" }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: "white",
                      border: "1.5px solid var(--green-pale)",
                      color: "var(--text-dark)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--green-mid)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--green-pale)")}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-mid)" }}>
                    Message <span style={{ color: "var(--green-mid)" }}>*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Your message..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                    style={{
                      background: "white",
                      border: "1.5px solid var(--green-pale)",
                      color: "var(--text-dark)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--green-mid)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--green-pale)")}
                  />
                </div>

                {/* SMS consent */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div
                    className="mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors duration-150"
                    style={{
                      border: "2px solid var(--green-mid)",
                      background: smsConsent ? "var(--green-mid)" : "white",
                    }}
                    onClick={() => setSmsConsent(!smsConsent)}
                  >
                    {smsConsent && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={smsConsent}
                    onChange={() => setSmsConsent(!smsConsent)}
                  />
                  <span className="text-xs leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    I agree to receive text messages at the phone number provided.
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  style={{ background: "var(--green-deep)" }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
