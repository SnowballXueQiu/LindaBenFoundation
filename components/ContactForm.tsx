"use client";

import { useState } from "react";
import ParallaxBg from "@/components/ParallaxBg";
import { useI18n } from "@/lib/i18n/client";

export default function ContactForm() {
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { dictionary } = useI18n();
  const copy = dictionary.contactForm;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      fullName: String(formData.get("fullName") || ""),
      phoneNumber: String(formData.get("phoneNumber") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
      smsConsent,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Unable to send message.");
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to send message.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      <ParallaxBg
        src="/get_in_touch/image.png"
        overlay="linear-gradient(180deg, rgba(29,67,50,0.75) 0%, rgba(29,67,50,0.88) 70%, rgba(29,67,50,1) 100%)"
        speed={0.12}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left — info */}
          <div>
            <p
              className="text-sm font-semibold tracking-[0.18em] uppercase mb-4"
              style={{ color: "var(--green-light)" }}
            >
              {copy.eyebrow}
            </p>
            <h2
              className="text-3xl lg:text-4xl font-bold mb-4 leading-snug text-white"
              style={{
                fontFamily: "var(--font-merriweather), serif",
              }}
            >
              {copy.titleLine1}
              <br />
              {copy.titleLine2}
            </h2>
            <p className="text-base mb-10" style={{ color: "var(--green-pale)" }}>
              {copy.description}
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
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--green-light)" }}>{copy.phone}</div>
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
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--green-light)" }}>{copy.email}</div>
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
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--green-light)" }}>{copy.mainOffice}</div>
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
                  {copy.receivedTitle}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-mid)" }}>
                  {copy.receivedText}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold mb-6" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>
                  {copy.formTitle}
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-mid)" }}>
                      {copy.fullName} <span style={{ color: "var(--green-mid)" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
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
                      {copy.phoneNumber}
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
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
                    {copy.email} <span style={{ color: "var(--green-mid)" }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
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
                    {copy.subject}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder={copy.subjectPlaceholder}
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
                    {copy.message} <span style={{ color: "var(--green-mid)" }}>*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder={copy.messagePlaceholder}
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
                    {copy.smsConsent}
                  </span>
                </label>

                {error && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  style={{ background: "var(--green-deep)" }}
                >
                  {submitting ? "Sending..." : copy.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
