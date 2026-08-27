function LayersIcon({ className }: { className?: string }) {
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
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="M2 12l10 5 10-5" />
      <path d="M2 17l10 5 10-5" />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-3 2v1.5l4.5-1.5 4.5 1.5V21l-3-2v-5.5z" />
    </svg>
  );
}

const pillars = [
  {
    title: "Every Point, One Place",
    description:
      "Link your cards and loyalty programs once. Every point you've earned shows up together instead of scattered across a dozen apps and logins.",
    Icon: LayersIcon,
  },
  {
    title: "The Right Card, Every Time",
    description:
      "We flag when you're about to use the wrong card for a purchase, so you stop earning less than you should on spends you're already making.",
    Icon: TargetIcon,
  },
  {
    title: "Redeem For Real Value",
    description:
      "When it's time to cash in, we compare your redemption options and point you to the one where the same points get you further.",
    Icon: PlaneIcon,
  },
];

export default function AboutUs() {
  return (
    <section id="about-us" className="bg-[#0a0e17] px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="section-eyebrow">About Back to the Points</p>
          <h2 className="section-title text-white">
            Points Have A Point They&apos;re Meant To Take You Places
          </h2>
          <p className="mt-6 max-w-md text-white/50">
            Most people let points expire simply because they lose track of them. Back to
            the Points connects your cards and loyalty programs, shows what each point is
            worth, and helps you redeem before it&apos;s gone.
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
