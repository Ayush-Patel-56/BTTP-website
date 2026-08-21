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
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-2xl border border-white/40 bg-white/25 px-4 py-2.5 shadow-lg shadow-black/10 backdrop-blur-xl">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-black/10">
            <Image
              src="/bttp-logo.jpg"
              alt="BTTP"
              width={36}
              height={36}
              className="h-full w-full object-cover"
              priority
            />
          </span>
          <span className="text-lg font-semibold tracking-tight text-black">BTTP</span>
        </Link>
        <ul className="hidden items-center gap-8 text-sm font-medium text-black/90 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link hover:text-black"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#try-now"
          className="flex shrink-0 items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-inner hover:bg-blue-500"
        >
          Try Now
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </Link>
      </nav>
    </header>
  );
}
