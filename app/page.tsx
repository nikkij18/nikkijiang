import Hero from "@/components/Hero";
import Link from "next/link";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };
const dmSans = { fontFamily: "var(--font-dm-sans), sans-serif" };

export default function HomePage() {
  return (
    <>
      <Hero />
      <FlowArt aria-label="Portfolio sections">

        {/* Projects — dark, editorial */}
        <FlowSection
          aria-label="Projects"
          style={{ backgroundColor: "#1c1c1c", color: "#fff" }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500" style={serif}>
            01 — Work
          </p>
          <hr style={{ borderTopWidth: 1, borderColor: "#333" }} />
          <h2
            className="font-bold leading-[0.88] uppercase text-white"
            style={{ ...serif, fontSize: "clamp(3.5rem,12vw,12rem)" }}
          >
            Projects &amp;
            <br />
            Research
          </h2>
          <hr style={{ borderTopWidth: 1, borderColor: "#333" }} />
          <p
            className="max-w-[45ch] leading-relaxed text-neutral-400"
            style={{ ...dmSans, fontSize: "clamp(1rem,1.8vw,1.35rem)" }}
          >
            Data visualizations, health systems design, and interactive storytelling at the
            intersection of global health and design.
          </p>
          <div className="mt-auto">
            <Link
              href="/projects"
              className="inline-block border border-neutral-600 px-8 py-3 text-sm uppercase tracking-widest text-neutral-300 hover:border-white hover:text-white transition-colors"
              style={serif}
            >
              View work →
            </Link>
          </div>
        </FlowSection>

        {/* About — warm off-white, considered */}
        <FlowSection
          aria-label="About"
          style={{ backgroundColor: "#f5f2ee", color: "#111" }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400" style={serif}>
            02 — About
          </p>
          <hr style={{ borderTopWidth: 1, borderColor: "#ddd" }} />
          <h2
            className="font-bold leading-[0.88] uppercase text-neutral-900"
            style={{ ...serif, fontSize: "clamp(3.5rem,12vw,12rem)" }}
          >
            Who
            <br />
            I Am
          </h2>
          <hr style={{ borderTopWidth: 1, borderColor: "#ddd" }} />
          <p
            className="max-w-[45ch] leading-relaxed text-neutral-500"
            style={{ ...dmSans, fontSize: "clamp(1rem,1.8vw,1.35rem)" }}
          >
            Georgetown student studying global health. I believe design is one of the most powerful
            tools for communicating what data alone cannot.
          </p>
          <div className="mt-auto">
            <Link
              href="/#about"
              className="inline-block border border-neutral-400 px-8 py-3 text-sm uppercase tracking-widest text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
              style={serif}
            >
              Learn more →
            </Link>
          </div>
        </FlowSection>

        {/* Contact — soft blush, personality */}
        <FlowSection
          aria-label="Contact"
          style={{ backgroundColor: "#fce4ec", color: "#111" }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-pink-400" style={serif}>
            03 — Contact
          </p>
          <hr style={{ borderTopWidth: 1, borderColor: "#f4a0b5" }} />
          <h2
            className="font-bold leading-[0.88] uppercase text-neutral-900"
            style={{ ...serif, fontSize: "clamp(3.5rem,12vw,12rem)" }}
          >
            Let&apos;s
            <br />
            Connect
          </h2>
          <hr style={{ borderTopWidth: 1, borderColor: "#f4a0b5" }} />
          <p
            className="max-w-[45ch] leading-relaxed text-neutral-600"
            style={{ ...dmSans, fontSize: "clamp(1rem,1.8vw,1.35rem)" }}
          >
            Open to research collaborations, design partnerships, and conversations about global
            health and data storytelling.
          </p>
          <div className="mt-auto">
            <Link
              href="/contact"
              className="inline-block border border-pink-300 px-8 py-3 text-sm uppercase tracking-widest text-neutral-700 hover:border-pink-500 hover:text-neutral-900 transition-colors"
              style={serif}
            >
              Get in touch →
            </Link>
          </div>
        </FlowSection>

      </FlowArt>
    </>
  );
}
