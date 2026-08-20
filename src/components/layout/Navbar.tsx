import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/point-calculator", label: "Point Calculator" },
  { href: "/#what-we-do", label: "What We Do" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/#about-us", label: "About Us" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 px-4 py-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border border-black/5 bg-white px-3 py-2 shadow-lg shadow-black/5">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
            <Image
              src="/bttp-logo.jpg"
              alt="BTTP"
              width={40}
              height={40}
              className="h-full w-full object-cover"
              priority
            />
          </span>
          <span className="text-lg font-semibold tracking-tight">BTTP</span>
        </Link>
        <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#try-now"
          className="rounded-full bg-gradient-to-b from-neutral-800 to-black px-6 py-2.5 text-sm font-medium text-white shadow-inner"
        >
          Try Now
        </Link>
      </nav>
    </header>
  );
}
