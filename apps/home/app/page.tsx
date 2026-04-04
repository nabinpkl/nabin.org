"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Background } from "../components/Background";
import { BannerPopup } from "../components/BannerPopup";
import { Hero } from "../components/Hero";
import { PlatformApps } from "../components/PlatformApps";

/* ─────────────── Main Page ─────────────── */

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position for the moving gradient
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothMouseX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  // Direct pointer position for the spotlight (faster response)
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const smoothPointerX = useSpring(pointerX, { stiffness: 150, damping: 15 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 150, damping: 15 });

  // Shadow that follows the pointer
  const shadowX = useSpring(pointerX, { stiffness: 40, damping: 25 });
  const shadowY = useSpring(pointerY, { stiffness: 40, damping: 25 });

  // Track global mouse for gradient
  useEffect(() => {
    const handleGlobalMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
      pointerX.set((e.clientX / window.innerWidth) * 100);
      pointerY.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("mousemove", handleGlobalMouse);
    return () => window.removeEventListener("mousemove", handleGlobalMouse);
  }, [mouseX, mouseY, pointerX, pointerY]);

  // Derive gradient positions from mouse
  const gradientBg = useTransform(
    [smoothMouseX, smoothMouseY],
    ([x, y]: number[]) => {
      const px = (x as number) * 100;
      const py = (y as number) * 100;
      return `
        radial-gradient(ellipse 600px 600px at ${px * 0.6 + 10}% ${py * 0.5 + 5}%, rgba(196,252,216,0.5) 0%, transparent 70%),
        radial-gradient(ellipse 500px 500px at ${100 - px * 0.4}% ${py * 0.3}%, rgba(180,255,230,0.4) 0%, transparent 70%),
        radial-gradient(ellipse 700px 400px at ${px * 0.5 + 25}% ${100 - py * 0.4}%, rgba(220,255,200,0.35) 0%, transparent 70%),
        radial-gradient(ellipse 400px 400px at ${px * 0.3 + 50}% ${py * 0.6 + 20}%, rgba(200,255,200,0.25) 0%, transparent 70%),
        linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 15%, #f0f9ff 35%, #f0faf0 55%, #f5fcf5 75%, #f9f9f9 100%)
      `;
    }
  );

  // Direct pointer-following spotlight gradient
  const spotlightBg = useTransform(
    [smoothPointerX, smoothPointerY],
    ([x, y]) =>
      `radial-gradient(circle 350px at ${x}% ${y}%, rgba(200,255,230,0.4) 0%, rgba(220,255,210,0.2) 40%, transparent 70%)`
  );

  // Large soft shadow following the pointer
  const shadowBg = useTransform(
    [shadowX, shadowY],
    ([x, y]) =>
      `radial-gradient(ellipse 800px 600px at ${x}% ${y}%, rgba(0,0,0,0.045) 0%, transparent 70%)`
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden font-[var(--font-plus-jakarta)] selection:bg-emerald-200/60"
    >
      <Background 
        gradientBg={gradientBg} 
        spotlightBg={spotlightBg} 
        shadowBg={shadowBg} 
      />

      <BannerPopup />

      {/* Main content */}
      <main className="relative max-w-[1400px] mx-auto px-8 lg:px-16 min-h-screen flex items-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full py-20">
          <Hero mouseX={smoothMouseX} mouseY={smoothMouseY} />
          <PlatformApps />
        </div>
      </main>
    </div>
  );
}
