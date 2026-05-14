'use client';

import { useRef, useEffect, useState, type RefObject } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { getBranchNodes, LABEL_NODES } from '@/lib/tree';

const ZOOM_ORIGIN = { x: 64, y: 36 };
const ZOOM_SCALE  = 2.6;
const SF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif";

interface NodeData { x: number; y: number; special: boolean; label: string; href: string; }
interface EdgeData { a: number; b: number; alpha: number; }

function toScreen(ox: number, oy: number, W: number, H: number) {
  const zx = (ZOOM_ORIGIN.x / 100) * W;
  const zy = (ZOOM_ORIGIN.y / 100) * H;
  return { x: (ox - zx) * ZOOM_SCALE + zx, y: (oy - zy) * ZOOM_SCALE + zy };
}

function makeLCG(seed: number) {
  let s = seed >>> 0;
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 0x100000000; };
}

function buildGraph(W: number, H: number): { nodes: NodeData[]; edges: EdgeData[] } {
  const branch = getBranchNodes(W, H)
    .filter(n => n.depth === 2)
    .map(n => toScreen(n.x, n.y, W, H))
    .filter(p => p.x >= 0 && p.x <= W && p.y >= 0 && p.y <= H);

  const rng = makeLCG(0xdeadbeef);
  const filler: { x: number; y: number }[] = [];
  for (let i = 0; i < 40; i++) {
    const col = i % 8, row = Math.floor(i / 8);
    filler.push({
      x: W * (0.02 + col * 0.13 + rng() * 0.08 - 0.04),
      y: H * (0.05 + row * 0.20 + rng() * 0.10 - 0.05),
    });
  }

  const specials = LABEL_NODES.map(n => ({
    x: W * n.cx_pct, y: H * n.cy_pct,
    special: true, label: n.label, href: n.href,
  }));

  const nodes: NodeData[] = [
    ...branch.map(p => ({ x: p.x, y: p.y, special: false, label: '', href: '' })),
    ...filler.map(p => ({ x: p.x, y: p.y, special: false, label: '', href: '' })),
    ...specials,
  ];

  const threshold = W * 0.30;
  const edges: EdgeData[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d < threshold) {
        edges.push({ a: i, b: j, alpha: 0.06 + 0.20 * (1 - d / threshold) });
      }
    }
  }
  return { nodes, edges };
}

function buildSway(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    ax:  10 + (i * 7  % 14),
    ay:  8  + (i * 11 % 12),
    fx:  0.6 + (i * 0.037 % 0.50),
    fy:  0.5 + (i * 0.053 % 0.45),
    px:  (i * 137.5 * Math.PI) / 180,
    py:  (i * 97.3  * Math.PI) / 180,
  }));
}

interface Props {
  heroWrapRef: RefObject<HTMLDivElement | null>;
}

