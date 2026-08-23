"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const destinations = [
  {
    from: "Delhi",
    to: "Maldives",
    points: "10,000 pts",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop",
    alt: "Overwater bungalows in the Maldives",
  },
  {
    from: "Mumbai",
    to: "Bali",
    points: "18,000 pts",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
    alt: "Ulun Danu Beratan temple on a lake in Bali",
  },
  {
    from: "Bengaluru",
    to: "Vietnam",
    points: "22,000 pts",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop",
    alt: "Golden Bridge held by giant hands in Ba Na Hills, Vietnam",
  },
  {
    from: "Delhi",
    to: "Bangkok",
    points: "14,000 pts",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=800&auto=format&fit=crop",
    alt: "Wat Arun temple at sunset in Bangkok",
  },
  {
    from: "Mumbai",
    to: "Dubai",
    points: "12,000 pts",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
    alt: "Burj Khalifa skyline in Dubai",
  },
  {
    from: "Delhi",
    to: "Singapore",
    points: "20,000 pts",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop",
    alt: "Marina Bay Sands skyline in Singapore",
  },
  {
    from: "Bengaluru",
    to: "Phuket",
    points: "16,000 pts",
    image:
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=800&auto=format&fit=crop",
    alt: "Tropical beach coastline in Phuket",
  },
];

function PlaneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3.5 w-3.5 shrink-0 text-black/30"
    >
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
      aria-label={
        direction === "left"
          ? "Scroll to previous destinations"
          : "Scroll to next destinations"
      }
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black/60 shadow-sm transition hover:border-black/20 hover:text-black"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="h-4 w-4"
      >
        {direction === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 18l6-6-6-6" />
        )}
      </svg>
    </button>
  );
}

export default function Flights() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      if (!track) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDistance = Infinity;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = index;
        }
      });
      setActiveIndex(closest);
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    const card = cardRefs.current[0];
    if (!track || !card) return;
    track.scrollBy({ left: (card.offsetWidth + 24) * direction, behavior: "smooth" });
  }

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
  }

  return (
    <section className="bg-[#f5f7fa] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-[#FF9F1C] uppercase">
            Redeem Smarter
          </p>
          <h2 className="mt-3 text-4xl font-bold text-black sm:text-5xl">
            Turn points into real trips.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-black/60">
            See exactly how many points a business class flight or luxury
            stay actually costs — and how far your balance can take you.
          </p>
        </div>

        <div className="relative mt-14">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {destinations.map((dest, index) => (
              <div
                key={`${dest.from}-${dest.to}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="w-[260px] shrink-0 snap-center overflow-hidden rounded-2xl bg-white shadow-sm shadow-black/5"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={dest.image}
                    alt={dest.alt}
                    fill
                    className="object-cover"
                    sizes="260px"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-black/60">
                    <span>{dest.from}</span>
                    <PlaneIcon />
                    <span>{dest.to}</span>
                  </div>
                  <p className="mt-2 text-lg font-bold text-[#FF9F1C]">
                    {dest.points}
                  </p>
                  <span className="mt-3 inline-block text-sm font-medium text-black/40">
                    See the deal →
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <ArrowButton direction="left" onClick={() => scrollByCard(-1)} />
            <div className="flex items-center gap-2">
              {destinations.map((dest, index) => (
                <button
                  key={`${dest.from}-${dest.to}-dot`}
                  type="button"
                  onClick={() => scrollToIndex(index)}
                  aria-label={`Go to ${dest.from} to ${dest.to}`}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-6 bg-[#FF9F1C]"
                      : "w-2 bg-black/15"
                  }`}
                />
              ))}
            </div>
            <ArrowButton direction="right" onClick={() => scrollByCard(1)} />
          </div>
        </div>
      </div>
    </section>
  );
}
