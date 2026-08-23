const banks = [
  { name: "American Express", color: "#006FCF" },
  { name: "SBI Card", color: "#22409A" },
  { name: "ICICI Bank", color: "#E96125" },
  { name: "YES Bank", color: "#0056A8" },
  { name: "IDFC FIRST Bank", color: "#8B1E3F" },
  { name: "IndusInd Bank", color: "#B5121B" },
  { name: "HDFC Bank", color: "#1A3E8C" },
  { name: "Axis Bank", color: "#91004B" },
];

const loyaltyPrograms = [
  { name: "Air India Maharaja", color: "#C99700" },
  { name: "British Airways Executive Club", color: "#0B3D91" },
  { name: "Marriott Bonvoy", color: "#7A0C2E" },
  { name: "Hilton Honors", color: "#0B5FA5" },
  { name: "Emirates Skywards", color: "#C8102E" },
  { name: "Singapore Airlines KrisFlyer", color: "#B8860B" },
  { name: "IHG One Rewards", color: "#5C2D91" },
  { name: "Qatar Airways Privilege Club", color: "#6E0D25" },
  { name: "ALL – Accor Live Limitless", color: "#3A0CA3" },
  { name: "United MileagePlus", color: "#04225A" },
];

function Pill({ name, color }: { name: string; color: string }) {
  return (
    <span
      className="flex shrink-0 items-center rounded-full border px-5 py-2.5 text-sm font-semibold whitespace-nowrap"
      style={{
        backgroundColor: `${color}14`,
        borderColor: `${color}33`,
        color,
      }}
    >
      {name}
    </span>
  );
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: { name: string; color: string }[];
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
          <Pill key={`${item.name}-${index}`} name={item.name} color={item.color} />
        ))}
      </div>
    </div>
  );
}

export default function ProgramsCards() {
  return (
    <section className="bg-[#f5f7fa] py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm font-semibold tracking-wide text-[#FF9F1C] uppercase">
          Programs &amp; Cards
        </p>
        <h2 className="mt-3 text-3xl font-bold text-black sm:text-4xl">
          All cards and loyalty programs, connected and ready.
        </h2>
      </div>

      <div className="mt-14 space-y-6">
        <MarqueeRow items={banks} direction="left" duration={32} />
        <MarqueeRow items={loyaltyPrograms} direction="right" duration={42} />
      </div>
    </section>
  );
}
