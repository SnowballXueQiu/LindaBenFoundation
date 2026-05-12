"use client";

import { useEffect, useRef } from "react";

export default function BibleQuote() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const currentY = useRef(0);
  const targetY = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Smooth lerp animation loop
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      // Ease toward target with lag (0.08 = slow/smooth follow)
      currentY.current = lerp(currentY.current, targetY.current, 0.08);

      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${currentY.current}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      if (rect.bottom > 0 && rect.top < windowH) {
        const scrolled = windowH - rect.top;
        // Set target position — actual position will ease toward this
        // Clamp so background never moves beyond its extra 25% padding
        const sectionH = rect.height;
        const maxTranslate = sectionH * 0.25;
        const raw = -(scrolled * 0.15);
        targetY.current = Math.max(-maxTranslate, Math.min(maxTranslate, raw));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden"
    >
      {/* Parallax background - oversized to allow movement */}
      <div
        ref={bgRef}
        className="absolute left-0 right-0 will-change-transform"
        style={{
          top: "-25%",
          bottom: "-25%",
          backgroundImage: "url('/sayings_bg/image.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(29,67,50,0.7)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        {/* Open quote mark */}
        <div
          className="text-8xl leading-none mb-4 select-none"
          style={{
            color: "var(--green-light)",
            opacity: 0.4,
            fontFamily: "Georgia, serif",
            lineHeight: 1,
          }}
        >
          &ldquo;
        </div>

        <blockquote
          className="text-xl md:text-2xl font-light leading-relaxed text-white mb-8"
          style={{ fontFamily: "var(--font-merriweather), serif" }}
        >
          In everything I did, I showed you that by this kind of hard work we
          must help the weak, remembering the words the Lord Jesus himself said:
          &lsquo;It is more blessed to give than to receive.&rsquo;
        </blockquote>

        <cite
          className="not-italic text-sm font-semibold tracking-widest uppercase"
          style={{ color: "var(--green-light)" }}
        >
          &mdash; Acts 20:35
        </cite>
      </div>
    </section>
  );
}
