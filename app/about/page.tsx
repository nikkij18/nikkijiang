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
            deep curiosity for people, connections, and stories. 
          </p>

          <p
            className="leading-relaxed text-neutral-600"
            style={{ ...dmSans, fontSize: "clamp(1rem, 1.6vw, 1.2rem)" }}
          >
            I&apos;m passionate about leveraging technology and design to create tools that promote global health equity. Inspired by leaders like Dr. Paul Farmer, who emphasized human-centered care through innovation, I strive to build accessible products that improve health outcomes and ensure healthcare as a global basic right. 
          </p>

           <p
            className="leading-relaxed text-neutral-600"
            style={{ ...dmSans, fontSize: "clamp(1rem, 1.6vw, 1.2rem)" }}
          >
            Outside of building products, you'll find me hosting candle-lit gatherings on my balcony, playing beach volleyball, or planning my next travel adventure. 
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {["Global Health", "Data Visualization", "Health Systems", "UX Design", "Georgetown"].map(tag => (
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
        <div className="relative flex-shrink-0 w-full md:w-[32vw] max-w-[420px] aspect-[3/4] md:mt-[14rem]">
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
