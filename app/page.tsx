'use client';

import { useRef } from 'react';
import Hero from "@/components/Hero";
import MindMap from "@/components/MindMap";

export default function HomePage() {
  const heroWrapRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={heroWrapRef} className="relative h-screen overflow-hidden">
      <Hero />
      <MindMap heroWrapRef={heroWrapRef} />
    </div>
  );
}
