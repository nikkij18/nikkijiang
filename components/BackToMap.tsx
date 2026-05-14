'use client';

import { useRouter } from 'next/navigation';

const serif = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif" };

export default function BackToMap() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="fixed bottom-8 left-[clamp(2rem,6vw,5rem)] z-50 text-sm uppercase tracking-widest text-neutral-400 hover:text-pink-400 transition-colors"
      style={serif}
    >
      ← Map
    </button>
  );
}
