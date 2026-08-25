"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type CalloutColor = "blue" | "purple" | "cyan" | "dark";

type Callout = {
  text: string;
  top: string;
  side: "left" | "right";
  color: CalloutColor;
};

type Feature = {
  title: string;
  description: string;
  image?: string;
  callouts: Callout[];
};

const PHONE_W = 280;
const PHONE_H = (PHONE_W * 2252) / 1084;

const calloutColors: Record<CalloutColor, string> = {
  blue: "bg-blue-500 text-white",
  purple: "bg-violet-600 text-white",
  cyan: "bg-cyan-400 text-slate-900",
  dark: "bg-slate-800 text-white ring-1 ring-white/10",
};

const calloutStroke: Record<CalloutColor, string> = {
  blue: "rgba(59,130,246,0.7)",
  purple: "rgba(139,92,246,0.7)",
  cyan: "rgba(34,211,238,0.7)",
  dark: "rgba(255,255,255,0.4)",
};

const features: Feature[] = [
  {
    title: "Rewards Dashboard",
    description: "Total rewards value, a breakdown by source, missed-value alerts, and live updates - all in one dashboard.",
    image: "/rewards-dashboard.png",
    callouts: [
      { text: "₹1,84,650 tracked across every card", top: "9%", side: "left", color: "blue" },
      { text: "₹26,200 missed in the last 3 months", top: "32%", side: "right", color: "purple" },
      { text: "18,400 points expiring in 8 days", top: "58%", side: "left", color: "dark" },
      { text: "Cards, airlines & hotels, one screen", top: "80%", side: "right", color: "cyan" },
    ],
  },
  {
    title: "Card Recommendations",
    description: "Know which card to swipe for every purchase, based on what actually earns the most.",
    image: "/recommendation.png",
    callouts: [
      { text: "₹1,66,000 potential yearly returns (3.7%)", top: "12%", side: "right", color: "blue" },
      { text: "3 of 5 cards are realistic for your profile", top: "44%", side: "left", color: "purple" },
      { text: "Tata Neu Infinity: 4x groceries & dining", top: "74%", side: "right", color: "cyan" },
    ],
  },
  {
    title: "Missed Value Alerts",
    description: "Cards that need attention get flagged automatically, so you can pay, redeem or check offers before value slips away.",
    image: "/wallet.png",
    callouts: [
      { text: "12.4K points at risk right now", top: "22%", side: "left", color: "blue" },
      { text: "Needs attention, flagged automatically", top: "48%", side: "right", color: "dark" },
      { text: "HDFC Infinia: ₹82,400 in points", top: "72%", side: "left", color: "purple" },
      { text: "Pay, check offers, or redeem — per card", top: "85%", side: "right", color: "cyan" },
    ],
  },
  {
    title: "Point Transfers",
    description: "Move points between programs and let the app work out the conversion math.",
    callouts: [
      { text: "Axis Magnus → Etihad transfer ratio?", top: "16%", side: "right", color: "dark" },
      { text: "Smarter to transfer now, or wait for a bonus?", top: "48%", side: "left", color: "blue" },
      { text: "Move points without doing the math yourself", top: "78%", side: "right", color: "purple" },
    ],
  },
  {
    title: "Trip Planner",
    description: "Search flights and hotels yourself, or tell us where you want to go and let the app plan it.",
    image: "/travel.png",
    callouts: [
      { text: "Search it yourself, or let us plan it for you", top: "14%", side: "left", color: "blue" },
      { text: "Bangalore → Singapore, set in seconds", top: "36%", side: "right", color: "dark" },
      { text: "One tap to search flights across the trip", top: "67%", side: "left", color: "purple" },
      { text: "Popular routes, ready to search instantly", top: "83%", side: "right", color: "cyan" },
    ],
  },
  {
    title: "Quick Pay",
    description: "Pay off credit card bills and rent right from inside the app.",
    callouts: [
      { text: "Pay your card bill without leaving the app", top: "25%", side: "right", color: "purple" },
      { text: "Rent, EMIs & bills — one tap away", top: "65%", side: "left", color: "blue" },
    ],
  },
];

