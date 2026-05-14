'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

const serif = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif" };

const LINKS = [
  { label: "About",      href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects",   href: "/projects" },
  { label: "Contact",    href: "/contact" },
];

export default function NavBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-transparent transition-all duration-300"
      style={{
        padding: "1.5rem clamp(2rem, 6vw, 5rem)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(-8px)",
      }}
    >
      <Link href="/" style={serif} className="text-sm font-semibold tracking-widest uppercase text-neutral-900 hover:text-pink-400 transition-colors">
        Nikki Jiang
      </Link>
      <div className="flex items-center gap-8">
        {LINKS.map(({ label, href }) => (
          <Link key={label} href={href} style={serif} className="text-sm text-neutral-600 hover:text-pink-400 transition-colors">
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
