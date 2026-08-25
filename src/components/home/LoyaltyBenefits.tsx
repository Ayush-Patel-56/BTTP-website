"use client";

import { useEffect, useRef, useState } from "react";

interface Redemption {
  program: string;
  points: number;
  benefit: string;
}

const redemptions: Redemption[] = [
  { program: "Air India Maharaja", points: 40000, benefit: "Economy return to Dubai" },
  { program: "British Airways Executive Club", points: 60000, benefit: "Business class to London" },
  { program: "Marriott Bonvoy", points: 85000, benefit: "3 nights, Maldives overwater villa" },
  { program: "Hilton Honors", points: 95000, benefit: "4 nights, Bali beach resort" },
  { program: "Emirates Skywards", points: 65000, benefit: "Business class to Dubai" },
  { program: "Singapore Airlines KrisFlyer", points: 55000, benefit: "Premium economy to Singapore" },
  { program: "IHG One Rewards", points: 70000, benefit: "3 nights, Bangkok city hotel" },
  { program: "Qatar Airways Privilege Club", points: 75000, benefit: "Business class to Doha" },
  { program: "ALL – Accor Live Limitless", points: 50000, benefit: "2 nights, Paris luxury suite" },
  { program: "United MileagePlus", points: 45000, benefit: "Economy return to New York" },
];

const AUTOPLAY_MS = 4200;

function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.8V22l3.5-1 3.5 1v-1.2L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

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

function Barcode() {
  const bars = [2, 1, 3, 1, 1, 4, 2, 1, 3, 2, 1, 1, 4, 1, 2, 3, 1, 2, 1, 4, 2, 1, 3, 1];
  return (
    <div className="flex h-16 items-stretch gap-[2px] sm:h-20">
      {bars.map((width, index) => (
        <span key={index} className="bg-[#1c1a15]/70" style={{ width: `${width}px` }} />
      ))}
    </div>
  );
}

function TicketCard({ entry, index }: { entry: Redemption; index: number }) {
  return (
    <div className="flex overflow-hidden rounded-2xl bg-[#f7f3ea] shadow-2xl shadow-black/40">
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] text-black/40 uppercase">
              Loyalty Program
            </p>
            <p className="mt-1 text-xl font-bold text-[#141a29] sm:text-2xl">{entry.program}</p>
          </div>
          <PlaneIcon className="h-6 w-6 shrink-0 text-[#FF9F1C]" />
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-end sm:gap-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] text-black/40 uppercase">
              Redeem
            </p>
            <p className="mt-1 text-2xl font-bold text-[#FF9F1C] sm:text-3xl">
              {entry.points.toLocaleString()} pts
            </p>
          </div>
          <div className="hidden flex-1 items-center gap-1 pb-2 text-black/20 sm:flex">
            <span className="h-px flex-1 border-t-2 border-dashed border-black/15" />
            <PlaneIcon className="h-3.5 w-3.5 shrink-0" />
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] text-black/40 uppercase">
              Receive
            </p>
            <p className="mt-1 text-xl font-bold text-[#141a29] sm:text-2xl">{entry.benefit}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-dashed border-black/10 pt-4 text-[10px] font-medium tracking-widest text-black/30 uppercase">
          <span>Ticket {String(index + 1).padStart(2, "0")} / {redemptions.length}</span>
          <span>Valid on partner redemption</span>
        </div>
      </div>

      <div className="relative w-0">
        <div className="h-full border-l-2 border-dashed border-black/15" />
        <span className="absolute top-0 left-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0a0e17]" />
        <span className="absolute bottom-0 left-0 h-6 w-6 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#0a0e17]" />
      </div>

      <div className="flex w-14 shrink-0 flex-col items-center justify-between bg-[#efe9db] p-3 sm:w-16">
        <Barcode />
        <span className="-rotate-90 text-[9px] font-semibold tracking-[0.3em] whitespace-nowrap text-black/30 uppercase">
          BTTP Rewards
        </span>
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
          <p className="text-sm font-semibold tracking-wide text-[#FF9F1C] uppercase">
            Real Redemptions
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Same Points Better Trip
          </h2>
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
            <TicketCard entry={redemptions[activeIndex]} index={activeIndex} />
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
