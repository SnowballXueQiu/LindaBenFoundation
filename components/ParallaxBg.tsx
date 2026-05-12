"use client";

import { useEffect, useRef } from "react";

/**
 * A smooth lerp-based parallax background.
 * Wrap inside a `position: relative; overflow: hidden` parent.
 */
export default function ParallaxBg({
  src,
  overlay,
  speed = 0.15,
}: {
  /** URL of the background image */
  src: string;
  /** CSS background for the overlay layer (gradient / solid) */
  overlay?: string;
  /** Parallax strength — 0 = none, 0.15 = subtle, 0.3 = strong */
  speed?: number;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const currentY = useRef(0);
  const targetY = useRef(0);
  const rafId = useRef(0);

  useEffect(() => {
    const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

    const animate = () => {
      currentY.current = lerp(currentY.current, targetY.current, 0.08);
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0,${currentY.current}px,0)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      const el = parentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      if (rect.bottom > 0 && rect.top < wh) {
        const scrolled = wh - rect.top;
        const maxT = rect.height * 0.25;
        const raw = -(scrolled * speed);
        targetY.current = Math.max(-maxT, Math.min(maxT, raw));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [speed]);

  return (
    <div ref={parentRef} className="absolute inset-0 overflow-hidden">
      {/* Oversized image layer for parallax movement room */}
      <div
        ref={bgRef}
        className="absolute left-0 right-0 will-change-transform"
        style={{
          top: "-25%",
          bottom: "-25%",
          backgroundImage: `url('${src}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0" style={{ background: overlay }} />
      )}
    </div>
  );
}
