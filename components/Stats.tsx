"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 3058780, label: "Meals Provided" },
  { value: 255193, label: "Individuals Served" },
  { value: 723256, label: "Pounds of Food Recovered" },
  { value: 3237467, label: "Pounds of Food Distributed" },
  { value: 85086, label: "Hunger Free Weekends" },
  { value: 124079, label: "Baby Essentials Distributed" },
];

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function AnimatedNumber({ target }: { target: number }) {
  const [count, setCount] = useState(target); // Start with final value to prevent flash of 0
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset for new animation
    started.current = false;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          
          // Start animation from 0
          setCount(0);
          
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          
          animationRef.current = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              if (animationRef.current) {
                clearInterval(animationRef.current);
              }
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps) as NodeJS.Timeout;
        }
      },
      { threshold: 0.3 }
    );
    
    if (ref.current) observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [target]);

  return <span ref={ref}>{formatNumber(count)}</span>;
}

export default function Stats() {
  return (
    <section
      className="py-20 lg:py-24"
      style={{
        background: "linear-gradient(135deg, var(--green-deep) 0%, var(--green-mid) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p
          className="text-center text-sm font-semibold tracking-[0.18em] uppercase mb-3"
          style={{ color: "var(--green-light)" }}
        >
          Our Impact
        </p>
        <h2
          className="text-center text-3xl font-bold text-white mb-14"
          style={{ fontFamily: "var(--font-merriweather), serif" }}
        >
          Numbers That Tell Our Story
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="text-4xl lg:text-5xl font-bold mb-2 tabular-nums"
                style={{
                  color: "var(--green-light)",
                  fontFamily: "var(--font-merriweather), serif",
                }}
              >
                <AnimatedNumber target={stat.value} />
              </div>
              <div
                className="text-sm font-medium tracking-wide uppercase"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
