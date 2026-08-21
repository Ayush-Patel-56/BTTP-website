import Image from "next/image";

const stats = [
  { value: "15K+", label: "BTTP users maximizing rewards" },
  { value: "₹17 Cr+", label: "Saved via smart points usage" },
  { value: "4/5", label: "Users founds it helpful" },
];

const badges = [
  { src: "/pciDss.webp", alt: "PCI DSS Compliant" },
  { src: "/iso.webp", alt: "ISO 27001" },
  { src: "/google.webp", alt: "Google Certified" },
  { src: "/bbps.webp", alt: "Bharat Connect" },
];

export default function StatsAndCertifications() {
  return (
    <section className="bg-[#f5f7fa] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-[#FF9F1C] sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-black/60">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-25 flex flex-wrap items-center justify-center gap-x-48 gap-y-8">
          {badges.map((badge) => (
            <Image
              key={badge.alt}
              src={badge.src}
              alt={badge.alt}
              width={120}
              height={24}
              className="h-13 w-auto object-contain"
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-black/15" />
          <span className="text-xs font-medium text-black/50">
            100% Secure
          </span>
          <span className="h-px w-16 bg-black/15" />
        </div>
      </div>
    </section>
  );
}
