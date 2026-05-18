"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/client";
import { withLocale } from "@/lib/i18n/config";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const programs = [
  {
    id: "food-as-medicine",
    titleKey: "foodAsMedicine",
    descriptionIndex: 0,
    href: "/food-as-medicine",
    image: "/programs/1.png",
  },
  {
    id: "community-pantry",
    titleKey: "communityPantry",
    descriptionIndex: 1,
    href: "/community-pantry",
    image: "/programs/2.png",
  },
  {
    id: "resource-center",
    titleKey: "resourceSupportCenter",
    descriptionIndex: 2,
    href: "/new-community-resource-support-center",
    image: "/programs/3.png",
  },
  {
    id: "youth-volunteerism",
    titleKey: "youthVolunteerism",
    descriptionIndex: 3,
    href: "/youth-volunteerism",
    image: "/programs/4.png",
  },
  {
    id: "community-outreach",
    titleKey: "communityOutreach",
    descriptionIndex: 4,
    href: "/community-outreach",
    image: "/programs/5.png",
  },
  {
    id: "partnerships",
    titleKey: "partnerships",
    descriptionIndex: 5,
    href: "/partnerships-programs",
    image: "/programs/6.png",
  },
] as const;

type Program = (typeof programs)[number];

function RadialProgramItem({
  program,
  index,
  total,
  title,
  content,
  href,
  learnMore,
}: {
  program: Program;
  index: number;
  total: number;
  title: string;
  content: string;
  href: string;
  learnMore: string;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Calculate position for radial layout
  const angle = (index * 360) / total;
  const radius = 280; // Distance from center
  const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
  const y = Math.sin((angle - 90) * Math.PI / 180) * radius;

  useEffect(() => {
    const item = itemRef.current;
    const content = contentRef.current;
    if (!item || !content) return;

    // Set initial states
    gsap.set(item, {
      opacity: 0,
      scale: 0.8,
      x: x * 0.5,
      y: y * 0.5,
    });

    gsap.set(content, {
      opacity: 0,
      y: 20,
    });

    // Create scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(item, {
      opacity: 1,
      scale: 1,
      x: x,
      y: y,
      duration: 0.6,
      ease: "back.out(1.2)",
      delay: index * 0.1,
    })
    .to(content, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, [x, y, index]);

  return (
    <div
      ref={itemRef}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
      style={{ 
        left: '50%', 
        top: '50%',
      }}
    >
      {/* Image Container */}
      <div className="relative">
        <div 
          className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white transition-all duration-300 group-hover:scale-110"
          style={{
            borderColor: 'white',
          }}
        >
          <Image
            src={program.image}
            alt={title}
            width={160}
            height={160}
            className="w-full h-full object-cover"
            sizes="160px"
            priority={index < 3}
          />
        </div>
        
        {/* Connecting Line */}
        <div 
          className="absolute w-20 h-0.5 opacity-30"
          style={{
            left: '50%',
            top: '50%',
            transformOrigin: 'left center',
            transform: `translateY(-50%) rotate(${angle + 90}deg)`,
            background: `linear-gradient(to right, var(--green-mid), transparent)`,
          }}
        />
      </div>

      {/* Content Panel */}
      <div
        ref={contentRef}
        className="absolute bg-white rounded-xl shadow-xl p-4 lg:p-6 border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10"
        style={{
          width: '280px',
          left: x > 0 ? '-290px' : '10px',
          top: y > 0 ? '-120px' : '-60px',
          borderColor: "var(--green-pale)",
        }}
      >
        <h3
          className="text-lg lg:text-xl font-bold mb-2 leading-tight"
          style={{
            color: "var(--green-deep)",
            fontFamily: "var(--font-merriweather), serif",
          }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--text-mid)" }}
        >
          {content}
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 group text-sm"
          style={{ background: "linear-gradient(135deg, var(--green-deep), var(--green-mid))" }}
        >
          {learnMore}
          <svg
            className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function RadialProgramsSection() {
  const { locale, dictionary } = useI18n();
  return (
    <section
      className="py-20 lg:py-32 min-h-200 relative overflow-hidden"
      style={{ background: "var(--warm-white)" }}
    >
      {/* Central Logo/Icon */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div 
          className="w-24 h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center shadow-2xl"
          style={{ background: "linear-gradient(135deg, var(--green-deep), var(--green-mid))" }}
        >
          <svg 
            className="w-12 h-12 lg:w-16 lg:h-16 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      </div>

      {/* Radial Grid Lines */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {programs.map((_, index) => {
          const angle = (index * 360) / programs.length;
          return (
            <div
              key={index}
              className="absolute w-80 h-0.5 opacity-20"
              style={{
                transformOrigin: 'left center',
                transform: `rotate(${angle - 90}deg)`,
                background: `linear-gradient(to right, var(--green-pale), var(--green-light), transparent)`,
              }}
            />
          );
        })}
      </div>

      {/* Program Items */}
      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 h-full">
        {programs.map((program, index) => {
          const title = dictionary.nav[program.titleKey];
          return (
            <RadialProgramItem
              key={program.id}
              program={program}
              index={index}
              total={programs.length}
              title={title}
              content={dictionary.pages.programs.descriptions[program.descriptionIndex]}
              href={withLocale(program.href, locale)}
              learnMore={dictionary.common.learnMore}
            />
          );
        })}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p
          className="text-sm font-medium opacity-70"
          style={{ color: "var(--text-mid)" }}
        >
          Hover over programs to learn more
        </p>
      </div>
    </section>
  );
}
