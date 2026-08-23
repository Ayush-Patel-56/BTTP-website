function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </svg>
  );
}

function WalletIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const pillars = [
  {
    title: "Transparency",
    description: "See exactly what every point and mile is worth, in one place, with no hidden math.",
    Icon: EyeIcon,
  },
  {
    title: "Automation",
    description: "We track balances and expiry dates for you, so nothing slips through unnoticed.",
    Icon: BoltIcon,
  },
  {
    title: "Real Savings",
    description: "Every recommendation points to an actual flight, hotel night, or upgrade you can book today.",
    Icon: WalletIcon,
  },
];

export default function AboutUs() {
  return (
    <section id="about-us" className="bg-[#0a0e17] px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold tracking-wide text-[#FF9F1C] uppercase">About BTTP</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl md:text-[2.75rem] md:leading-tight">
            You&apos;ve already earned these points. We just make them usable.
          </h2>
          <p className="mt-6 max-w-md text-white/50">
            BTTP was built after watching one too many miles expire unused. We connect your
            cards and loyalty programs, tell you what they&apos;re actually worth, and get you
            to redemption before the points quietly disappear.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {pillars.map(({ title, description, Icon }) => (
            <div key={title} className="flex items-start gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#FF9F1C] ring-1 ring-white/10">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-lg font-semibold text-white">{title}</p>
                <p className="mt-1.5 text-white/50">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
