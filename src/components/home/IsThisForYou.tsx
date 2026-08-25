"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";

const items = [
  {
    number: "01",
    titleTop: "Your Points Are",
    titleBottom: "Scattered Everywhere",
    description:
      "A bit on this card, a bit on that program, each with its own expiry date nobody's tracking.",
  },
  {
    number: "02",
    titleTop: "You Don't Know",
    titleBottom: "What Your Points Are Worth",
    description:
      "You've got points sitting on every card statement and honestly, you've never worked out what any of it is actually worth.",
  },
  {
    number: "03",
    titleTop: "You Don't Know",
    titleBottom: "How To Redeem Them",
    description:
      "Move points to the wrong partner, or time it badly, and they're gone for good. You want a way to know you're making the right call.",
  },
  {
    number: "04",
    titleTop: "No Single Dashboard",
    titleBottom: "For All Your Points",
    description:
      "Your cards, airlines and hotels all live in separate apps with separate logins. There's nowhere to see everything you've earned in one place.",
  },
  {
    number: "05",
    titleTop: "You Don't Know How To",
    titleBottom: "Fly Business On Points",
    description:
      "You've watched other people do it and figured it takes connections or luck. It really just takes knowing the system.",
  },
];

const DOT_DASH = 5;
const DOT_GAP = 7;
const DOT_CYCLE = DOT_DASH + DOT_GAP;

function buildDashArray(totalLength: number, progress: number) {
  const revealedLength = totalLength * progress;
  if (revealedLength <= 0) return `0 ${totalLength + 1}`;

  const fullCycles = Math.floor(revealedLength / DOT_CYCLE);
  const remainder = revealedLength - fullCycles * DOT_CYCLE;
  // Every entry is pushed as a (dash, gap) pair so the list length is always
  // even — SVG duplicates an odd-length dasharray, which corrupts the
  // trailing "hide the rest" gap into a visible solid stretch.
  const parts: number[] = [];
  for (let i = 0; i < fullCycles; i++) parts.push(DOT_DASH, DOT_GAP);
  if (remainder <= DOT_DASH) parts.push(remainder, 0);
  else parts.push(DOT_DASH, remainder - DOT_DASH);
  parts.push(0, totalLength + 1);

  return parts.join(" ");
}

export default function IsThisForYou() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const pathLengths = useRef<number[]>([]);
  const dotDocY = useRef<number[]>([]);
  const revealedRef = useRef<boolean[]>(items.map((_, i) => i === 0));
  const [segments, setSegments] = useState<string[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>(
    items.map((_, i) => i === 0)
  );

  useEffect(() => {
    function computePath() {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const points = dotRefs.current
        .filter((el): el is HTMLSpanElement => Boolean(el))
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top,
          };
        });

      if (points.length < 2) {
        setSegments([]);
        return;
      }

      const nextSegments: string[] = [];
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        nextSegments.push(
          `M ${prev.x} ${prev.y} Q ${curr.x} ${prev.y}, ${curr.x} ${curr.y}`
        );
      }
      setSegments(nextSegments);
    }

    computePath();
    window.addEventListener("resize", computePath);
    return () => window.removeEventListener("resize", computePath);
  }, []);

  // Reference line, as a fraction of viewport height, that each dot's reveal
  // is measured against. Raw scroll position feeds a spring (Framer Motion's
  // useSpring) instead of driving the draw directly, so the line keeps
  // gliding smoothly toward its target even after the scroll gesture stops —
  // rather than freezing instantly on the last scroll event.
  const ANCHOR_FRACTION = 0.72;
  const rawAnchor = useMotionValue(0);
  const smoothAnchor = useSpring(rawAnchor, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.5,
  });

  useEffect(() => {
    function measure() {
      pathLengths.current = pathRefs.current.map(
        (path) => path?.getTotalLength() ?? 0
      );
      dotDocY.current = dotRefs.current.map((dot) => {
        if (!dot) return 0;
        const rect = dot.getBoundingClientRect();
        return rect.top + rect.height / 2 + window.scrollY;
      });
    }

    function currentAnchor() {
      return window.scrollY + window.innerHeight * ANCHOR_FRACTION;
    }

    measure();
    rawAnchor.set(currentAnchor());
    smoothAnchor.jump(currentAnchor());

    function onScroll() {
      rawAnchor.set(currentAnchor());
    }

    function onResize() {
      measure();
      rawAnchor.set(currentAnchor());
      smoothAnchor.jump(currentAnchor());
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [segments, rawAnchor, smoothAnchor]);

  useMotionValueEvent(smoothAnchor, "change", (anchorDocY) => {
    let revealedChanged = false;
    const nextRevealed = revealedRef.current.slice();

    pathRefs.current.forEach((path, index) => {
      const totalLength = pathLengths.current[index];
      const startY = dotDocY.current[index];
      const endY = dotDocY.current[index + 1];
      if (!path || !totalLength || startY === endY) return;

      const rawProgress = (anchorDocY - startY) / (endY - startY);
      const progress = Math.min(1, Math.max(0, rawProgress));

      path.style.strokeDasharray = buildDashArray(totalLength, progress);
      path.style.markerEnd = progress > 0.97 ? "url(#connector-arrow)" : "none";

      const itemIndex = index + 1;
      if (progress >= 0.92 && !nextRevealed[itemIndex]) {
        nextRevealed[itemIndex] = true;
        revealedChanged = true;
      } else if (progress < 0.3 && nextRevealed[itemIndex]) {
        nextRevealed[itemIndex] = false;
        revealedChanged = true;
      }
    });

    if (revealedChanged) {
      revealedRef.current = nextRevealed;
      setRevealed(nextRevealed);
    }
  });

  return (
    <section className="bg-[#0B1220] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-16 text-center text-4xl font-bold text-white sm:text-5xl">
          Is This For You?
        </h2>
        <div
          ref={containerRef}
          className="relative grid grid-cols-1 gap-y-16 sm:grid-cols-[1fr_2px_1fr] sm:gap-x-10 sm:gap-y-20"
        >
          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block">
            <defs>
              <marker
                id="connector-arrow"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="#FF9F1C" />
              </marker>
            </defs>
            {segments.map((d, index) => (
              <path
                key={index}
                ref={(el) => {
                  pathRefs.current[index] = el;
                }}
                d={d}
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="0 100000"
                markerEnd="none"
              />
            ))}
          </svg>
          {items.map((item, index) => {
            const alignRight = index % 2 === 1;
            const isRevealed = index === 0 || revealed[index];
            return (
              <div
                key={item.number}
                style={{ gridRow: index + 1 }}
                className={`relative transition-all duration-700 ease-out ${
                  alignRight
                    ? "sm:col-start-3 sm:pl-10 sm:text-right"
                    : "sm:col-start-1 sm:pr-10 sm:text-left"
                } ${
                  isRevealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <div
                  className={`flex items-center gap-2 ${
                    alignRight ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <span
                    ref={(el) => {
                      dotRefs.current[index] = el;
                    }}
                    className="hidden h-2.5 w-2.5 shrink-0 rounded-full bg-[#FF9F1C] sm:block"
                  />
                  <span className="text-sm font-semibold text-[#FF9F1C]">
                    {item.number}
                  </span>
                </div>
                <h3 className="mt-2 text-4xl leading-tight font-bold text-white sm:text-5xl">
                  {item.titleTop}
                </h3>
                <h3 className="text-4xl leading-tight font-light text-white/60 sm:text-5xl">
                  {item.titleBottom}
                </h3>
                <p className="mt-6 text-white/60">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
