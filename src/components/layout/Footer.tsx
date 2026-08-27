import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0e17] px-6 pt-16 pb-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10">
                <Image
                  src="/bttp-logo.jpg"
                  alt="BTTP"
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="text-lg font-semibold tracking-tight text-white">BTTP</span>
            </Link>
            <p className="mt-4 text-sm text-white/40">Stop losing rewards you already earned.</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <p className="text-xs font-semibold tracking-widest text-white/30 uppercase">Product</p>
              <ul className="mt-4 space-y-3 text-sm text-white/60">
                <li>
                  <Link href="/#what-we-do" className="hover:text-white">
                    What We Do
                  </Link>
                </li>
                <li>
                  <Link href="/#programs" className="hover:text-white">
                    Programs
                  </Link>
                </li>
                <li>
                  <Link href="/#loyalty" className="hover:text-white">
                    Loyalty
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-white/30 uppercase">Company</p>
              <ul className="mt-4 space-y-3 text-sm text-white/60">
                <li>
                  <Link href="/#faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/#about-us" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#join-waitlist" className="hover:text-white">
                    Join The Waitlist
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-sm text-white/30">
          © {new Date().getFullYear()} BTTP. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
