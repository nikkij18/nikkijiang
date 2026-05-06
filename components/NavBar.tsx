import Link from "next/link";

const LINKS = ["About", "Projects"];

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-10 bg-white border border-neutral-200 rounded-full px-6 py-2.5 shadow-sm">
        {LINKS.map(link => (
          <Link
            key={link}
            href={`/${link.toLowerCase()}`}
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            {link}
          </Link>
        ))}
        <Link
          href="/contact"
          className="text-sm font-medium text-white bg-neutral-900 rounded-full px-5 py-1.5 hover:bg-neutral-700 transition-colors"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
