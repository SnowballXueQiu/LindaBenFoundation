import Image from "next/image";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="py-20 lg:py-28"
      style={{ background: "var(--warm-white)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div className="relative">
            <div
              className="absolute -top-4 -left-4 w-full h-full rounded-2xl"
              style={{ background: "var(--green-pale)" }}
            />
            <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/about_us/image.png"
                alt="LindaBen Foundation team serving the community"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Badge */}
            <div
              className="absolute -bottom-5 -right-5 w-28 h-28 rounded-full flex flex-col items-center justify-center text-white text-center shadow-lg"
              style={{ background: "var(--green-deep)" }}
            >
              <span className="text-2xl font-bold leading-none" style={{ fontFamily: "var(--font-merriweather), serif" }}>
                MD
              </span>
              <span className="text-xs mt-1 opacity-80 leading-tight px-2">
                Serving Maryland
              </span>
            </div>
          </div>

          {/* Text side */}
          <div>
            <p
              className="text-sm font-semibold tracking-[0.18em] uppercase mb-4"
              style={{ color: "var(--green-mid)" }}
            >
              Who We Are
            </p>
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6 leading-snug"
              style={{
                color: "var(--green-deep)",
                fontFamily: "var(--font-merriweather), serif",
              }}
            >
              About Us
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--text-mid)" }}
            >
              The LindaBen Foundation offers various innovative solutions to
              strengthen food security, address food waste reduction and address
              health disparities. We provide equitable access to nutrient dense
              food along with nutrition education workshops and access to
              resources promoting well being of the underserved and vulnerable
              population.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "var(--text-mid)" }}
            >
              Through outreach and partnerships, we increase our capacity to
              improve quality of life of many. Together, our dedicated team turns
              our moral convictions into actions.
            </p>
            <a
              href="#"
              className="inline-block px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "var(--green-deep)" }}
            >
              More About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
