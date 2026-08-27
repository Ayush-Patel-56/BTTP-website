"use client";

import { useEffect, useRef, useState } from "react";

interface Redemption {
  program: string;
  item: string;
  cash: number;
  points: number;
  unit: "points" | "miles";
}

const redemptions: Redemption[] = [
  {
    program: "Air India Maharaja Club",
    item: "Delhi → Singapore, Economy (one-way)",
    cash: 10710,
    points: 12000,
    unit: "points",
  },
  {
    program: "Singapore Airlines KrisFlyer",
    item: "Delhi → Singapore, Business (one-way, Saver)",
    cash: 65000,
    points: 46000,
    unit: "miles",
  },
  {
    program: "Accor ALL",
    item: "Novotel New Delhi Aerocity, 1 night",
    cash: 12000,
    points: 7000,
    unit: "points",
  },
  {
    program: "Hilton Honors",
    item: "Conrad Bengaluru, 4-course dinner for two",
    cash: 3000,
    points: 10000,
    unit: "points",
  },
  {
    program: "IndiGo BluChip",
    item: "Domestic one-way ticket, peak-demand route",
    cash: 13500,
    points: 22000,
    unit: "points",
  },
];

const AUTOPLAY_MS = 4800;
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Previous redemption" : "Next redemption"}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/50 transition hover:border-white/30 hover:text-white"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

function OptionPanel({
  label,
  value,
  highlight,
  badge,
}: {
  label: string;
  value: string;
  highlight: boolean;
  badge?: string;
}) {
  return (
    <div
      className={`relative flex flex-1 flex-col justify-between rounded-2xl border-2 p-5 sm:p-6 ${
        highlight ? "border-[#FF9F1C] bg-white" : "border-black/10 bg-black/[0.03]"
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-5 rounded-full bg-[#FF9F1C] px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-black uppercase">
          {badge}
        </span>
      )}
      <p className="text-[11px] font-semibold tracking-[0.2em] text-black/35 uppercase">{label}</p>
      <p className={`mt-6 text-3xl font-bold sm:text-4xl ${highlight ? "text-[#141a29]" : "text-black/50"}`}>
        {value}
      </p>
    </div>
  );
}

function ComparisonCard({ entry }: { entry: Redemption }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-[#f7f3ea] shadow-2xl shadow-black/40">
      <div className="p-6 sm:p-10">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.25em] text-black/40 uppercase">
            {entry.program}
          </p>
          <p className="mt-1 text-xl font-bold text-[#141a29] sm:text-2xl">{entry.item}</p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <OptionPanel label="Pay Cash" value={inr(entry.cash)} highlight={false} />
          <OptionPanel
            label="Redeem Points"
            value={`${entry.points.toLocaleString()} ${entry.unit}`}
            highlight
            badge="Use Points"
          />
        </div>
      </div>

      <div className="border-t border-dashed border-black/10 bg-black/[0.03] px-6 py-4 text-center sm:px-10">
        <p className="text-sm font-semibold text-[#141a29]">
          Same trip, {entry.points.toLocaleString()} {entry.unit} instead of {inr(entry.cash)}.
        </p>
      </div>
    </div>
  );
}

export default function LoyaltyBenefits() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % redemptions.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(id);
  }, [paused]);

  const intervalPauseRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  function goTo(index: number) {
    setActiveIndex((index + redemptions.length) % redemptions.length);
    setPaused(true);
    clearTimeout(intervalPauseRef.current);
    intervalPauseRef.current = setTimeout(() => setPaused(false), AUTOPLAY_MS * 2);
  }

  return (
    <section id="loyalty" className="bg-[#0a0e17] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Real Redemptions</p>
          <h2 className="section-title text-white">Same Points Better Trip</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/50">
            Not every redemption gives you the same value. Back to the
            Points helps you compare your options before you move a single
            point.
          </p>
          <p className="mt-2 text-sm font-semibold text-[#FF9F1C]">
            Stop wasting good points on bad redemptions.
          </p>
        </div>

        <div className="mt-14 flex flex-col items-center">
          <div key={activeIndex} className="animate-ticket-in w-full max-w-2xl">
            <ComparisonCard entry={redemptions[activeIndex]} />
          </div>

          <div className="mt-8 flex items-center gap-6">
            <ArrowButton direction="left" onClick={() => goTo(activeIndex - 1)} />
            <div className="flex items-center gap-2">
              {redemptions.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to ${redemptions[index].program}`}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex ? "w-6 bg-[#FF9F1C]" : "w-2 bg-white/15"
                  }`}
                />
              ))}
            </div>
            <ArrowButton direction="right" onClick={() => goTo(activeIndex + 1)} />
          </div>
        </div>
      </div>
    </section>
  );
}
