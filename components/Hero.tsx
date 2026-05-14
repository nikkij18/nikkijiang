"use client";

import { useEffect, useRef, useCallback } from "react";

const PINKS = [
  "#ffb7c5","#ff9fb0","#ffc0cb","#ff85a1","#ffd1dc",
  "#f4a0b5","#e8829a","#ffaec9","#ff7096","#fdb4c7",
  "#f9c4d2","#fce4ec","#ff69b4","#db7093",
];
const BROWNS = ["#5c3317","#7d4e37","#6b3a2a","#8b5a3c","#704030","#8b6355"];

interface Petal {
  x: number; y: number; vx: number; vy: number;
  r: number; color: string; alpha: number; rot: number; rotV: number;
}

function rnd(a: number, b: number) { return Math.random() * (b - a) + a; }
function pick<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)]; }

// Clamp branch angle to stay in the upper half-plane (never point downward).
function clampAng(a: number): number {
  return Math.max(-Math.PI + 0.08, Math.min(-0.08, a));
}

function drawTree(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const mobile = W < 768;
  // Trunk base sits in the bottom-right corner; canopy fans left from there.
  const bx = mobile ? W * 0.55 : W * 0.86;
  const by = H + 5;
  const treeLen = H * (mobile ? 0.22 : 0.16);
  // Slight rightward lean at the base creates the natural bend when the first
  // asymmetric split sweeps the main branch hard left.
  const initAng = -Math.PI / 2 + 0.22;

  // Recurse helper shared by scan and draw passes.
  // First split is intentionally asymmetric: one arm sweeps hard left (horizontal),
  // one arm continues upward. This creates the wind-swept wide canopy shape.
  function recurse(
    x: number, y: number, ang: number, len: number, depth: number,
    cb: (x: number, y: number, ang: number, len: number, depth: number) => void
  ) {
    if (depth < 0 || len < 4) return;
    const ex = x + Math.cos(ang) * len;
    const ey = y + Math.sin(ang) * len;
    cb(x, y, ang, len, depth);
    if (depth >= 5) {
      // Asymmetric trunk split: left arm sweeps hard left, right arm stays upward.
      recurse(ex, ey, clampAng(ang - 0.85), len * 0.82, depth - 1, cb);
      recurse(ex, ey, clampAng(ang + 0.30), len * 0.74, depth - 1, cb);
    } else {
      const splits = 3;
      const sp = depth >= 3 ? 0.42 : 0.34;
      for (let i = 0; i < splits; i++) {
        const offset = (i - 1) * sp + rnd(-0.05, 0.05);
        recurse(ex, ey, clampAng(ang + offset), len * rnd(0.63, 0.72), depth - 1, cb);
      }
    }
  }

  // Pass 1: scan tip positions to find real canopy bounds (no drawing).
  let sumX = 0, sumY = 0, minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity, tipCount = 0;
  recurse(bx, by, initAng, treeLen, 6, (x, y, ang, len, depth) => {
    if (depth !== 0) return;
    const tx = x + Math.cos(ang) * len;
    const ty = y + Math.sin(ang) * len;
    sumX += tx; sumY += ty; tipCount++;
    if (tx < minX) minX = tx; if (tx > maxX) maxX = tx;
    if (ty < minY) minY = ty; if (ty > maxY) maxY = ty;
  });

  const canopyCx = tipCount > 0 ? sumX / tipCount : bx;
  const canopyCy = tipCount > 0 ? sumY / tipCount : by - treeLen * 1.8;
  // Horizontal bloom fill: Rx is notably wider than Ry.
  const canopyRx = Math.max((maxX - minX) / 2 + 70, 80);
  const canopyRy = Math.max((maxY - minY) / 2 + 35, 40);

  // Pass 2: draw bloom fill positioned at the real canopy centre.
  for (let i = 0; i < 700; i++) {
    const ang = rnd(0, Math.PI * 2);
    const rf = Math.sqrt(Math.random());
    const px = canopyCx + Math.cos(ang) * canopyRx * rf;
    const py = canopyCy + Math.sin(ang) * canopyRy * rf;
    ctx.globalAlpha = rnd(0.18, 0.72);
    ctx.fillStyle = pick(PINKS);
    ctx.beginPath();
    ctx.arc(px, py, rnd(5, 20), 0, Math.PI * 2);
    ctx.fill();
  }

  // Pass 3: draw branches on top so the trunk remains visible through the bloom.
  recurse(bx, by, initAng, treeLen, 6, (x, y, ang, len, depth) => {
    const ex = x + Math.cos(ang) * len;
    const ey = y + Math.sin(ang) * len;
    const steps = Math.ceil(len / 4);
    const w = 38 * Math.pow(0.63, 6 - depth); // width tapers with depth

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const px = x + (ex - x) * t;
      const py = y + (ey - y) * t;

      if (depth >= 4) {
        for (let k = 0; k < 2; k++) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = pick(BROWNS);
          ctx.beginPath();
          ctx.arc(
            px + rnd(-w * 0.14, w * 0.14),
            py + rnd(-w * 0.14, w * 0.14),
            Math.max(1.5, w * rnd(0.5, 0.75)),
            0, Math.PI * 2
          );
          ctx.fill();
        }
      } else if (depth >= 2) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = pick(BROWNS);
        ctx.beginPath();
        ctx.arc(px + rnd(-1, 1), py + rnd(-1, 1), Math.max(1, w * 0.55), 0, Math.PI * 2);
        ctx.fill();
        if (Math.random() > 0.35) {
          ctx.globalAlpha = rnd(0.5, 1);
          ctx.fillStyle = pick(PINKS);
          ctx.beginPath();
          ctx.arc(px + rnd(-14, 14), py + rnd(-14, 14), rnd(4, 12), 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        const n = depth === 0 ? 12 : 8;
        for (let k = 0; k < n; k++) {
          ctx.globalAlpha = rnd(0.5, 1);
          ctx.fillStyle = pick(PINKS);
          ctx.beginPath();
          ctx.arc(
            px + rnd(-35, 35),
            py + rnd(-35, 35),
            rnd(4, depth === 0 ? 18 : 14),
            0, Math.PI * 2
          );
          ctx.fill();
        }
      }
    }
    ctx.globalAlpha = 1;
  });

  // Ground petals spread under the canopy.
  for (let i = 0; i < 90; i++) {
    const px = canopyCx + rnd(-(canopyRx + 30), canopyRx * 0.5);
    const py = by + rnd(-15, 8);
    ctx.globalAlpha = rnd(0.2, 0.6);
    ctx.fillStyle = pick(PINKS);
    ctx.beginPath();
    ctx.arc(px, py, rnd(3, 13), 0, Math.PI * 2);
    ctx.fill();
  }

  // Sparse outer fringe dots.
  for (let i = 0; i < 60; i++) {
    const ang = rnd(0, Math.PI * 2);
    const r = rnd(canopyRx * 0.9, canopyRx * 1.5);
    ctx.globalAlpha = rnd(0.08, 0.35);
    ctx.fillStyle = pick(PINKS);
    ctx.beginPath();
    ctx.arc(canopyCx + Math.cos(ang) * r, canopyCy + Math.sin(ang) * r * 0.65, rnd(2, 8), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const rafRef = useRef<number>(0);
  const pressingRef = useRef(false);
  const lastRef = useRef({ x: 0, y: 0 });
  const dimsRef = useRef({ W: 0, H: 0 });

  const spawnPetals = useCallback((x: number, y: number) => {
    for (let i = 0; i < 5; i++) {
      petalsRef.current.push({
        x: x + rnd(-8, 8),
        y: y + rnd(-8, 8),
        vx: rnd(-3, 3),
        vy: rnd(-2, 0.5),
        r: rnd(3, 9),
        color: pick(PINKS),
        alpha: 0.9,
        rot: rnd(0, Math.PI * 2),
        rotV: rnd(-0.07, 0.07),
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    function rebuild() {
      const W = window.innerWidth;
      const H = window.innerHeight;
      dimsRef.current = { W, H };
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      off.width = W * dpr;
      off.height = H * dpr;
      const offCtx = off.getContext("2d")!;
      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawTree(offCtx, W, H);
      offRef.current = off;
    }

    rebuild();
    window.addEventListener("resize", rebuild);

    function getPos(e: MouseEvent): [number, number] {
      const rect = canvas.getBoundingClientRect();
      return [e.clientX - rect.left, e.clientY - rect.top];
    }

    function onDown(e: MouseEvent) {
      pressingRef.current = true;
      const [x, y] = getPos(e);
      lastRef.current = { x, y };
      spawnPetals(x, y);
    }
    function onMove(e: MouseEvent) {
      if (!pressingRef.current) return;
      const [x, y] = getPos(e);
      const { x: lx, y: ly } = lastRef.current;
      if (Math.hypot(x - lx, y - ly) > 12) {
        spawnPetals(x, y);
        lastRef.current = { x, y };
      }
    }
    function onUp() { pressingRef.current = false; }

    window.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    function drawPetal(p: Petal) {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    function tick() {
      const { W, H } = dimsRef.current;
      ctx.clearRect(0, 0, W, H);
      if (offRef.current) ctx.drawImage(offRef.current, 0, 0, W, H);

      const t = Date.now() * 0.001;

      // Sparse spawn — one petal every ~8 frames on average, cap at 35
      if (petalsRef.current.length < 35 && Math.random() < 0.12) {
        const roll = Math.random();
        if (roll < 0.70) {
          // Most petals: fall gently from the canopy/tree area (bottom-right)
          petalsRef.current.push({
            x: rnd(W * 0.55, W * 0.95),
            y: rnd(H * 0.35, H * 0.75),
            vx: rnd(-0.6, 0.2),
            vy: rnd(0.4, 1.0),
            r: rnd(2.5, 6),
            color: pick(PINKS),
            alpha: rnd(0.55, 0.85),
            rot: 0, rotV: 0,
          });
        } else if (roll < 0.88) {
          // A few drift leftward on a breeze
          petalsRef.current.push({
            x: rnd(W * 0.6, W),
            y: rnd(H * 0.3, H * 0.70),
            vx: rnd(-2.5, -1.0),
            vy: rnd(0.2, 0.8),
            r: rnd(2, 5),
            color: pick(PINKS),
            alpha: rnd(0.40, 0.70),
            rot: 0, rotV: 0,
          });
        } else {
          // Occasional one floats upward briefly
          petalsRef.current.push({
            x: rnd(W * 0.55, W * 0.90),
            y: rnd(H * 0.45, H * 0.75),
            vx: rnd(-1.5, 0.5),
            vy: rnd(-1.2, -0.4),
            r: rnd(2, 4),
            color: pick(PINKS),
            alpha: rnd(0.35, 0.60),
            rot: 0, rotV: 0,
          });
        }
      }

      // Remove petals that faded or left the viewport
      petalsRef.current = petalsRef.current.filter(p =>
        p.alpha > 0.01 && p.y < H + 40 && p.x > -100 && p.x < W + 40
      );

      const wind = Math.sin(t * 0.3) * 0.03 + Math.sin(t * 0.8) * 0.015;

      for (const p of petalsRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.018;                                        // gentle gravity
        p.vx += wind + Math.sin(t * 1.8 + p.y * 0.02) * 0.01;
        p.vx *= 0.995;
        p.vy *= 0.995;
        p.alpha -= 0.004;                                     // slow fade
        drawPetal(p);
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      window.removeEventListener("resize", rebuild);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, [spawnPetals]);

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fff9fb 0%, #fff 60%)" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div
        className="relative z-10 min-h-screen flex flex-col justify-center"
        style={{ paddingLeft: "clamp(2rem, 6vw, 5rem)" }}
      >
        <p
          className="text-xs uppercase tracking-widest text-neutral-400 mb-8"
          style={serif}
        >
           Georgeown University · Washington D.C.· New York
        </p>
        <h1
          className="font-bold leading-[0.88] uppercase text-neutral-900"
          style={{ ...serif, fontSize: "clamp(4rem, 10vw, 10rem)" }}
        >
          Nikki
          <br />
          Jiang
        </h1>
        <p
          className="mt-8 text-neutral-500 max-w-sm leading-relaxed"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)" }}
        >
          Data storyteller working at the intersection of global health and design.
        </p>
      </div>

      <div className="absolute bottom-8 z-10" style={{ left: "clamp(2rem, 6vw, 5rem)" }}>
        <p className="text-xs uppercase tracking-widest text-neutral-300" style={serif}>
          Scroll ↓
        </p>
      </div>
    </section>
  );
}
