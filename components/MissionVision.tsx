export default function MissionVision() {
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
          Help My People
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
                Our Mission
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--text-mid)" }}
              >
                Our mission at LindaBen Foundation is to provide nutritious food,
                promote wellness, reduce food waste, and offer nutrition education
                to help children and empower their families overcome food
                insecurity and improve their health.
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
                Our Vision
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--text-mid)" }}
              >
                We envision a world where no child or family goes hungry, and
                where access to healthy food and life-changing resources is
                available to all. Through community partnerships, education, and
                compassionate care, we aim to transform local food systems and
                create lasting, positive change for generations to come.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
