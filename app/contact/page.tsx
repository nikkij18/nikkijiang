'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PageReveal from "@/components/PageReveal";
import BackToMap from "@/components/BackToMap";

const serif = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif" };
const dmSans = { fontFamily: "var(--font-dm-sans), sans-serif" };

const EXTERNAL_LINKS = [
  { label: "LinkedIn", value: "linkedin.com/in/nikki-jiang", href: "https://linkedin.com/in/nikki-jiang" },
  { label: "GitHub",   value: "github.com/nikkij18",         href: "https://github.com/nikkij18" },
  { label: "Pinterest",   value: "pinterest.com/nikkizjiang",   href: "https://www.pinterest.com/nikkizjiang/" },
];

const EMAIL = "nzj3@georgetown.edu";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
    <PageReveal>
    <main
      className="min-h-screen flex flex-col pt-28 pb-16"
      style={{ paddingLeft: "clamp(2rem, 6vw, 5rem)", paddingRight: "clamp(2rem, 6vw, 5rem)" }}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6" style={serif}>
        03 — Contact
      </p>

      <div className="flex flex-col md:flex-row gap-[6vw] items-start">

        {/* Left: content */}
        <div className="flex flex-col flex-1">
          <h1
            className="font-bold leading-[0.88] uppercase text-neutral-900 mb-10"
            style={{ ...serif, fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
          >
            Let&apos;s
            <br />
            Connect
          </h1>

          <hr style={{ borderTopWidth: 1, borderColor: "#ddd", marginBottom: "3rem" }} />

          <p
            className="max-w-[45ch] leading-relaxed text-neutral-600 mb-14"
            style={{ ...dmSans, fontSize: "clamp(1rem, 1.6vw, 1.2rem)" }}
          >
            Open to all opportunities to build what matters.
            <br />
            Feel free to reach out.
          </p>

          <div className="flex flex-col divide-y divide-neutral-100 max-w-xl">

            {/* Email — copies to clipboard */}
            <button
              onClick={handleCopy}
              className="group flex items-center justify-between py-6 hover:pl-2 transition-all duration-200 text-left"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-400" style={serif}>
                  Email
                </span>
                <span
                  className="text-neutral-800 group-hover:text-pink-500 transition-colors"
                  style={{ ...dmSans, fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)" }}
                >
                  {EMAIL}
                </span>
              </div>
              <span
                className="text-neutral-300 group-hover:text-pink-400 transition-colors text-sm uppercase tracking-widest"
                style={serif}
              >
                {copied ? "Copied!" : "Copy →"}
              </span>
            </button>

            {/* External links */}
            {EXTERNAL_LINKS.map(({ label, value, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-6 hover:pl-2 transition-all duration-200"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-neutral-400" style={serif}>
                    {label}
                  </span>
                  <span
                    className="text-neutral-800 group-hover:text-pink-500 transition-colors"
                    style={{ ...dmSans, fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)" }}
                  >
                    {value}
                  </span>
                </div>
                <span className="text-neutral-300 group-hover:text-pink-400 transition-colors text-xl" style={serif}>
                  →
                </span>
              </Link>
            ))}

          </div>
        </div>

        {/* Right: builder image */}
        <div className="hidden md:flex flex-col flex-shrink-0 items-center justify-end w-[28vw] max-w-[380px] self-stretch">
          <Image
            src="/product space posts.jpg"
            alt="Builder illustration"
            width={380}
            height={560}
            className="object-contain object-bottom w-full"
            style={{ maxHeight: '70vh' }}
          />
        </div>

      </div>
    </main>
    </PageReveal>
    <BackToMap />
    </>
  );
}
