import Image from "next/image";

const banks = [
  { name: "American Express", logo: "/logos/american-express.svg" },
  { name: "SBI Card", logo: "/logos/sbi-card.svg" },
  { name: "ICICI Bank", logo: "/logos/icici-bank.svg" },
  { name: "YES Bank", logo: "/logos/yes-bank.svg" },
  { name: "IDFC FIRST Bank", logo: "/logos/idfc-first-bank.svg" },
  { name: "IndusInd Bank", logo: "/logos/indusind-bank.svg" },
  { name: "HDFC Bank", logo: "/logos/hdfc-bank.svg" },
  { name: "Axis Bank", logo: "/logos/axis-bank.svg" },
];

const loyaltyPrograms = [
  { name: "Air India Maharaja", logo: "/logos/air-india.svg" },
  { name: "British Airways Executive Club", logo: "/logos/british-airways.svg" },
  { name: "Marriott Bonvoy", logo: "/logos/marriott-bonvoy.svg" },
  { name: "Hilton Honors", logo: "/logos/hilton-honors.svg" },
  { name: "Emirates Skywards", logo: "/logos/emirates.svg" },
  { name: "Singapore Airlines KrisFlyer", logo: "/logos/singapore-airlines.svg" },
  { name: "IHG One Rewards", logo: "/logos/ihg.svg" },
  { name: "Qatar Airways Privilege Club", logo: "/logos/qatar-airways.svg" },
  { name: "ALL – Accor Live Limitless", logo: "/logos/accor.svg" },
  { name: "United MileagePlus", logo: "/logos/united-mileageplus.svg" },
];

function LogoCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="relative flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white px-6 py-4 shadow-sm shadow-black/5">
      <Image src={logo} alt={name} fill className="object-contain p-4" sizes="160px" />
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: { name: string; logo: string }[];
  direction: "left" | "right";
  duration: number;
}) {
  const track = [...items, ...items, ...items, ...items, ...items];

  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max gap-4 group-hover:[animation-play-state:paused] ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {track.map((item, index) => (
          <LogoCard key={`${item.name}-${index}`} name={item.name} logo={item.logo} />
        ))}
      </div>
    </div>
  );
}

export default function ProgramsCards() {
  return (
    <section id="programs" className="bg-[#f5f7fa] py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="section-eyebrow">Programs &amp; Cards In One Universe</p>
        <h2 className="section-title text-black">
        </h2>
      </div>

      <div className="mt-14 space-y-6">
        <MarqueeRow items={banks} direction="left" duration={32} />
        <MarqueeRow items={loyaltyPrograms} direction="right" duration={42} />
      </div>
    </section>
  );
}
