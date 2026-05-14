import Link from "next/link";

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

const LINKS = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
];

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-transparent" style={{ padding: "1.5rem clamp(2rem, 6vw, 5rem)" }}>
      <Link href="/" style={serif} className="text-sm font-semibold tracking-widest uppercase text-neutral-900 hover:text-pink-400 transition-colors">
        Nikki Jiang
      </Link>
      <div className="flex items-center gap-8">
        {LINKS.map(({ label, href }) => (
          <Link key={label} href={href} style={serif} className="text-sm text-neutral-600 hover:text-pink-400 transition-colors">
            {label}
          </Link>
        ))}
        <Link href="/contact" style={serif} className="text-sm text-neutral-600 hover:text-pink-400 transition-colors">
          Contact
        </Link>
      </div>
    </nav>
  );
}
