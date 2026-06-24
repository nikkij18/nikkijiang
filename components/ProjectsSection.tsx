'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { projects as rawProjects } from '@/lib/projects';
import type { ContentType } from '@/lib/types';

const serif = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif" };
const dmSans = { fontFamily: "var(--font-dm-sans), sans-serif" };

const CATEGORY_LABEL: Record<ContentType, string> = {
  'interactive-site': 'Interactive',
  'research-report':  'Research',
  'academic-paper':   'Academic',
  'creative-site':    'Creative',
  'side-project':     'Project',
};

const PAPER_TYPES = new Set(['research-report', 'academic-paper']);

const COLORS = ["#b8cfc8", "#f0cfc3", "#c3cfe0", "#d5c8e2", "#c8d8c0"];

const carouselRaw = rawProjects.filter(p => !PAPER_TYPES.has(p.contentType));
const paperRaw    = rawProjects.filter(p =>  PAPER_TYPES.has(p.contentType));

const PROJECTS = carouselRaw.map((p, i) => ({
  id: i,
  title: p.title,
  category: CATEGORY_LABEL[p.contentType],
  description: p.shortDescription,
  coverImage: p.coverImage,
  color: COLORS[i % COLORS.length],
  href: p.liveUrl ?? p.githubUrl ?? `/projects/${p.slug}`,
  external: !!(p.liveUrl ?? p.githubUrl),
}));

const CARD_W  = 390;
const IMG_H   = Math.round(CARD_W * 138 / 220); // original 138/220 aspect ratio
const CLIP_H  = 46;
const CLIP_GRIP = 14;
// Spacing scales with card width so relative layout stays identical
const SCALE   = CARD_W / 220;

function xFor(offset: number): number {
  if (offset === 0) return 0;
  const sign = Math.sign(offset);
  return sign * Math.round((Math.abs(offset) === 1 ? 110 : 126) * SCALE);
}

function rotationFor(offset: number): number {
  if (offset === 0) return 0;
  const sign = Math.sign(offset);
  return sign * (Math.abs(offset) === 1 ? 44 : 76);
}

// Wire: M 0 8 Q 400 48 800 8  (viewBox 800×52, SVG positioned top:56px in container)
// x maps linearly: t = x_svgUnit/800, y(t) = 8 + 80t − 80t²  (peak sag 28 at t=0.5)
function wireYDelta(xOffset: number, containerW: number): number {
  const t = Math.max(0, Math.min(1, 0.5 + xOffset / containerW));
  const y = 8 + 80 * t - 80 * t * t;
  return y - 28; // negative = card moves up (wire rises toward edges)
}

