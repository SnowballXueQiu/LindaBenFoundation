"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function CardFlipCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = 15; // servant_leaders/1.png to 15.png

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [totalImages]);

  return (
    <div className="relative">
      <div
        className="absolute -top-4 -left-4 w-full h-full rounded-2xl"
        style={{ background: "var(--green-pale)" }}
      />
      <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "4/3" }}>
        <div className="absolute inset-0">
          {Array.from({ length: totalImages }, (_, index) => (
            <div
              key={index + 1}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 transform translate-x-0 rotate-0 scale-100"
                  : "opacity-0 transform translate-x-4 rotate-6 scale-95"
              }`}
            >
              <Image
                src={`/servant_leaders/${index + 1}.png`}
                alt={`Servant Leader ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}