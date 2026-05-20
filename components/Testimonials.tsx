"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useI18n } from "@/lib/i18n/client";
import { withLocale } from "@/lib/i18n/config";

const testimonials = [
  "Thank you for giving back and helping the community.",
  "I thank GOD for this grace that Linda Ben Foundation is to so many. I'm treated humanely here unlike other places. Thank you! :)",
  "I'm very grateful",
  "I'm happy and grateful to the food you give us. God Bless You!",
  "Everything is fine so far. I enjoy the program, the suggestion is that the hours of waiting is too long here. They can make it shorter hours and fast.",
  "I am very happy for the help you bring us. Everything is need it for all of us. God bless you all for the great effort you put into and serving us. Very happy and grateful for everything. -Morales Recinos F",
  "I think that the help that they give us is great and how they cooperate is great. I think that maybe only one member per family could come.",
  "Hello, my opinion for the improvement of the program is that the food should be given in equal amounts for everyone because as it is now the first people who arrive take more and better food; other than that everything is good.",
  "Hi, my suggestion to better distribute the food to people is by giving them equal shares. Other than that everything is good.",
  "You are doing an excellent job. I just have one suggestion. I would like that you would have a little more patient with people that speak Spanish. Some people sound angry in the events. People should be treated with respect. Everything else is great.",
  "The help you give us is big. You do a great job. Now with numbers. I think that it will be better one member of each family. God bless you.",
  "The reality is that you have good attention for everyone. The one suggestion I have is to put God before anything else. Everything will go well if we do that. Blessing. ATT: Junior Vizcoin",
  "Good care, very kind and also very organized.",
  "Thankful for the big help in food and pampers",
  "I like the place and they serve us very well, they play good music and above all help a lot with food",
  "I am thankful for the help you bring.",
  "I like the place. I was treated well. The music was good, but overall it was great the help you're offering with food.",
  "Thank you everyone for the help you have bring us. Your help is very essential for the community. The pandemic has left many of us without a job and what you are doing it helps many people.",
  "I thank you for all your help. May God keep blessing for your kindness and patience. Thank you for everything. God bless you.",
  "Is a good option to bring these groceries home. It takes us save some money",
  "I am very great full with you for bringing us groceries to each of us. May god continue creating many more. God bless you greatly.",
  "Thank you for the blessing of bringing us groceries and the welcome attention you give us.",
  "Thank you, I am very happy with the help you bring us. Thanks",
  "Thank you for this institution. I am beyond thankful for your help.",
  "May God multiple everything you are giving. Thank you for all your attention and for the great food. Always grateful",
  "I am thankful for the help. I am a single mother. Thank you for the help.",
  "I thank the entire team for their time and patience. Thank you",
  "I am grateful for the blessing of receiving food. I could feed my family and the truth, the attention was good. May God keep blessing this church. Thanks. C.E.F.M.",
  "Good afternoon. I am grateful for all your help. The reality is that we need it and you treated us very good. Is a blessing what you do. God multiply greatly everything you give",
  "Thank you for all you give us. It is a blessing. Thank you.",
  "I feel very happy for the help you bring us. -Sandra Gutieres",
  "The work you do is very good and very well organized. God bless you and keep up with this great job.",
  "We thank you for all you gave us. God bless you",
  "I'm thankful for the blessings and the food. I'm able to feed my family. Thank you",
  "I'm thankful for the help you guys bring.",
  "Good afternoon, Congratulation to the people who organize these markets. God bless you all. -Ana Cecilia Jimenez",
  "Thank you for helping the hispanic community and for everything you guys do.",
  "Very grateful for the help you bring us. It is needed in our home. Thank you for the help you bring to those who need it.",
  "Thank you for what you do for the community. You bring us lots of food. Thank you. I'm also thankful for the great heart and the kindness the pastor has for all of us.",
  "I am thankful for the blessing and the help with bringing the food. Now I can feed my family, Thank you. -J.F",
  "Thank you for your help. God bless you",
  "I am very grateful with the help you provide us with groceries. Many blessings to all",
  "I am grateful first to God and you for the help that you bring us with food. It is really helpful. God bless you. -A.T. W.P.T.",
  "My name is Carmen Diaz. I thank God for giving you a good heart, because God is in your heart you make families happy and we are one of them. Blessings brothers and sisters. Amen-Amen",
  "A lot of thanks to the people this place has. The community needed this help after the pandemic came. I am beyond thankful.",
  "May God multiply blessings your way. Thank you!",
  "I am grateful to be receiving food for my family. Blessing for you. I am grateful for being receiving food for my family.",
  "Thank you for helping the hispanic community and for everything you do.",
  "I like the place. We were treated good. I like help you bring. The food you give us is very good.",
  "Capital Area food bank I really appreciated all they do and this facility works well. Your place is clean, they give us good service. Food is good. Thanks for all.",
  "Gracias for the help, it is useful for the home.",
  "Thanks, I'm grateful for the help you have given us",
  "Thank you for the blessing of the food you are serving us",
  "The service is very good, I like that they help. The food is very good. Thanks",
  "In this type of program you have to treat people with respect and dignity. We all deserve it. But otherwise everyone likes.",
  "Good option to help me save money at home.",
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale, dictionary } = useI18n();
  const home = dictionary.home;

  const goTo = useCallback((index: number) => {
    setFade(false);
    setTimeout(() => {
      setCurrent(index);
      setTimeout(() => setFade(true), 50);
    }, 300);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, goTo]);

  // Measure and animate height
  useEffect(() => {
    if (containerRef.current) {
      const newHeight = containerRef.current.scrollHeight;
      setHeight(newHeight);
    }
  }, [current]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28"
      style={{ background: "var(--cream)" }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <p
            className="text-sm font-semibold tracking-[0.18em] uppercase mb-3"
            style={{ color: "var(--green-mid)" }}
          >
            {home.testimonialsEyebrow}
          </p>
          <h2
            className="text-3xl lg:text-4xl font-bold"
            style={{
              color: "var(--green-deep)",
              fontFamily: "var(--font-merriweather), serif",
            }}
          >
            {home.testimonialsTitle}
          </h2>
        </div>

        {/* Testimonial card — left green border accent style */}
        <div
          className="relative overflow-hidden transition-all duration-500 ease-in-out rounded-lg bg-white shadow-sm"
          style={{
            height: height ? `${height}px` : "auto",
            borderLeft: "4px solid var(--green-mid)",
          }}
        >
          <div ref={containerRef} className="px-8 lg:px-12 py-8 lg:py-10">
            <div
              className="transition-all duration-300 ease-in-out"
              style={{
                opacity: fade ? 1 : 0,
                transform: fade ? "translateX(0)" : "translateX(20px)",
              }}
            >
              <p
                className="text-lg md:text-xl leading-relaxed mb-6"
                style={{
                  color: "var(--text-dark)",
                  fontFamily: "var(--font-merriweather), serif",
                }}
              >
                {testimonials[current]}
              </p>

              <div className="flex items-center gap-3">
                {/* Five green dots as decorative element */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: "var(--green-mid)",
                        opacity: 0.3 + i * 0.175,
                      }}
                    />
                  ))}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--green-mid)" }}
                >
                  {home.communityMember}
                </span>
                <span className="text-xs" style={{ color: "var(--text-mid)" }}>
                  · Maryland
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Read more button */}
        <div className="text-center mt-10">
          <a
            href={withLocale("/testimonials", locale)}
            className="inline-block px-8 py-3.5 rounded-full font-semibold border-2 transition-all duration-200 hover:bg-[--green-pale]"
            style={{
              borderColor: "var(--green-deep)",
              color: "var(--green-deep)",
            }}
          >
            {home.readMoreTestimonials}
          </a>
        </div>
      </div>
    </section>
  );
}
