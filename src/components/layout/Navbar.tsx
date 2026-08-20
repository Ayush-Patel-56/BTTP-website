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
    <header className="border-b border-black/10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold">
          BTTP
        </Link>
        <ul className="hidden items-center gap-6 text-sm md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-accent">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#try-now"
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white"
        >
          Try Now
        </Link>
      </nav>
    </header>
  );
}
