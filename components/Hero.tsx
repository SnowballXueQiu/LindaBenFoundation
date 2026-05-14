"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    src: "/carousel/1.png",
    alt: "Volunteers distributing food to families in need",
  },
  {
    id: 2,
    src: "/carousel/2.png",
    alt: "Fresh produce at community pantry",
  },
  {
    id: 3,
    src: "/carousel/3.png",
    alt: "Children enjoying nutritious meals",
  },
  {
    id: 4,
    src: "/carousel/4.png",
    alt: "Community outreach and support",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-150 overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(29,67,50,0.82) 0%, rgba(29,67,50,0.55) 55%, rgba(29,67,50,0.25) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-2xl">
            <p
              className="text-sm font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--green-light)" }}
            >
              Maryland&rsquo;s Community Foundation
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-5 text-white"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              The LindaBen
              <br />
              Foundation
            </h1>
            <p
              className="text-lg md:text-xl font-light mb-10 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.88)" }}
            >
              Servants of Those in Need &amp; The Invisible
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#programs"
                className="px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "var(--green-mid)" }}
              >
                Our Programs
              </a>
              <a
                href="#donate"
                className="px-7 py-3.5 rounded-full font-semibold border-2 border-white text-white transition-all duration-200 hover:bg-white hover:text-[--green-deep] active:scale-[0.98]"
              >
                Ways to Give
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              background:
                i === current ? "var(--green-light)" : "rgba(255,255,255,0.5)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-10 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest uppercase text-white/60 rotate-90 origin-center translate-y-6">
          Scroll
        </span>
        <div className="w-px h-12 bg-white/30 mt-6" />
      </div>
    </section>
  );
}
