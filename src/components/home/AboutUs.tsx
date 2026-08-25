function TagIcon({ className }: { className?: string }) {
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
      <path d="M12.6 2H4a2 2 0 0 0-2 2v8.6a2 2 0 0 0 .59 1.41l9.4 9.4a2 2 0 0 0 2.82 0l6.6-6.6a2 2 0 0 0 0-2.82l-9.4-9.4A2 2 0 0 0 12.6 2Z" />
      <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
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
      <path d="M12 7v5l3.5 2" />
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
    title: "Know What It's Worth",
    description: "You always know what your points are worth. No hidden math, no guesswork.",
    Icon: TagIcon,
  },
  {
    title: "We Track The Details",
    description: "We watch your balances and expiry dates in the background so you don't have to.",
    Icon: ClockIcon,
  },
  {
    title: "Bookable, Not Just Visible",
    description: "Suggestions are tied to real flights and hotel nights, things you can actually book.",
    Icon: PlaneIcon,
  },
];

export default function AboutUs() {
  return (
    <section id="about-us" className="bg-[#0a0e17] px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold tracking-wide text-[#FF9F1C] uppercase">About Back to the Points</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl md:text-[2.75rem] md:leading-tight">
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
