"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ─────────────── Platform Apps Data ─────────────── */

const platformApps = [
  { name: "Algo", icon: AlgoIcon, status: "COMING SOON" },
  { name: "Interview", icon: InterviewIcon, status: "COMING SOON" },
  { name: "Craft", icon: CraftIcon, status: "COMING SOON" },
  { name: "Learn", icon: LearnIcon, status: "COMING SOON" },
  { name: "Stream", icon: StreamIcon, status: "COMING SOON" },
  { name: "Auth", icon: AuthIcon, status: "COMING SOON" },
];

/* ─────────────── Icon Components ─────────────── */

function AlgoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h.01" /><path d="M7 20v-4" /><path d="M12 20v-8" /><path d="M17 20V8" /><path d="M22 4v16" />
    </svg>
  );
}

function InterviewIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CraftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function LearnIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function StreamIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11" /><rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}

function AuthIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}

function HashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.15">
      <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  );
}

function BracesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.12">
      <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
      <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.15">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

/* ─────────────── 3D Tilt Card Component ─────────────── */

function TiltCard({
  children,
  className,
  tiltMax = 12,
  glare = true,
  scale = 1.02,
  baseTiltX = 0,
}: {
  children: React.ReactNode;
  className?: string;
  tiltMax?: number;
  glare?: boolean;
  scale?: number;
  baseTiltX?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = { stiffness: 300, damping: 25 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);

      rotateX.set(-percentY * tiltMax + baseTiltX);
      rotateY.set(percentX * tiltMax);
      glareX.set(((e.clientX - rect.left) / rect.width) * 100);
      glareY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [rotateX, rotateY, glareX, glareY, tiltMax]
  );

  const handleMouseLeave = () => {
    rotateX.set(baseTiltX);
    rotateY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      animate={{ scale: isHovered ? scale : 1 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
      {/* Glare overlay */}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`
            ),
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      )}
    </motion.div>
  );
}

/* ─────────────── App Row (3D hover) ─────────────── */

function AppRow({
  app,
  index,
}: {
  app: (typeof platformApps)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-between px-6 py-4 group cursor-default overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Animated background fill */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-transparent rounded-lg"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0, originX: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      <div className="relative flex items-center gap-3 z-[1]">
        <motion.div
          animate={{
            rotateY: hovered ? 360 : 0,
            scale: hovered ? 1.15 : 1,
            backgroundColor: hovered
              ? "rgba(99, 102, 241, 0.12)"
              : "rgba(243, 244, 246, 0.8)",
            borderColor: hovered
              ? "rgba(99, 102, 241, 0.25)"
              : "rgba(229, 231, 235, 0.5)",
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-9 h-9 rounded-lg border flex items-center justify-center text-gray-500"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ color: hovered ? "#4f46e5" : "#6b7280" }}
            transition={{ duration: 0.3 }}
          >
            <app.icon />
          </motion.div>
        </motion.div>
        <motion.span
          animate={{
            x: hovered ? 4 : 0,
            color: hovered ? "#312e81" : "#1f2937",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-sm font-semibold"
        >
          {app.name}
        </motion.span>
      </div>

      <motion.span
        animate={{
          x: hovered ? -2 : 0,
          opacity: hovered ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.25 }}
        className="relative z-[1] text-[10px] font-semibold tracking-[0.1em] text-gray-400 uppercase"
      >
        {app.status}
      </motion.span>
    </motion.div>
  );
}

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
        radial-gradient(ellipse 600px 600px at ${px * 0.6 + 10}% ${py * 0.5 + 5}%, rgba(252,196,210,0.5) 0%, transparent 70%),
        radial-gradient(ellipse 500px 500px at ${100 - px * 0.4}% ${py * 0.3}%, rgba(180,200,255,0.4) 0%, transparent 70%),
        radial-gradient(ellipse 700px 400px at ${px * 0.5 + 25}% ${100 - py * 0.4}%, rgba(200,220,255,0.35) 0%, transparent 70%),
        radial-gradient(ellipse 400px 400px at ${px * 0.3 + 50}% ${py * 0.6 + 20}%, rgba(240,200,240,0.25) 0%, transparent 70%),
        linear-gradient(135deg, #fce4ec 0%, #f8e8f0 15%, #f0f0fa 35%, #e8f4fc 55%, #eef6fd 75%, #f5f5f5 100%)
      `;
    }
  );

  // Direct pointer-following spotlight gradient
  const spotlightBg = useTransform(
    [smoothPointerX, smoothPointerY],
    ([x, y]) =>
      `radial-gradient(circle 350px at ${x}% ${y}%, rgba(255,200,220,0.35) 0%, rgba(200,210,255,0.18) 40%, transparent 70%)`
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
      className="relative min-h-screen overflow-hidden font-[var(--font-geist-sans)] selection:bg-pink-200/60"
    >
      {/* Animated background gradient that follows mouse */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ background: gradientBg }}
      />

      {/* Pointer-following spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-[9]"
        style={{ background: spotlightBg }}
      />

      {/* Huge subtle shadow following cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-[8]"
        style={{ background: shadowBg }}
      />

      {/* Floating decorative icons */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-[15%] right-[8%]"
      >
        <HashIcon className="text-gray-400" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 6, 0], rotate: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
        className="absolute top-[22%] right-[18%]"
      >
        <HashIcon className="text-gray-300" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[12%] left-[42%]"
      >
        <BracesIcon className="text-gray-400" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 5, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] left-[6%]"
      >
        <HeartIcon className="text-gray-400" />
      </motion.div>

      {/* Top banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 right-6 z-10"
      >
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 bg-white/70 backdrop-blur-md border border-gray-200/60 rounded-full px-5 py-2.5 shadow-sm cursor-default"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
            <path d="M2 20h.01" /><path d="M7 20v-4" /><path d="M12 20v-8" /><path d="M17 20V8" />
          </svg>
          <span className="text-sm text-gray-700 font-medium">
            We&apos;ll be with you with awesome features soon.
          </span>
        </motion.div>
      </motion.div>

      {/* Main content */}
      <main className="relative max-w-7xl mx-auto px-8 lg:px-16 pt-32 pb-24">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          {/* Left column: 3D tilt hero text */}
          <TiltCard
            className="relative max-w-xl flex-shrink-0 cursor-default"
            tiltMax={15}
            glare={false}
            scale={1.0}
            baseTiltX={-5}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.p
                className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase mb-6"
                style={{ transform: "translateZ(30px)" }}
              >
                Real-Time Space
              </motion.p>

              <motion.h1
                className="text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-black leading-[1.05] tracking-tight text-gray-950 mb-8"
                style={{ transform: "translateZ(60px)" }}
              >
                Where
                <br />
                developers
                <br />
                level up.
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl font-extrabold text-gray-900 mb-5"
                style={{ transform: "translateZ(45px)" }}
              >
                Practice. Build. Ship. Repeat.
              </motion.p>

              <motion.p
                className="text-base text-gray-600 leading-relaxed mb-6 max-w-md"
                style={{ transform: "translateZ(25px)" }}
              >
                Your entire developer journey in one space. Practice algorithms. Ace
                interviews. Learn from experts. Stream your code. All in one place
                — built by developers, for developers.
              </motion.p>

              <motion.p
                className="text-sm text-gray-500 italic"
                style={{ transform: "translateZ(18px)" }}
              >
                Built for students, self-taught devs, professionals, and hiring
                teams.
              </motion.p>
            </motion.div>
          </TiltCard>

          {/* Right column: 3D platform apps card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full max-w-sm flex-shrink-0"
          >
            <TiltCard
              className="relative rounded-2xl overflow-hidden"
              tiltMax={14}
              glare={true}
              scale={1.04}
              baseTiltX={-3}
            >
              <div className="bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-lg shadow-gray-200/40 overflow-hidden">
                {/* Card header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4">
                  <h2 className="text-xs font-bold tracking-[0.15em] text-gray-800 uppercase">
                    Platform Apps
                  </h2>
                  <span className="text-xs text-gray-400 font-medium italic">
                    In Development
                  </span>
                </div>

                {/* App list */}
                <div className="divide-y divide-gray-100/80">
                  {platformApps.map((app, i) => (
                    <AppRow key={app.name} app={app} index={i} />
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
