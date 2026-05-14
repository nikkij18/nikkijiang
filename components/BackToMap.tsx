'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const serif = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif" };

export default function BackToMap() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      setVisible(atBottom);
    };
    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, []);

  return (
    <button
      onClick={() => router.back()}
      className="fixed bottom-8 left-[clamp(2rem,6vw,5rem)] z-50 text-sm uppercase tracking-widest text-neutral-400 hover:text-pink-400 transition-all duration-300"
      style={{
        ...serif,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(6px)',
      }}
    >
      ← Map
    </button>
  );
}