function Paperclip() {
  return (
    <svg width="16" height={CLIP_H} viewBox="0 0 16 46" fill="none" aria-hidden="true">
      <path
        d="M6.5 2 C3.5 2 1.5 4.2 1.5 7 L1.5 32 C1.5 37 4.4 41 8 41 C11.6 41 14.5 37 14.5 32 L14.5 12 C14.5 8.5 12.5 6 10 6 C7.5 6 5.5 8.5 5.5 12 L5.5 32 C5.5 33.9 6.6 35.5 8 35.5 C9.4 35.5 10.5 33.9 10.5 32 L10.5 12"
        stroke="#c0c0c0"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// ── Wire bezier delta ────────────────────────────────────────────────────────

export default function ProjectsSection() {
  const [activeIdx, setActiveIdx] = useState(2);
  const hoveredRef = useRef(false);
  const columnRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(600);

  useEffect(() => {
    const el = columnRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setContainerW(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!hoveredRef.current) {
        setActiveIdx(prev => (prev + 1) % PROJECTS.length);
      }
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const active = PROJECTS[activeIdx];

  return (
    <section
      className="w-full py-20"
      style={{
        paddingLeft: "clamp(2rem, 6vw, 5rem)",
        paddingRight: "clamp(2rem, 6vw, 5rem)",
      }}
    >
      {/* Header */}
      <h2
        className="font-bold leading-[0.88] uppercase text-neutral-900"
        style={{ ...serif, fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
      >
        Projects &amp;
        <br />
        Research
      </h2>
      <hr style={{ borderTopWidth: 1, borderColor: "#ddd", margin: "1.5rem 0 3rem" }} />

      {/* Two-column body */}
      <div
        className="grid items-start gap-16"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        {/* LEFT — active project info */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
              className="flex flex-col gap-4"
            >
              <span
                className="self-start text-xs uppercase tracking-[0.18em] text-pink-400 border border-pink-200 px-2 py-0.5"
                style={serif}
              >
                {active.category}
              </span>
              <Link
                href={active.href}
                target={active.external ? "_blank" : undefined}
                rel={active.external ? "noopener noreferrer" : undefined}
                className="font-bold text-neutral-900 hover:text-pink-400 transition-colors leading-tight"
                style={{ ...serif, fontSize: "clamp(2rem, 3.8vw, 3.25rem)" }}
              >
                {active.title}
              </Link>
              <p
                className="text-neutral-400 leading-relaxed max-w-xs"
                style={{ ...dmSans, fontSize: "clamp(0.875rem, 1.3vw, 1.05rem)" }}
              >
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex gap-2 mt-8">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to project ${i + 1}`}
                onClick={() => setActiveIdx(i)}
                className="transition-all duration-300"
                style={{
                  width: i === activeIdx ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === activeIdx ? "#f9a8c2" : "#e5e5e5",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — clothesline */}
        <div
          ref={columnRef}
          className="relative select-none"
          style={{ height: 430, overflow: "hidden" }}
        >
          {/* Wire */}
          <svg
            aria-hidden="true"
            className="absolute left-0 w-full pointer-events-none"
            style={{ top: 10 }}
            height={52}
            viewBox="0 0 800 52"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 8 Q 400 48 800 8"
              stroke="#c0c0c0"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* 3-D perspective stage */}
          <div
            style={{
              perspective: 1100,
              position: "absolute",
              top: 30, // ring top sits just on the wire (wire center at ~10+28=38px)
              left: "50%",
            }}
          >
            {PROJECTS.map((project, i) => {
              const offset = i - activeIdx;
              const x = xFor(offset);
              const y = wireYDelta(x, containerW);
              const rotY = rotationFor(offset);
              const zIdx = 10 - Math.abs(offset);

              return (
                <motion.div
                  key={project.id}
                  className="absolute"
                  style={{
                    width: CARD_W,
                    marginLeft: -CARD_W / 2,
                    zIndex: zIdx,
                    cursor: "pointer",
                  }}
                  animate={{ x, y, rotateY: rotY }}
                  transition={{ type: "spring", stiffness: 190, damping: 30 }}
                  onHoverStart={() => { hoveredRef.current = true; setActiveIdx(i); }}
                  onHoverEnd={() => { hoveredRef.current = false; }}
                >

                  {/* Bulldog clip — ring overlaps the wire visually */}
                  <div className="flex justify-center" style={{ position: "relative", zIndex: 2 }}>
                    <Paperclip />
                  </div>

                  {/* Card body — slides up so card top is inside the clip jaws */}
                  <div
                    style={{
                      marginTop: -CLIP_GRIP,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <Link
                      href={project.href}
                      target={project.external ? "_blank" : undefined}
                      rel={project.external ? "noopener noreferrer" : undefined}
                      className="block rounded-sm overflow-hidden bg-white group"
                      style={{
                        boxShadow:
                          offset === 0
                            ? "0 8px 32px rgba(0,0,0,0.13)"
                            : "0 4px 14px rgba(0,0,0,0.07)",
                        textDecoration: "none",
                      }}
                    >
                      <div style={{ height: IMG_H, background: project.color, position: 'relative' }}>
                        {project.coverImage && (
                          <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        )}
                        <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0" style={{ background: "rgba(249, 168, 194, 0.35)" }} />
                      </div>
                      <div className="px-3 py-3">
                        <span
                          className="text-[10px] uppercase tracking-widest text-pink-400"
                          style={serif}
                        >
                          {project.category}
                        </span>
                        <p
                          className="font-semibold text-neutral-900 mt-1 leading-snug text-sm"
                          style={serif}
                        >
                          {project.title}
                        </p>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Research & Writing */}
      <div className="mt-20">
        <p
          className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6"
          style={serif}
        >
          Research &amp; Writing
        </p>
        <div className="flex flex-col divide-y divide-neutral-100">
          {paperRaw.map(p => (
            <a
              key={p.slug}
              href={p.pdfUrl ?? p.liveUrl ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-8 py-6 hover:pl-2 transition-all duration-200"
            >
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span
                  className="text-xs uppercase tracking-[0.15em] text-pink-400"
                  style={serif}
                >
                  {CATEGORY_LABEL[p.contentType]}
                </span>
                <h3
                  className="font-semibold text-neutral-900 group-hover:text-pink-500 transition-colors leading-tight"
                  style={{ ...serif, fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-neutral-400 text-sm leading-relaxed"
                  style={dmSans}
                >
                  {p.shortDescription}
                </p>
              </div>
              <span className="text-neutral-300 group-hover:text-pink-400 transition-colors flex-shrink-0" style={serif}>
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
