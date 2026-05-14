import Image from "next/image";
import Link from "next/link";

const programs = [
  {
    title: "Community Pantry",
    slug: "/community-pantry",
    img: "/our_programs/1.png",
  },
  {
    title: "New Community Resource Support Center",
    slug: "/new-community-resource-support-center",
    img: "/our_programs/2.png",
  },
  {
    title: "Youth Volunteerism",
    slug: "/youth-volunteerism",
    img: "/our_programs/3.png",
  },
  {
    title: "Food as Medicine",
    slug: "/food-as-medicine",
    img: "/our_programs/4.png",
  },
  {
    title: "Community Outreach",
    slug: "/community-outreach",
    img: "/our_programs/5.png",
  },
  {
    title: "Partnership Programs",
    slug: "/partnerships-programs",
    img: "/our_programs/6.png",
  },
];

export default function Programs() {
  return (
    <section
      id="programs"
      className="py-20 lg:py-28"
      style={{ background: "var(--green-deep)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="text-3xl lg:text-5xl font-bold mb-4 text-white"
            style={{
              fontFamily: "var(--font-merriweather), serif",
            }}
          >
            Our Programs
          </h2>
          <p className="text-base max-w-xl mx-auto text-white/80">
            We provide services for the vulnerable and at-risk population in
            Maryland.
          </p>
        </div>

        {/* Circular images row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {programs.map((program) => (
            <div key={program.slug} className="flex flex-col items-center text-center group">
              {/* Circular image */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden mb-4 ring-4 ring-white/20 group-hover:ring-white/40 transition-all duration-300">
                <Image
                  src={program.img}
                  alt={program.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 144px, (max-width: 1024px) 160px, 176px"
                />
              </div>
              {/* Title */}
              <h3
                className="font-bold text-sm sm:text-base leading-snug mb-1.5 text-white"
              >
                {program.title}
              </h3>
              {/* Learn more link */}
              <Link
                href={program.slug}
                className="inline-flex items-center gap-1 text-sm font-semibold transition-colors duration-150"
                style={{ color: "var(--green-light)" }}
              >
                Learn more
                <span className="ml-0.5">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex flex-wrap justify-center gap-4 mt-14">
          <a
            href="/donations"
            className="px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 border-2 border-white"
            style={{ background: "transparent" }}
          >
            Ways to Give
          </a>
          <a
            href="/about-us"
            className="px-7 py-3.5 rounded-full font-semibold border-2 border-white/60 text-white transition-all duration-200 hover:bg-white/10"
          >
            More About Us
          </a>
          <a
            href="/contact"
            className="px-7 py-3.5 rounded-full font-semibold border-2 transition-all duration-200 hover:bg-white/10"
            style={{
              borderColor: "var(--green-light)",
              color: "var(--green-light)",
            }}
          >
            Get In Touch!
          </a>
        </div>
      </div>
    </section>
  );
}