function PhoneFrame({
  image,
  title,
  className = "w-[180px]",
}: {
  image?: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[1084/2252] drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)] ${className}`}>
      <div
        className={`absolute overflow-hidden ${
          image ? "bg-white" : "bg-gradient-to-b from-white/10 via-white/5 to-white/[0.02]"
        }`}
        style={{
          top: "1.5986%",
          left: "3.3210%",
          right: "3.4133%",
          bottom: "1.5986%",
          borderRadius: "13.80% / 6.40%",
        }}
      >
        {image ? (
          <div className="absolute inset-0 origin-top scale-[0.94]">
            <Image
              src={image}
              alt={`${title} screen in the Back to the Points app`}
              fill
              unoptimized
              className="object-cover object-top"
            />
          </div>
        ) : (
          <div className="absolute inset-x-3 top-5 animate-pulse space-y-4">
            <div className="h-2.5 w-2/3 rounded-full bg-white/15" />
            <div className="h-2 w-1/2 rounded-full bg-white/10" />
            <div className="mt-5 h-20 rounded-2xl bg-white/10" />
            <div className="h-2 w-full rounded-full bg-white/10" />
            <div className="h-2 w-3/4 rounded-full bg-white/10" />
          </div>
        )}
      </div>
      <Image
        src="/phone-frame.png"
        alt=""
        aria-hidden
        fill
        unoptimized
        className="pointer-events-none object-contain"
      />
    </div>
  );
}

function CalloutBubble({ callout, index }: { callout: Callout; index: number }) {
  const isLeft = callout.side === "left";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.9 }}
      transition={{ duration: 0.35, delay: 0.08 + index * 0.06 }}
      className={`absolute w-max max-w-[210px] rounded-2xl px-4 py-2.5 text-sm leading-snug font-medium shadow-lg shadow-black/30 ${
        calloutColors[callout.color]
      } ${isLeft ? "text-right" : "text-left"}`}
      style={{
        top: callout.top,
        [isLeft ? "right" : "left"]: "calc(100% + 44px)",
      }}
    >
      {callout.text}
    </motion.div>
  );
}

function CalloutConnector({ callout, index }: { callout: Callout; index: number }) {
  const isLeft = callout.side === "left";
  const y = (parseFloat(callout.top) / 100) * PHONE_H + 18;
  const x1 = isLeft ? 0 : PHONE_W;
  const x2 = isLeft ? -38 : PHONE_W + 38;
  const midX = isLeft ? -14 : PHONE_W + 14;
  const midX2 = isLeft ? -28 : PHONE_W + 28;
  const d = `M ${x1} ${y} C ${midX} ${y - 24}, ${midX2} ${y + 22}, ${x2} ${y - 4}`;
  const stroke = calloutStroke[callout.color];

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.05 + index * 0.06 }}
    >
      <circle cx={x1} cy={y} r={3} fill={stroke} />
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={1.75}
        strokeDasharray="4 6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.05 + index * 0.06, ease: "easeOut" }}
      />
      <circle cx={x2} cy={y - 4} r={2.5} fill={stroke} />
    </motion.g>
  );
}

function FeatureTabs({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-4">
      {features.map((feature, index) => (
        <button
          key={feature.title}
          type="button"
          onClick={() => onSelect(index)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            index === activeIndex
              ? "bg-[#FF9F1C] text-black"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          {feature.title}
        </button>
      ))}
    </div>
  );
}

export default function AiSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = features[activeIndex];

  return (
    <section id="what-we-do" className="relative overflow-hidden bg-[#0B1220] px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF9F1C]/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 h-[420px] w-[420px] translate-x-1/3 translate-y-1/3 rounded-full bg-blue-500/10 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-wide text-[#FF9F1C] uppercase">
          What We Do
        </p>
        <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
          Your Personal Points Nerd. So You Don&apos;t Have To Become One.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          Your points are worth more than you think. Bring your credit card
          rewards, airline miles and hotel points together and discover what
          they can actually get you.
        </p>
      </div>

      <div className="relative z-10 mt-10">
        <FeatureTabs activeIndex={activeIndex} onSelect={setActiveIndex} />
      </div>

      {/* Desktop: phone with floating callout bubbles */}
      <div className="relative z-10 mt-16 hidden justify-center lg:flex">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-[280px]"
          >
            <PhoneFrame image={active.image} title={active.title} className="w-full" />
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              viewBox={`0 0 ${PHONE_W} ${PHONE_H}`}
            >
              {active.callouts.map((callout, index) => (
                <CalloutConnector key={callout.text} callout={callout} index={index} />
              ))}
            </svg>
            {active.callouts.map((callout, index) => (
              <CalloutBubble key={callout.text} callout={callout} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile / tablet: phone with callout chips stacked below */}
      <div className="relative z-10 mt-12 flex flex-col items-center lg:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center"
          >
            <PhoneFrame image={active.image} title={active.title} className="w-[220px]" />
            <div className="mt-6 flex flex-wrap justify-center gap-2 px-4">
              {active.callouts.map((callout) => (
                <span
                  key={callout.text}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ${calloutColors[callout.color]}`}
                >
                  {callout.text}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 mx-auto mt-10 max-w-xl px-6 text-center">
        <h3 className="text-xl font-semibold text-white">{active.title}</h3>
        <p className="mt-2 text-white/60">{active.description}</p>
      </div>
    </section>
  );
}
