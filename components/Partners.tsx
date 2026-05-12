import Image from "next/image";

const partners = [
  { name: "Beacon Heights Elementary School", logo: "/partners/beacon-heights-elementary.png", url: "https://www.pgcps.org/beaconheights/" },
  { name: "Blessings in a Backpack", logo: "/partners/blessings-in-a-backpack.png", url: "https://www.blessingsinabackpack.org/" },
  { name: "Bryant Woods Elementary School", logo: "/partners/bryant-woods-elementary.png", url: "https://bwes.hcpss.org/" },
  { name: "Capital Area Food Bank", logo: "/partners/capital-area-food-bank.png", url: "https://www.capitalareafoodbank.org/" },
  { name: "Carrollton Elementary School", logo: "/partners/carrollton-elementary.png", url: "https://www.pgcps.org/carrollton/" },
  { name: "Central Union Mission", logo: "/partners/central-union-mission.png", url: "https://www.missiondc.org/" },
  { name: "Celestial Manna", logo: "/partners/celestial-manna.png", url: "https://www.celestialmanna.org/" },
  { name: "Columbia Community Care", logo: "/partners/columbia-community-care.png", url: "https://columbiacommunitycare.org/" },
  { name: "Community Forklift", logo: "/partners/community-forklift.png", url: "https://www.communityforklift.org/" },
  { name: "Cooper Lane Elementary School", logo: "/partners/cooper-lane-elementary.png", url: "https://www.pgcps.org/schools/cooper-lane-elementary" },
  { name: "Food Rescue US", logo: "/partners/food-rescue-us.png", url: "https://foodrescue.us/" },
  { name: "Google for Nonprofits", logo: "/partners/google-for-nonprofits.png", url: "https://www.google.com/nonprofits/" },
  { name: "Greater Riverdale Thrives", logo: "/partners/greater-riverdale-thrives.png", url: "https://www.greaterriverdalethrives.org/" },
  { name: "Harper's Choice Middle School", logo: "/partners/harpers-choice-middle.png", url: "https://hcms.hcpss.org/" },
  { name: "The Horizon Foundation", logo: "/partners/horizon-foundation.png", url: "https://www.thehorizonfoundation.org/" },
  { name: "Office of the Local Children's Board", logo: "/partners/local-childrens-board.png", url: "https://www.howardcountymd.gov/office-local-childrens-board" },
  { name: "Howard County Health Department", logo: "/partners/howard-county-health.png", url: "https://www.howardcountymd.gov/health" },
  { name: "Howard County Public School System", logo: "/partners/hcpss.png", url: "https://www.hcpss.org/" },
  { name: "Longfellow Elementary School", logo: "/partners/longfellow-elementary.png", url: "https://lwes.hcpss.org/" },
  { name: "Maryland Diaper Bank", logo: "/partners/maryland-diaper-bank.png", url: "https://www.marylanddiaperbank.org/" },
  { name: "Mikey & Mel's Cruise In", logo: "/partners/mikey-mels-cruise-in.png", url: "https://www.mikeyandmelscruisein.com/" },
  { name: "Moon Valley Farm", logo: "/partners/moon-valley-farm.png", url: "https://www.moonvalleyfarm.net/" },
  { name: "No Child Goes Hungry", logo: "/partners/no-child-goes-hungry.png", url: "https://nochildgoeshungry.net/" },
  { name: "Oxon Hill Elementary School", logo: "/partners/oxon-hill-elementary.png", url: "https://www.pgcps.org/schools/oxon-hill-elementary" },
  { name: "P & C Outreach Ministries", logo: "/partners/pc-outreach-ministries.png", url: "https://www.pandcoutreach.org/" },
  { name: "PG County Family Engagement Coalition", logo: "/partners/pgcfec.png", url: "https://www.facebook.com/pgcfec/" },
  { name: "PG County Council District 3", logo: "/partners/pgc-council-district3.png", url: "https://pgccouncil.us/161/District-3---Olson" },
  { name: "PG County Public Schools", logo: "/partners/pgcps.png", url: "https://www.pgcps.org/" },
  { name: "CDC Diabetes Prevention Program", logo: "/partners/cdc-diabetes-prevention.png", url: "https://www.cdc.gov/diabetes-prevention/" },
  { name: "Instrument of Peace", logo: "/partners/instrument-of-peace.png", url: "https://www.instrumentofpeace.org/outreach-and-service" },
  { name: "Town of Riverdale Park, MD", logo: "/partners/riverdale-park.png", url: "https://www.riverdaleparkmd.info/" },
  { name: "Transform Howard", logo: "/partners/transform-howard.png", url: "https://www.howardcountymd.gov/transform" },
  { name: "UMD Community Engagement", logo: "/partners/umd-community-engagement.png", url: "https://oce.umd.edu/" },
  { name: "UMD Extension Programs", logo: "/partners/umd-extension.png", url: "https://extension.umd.edu/programs/" },
  { name: "United Way of Central Maryland", logo: "/partners/united-way-central-maryland.png", url: "https://uwcm.org/" },
];

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
      className="flex-shrink-0 flex items-center justify-center w-28 h-20 rounded-lg bg-white/80 p-3 hover:bg-white hover:shadow-md transition-all duration-300"
      title={partner.name}
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        width={96}
        height={64}
        className="object-contain max-h-14 w-auto"
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
