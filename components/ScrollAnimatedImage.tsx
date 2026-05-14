"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollAnimatedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  containerClassName?: string;
  animationDelay?: number;
}

export default function ScrollAnimatedImage({
  src,
  alt,
  width,
  height,
  className = "w-full h-full object-cover",
  containerClassName = "w-80 h-80 rounded-full overflow-hidden shadow-lg",
  animationDelay = 0,
}: ScrollAnimatedImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = imageRef.current;
    if (!element) return;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: 20,
      scale: 0.95,
    });

    // Create scroll-triggered animation
    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      delay: animationDelay * 0.5,
      scrollTrigger: {
        trigger: element,
        start: "top 95%",
        end: "bottom 5%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animationDelay]);

  return (
    <div ref={imageRef} className={containerClassName}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        sizes="320px"
      />
    </div>
  );
}