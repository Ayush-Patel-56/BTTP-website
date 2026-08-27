"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

type CalloutColor = "blue" | "purple" | "cyan" | "dark";

type Callout = {
  text: string;
  top: string;
  side: "left" | "right";
  color: CalloutColor;
  /** How far into the phone screen (0-100% of phone width) the pointer line reaches, to land on the specific UI element being called out. */
  targetX?: number;
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
    description:
      "See every credit card, airline mile and hotel point in one place. Track exactly what your rewards are worth right now, catch value you're about to lose, and get nudged before anything expires.",
    image: "/rewards-dashboard.png",
    callouts: [
      { text: "Total rewards value, tracked across every card", top: "17%", side: "left", color: "blue" },
      { text: "Cards, airlines and hotels, all on one screen", top: "34%", side: "right", color: "cyan" },
      { text: "Flags the value you missed in recent months", top: "48%", side: "left", color: "purple" },
      { text: "Surfaces points expiring soon, before they lapse", top: "85%", side: "right", color: "dark" },
    ],
  },
  {
    title: "Card Recommendations",
    description:
      "Compares every card you hold against how you actually spend, then ranks them by what they'd realistically earn you — so you always know which one to swipe, for every category.",
    image: "/recommendation.png",
    callouts: [
      { text: "Estimated yearly returns across your spending", top: "33%", side: "right", color: "blue" },
      { text: "Ranks which cards genuinely fit your profile", top: "45%", side: "left", color: "purple" },
      { text: "Best card for each category, like dining or groceries", top: "68%", side: "right", color: "cyan" },
    ],
  },
  {
    title: "Missed Value Alerts",
    description:
      "Keeps watch over every card so nothing quietly expires. Cards that need attention get flagged automatically, with one tap to pay, redeem or check offers before that value is gone.",
    image: "/wallet.png",
    callouts: [
      { text: "Points at risk of expiring unused", top: "20%", side: "left", color: "blue", targetX: 65 },
      {
        text: "Cards needing attention, flagged automatically",
        top: "43%",
        side: "right",
        color: "dark",
        targetX: 80,
      },
      { text: "One tap to pay, redeem or check offers", top: "78%", side: "right", color: "cyan", targetX: 78 },
    ],
  },
  {
    title: "Trip Planner",
    description:
      "Search flights and hotels yourself, or tell the app where you want to go and let it build the route. Compare options across the whole trip without switching tabs.",
    image: "/travel.png",
    callouts: [
      { text: "Finds the best-value flights and hotels for you", top: "13%", side: "left", color: "blue" },
      { text: "Popular routes, ready to search instantly", top: "75%", side: "right", color: "cyan" },
    ],
  },
  {
    title: "Smart Optimisation",
    description:
      "Goes through your spending transaction by transaction, shows exactly how much value you left on the table, and points out which card would have earned more each time.",
    image: "/optimize.png",
    callouts: [
      { text: "Every transaction checked for the wrong card used", top: "37%", side: "right", color: "dark" },
      { text: "Shows which card would've earned more, each time", top: "82%", side: "left", color: "blue" },
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
          <div className="absolute inset-x-[3%] top-0 bottom-0">
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
  const targetXPct = callout.targetX ?? (isLeft ? 24 : 76);
  const x1 = (targetXPct / 100) * PHONE_W;
  const x2 = isLeft ? -38 : PHONE_W + 38;
  const dx = x2 - x1;
  const bend = Math.max(6, Math.min(16, Math.abs(dx) * 0.16));
  const cx = x1 + dx * 0.5;
  const cy = y - bend;
  const y2 = y - 2;
  const d = `M ${x1} ${y} Q ${cx} ${cy}, ${x2} ${y2}`;
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
      <circle cx={x2} cy={y2} r={2.5} fill={stroke} />
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
  const [mobileIndex, setMobileIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const active = features[activeIndex];
  const mobileActive = features[mobileIndex];

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(features.length - 1, Math.max(0, Math.floor(value * features.length)));
    setActiveIndex((prev) => (prev === index ? prev : index));
  });

  const goToIndex = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const trackTop = el.getBoundingClientRect().top + window.scrollY;
    const trackHeight = el.offsetHeight - window.innerHeight;
    const targetProgress = (index + 0.5) / features.length;
    window.scrollTo({ top: trackTop + targetProgress * trackHeight, behavior: "smooth" });
  };

  return (
    <section id="what-we-do" className="relative bg-[#0B1220] px-6 py-24">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[700px] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF9F1C]/10 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] translate-x-1/3 translate-y-1/3 rounded-full bg-blue-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center lg:mb-16">
        <p className="section-eyebrow">What We Do</p>
        <h2 className="section-title text-white">
          Your Personal Points Nerd, So You Don&apos;t Have To Be One
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          Your points are worth more than you think. Bring your credit card
          rewards, airline miles and hotel points together and discover what
          they can actually get you.
        </p>
      </div>

      {/* Desktop: scroll-driven pinned showcase — scrolling through the
          track steps through each feature instead of just fading on click */}
      <div ref={trackRef} className="relative z-10 hidden lg:block" style={{ height: `${features.length * 100}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center">
          <FeatureTabs activeIndex={activeIndex} onSelect={goToIndex} />

          <div className="relative mt-16 flex justify-center">
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

          <div className="relative z-10 mx-auto mt-10 max-w-xl px-6 text-center">
            <h3 className="text-xl font-semibold text-white">{active.title}</h3>
            <p className="mt-2 text-white/60">{active.description}</p>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: manual tabs, phone with callout chips stacked below */}
      <div className="relative z-10 mt-10 lg:hidden">
        <FeatureTabs activeIndex={mobileIndex} onSelect={setMobileIndex} />

        <div className="mt-8 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileActive.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center"
            >
              <PhoneFrame image={mobileActive.image} title={mobileActive.title} className="w-[170px]" />
              <div className="mt-4 flex max-w-[280px] flex-wrap justify-center gap-1.5">
                {mobileActive.callouts.map((callout) => (
                  <span
                    key={callout.text}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${calloutColors[callout.color]}`}
                  >
                    {callout.text}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 mx-auto mt-8 max-w-xl px-6 text-center">
          <h3 className="text-xl font-semibold text-white">{mobileActive.title}</h3>
          <p className="mt-2 text-white/60">{mobileActive.description}</p>
        </div>
      </div>
    </section>
  );
}
