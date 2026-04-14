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
      <main className="relative max-w-[1400px] mx-auto px-6 md:px-8 lg:px-16 min-h-screen flex flex-col justify-center py-20 lg:pt-28 lg:pb-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12 lg:gap-20 w-full">
          <Hero mouseX={smoothMouseX} mouseY={smoothMouseY} />
          <PlatformApps />
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          className="flex items-center justify-center gap-4 mt-16 lg:mt-20 pb-8"
        >
          <a
            href="https://linkedin.com/in/nabin-pokhrel"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="flex items-center gap-3 px-8 py-4 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm text-gray-700 font-bold text-base shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-lg transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/nabinpkl"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="flex items-center gap-3 px-8 py-4 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm text-gray-700 font-bold text-base shadow-sm hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:shadow-lg transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </motion.div>
      </main>
    </div>
  );
}
