"use client";

import { useEffect, useRef, useState } from "react";

interface RedemptionOption {
  label: string;
  value: number;
}

interface Redemption {
  program: string;
  points: number;
  optionA: RedemptionOption;
  optionB: RedemptionOption;
}

const redemptions: Redemption[] = [
  {
    program: "Air India Maharaja",
    points: 40000,
    optionA: { label: "Economy return, Dubai", value: 18400 },
    optionB: { label: "Upgrade existing Dubai booking to Business", value: 34000 },
  },
  {
    program: "British Airways Executive Club",
    points: 60000,
    optionA: { label: "Reward flight, Business to London", value: 52200 },
    optionB: { label: "Cash + points on the same route", value: 21000 },
  },
  {
    program: "Marriott Bonvoy",
    points: 85000,
    optionA: { label: "3 nights, Maldives overwater villa", value: 68000 },
    optionB: { label: "Transferred to airline miles", value: 29750 },
  },
  {
    program: "Hilton Honors",
    points: 95000,
    optionA: { label: "4 nights, Bali beach resort", value: 42750 },
    optionB: { label: "2 nights, Bali overwater suite", value: 57000 },
  },
  {
    program: "Emirates Skywards",
    points: 65000,
    optionA: { label: "Business class, Dubai", value: 58500 },
    optionB: { label: "Economy Dubai + upgrade voucher", value: 26000 },
  },
  {
    program: "Singapore Airlines KrisFlyer",
    points: 55000,
    optionA: { label: "Premium economy, Singapore", value: 33000 },
    optionB: { label: "Transferred to a hotel partner, 3 nights", value: 44000 },
  },
  {
    program: "United MileagePlus",
    points: 45000,
    optionA: { label: "Economy return, New York", value: 31500 },
    optionB: { label: "Partner redemption, Business short-haul", value: 49500 },
  },
  {
    program: "Qatar Airways Privilege Club",
    points: 75000,
    optionA: { label: "Business class, Doha", value: 67500 },
    optionB: { label: "Hotel stay via partner transfer", value: 30000 },
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
  option,
  isBetter,
}: {
  label: string;
  option: RedemptionOption;
  isBetter: boolean;
}) {
  return (
    <div
      className={`relative flex flex-1 flex-col justify-between rounded-2xl border-2 p-5 sm:p-6 ${
        isBetter
          ? "border-[#FF9F1C] bg-white"
          : "border-black/10 bg-black/[0.03]"
      }`}
    >
      {isBetter && (
        <span className="absolute -top-3 left-5 rounded-full bg-[#FF9F1C] px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-black uppercase">
          Better value
        </span>
      )}
      <div>
        <p className="text-[11px] font-semibold tracking-[0.2em] text-black/35 uppercase">{label}</p>
        <p className={`mt-1.5 text-base font-semibold sm:text-lg ${isBetter ? "text-[#141a29]" : "text-black/50"}`}>
          {option.label}
        </p>
      </div>
      <p className={`mt-6 text-3xl font-bold sm:text-4xl ${isBetter ? "text-[#141a29]" : "text-black/35"}`}>
        {inr(option.value)}
      </p>
    </div>
  );
}

function ComparisonCard({ entry }: { entry: Redemption }) {
  const aIsBetter = entry.optionA.value >= entry.optionB.value;
  const delta = Math.abs(entry.optionA.value - entry.optionB.value);

  return (
    <div className="overflow-hidden rounded-3xl bg-[#f7f3ea] shadow-2xl shadow-black/40">
      <div className="p-6 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] text-black/40 uppercase">
              Loyalty Program
            </p>
            <p className="mt-1 text-xl font-bold text-[#141a29] sm:text-2xl">{entry.program}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-black/40 uppercase">
              Points
            </p>
            <p className="mt-1 text-xl font-bold text-[#FF9F1C] sm:text-2xl">
              {entry.points.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <OptionPanel label="Option A" option={entry.optionA} isBetter={aIsBetter} />
          <OptionPanel label="Option B" option={entry.optionB} isBetter={!aIsBetter} />
        </div>
      </div>

      <div className="border-t border-dashed border-black/10 bg-black/[0.03] px-6 py-4 text-center sm:px-10">
        <p className="text-sm font-semibold text-[#141a29]">
          Same {entry.points.toLocaleString()} points, {inr(delta)} apart.
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