export default function MindMap({ heroWrapRef }: Props) {
  const router      = useRouter();
  const overlayRef  = useRef<HTMLDivElement>(null);
  const [graph, setGraph] = useState<{ nodes: NodeData[]; edges: EdgeData[] } | null>(null);
  const nodeGroupRefs = useRef<(SVGGElement | null)[]>([]);
  const lineRefs      = useRef<(SVGLineElement | null)[]>([]);
  const basePosRef    = useRef<{ x: number; y: number }[]>([]);
  const swayRef       = useRef<ReturnType<typeof buildSway>>([]);
  const viewportRef   = useRef({ W: 0, H: 0 });

  useEffect(() => {
    const W = window.innerWidth, H = window.innerHeight;
    viewportRef.current = { W, H };
    const { nodes, edges } = buildGraph(W, H);
    basePosRef.current = nodes.map(n => ({ x: n.x, y: n.y }));
    swayRef.current    = buildSway(nodes.length);
    setGraph({ nodes, edges });
  }, []);

  useEffect(() => {
    if (!graph) return;
    const tick = (time: number) => {
      const base  = basePosRef.current;
      const sway  = swayRef.current;
      const edges = graph.edges;
      const ox = base.map((_, i) => Math.sin(time * sway[i].fx + sway[i].px) * sway[i].ax);
      const oy = base.map((_, i) => Math.cos(time * sway[i].fy + sway[i].py) * sway[i].ay);
      nodeGroupRefs.current.forEach((el, i) => {
        if (!el) return;
        el.setAttribute('transform', `translate(${ox[i].toFixed(2)},${oy[i].toFixed(2)})`);
      });
      lineRefs.current.forEach((el, j) => {
        if (!el) return;
        const { a, b } = edges[j];
        el.setAttribute('x1', (base[a].x + ox[a]).toFixed(1));
        el.setAttribute('y1', (base[a].y + oy[a]).toFixed(1));
        el.setAttribute('x2', (base[b].x + ox[b]).toFixed(1));
        el.setAttribute('y2', (base[b].y + oy[b]).toFixed(1));
      });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [graph]);

  useEffect(() => {
    const heroWrap = heroWrapRef.current;
    const overlay  = overlayRef.current;
    if (!heroWrap || !overlay) return;

    const heroCanvas = heroWrap.querySelector<HTMLCanvasElement>('canvas');
    const heroText   = heroWrap.querySelector<HTMLElement>('.hero-text');

    gsap.set(overlay, { opacity: 0 });

    let state: 'idle' | 'animating' | 'shown' = 'idle';
    let hasScrolledAway = false;

    const reveal = () => {
      state = 'animating';
      const tl = gsap.timeline({ onComplete: () => { state = 'shown'; } });
      if (heroCanvas) {
        tl.to(heroCanvas, {
          scale: ZOOM_SCALE,
          transformOrigin: `${ZOOM_ORIGIN.x}% ${ZOOM_ORIGIN.y}%`,
          duration: 0.9,
          ease: 'power2.inOut',
        }, 0);
      }
      if (heroText)   tl.to(heroText,   { opacity: 0, duration: 0.35 }, 0);
      if (heroCanvas) tl.to(heroCanvas, { opacity: 0, duration: 0.45 }, 0.5);
      tl.to(overlay, { opacity: 1, duration: 0.5 }, 0.6);
    };

    const reset = () => {
      state = 'idle';
      hasScrolledAway = false;
      if (heroCanvas) gsap.to(heroCanvas, { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.inOut', delay: 0.1 });
      gsap.to(overlay, { opacity: 0, duration: 0.3 });
      if (heroText)   gsap.to(heroText,   { opacity: 1, duration: 0.4, delay: 0.3 });
    };

    const onWheel = (e: WheelEvent) => {
      if (state === 'animating') { e.preventDefault(); return; }
      if (state === 'idle' && e.deltaY > 0) {
        const rect = heroWrap.getBoundingClientRect();
        if (rect.top > -10 && rect.top < 10) { e.preventDefault(); reveal(); }
      }
      if (state === 'shown' && e.deltaY < 0) { e.preventDefault(); reset(); }
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (state !== 'shown') return;
      if (!entry.isIntersecting) { hasScrolledAway = true; return; }
      if (hasScrolledAway && entry.intersectionRatio > 0.9) reset();
    }, { threshold: [0, 0.9] });
    observer.observe(heroWrap);

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => { window.removeEventListener('wheel', onWheel); observer.disconnect(); };
  }, [heroWrapRef]);

  const handleNodeClick = (href: string, nx: number, ny: number) => {
    const overlay = overlayRef.current;
    if (!overlay) { router.push(href); return; }
    const { W, H } = viewportRef.current;
    const ox = W > 0 ? (nx / W * 100).toFixed(1) + '%' : '50%';
    const oy = H > 0 ? (ny / H * 100).toFixed(1) + '%' : '50%';
    gsap.to(overlay, {
      scale: 20,
      transformOrigin: `${ox} ${oy}`,
      duration: 0.65,
      ease: 'power3.in',
      onComplete: () => router.push(href),
    });
  };

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0"
      style={{ zIndex: 10, opacity: 0, background: 'linear-gradient(160deg, #fff9fb 0%, #ffffff 60%)' }}
    >
      {graph && (
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          {graph.edges.map((e, i) => (
            <line
              key={i}
              ref={el => { lineRefs.current[i] = el; }}
              x1={basePosRef.current[e.a]?.x} y1={basePosRef.current[e.a]?.y}
              x2={basePosRef.current[e.b]?.x} y2={basePosRef.current[e.b]?.y}
              stroke="#d48fa0"
              strokeWidth={0.8}
              opacity={e.alpha}
            />
          ))}

          {graph.nodes.map((n, i) => n.special ? null : (
            <g key={i} ref={el => { nodeGroupRefs.current[i] = el; }}>
              <circle cx={n.x} cy={n.y} r={16} fill="rgba(244,160,181,0.18)" />
              <circle cx={n.x} cy={n.y} r={8}  fill="#ff9fb0" opacity={0.85} />
            </g>
          ))}

          {graph.nodes.map((n, i) => !n.special ? null : (
            <g key={i} ref={el => { nodeGroupRefs.current[i] = el; }}
               style={{ cursor: 'pointer' }} onClick={() => handleNodeClick(n.href, n.x, n.y)}>
              <circle cx={n.x} cy={n.y} r={26} fill="rgba(255,220,230,0.35)" />
              <circle cx={n.x} cy={n.y} r={13} fill="#ffe4ee" opacity={1} stroke="#ffb3c8" strokeWidth={1.5} />
              <text
                x={n.x} y={n.y + 28}
                textAnchor="middle"
                fontFamily={SF}
                fontSize={11}
                fontWeight={600}
                letterSpacing="1.5"
                fill="rgba(90,35,52,0.85)"
              >
                {n.label.toUpperCase()}
              </text>
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}
