// Shared branch-point algorithm — same structure as Hero.tsx but deterministic
// (no random jitter) so the node overlay aligns with the painted blossoms.

export interface BranchNode {
  x: number;
  y: number;
  depth: number; // 0 = tip, 6 = trunk
}

function clampAng(a: number): number {
  return Math.max(-Math.PI + 0.08, Math.min(-0.08, a));
}

export function getBranchNodes(W: number, H: number): BranchNode[] {
  const nodes: BranchNode[] = [];
  const bx    = W < 768 ? W * 0.55 : W * 0.80;
  const by    = H;
  const len0  = H * (W < 768 ? 0.30 : 0.28);
  const ang0  = -Math.PI / 2 + 0.35;

  function recurse(x: number, y: number, ang: number, len: number, depth: number) {
    if (depth < 0 || len < 6) return;
    const ex = x + Math.cos(ang) * len;
    const ey = y + Math.sin(ang) * len;
    nodes.push({ x: ex, y: ey, depth });
    if (depth >= 5) {
      recurse(ex, ey, clampAng(ang - 1.25), len * 0.82, depth - 1);
      recurse(ex, ey, clampAng(ang + 0.30), len * 0.74, depth - 1);
    } else {
      const sp = depth >= 3 ? 0.42 : 0.34;
      for (let i = 0; i < 3; i++) {
        recurse(ex, ey, clampAng(ang + (i - 1) * sp), len * 0.675, depth - 1);
      }
    }
  }
  recurse(bx, by, ang0, len0, 6);
  return nodes;
}

// Canvas positions (as % of W/H) for the 3 labelled special nodes.
// Chosen to sit inside the dense canopy region after 2.6× zoom from (64%, 36%).
export const LABEL_NODES = [
  { label: 'About Me', cx_pct: 0.486, cy_pct: 0.383, href: '/about' },
  { label: 'Projects', cx_pct: 0.663, cy_pct: 0.322, href: '/projects' },
  { label: 'Contact',  cx_pct: 0.571, cy_pct: 0.491, href: '/contact' },
] as const;
