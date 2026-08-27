"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/#what-we-do", label: "What We Do" },
  { href: "/#programs", label: "Programs" },
  { href: "/#loyalty", label: "Loyalty" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#about-us", label: "About Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    setMobileOpen(false);
    const hash = href.split("#")[1];
    if (!hash || pathname !== "/") return;

    e.preventDefault();
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", `#${hash}`);
  }

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // Ignore sub-threshold deltas (trackpad inertia, layout jitter from
      // scroll-linked animations elsewhere on the page) so the bar doesn't
      // flicker when the user isn't actually scrolling.
      if (Math.abs(delta) < 10) return;

      setHidden(delta > 0 && currentScrollY > 80);
      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-4 py-4 transition-transform duration-300 ${
        hidden ? "-translate-y-[calc(100%+2rem)]" : "translate-y-0"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-neutral-700 px-4 py-2.5 shadow-lg shadow-black/20">
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
          <span className="text-lg font-semibold tracking-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">BTTP</span>
        </Link>
        <ul className="hidden items-center gap-8 text-sm font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="nav-link hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/#join-waitlist"
            onClick={(e) => handleAnchorClick(e, "/#join-waitlist")}
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
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10 md:hidden"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`mx-auto max-w-5xl overflow-hidden transition-all duration-300 ease-out md:hidden ${
          mobileOpen ? "mt-2 max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-neutral-700 p-3 text-sm font-semibold text-white shadow-lg shadow-black/20">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="block rounded-lg px-3 py-2.5 hover:bg-white/10"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
