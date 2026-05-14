import Image from "next/image";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ParallaxBg from "@/components/ParallaxBg";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our History — LindaBen Foundation",
  description:
    "Learn about the founding story of LindaBen Foundation, from a personal journey of faith and compassion to a mission serving those in need.",
};

export default function OurHistoryPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden"
        >
          <ParallaxBg
            src="/our_history/hero.png"
            overlay="rgba(28,43,32,0.55)"
            speed={0.15}
            position="center bottom"
            offset="0px 800px"
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-8"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              Our History
            </h1>
            <blockquote className="max-w-2xl mx-auto">
              <p
                className="text-lg lg:text-xl leading-relaxed italic mb-4"
                style={{ color: "var(--green-pale)" }}
              >
                &ldquo;I have learned the secret of being content in any and
                every situation, whether well fed or hungry or in want. I can do
                all this through Him who gives me strength.&rdquo;
              </p>
              <cite
                className="text-sm font-semibold not-italic tracking-wide"
                style={{ color: "var(--green-light)" }}
              >
                &mdash; Philippians 4:12-13
              </cite>
            </blockquote>
          </div>
        </section>

        {/* Main content */}
        <section
          className="py-16 lg:py-24"
          style={{ background: "var(--cream)" }}
        >
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            {/* Title */}
            <h2
              className="text-2xl lg:text-3xl font-bold mb-12 text-center lg:text-left leading-snug"
              style={{
                color: "var(--green-deep)",
                fontFamily: "var(--font-merriweather), serif",
              }}
            >
              A Personal Message From Anna Beavan (Dimatangal),
              <br className="hidden sm:block" /> Founder &amp; President
            </h2>

            {/* Paragraph 1 — image on left */}
            <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 mb-16 items-start">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/our_history/1.png"
                  alt="Anna Beavan — early years"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              </div>
              <div
                className="text-base lg:text-[17px] leading-[1.85] first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none"
                style={{
                  color: "var(--text-mid)",
                  fontFamily: "var(--font-merriweather), serif",
                }}
              >
                <p>
                  <span
                    className="text-5xl font-bold float-left mr-3 mt-1 leading-none"
                    style={{ color: "var(--green-deep)" }}
                  >
                    A
                  </span>
                  t a very young age, I remember that my elementary teacher once
                  suggested that we borrow a book entitled &lsquo;The Greatest
                  Salesman in the World&rsquo; by Og Mandino. For some reason
                  that I can&rsquo;t explain, this book &amp; author was
                  engraved in my mind but I never really bothered to take the
                  time to borrow or buy it. Several years passed by at which
                  time I successfully finished my college degree. One day after
                  work, I decided to stop by to a bookstore. Then I saw the
                  series of books by Og Mandino and browsed them. I decided to
                  get &lsquo;The Greatest Miracle in the World&rsquo; for now.
                  This book is about second chances, about a mysterious wise man
                  called &lsquo;the ragpicker&rsquo; whose mission is to
                  transform a life that had been cast aside. So I bought it and
                  I planned to read it each time I commuted to work in Manila.
                </p>
                <p className="mt-5">
                  A few days after that, my mom suddenly passed away due to her
                  addictions. I was 21 years old (1997) when I lost my mom. I
                  realized that death is something that will happen to all of
                  us, but when it happens to someone you love your whole life,
                  it gives you pain that&rsquo;s hard to even describe. In a
                  way, it was a blessing that I was reading this book that
                  somehow its message is slowly making its way through me like a
                  seed growing. It gave me a new perspective, otherwise I may
                  have a different outlook in life. This book and my overall
                  faith in God had planted a seed in my heart that had kept me
                  on living.
                </p>
              </div>
            </div>

            {/* Paragraph 2 — image on right */}
            <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 mb-16 items-start">
              <div
                className="text-base lg:text-[17px] leading-[1.85] order-2 lg:order-1"
                style={{
                  color: "var(--text-mid)",
                  fontFamily: "var(--font-merriweather), serif",
                }}
              >
                <p>
                  <span
                    className="text-5xl font-bold float-left mr-3 mt-1 leading-none"
                    style={{ color: "var(--green-deep)" }}
                  >
                    F
                  </span>
                  ast forward, after two decades, I&rsquo;m blessed with a
                  family of my own having a firm and deeply supportive husband
                  and two brilliant and amusing teenagers. However, I still have
                  this longing for something else. I&rsquo;m fully convinced
                  that eventually I would be fulfilled once I created a
                  foundation in my mom&rsquo;s behalf at some point. At that
                  time my biggest question was what type and when I&rsquo;ll do
                  it. About three years ago (2017), my neighbor Jen had reached
                  out to me and invited me to join her for &ldquo;I Am
                  Free&rdquo; sessions. Then my longing to do something more
                  started again within me.
                </p>
                <p className="mt-5">
                  It was also during this time that I got a message from one of
                  my sisters about our dad, my long lost father (he abandoned me
                  as a toddler to my mom and we didn&rsquo;t keep in touch). My
                  dad had suffered from stroke and was currently in poor health.
                  I found myself letting it go by embracing forgiveness, but I
                  didn&rsquo;t speak to my dad. I began opening up my
                  communication with my three half-sister&rsquo;s and even
                  promised them that I intend to schedule a trip to my hometown
                  to visit and spend time with them.
                </p>
                <p className="mt-5">
                  During this time, we also started participating in
                  Linda&rsquo;s Legacy through PCA for their annual giving back
                  event for the homeless. We had fun packing these backpacks
                  with winter items and we decided to join their other event. On
                  Christmas Eve, the day of the distribution of donated items,
                  one of the homeless shelters that got assigned to us by
                  Linda&rsquo;s Legacy was named The Ragpicker. That day I had a
                  chance to meet Jo and her wonderful husband. She confirmed
                  that her daughter (who&rsquo;s the founder of this shelter)
                  also knew about Og Mandino and was inspired by it. Since then,
                  my family continued to support The Ragpicker. I knew from my
                  heart that I found the foundation that I need to startup,
                  however, I still had some doubts.
                </p>
              </div>
              <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden shadow-lg order-1 lg:order-2">
                <Image
                  src="/our_history/2.png"
                  alt="Anna Beavan — family and foundation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              </div>
            </div>

            {/* Paragraph 3 — no image */}
            <div className="mb-16">
              <div
                className="text-base lg:text-[17px] leading-[1.85] max-w-3xl mx-auto"
                style={{
                  color: "var(--text-mid)",
                  fontFamily: "var(--font-merriweather), serif",
                }}
              >
                <p>
                  <span
                    className="text-5xl font-bold float-left mr-3 mt-1 leading-none"
                    style={{ color: "var(--green-deep)" }}
                  >
                    I
                  </span>
                  n 2019, my dad&rsquo;s condition took a turn for the worst. I
                  booked a trip back home hoping I can still see him in the
                  hospital but I was too late. Along with my daughter, we both
                  went home to visit my dad&rsquo;s family as well as meet my
                  older sister for the first time I never knew existed! During
                  this trip I found out about the life my dad had and that he
                  too had suffered until he become homeless himself. That erased
                  any more doubts of what type of foundation I&rsquo;ll create.
                  Convinced what I want to offer, I began to plan ahead until
                  COVID hit us in a big way that no one had imagined.
                </p>
              </div>
            </div>

            {/* Paragraph 4 — no image */}
            <div className="mb-4">
              <div
                className="text-base lg:text-[17px] leading-[1.85] max-w-3xl mx-auto"
                style={{
                  color: "var(--text-mid)",
                  fontFamily: "var(--font-merriweather), serif",
                }}
              >
                <p>
                  <span
                    className="text-5xl font-bold float-left mr-3 mt-1 leading-none"
                    style={{ color: "var(--green-deep)" }}
                  >
                    2
                  </span>
                  020 had proven such a very difficult year not just for my
                  family but for everyone in the world, due to Pandemic that
                  COVID had impacted us. The extent of effect and impact is
                  still unmeasurable since we&rsquo;re still going through this
                  as of now. This virus had altered countless plans, broken
                  dreams and caused millions of lives to fall ill as darkness
                  seemed to temper moods worldwide. Will this also alter my own
                  dream? Shall I decide to pause again, which seemed like the
                  obvious choice?
                </p>
                <p className="mt-5">
                  <span
                    className="text-5xl font-bold float-left mr-3 mt-1 leading-none"
                    style={{ color: "var(--green-deep)" }}
                  >
                    T
                  </span>
                  he voice inside of me, has a different direction, so I took a
                  leap of faith. I decided to pursue this now more than ever, as
                  they say &ldquo;the right decisions are always the hardest to
                  make&rdquo;. I believe many additional helping hands and kind
                  hearts are needed during this time. People are isolated and
                  being torn apart to thinking about their family finances as
                  well their own safety and survival. But some will be called to
                  step up and help the homeless and those in need as safely as
                  possible which is the goal of the LindaBen Foundation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div
          className="h-px"
          style={{ background: "var(--green-pale)" }}
        />

        {/* Contact section — reused */}
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
