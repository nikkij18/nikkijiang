'use client';

import React, {
  useRef, useState, useCallback, useEffect,
  useImperativeHandle, forwardRef,
} from 'react';
import { gsap } from 'gsap';

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

export interface FlowSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  style = {},
  children,
  'aria-label': ariaLabel,
}) => (
  <section
    data-flow-section
    aria-label={ariaLabel}
    className={cx('absolute inset-0 w-full h-full overflow-hidden', className)}
  >
    <div
      data-flow-inner
      className={cx(
        'flow-art-container relative flex h-full w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw]',
        'will-change-transform',
      )}
      style={{ transformOrigin: 'bottom left', ...style }}
    >
      {children}
    </div>
  </section>
);

export interface FlowArtHandle {
  goTo: (index: number) => void;
}

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const FlowArt = forwardRef<FlowArtHandle, FlowArtProps>(({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const count = React.Children.count(children);

  // Set initial z-indices and rotations on mount.
  useEffect(() => {
    if (!containerRef.current) return;
    const sections = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>('[data-flow-section]'),
    );
    sections.forEach((section, i) => {
      gsap.set(section, { zIndex: sections.length - i });
      const inner = section.querySelector<HTMLElement>('.flow-art-container');
      if (inner && i > 0) gsap.set(inner, { rotation: 30, transformOrigin: 'bottom left' });
    });
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === active || !containerRef.current) return;
      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>('[data-flow-section]'),
      );

      if (index > active) {
        const nextInner = sections[index].querySelector<HTMLElement>('.flow-art-container');
        if (!nextInner) return;
        gsap.set(sections[index], { zIndex: sections.length + index });
        setAnimating(true);
        gsap.fromTo(
          nextInner,
          { rotation: 30 },
          {
            rotation: 0,
            duration: 0.7,
            ease: 'power2.out',
            onComplete: () => { setActive(index); setAnimating(false); },
          },
        );
      } else {
        const curInner = sections[active].querySelector<HTMLElement>('.flow-art-container');
        if (!curInner) return;
        setAnimating(true);
        const departingSection = sections[active];
        const departingIndex = active;
        gsap.fromTo(
          curInner,
          { rotation: 0 },
          {
            rotation: 30,
            duration: 0.7,
            ease: 'power2.in',
            onComplete: () => {
              gsap.set(departingSection, { zIndex: sections.length - departingIndex });
              setActive(index);
              setAnimating(false);
            },
          },
        );
      }
    },
    [active, animating],
  );

  // Keep a stable ref so the imperative handle always calls the latest goTo.
  const goToRef = useRef(goTo);
  useEffect(() => { goToRef.current = goTo; }, [goTo]);

  useImperativeHandle(ref, () => ({ goTo: (i) => goToRef.current(i) }), []);

  // Scroll-based navigation — debounced so one wheel burst = one section advance.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let cooldown = false;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0 && active === 0) return;
      e.preventDefault();
      if (cooldown) return;
      cooldown = true;
      setTimeout(() => { cooldown = false; }, 800);
      if (e.deltaY > 0) {
        goTo(Math.min(active + 1, count - 1));
      } else {
        goTo(Math.max(active - 1, 0));
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [goTo, active, count]);

  return (
    <div
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx('relative h-screen w-full overflow-hidden', className)}
    >
      {children}

      {/* Dot navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-3">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to section ${i + 1}`}
            className={cx(
              'w-2 h-2 rounded-full transition-all duration-300',
              i === active ? 'bg-neutral-700 scale-125' : 'bg-neutral-400 hover:bg-neutral-600',
            )}
          />
        ))}
      </div>

      {/* Prev / Next arrows */}
      {active > 0 && (
        <button
          onClick={() => goTo(active - 1)}
          className="absolute left-6 bottom-6 z-50 text-sm uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          ← Back
        </button>
      )}
      {active < count - 1 && (
        <button
          onClick={() => goTo(active + 1)}
          className="absolute right-6 bottom-6 z-50 text-sm uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          Next →
        </button>
      )}
    </div>
  );
});

FlowArt.displayName = 'FlowArt';
export default FlowArt;
