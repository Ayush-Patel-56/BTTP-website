import Image from "next/image";

const features = [
  {
    title: "One dashboard for every point",
    description:
      "See the total value sitting across your cards, airlines, and hotels the moment you open the app.",
  },
  {
    title: "Alerts before points expire",
    description:
      "Get nudged with enough runway to redeem or transfer points before they quietly lapse.",
  },
  {
    title: "Card picks that fit your spend",
    description:
      "Answer three quick questions and we'll tell you which card actually earns you more.",
  },
];

export default function AppShowcase() {
  return (
    <section id="try-now" className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold tracking-wide text-[#FF9F1C] uppercase">
            The BTTP App
          </p>
          <h2 className="mt-3 text-4xl font-bold text-black sm:text-5xl">
            Every point, tracked. Every rupee, accounted for.
          </h2>
          <p className="mt-5 max-w-md text-black/60">
            No more guessing what your rewards are worth or digging through five
            different apps to redeem them. BTTP watches every card, program, and
            expiry date for you.
          </p>

          <ul className="mt-10 space-y-6">
            {features.map((feature) => (
              <li key={feature.title} className="flex gap-4">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#FF9F1C]" />
                <div>
                  <p className="font-semibold text-black">{feature.title}</p>
                  <p className="mt-1 text-sm text-black/60">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-2 rounded-xl border border-black/10 bg-black/5 px-4 py-2.5 text-black/40">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.9-.16 1.79-.83 3.24-.79 1.79.14 3.13.86 4.03 2.17-3.7 2.22-2.94 6.93.62 8.31-.64 1.5-1.47 2.97-2.97 4.48zM12.03 7.25c-.14-2.02 1.5-3.68 3.4-3.75.29 2.03-1.87 4-3.4 3.75z" />
                </svg>
                <span className="text-left leading-tight">
                  <span className="block text-[10px] uppercase">
                    Coming soon on
                  </span>
                  <span className="block text-sm font-semibold">
                    App Store
                  </span>
                </span>
              </span>
              <span className="flex items-center gap-2 rounded-xl border border-black/10 bg-black/5 px-4 py-2.5 text-black/40">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.6 2.6c-.34.34-.55.86-.55 1.55v15.7c0 .69.21 1.21.55 1.55l.1.08L12.9 12v-.2L3.7 2.52l-.1.08zm11.15 9.6L12.9 14.35v-4.7l1.85 2.15zM3.9 21.14c-.35-.06-.55-.24-.65-.44l8.6-8.6 1.7 1.7L4 21.28l-.1-.14zm0-18.4c.1-.1.28-.14.5-.1L14 8.6l-1.7 1.7-8.4-8.4v-.16zM17.9 9.3l2.75 1.55c.72.42.72 1.15 0 1.57L17.9 13.9l-2.05-2.3 2.05-2.3z" />
                </svg>
                <span className="text-left leading-tight">
                  <span className="block text-[10px] uppercase">
                    Coming soon on
                  </span>
                  <span className="block text-sm font-semibold">
                    Google Play
                  </span>
                </span>
              </span>
            </div>
            <p className="mt-3 text-xs text-black/40">
              BTTP is currently in private beta — the app isn&apos;t publicly
              downloadable yet.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="rounded-[2.75rem] border-[10px] border-neutral-900 bg-neutral-900 p-1.5 shadow-2xl shadow-black/20">
            <div className="relative h-3 w-full">
              <span className="absolute top-0 left-1/2 h-3 w-24 -translate-x-1/2 rounded-b-xl bg-neutral-900" />
            </div>
            <div className="relative aspect-[9/19.5] w-[220px] overflow-hidden rounded-[2rem]">
              <Image
                src="/prototype.png"
                alt="BTTP app screenshot showing tracked rewards value and expiring points"
                fill
                className="object-cover object-top"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
