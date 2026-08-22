"use client";

import { useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const videoBlur = useTransform(scrollYProgress, (p) => `blur(${p * 16}px)`);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.6]);
  const textScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.45]);
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.75], [1, 0]);

  // Framer Motion doesn't reliably flush a decreasing-output style() binding
  // to the DOM once the source value settles at its clamped end (verified
  // via a direct DOM read after scroll settles: the internal motion value
  // reaches 0 correctly, but style.opacity stays stuck at 1). Writing it by
  // hand on every change sidesteps that.
  useMotionValueEvent(textOpacity, "change", (v) => {
    if (textRef.current) textRef.current.style.opacity = String(v);
  });

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden border-b border-black/10 px-6 text-center">
        <motion.video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ scale: videoScale, filter: videoBlur }}
          autoPlay
          muted
          loop
          playsInline
          src="/hero-boat.mp4"
        />
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
        <motion.div
          ref={textRef}
          className="relative mx-auto max-w-4xl"
          style={{ scale: textScale }}
        >
          <h1 className="hero-reveal text-5xl font-semibold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-6xl md:text-7xl">
            Stop losing rewards you already earned
          </h1>
          <p className="hero-reveal hero-reveal-delay-1 mt-4 text-xl text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] sm:text-2xl">
            Never lose a point, miss a perk, or swipe the wrong card again
          </p>
        </motion.div>
      </div>
    </section>
  );
}
