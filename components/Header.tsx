"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Our Programs",
    href: "#programs",
    children: [
      { label: "Food as Medicine", href: "#" },
      { label: "Community Pantry", href: "#" },
      { label: "New Community Resource Support Center", href: "#" },
      { label: "Youth Volunteerism", href: "#" },
      { label: "Community Outreach", href: "#" },
      { label: "Partnership Programs", href: "#" },
    ],
  },
  {
    label: "About Us",
    href: "#about",
    children: [{ label: "Our History", href: "#" }],
  },
  {
    label: "Join the Cause",
    href: "#",
    children: [
      { label: "Volunteer Opportunities", href: "#" },
      { label: "Volunteer Resources", href: "#" },
      { label: "Community Pantry Intake", href: "#" },
      { label: "Join Us", href: "#" },
      { label: "Volunteer Hours & Impact Log", href: "#" },
    ],
  },
  {
    label: "Resources",
    href: "#",
    children: [
      { label: "Donations", href: "#donate" },
      { label: "Blog", href: "#blog" },
      { label: "Newsletter", href: "#" },
      { label: "Upcoming Events", href: "#" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Our Partners", href: "#partners" },
      { label: "Financials", href: "#" },
      { label: "Surveys", href: "#" },
    ],
  },
  { label: "Contact", href: "#contact" },
];

function DropdownMenu({
  items,
  isOpen,
}: {
  items: { label: string; href: string }[];
  isOpen: boolean;
}) {
  return (
    <div
      className={`absolute top-full left-0 mt-1 w-64 bg-white shadow-lg border-t-2 rounded-b-md z-50 overflow-hidden transition-all duration-200 ${
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
      style={{ borderTopColor: "var(--green-mid)" }}
    >
      <ul className="py-2">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="block px-5 py-2.5 text-sm text-[--text-dark] hover:bg-[--green-pale] hover:text-[--green-deep] transition-colors duration-150 leading-snug"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpenMenu(label);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-white/95 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/icons/logo.svg"
              alt="LindaBen Foundation"
              width={160}
              height={48}
              className="h-10 lg:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children ? handleMouseEnter(item.label) : undefined
                }
                onMouseLeave={item.children ? handleMouseLeave : undefined}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-medium transition-colors duration-150 ${
                    item.label === "Home"
                      ? "text-[--green-deep]"
                      : "text-[--text-dark] hover:text-[--green-deep]"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${
                        openMenu === item.label ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M2 4l4 4 4-4" />
                    </svg>
                  )}
                </Link>
                {item.children && (
                  <DropdownMenu
                    items={item.children}
                    isOpen={openMenu === item.label}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Social icons */}
            <div className="hidden xl:flex items-center gap-2">
              {[
                {
                  name: "Facebook",
                  path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                },
                {
                  name: "X",
                  path: "M4 4l16 16M20 4L4 20",
                },
                {
                  name: "Instagram",
                  path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01M6.5 3.5h11a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3v-11a3 3 0 0 1 3-3z",
                },
                {
                  name: "YouTube",
                  path: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
                },
              ].map((icon) => (
                <a
                  key={icon.name}
                  href="#"
                  aria-label={icon.name}
                  className="w-7 h-7 flex items-center justify-center rounded-full transition-colors duration-150 hover:bg-[--green-pale]"
                  style={{ color: "var(--text-mid)" }}
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

            <a
              href="#donate"
              className="hidden sm:inline-block px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "var(--green-deep)" }}
            >
              Donate
            </a>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                style={{ color: "var(--green-deep)" }}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden border-t overflow-hidden transition-all duration-300 bg-white ${
          mobileOpen ? "max-h-screen" : "max-h-0"
        }`}
        style={{ borderTopColor: "var(--green-pale)" }}
      >
        <nav className="px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block py-2.5 px-3 rounded font-medium text-sm"
                style={{ color: "var(--text-dark)" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-4 border-l pl-3 mt-1 space-y-1" style={{ borderColor: "var(--green-pale)" }}>
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block py-2 px-2 text-sm rounded"
                      style={{ color: "var(--text-mid)" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3 pb-2">
            <a
              href="#donate"
              className="block text-center py-2.5 rounded-full text-sm font-semibold text-white"
              style={{ background: "var(--green-deep)" }}
              onClick={() => setMobileOpen(false)}
            >
              Donate Now
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
