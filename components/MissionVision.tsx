"use client";

import { useI18n } from "@/lib/i18n/client";

export default function MissionVision() {
  const { dictionary } = useI18n();
  const home = dictionary.home;

  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: "var(--warm-white)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <p
          className="text-center text-sm font-semibold tracking-[0.18em] uppercase mb-14"
          style={{ color: "var(--green-mid)" }}
        >
          {home.helpMyPeople}
        </p>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Mission */}
          <div className="relative">
            <div
              className="absolute -top-3 -left-3 w-12 h-12 rounded-full opacity-20"
              style={{ background: "var(--green-light)" }}
            />
            <div className="relative pl-6 border-l-4" style={{ borderColor: "var(--green-mid)" }}>
              <h2
                className="text-2xl font-bold mb-5"
                style={{
                  color: "var(--green-deep)",
                  fontFamily: "var(--font-merriweather), serif",
                }}
              >
                {home.missionTitle}
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--text-mid)" }}
              >
                {home.missionText}
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="relative">
            <div
              className="absolute -top-3 -left-3 w-12 h-12 rounded-full opacity-20"
              style={{ background: "var(--green-light)" }}
            />
            <div className="relative pl-6 border-l-4" style={{ borderColor: "var(--gold)" }}>
              <h2
                className="text-2xl font-bold mb-5"
                style={{
                  color: "var(--green-deep)",
                  fontFamily: "var(--font-merriweather), serif",
                }}
              >
                {home.visionTitle}
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--text-mid)" }}
              >
                {home.visionText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
