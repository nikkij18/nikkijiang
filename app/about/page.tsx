import Image from "next/image";
import PageReveal from "@/components/PageReveal";
import BackToMap from "@/components/BackToMap";

const serif = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif" };
const dmSans = { fontFamily: "var(--font-dm-sans), sans-serif" };

export default function AboutPage() {
  return (
    <>
    <PageReveal>
    <main
      className="min-h-screen flex flex-col pt-28 pb-16"
      style={{ paddingLeft: "clamp(2rem, 6vw, 5rem)", paddingRight: "clamp(2rem, 6vw, 5rem)" }}
    >
      {/* Label */}
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6" style={serif}>
        01 — About
      </p>

      {/* Main two-column layout */}
      <div className="flex flex-col md:flex-row gap-[6vw] items-start flex-1">

        {/* Left: text */}
        <div className="flex flex-col gap-8 flex-1 max-w-[55ch]">
          <h1
            className="font-bold leading-[0.88] uppercase text-neutral-900"
            style={{ ...serif, fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
          >
            About
            <br />
            Me
          </h1>

          <hr style={{ borderTopWidth: 1, borderColor: "#ddd" }} />

          <p
            className="leading-relaxed text-neutral-600"
            style={{ ...dmSans, fontSize: "clamp(1rem, 1.6vw, 1.2rem)" }}
          >
            Hi! I&apos;m Nikki, a Georgetown student studying Global Health ('28) with a minor in
            Science, Technology, and International Affairs, concentrating in Business, Growth
            and Development.
          </p>

          <p
            className="leading-relaxed text-neutral-600"
            style={{ ...dmSans, fontSize: "clamp(1rem, 1.6vw, 1.2rem)" }}
          >
            Growing up in 6 cities across 3 countries before the age of 12, I developed a
            deep curiosity for people, stories, and strength through diversity . 
          </p>

          <p
            className="leading-relaxed text-neutral-600"
            style={{ ...dmSans, fontSize: "clamp(1rem, 1.6vw, 1.2rem)" }}
          >
            I&apos;m passionate about leveraging technology and design to create tools that promote global health equity. Inspired by leaders like Dr. Paul Farmer and Dr. Eric Topol, who emphasized human-centered care through innovation, I strive to build accessible products that improve health outcomes and ensure healthcare as a human right. 
          </p>

           <p
            className="leading-relaxed text-neutral-600"
            style={{ ...dmSans, fontSize: "clamp(1rem, 1.6vw, 1.2rem)" }}
          >
            Outside of building products, you'll find me hosting gatherings on my balcony, playing beach volleyball, concert going, or planning my next solo trip (so far: Qatar, Taipei, Scottish Highlands, ). 
          </p>

          {/* Awards & Certificates */}
          <div className="flex flex-col gap-4 pt-2">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400" style={serif}>
              Awards &amp; Certificates
            </p>
            <div className="flex flex-col divide-y divide-neutral-100">
              {[
                { type: "Certificate", title: "Human Centered Design", org: "Stanford d.school" },
                { type: "Certificate", title: "Social-Behavioral-Educational Human Subject Protection for Human Research", org: "CITI Program" },
                { type: "Award", title: "HOSA Bioinformatics — 2nd Place, New York State", org: "HOSA" },
                { type: "Recognition", title: "NY State Assembly Recognition Letter", org: "BPE Breast Cancer Research @ UMass Amherst" },
              ].map(({ type, title, org }) => (
                <div key={title} className="flex items-baseline justify-between gap-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-neutral-800 leading-snug" style={{ ...dmSans, fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)" }}>
                      {title}
                    </span>
                    <span className="text-xs text-neutral-400 uppercase tracking-wider" style={serif}>{org}</span>
                  </div>
                  <span className="text-xs text-pink-400 uppercase tracking-widest flex-shrink-0" style={serif}>{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {["Data Visualization", "Health Systems", "UI/UX Design", "R", "Python", "Figma", "Supabase", "Jira", "Taguette"].map(tag => (
              <span
                key={tag}
                className="text-xs px-3 py-1 border border-pink-200 text-pink-600 uppercase tracking-widest"
                style={serif}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: headshot — offset down to align with paragraph text */}
        <div className="relative flex-shrink-0 w-full md:w-[28vw] max-w-[380px] aspect-[3/4] md:mt-[18rem]">
          <Image
            src="/Headshot.png"
            alt="Nikki Jiang"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 32vw"
            priority
            style={{ filter: 'brightness(1.1)' }}
          />
        </div>

      </div>
    </main>
    </PageReveal>
    <BackToMap />
    </>
  );
}
