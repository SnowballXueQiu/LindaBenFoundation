import Image from "next/image";

const cards = [
  {
    title: "Donate",
    text: "Giving online has never been more secure, convenient or hassle-free. We also accept cash or checks, and donations in kind. Your gift will help equip those in need with more opportunity and a brighter future.",
    img: "/you_can_help/donate.png",
    href: "/donations",
  },
  {
    title: "Volunteer",
    text: "Get involved today by becoming a volunteer. Play a vital role improving the lives of people who experience food insecurity. Learn more about opportunities and ways you can help.",
    img: "/you_can_help/volunteer.png",
    href: "/volunteer",
  },
  {
    title: "Subscribe",
    text: "Subscribe to our newsletter to stay informed about food insecurity, including news, events and articles, or donate and contribute and help us sustain programs and meet our goals.",
    img: "/you_can_help/subscribe.png",
    href: "/newsletter",
  },
];

export default function HowToHelp() {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: "var(--warm-white)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-sm font-semibold tracking-[0.18em] uppercase mb-3"
            style={{ color: "var(--green-mid)" }}
          >
            Be Your Brother&rsquo;s &amp; Sister&rsquo;s Keepers
          </p>
          <h2
            className="text-3xl lg:text-4xl font-bold"
            style={{
              color: "var(--green-deep)",
              fontFamily: "var(--font-merriweather), serif",
            }}
          >
            How You Can Help
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group relative rounded-2xl overflow-hidden block"
              style={{ aspectRatio: "4/5" }}
            >
              {/* Image */}
              <Image
                src={card.img}
                alt={card.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Hover overlay - green semi-transparent */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "rgba(45,106,79,0.85)",
                }}
              >
                <h3
                  className="text-3xl lg:text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-merriweather), serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/90 max-w-xs">
                  {card.text}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Equal opportunity note */}
        <p
          className="text-center text-xs font-semibold tracking-[0.12em] uppercase mt-14 opacity-60"
          style={{ color: "var(--text-mid)" }}
        >
          LindaBen is an equal opportunity employer committed to diversity,
          equity, equality, inclusion and justice.
        </p>
      </div>
    </section>
  );
}
