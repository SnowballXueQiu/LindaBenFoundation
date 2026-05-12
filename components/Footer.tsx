"use client";

import Link from "next/link";

const socialIcons = [
  {
    name: "Facebook",
    href: "#",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    name: "X (Twitter)",
    href: "#",
    path: "M4 4l16 16M20 4L4 20",
  },
  {
    name: "Instagram",
    href: "#",
    path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01M6.5 3.5h11a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3v-11a3 3 0 0 1 3-3z",
  },
  {
    name: "YouTube",
    href: "#",
    path: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
  },
];

const quickLinks = [
  { label: "Our Programs", href: "#programs" },
  { label: "About Us", href: "#about" },
  { label: "Volunteer", href: "#" },
  { label: "Donate", href: "#donate" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const programLinks = [
  { label: "Food as Medicine", href: "#" },
  { label: "Community Pantry", href: "#" },
  { label: "Resource Support Center", href: "#" },
  { label: "Youth Volunteerism", href: "#" },
  { label: "Community Outreach", href: "#" },
  { label: "Partnership Programs", href: "#" },
];

// Placeholder recognition / affiliation badges
const recognitionBadges = [
  { label: "GuideStar", abbr: "GS" },
  { label: "Charity Navigator", abbr: "CN" },
];

const affiliationBadges = [
  { label: "Feeding America", abbr: "FA" },
  { label: "Maryland Nonprofits", abbr: "MN" },
  { label: "USDA SNAP-Ed", abbr: "USDA" },
  { label: "Maryland Food Bank", abbr: "MFB" },
  { label: "United Way", abbr: "UW" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--text-dark)", color: "rgba(255,255,255,0.75)" }}>
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                style={{ background: "var(--green-mid)" }}
              >
                L
              </div>
              <div>
                <div
                  className="font-bold text-base leading-tight text-white"
                  style={{ fontFamily: "var(--font-merriweather), serif" }}
                >
                  LindaBen
                </div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Foundation
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Servants of Those in Need &amp; The Invisible. Serving Maryland
              communities with compassion since our founding.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {socialIcons.map((icon) => (
                <a
                  key={icon.name}
                  href={icon.href}
                  aria-label={icon.name}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "var(--green-mid)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider mb-5 text-white"
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-150 hover:text-white flex items-center gap-1.5"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: "var(--green-mid)" }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-white">
              Our Programs
            </h4>
            <ul className="space-y-2.5">
              {programLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-150 hover:text-white flex items-center gap-1.5"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: "var(--green-mid)" }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-white">
              Our Locations
            </h4>
            <div className="space-y-5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--green-light)" }}>
                  Main Office
                </p>
                <p className="leading-relaxed">
                  10739 Tucker St, Ste 222<br />
                  Beltsville, MD 20705
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--green-light)" }}>
                  Mailing Address
                </p>
                <p className="leading-relaxed">
                  9770 Patuxent Woods Dr, Ste 333<br />
                  Columbia, MD 21046
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--green-light)" }}>
                  Contact
                </p>
                <a
                  href="tel:+12404619442"
                  className="block hover:text-white transition-colors"
                >
                  +1-240-461-9442
                </a>
                <a
                  href="mailto:info@lindabenfoundation.org"
                  className="block hover:text-white transition-colors break-all"
                >
                  info@lindabenfoundation.org
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Recognition & Affiliations */}
        <div
          className="mt-14 pt-10 border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                Recognition
              </p>
              <div className="flex gap-4">
                {recognitionBadges.map((b) => (
                  <div
                    key={b.abbr}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                      style={{ background: "var(--green-mid)" }}
                    >
                      {b.abbr}
                    </div>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                Our Affiliations
              </p>
              <div className="flex flex-wrap gap-3">
                {affiliationBadges.map((b) => (
                  <div
                    key={b.abbr}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ background: "var(--green-deep)", fontSize: "8px" }}
                    >
                      {b.abbr.slice(0, 2)}
                    </div>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          <p>
            &copy; 2026 All Rights Reserved &mdash; LindaBen Foundation
          </p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
