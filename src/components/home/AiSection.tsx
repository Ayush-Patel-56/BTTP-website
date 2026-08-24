"use client";

import { useEffect, useRef } from "react";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const features = [
  {
    title: "Rewards Dashboard",
    description: "See every point sitting across your cards, airlines, and hotel accounts, all on one screen.",
  },
  {
    title: "Missed Value Alerts",
    description: "Get flagged the moment a reward is about to expire unused.",
  },
  {
    title: "Card Recommendations",
    description: "Know which card to swipe for every purchase, based on what actually earns the most.",
  },
  {
    title: "Point Transfers",
    description: "Move points between programs and let the app work out the conversion math.",
  },
  {
    title: "Trip Planner",
    description: "Turn a points balance sitting in an account into an actual trip you can book.",
  },
  {
    title: "Quick Pay",
    description: "Pay off credit card bills and rent right from inside the app.",
  },
];

function PhoneFrame() {
  return (
    <div className="rounded-[2.75rem] border-[10px] border-neutral-800 bg-neutral-800 p-1.5 shadow-2xl shadow-black/40">
      <div className="relative h-3 w-full">
        <span className="absolute top-0 left-1/2 h-3 w-24 -translate-x-1/2 rounded-b-xl bg-neutral-800" />
      </div>
      <div className="relative aspect-[9/19.5] w-[180px] overflow-hidden rounded-[2rem] bg-gradient-to-b from-white/10 via-white/5 to-white/[0.02]">
        <div className="absolute inset-x-5 top-7 animate-pulse space-y-4">
          <div className="h-2.5 w-2/3 rounded-full bg-white/15" />
          <div className="h-2 w-1/2 rounded-full bg-white/10" />
          <div className="mt-5 h-20 rounded-2xl bg-white/10" />
          <div className="h-2 w-full rounded-full bg-white/10" />
          <div className="h-2 w-3/4 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function PhoneCard({
  feature,
  index,
  count,
  scrollYProgress,
}: {
  feature: (typeof features)[number];
  index: number;
  count: number;
  scrollYProgress: MotionValue<number>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const start = index / count;
  const mid = (index + 0.5) / count;
  const end = (index + 1) / count;

  const scale = useTransform(scrollYProgress, [start, mid, end], [0.88, 1, 0.88]);
  const opacity = useTransform(scrollYProgress, [start, mid, end], [0.4, 1, 0.4]);

  // See Hero.tsx: a useTransform whose output range decreases doesn't
  // reliably flush through the style prop once it settles at its clamped
  // end. Writing scale/opacity to the DOM by hand sidesteps that.
  useMotionValueEvent(scale, "change", (v) => {
    if (cardRef.current) cardRef.current.style.transform = `scale(${v})`;
  });
  useMotionValueEvent(opacity, "change", (v) => {
    if (cardRef.current) cardRef.current.style.opacity = String(v);
  });

  return (
    <div
      ref={cardRef}
      className="flex w-[260px] shrink-0 flex-col items-center text-center"
    >
      <PhoneFrame />
      <h3 className="mt-8 text-xl font-semibold text-white">{feature.title}</h3>
      <p className="mt-2 text-sm text-white/60">{feature.description}</p>
    </div>
  );
}

function DesktopGallery({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const trackWrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const maxDistance = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const trackX = useTransform(scrollYProgress, (p) => -p * maxDistance.current);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(trackX, "change", (v) => {
    if (trackRef.current) trackRef.current.style.transform = `translateX(${v}px)`;
  });
  useMotionValueEvent(progressWidth, "change", (v) => {
    if (progressRef.current) progressRef.current.style.width = v;
  });

  useEffect(() => {
    function measure() {
      if (!trackRef.current || !trackWrapRef.current) return;
      maxDistance.current = Math.max(
        0,
        trackRef.current.scrollWidth - trackWrapRef.current.clientWidth
      );
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="relative hidden h-screen flex-col items-center justify-center gap-12 overflow-hidden sm:flex">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF9F1C]/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 h-[420px] w-[420px] translate-x-1/3 translate-y-1/3 rounded-full bg-blue-500/10 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <p className="text-sm font-semibold tracking-wide text-[#FF9F1C] uppercase">
          What We Do
        </p>
        <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
          Your Personal Points Nerd. So You Don&apos;t Have To Become One.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-white/60">
          Your points are worth more than you think. Bring your credit card
          rewards, airline miles and hotel points together and discover what
          they can actually get you.
        </p>
        <div className="mx-auto mt-8 h-1 w-40 overflow-hidden rounded-full bg-white/10">
          <div ref={progressRef} className="h-full rounded-full bg-[#FF9F1C]" />
        </div>
      </div>

      <div ref={trackWrapRef} className="relative z-10 w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-16 pl-6 will-change-transform sm:pl-[max(1.5rem,calc((100vw-64rem)/2))]"
        >
          {features.map((feature, index) => (
            <PhoneCard
              key={feature.title}
              feature={feature}
              index={index}
              count={features.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
          <div className="w-6 shrink-0 sm:w-[max(1.5rem,calc((100vw-64rem)/2))]" />
        </div>
      </div>
    </div>
  );
}

export default function AiSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="what-we-do" className="relative bg-[#0B1220] px-6 py-24">
      <div className="relative mx-auto max-w-5xl text-center sm:hidden">
        <p className="text-sm font-semibold tracking-wide text-[#FF9F1C] uppercase">
          What We Do
        </p>
        <h2 className="mt-3 text-4xl font-bold text-white">
          Everything you need to actually use your rewards.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-white/60">
          Here&apos;s a quick look at everything the app does, from tracking
          every point to catching the ones you&apos;re about to lose.
        </p>
      </div>

      <div ref={containerRef} className="relative hidden h-[400vh] sm:block">
        <div className="sticky top-0">
          <DesktopGallery containerRef={containerRef} />
        </div>
      </div>

      <div className="relative z-10 mt-12 -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 sm:hidden">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex w-[220px] shrink-0 snap-center flex-col items-center text-center"
          >
            <PhoneFrame />
            <h3 className="mt-6 text-lg font-semibold text-white">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-white/60">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
