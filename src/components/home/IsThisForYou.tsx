"use client";

import { useEffect, useRef, useState } from "react";

const items = [
  {
    number: "01",
    titleTop: "Clueless",
    titleBottom: "About Points",
    description:
      "You earn points daily but don't know what they're worth or how to use them smartly.",
  },
  {
    number: "02",
    titleTop: "Transfers",
    titleBottom: "Are Confusing",
    description:
      "Airline? Hotel? Which partner? Transfers feel risky and complicated, so you avoid them.",
  },
  {
    number: "03",
    titleTop: "Scattered",
    titleBottom: "Points",
    description:
      "Your points are scattered, expiry dates looming, and rules always changing. It's a mess.",
  },
  {
    number: "04",
    titleTop: "What's a Trip",
    titleBottom: "Really Worth?",
    description:
      "You search for hours but still can't figure out how many points a trip will actually cost.",
  },
  {
    number: "05",
    titleTop: "Cashback",
    titleBottom: "Isn't Exciting",
    description:
      "You'd rather travel than settle for ₹500 cashback, but don't know how to start.",
  },
  {
    number: "06",
    titleTop: "Business Class?",
    titleBottom: "How?!",
    description:
      "You've heard the stories, but have no idea how people actually fly in style on points.",
  },
];

export default function IsThisForYou() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [segments, setSegments] = useState<string[]>([]);

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

  return (
    <section className="bg-[#0B1220] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-16 text-center text-sm font-semibold tracking-wide text-white/50 uppercase">
          Is this for you?
        </p>
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
                d={d}
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="2"
                strokeDasharray="5 7"
                strokeLinecap="round"
                markerEnd="url(#connector-arrow)"
              />
            ))}
          </svg>
          {items.map((item, index) => {
            const alignRight = index % 2 === 1;
            return (
              <div
                key={item.number}
                style={{ gridRow: index + 1 }}
                className={`relative ${
                  alignRight
                    ? "sm:col-start-3 sm:pl-10 sm:text-right"
                    : "sm:col-start-1 sm:pr-10 sm:text-left"
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
