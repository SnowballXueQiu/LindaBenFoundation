import Image from "next/image";
import { partners } from "@/lib/partners";

// Split into two rows
const mid = Math.ceil(partners.length / 2);
const row1 = partners.slice(0, mid);
const row2 = partners.slice(mid);

function LogoItem({ partner, idx }: { partner: typeof partners[0]; idx: number }) {
  return (
    <a
      key={`${partner.name}-${idx}`}
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 flex items-center justify-center w-28 h-20 rounded-lg bg-white/80 p-3 hover:bg-white hover:shadow-md transition-all duration-300"
      title={partner.name}
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        width={96}
        height={64}
        loading="eager"
        className="h-14 w-auto object-contain"
      />
    </a>
  );
}

export default function Partners() {
  return (
    <section
      id="partners"
      className="py-16 lg:py-24 overflow-hidden border-t"
      style={{ background: "var(--cream)", borderColor: "var(--green-pale)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10 text-center">
        <p
          className="text-sm font-semibold tracking-[0.18em] uppercase mb-3"
          style={{ color: "var(--green-mid)" }}
        >
          Together We&rsquo;re Stronger
        </p>
        <h2
          className="text-3xl lg:text-4xl font-bold"
          style={{
            color: "var(--green-deep)",
            fontFamily: "var(--font-merriweather), serif",
          }}
        >
          Collaborative Partners
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="marquee-row relative mb-4">
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--cream), transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--cream), transparent)" }}
        />
        <div className="marquee-track flex items-center gap-6 py-2">
          {[...row1, ...row1].map((p, i) => (
            <LogoItem key={`r1-${i}`} partner={p} idx={i} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right (reverse) */}
      <div className="marquee-row relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--cream), transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--cream), transparent)" }}
        />
        <div className="marquee-track-reverse flex items-center gap-6 py-2">
          {[...row2, ...row2].map((p, i) => (
            <LogoItem key={`r2-${i}`} partner={p} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
