"use client";

import { useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
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
  const stickyOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  // Framer Motion doesn't reliably flush a decreasing-output style() binding
  // to the DOM once the source value settles at its clamped end (verified
  // via a direct DOM read after scroll settles: the internal motion value
  // reaches 0 correctly, but style.opacity stays stuck at 1). Writing it by
  // hand on every change sidesteps that.
  useMotionValueEvent(textOpacity, "change", (v) => {
    if (textRef.current) textRef.current.style.opacity = String(v);
  });
  // Without this, the blurred video's last residual pixels linger across
  // the top of the viewport for a few scroll-pixels after the sticky pin
  // releases, overlapping the next section beneath it.
  useMotionValueEvent(stickyOpacity, "change", (v) => {
    if (stickyRef.current) stickyRef.current.style.opacity = String(v);
  });

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-[#0B1220]">
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden border-b border-black/10 px-6 text-center"
      >
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
          className="relative mx-auto flex max-w-5xl flex-col items-center"
          style={{ scale: textScale }}
        >
          <h1 className="hero-reveal text-balance text-5xl leading-tight font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-6xl md:text-7xl">
            You Wouldn&apos;t Ignore ₹50,000 In Your Bank Account
            <br className="hidden sm:block" /> Why Ignore It In Points?
          </h1>
          <p className="hero-reveal hero-reveal-delay-1 mt-8 text-2xl font-medium text-white/80 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] sm:text-3xl">
            You Earned The Points Now Make Them Count
          </p>
          <p className="hero-reveal hero-reveal-delay-1 mt-5 max-w-2xl text-lg leading-relaxed text-white/60 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] sm:text-xl">
            Back to the Points turns scattered credit card rewards, miles and
            hotel points into real value and experiences
          </p>
        </motion.div>
      </div>
    </section>
  );
}
