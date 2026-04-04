"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ─────────────── Platform Apps Data ─────────────── */

const platformApps = [
  { name: "Seo/Geo Checker", icon: AlgoIcon, status: "LIVE" },
  { name: "Knowledge Base", icon: BrainIcon, status: "LIVE" },
  { name: "Agentic Blogs", icon: CraftIcon, status: "LIVE" },
  { name: "Learn With Nabin", icon: LearnIcon, status: "COMING SOON" },
  { name: "Stream/Interview", icon: StreamIcon, status: "COMING SOON" },
  { name: "Auth(IDP/IAM server)", icon: AuthIcon, status: "COMING SOON" },
];

/* ─────────────── Icon Components ─────────────── */

function AlgoIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 14l6-6 6 6" /><circle cx="18" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
}

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain-icon lucide-brain"><path d="M12 18V5" /><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" /><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" /><path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" /><path d="M18 18a4 4 0 0 0 2-7.464" /><path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" /><path d="M6 18a4 4 0 0 1-2-7.464" /><path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" /></svg>
  );
}

function InterviewIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CraftIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function LearnIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 7h6" /><path d="M9 11h6" /><path d="M9 15h3" />
    </svg>
  );
}

function StreamIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13 17l5-5-5-5" /><path d="M6 17l5-5-5-5" /><circle cx="3" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function AuthIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function BracesIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 18l6-6-6-6" /><path d="M8 6L2 12l6 6" />
    </svg>
  );
}

function HashIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
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
  mouseX,
  mouseY,
}: {
  children: React.ReactNode;
  className?: string;
  tiltMax?: number;
  glare?: boolean;
  scale?: number;
  baseTiltX?: number;
  mouseX?: any;
  mouseY?: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(baseTiltX);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = { stiffness: 300, damping: 30 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  // If global mouse is provided, drive values from it
  useEffect(() => {
    if (mouseX && mouseY) {
      const unsubscribeX = mouseX.on("change", (v: number) => {
        // Maps 0..0.5 to -1..1. 
        const effectiveX = Math.min(v / 0.5, 1);
        const percentX = effectiveX * 2 - 1;

        // Weight is 1 for left half, then drops off sharply
        const weight = v <= 0.5 ? 1 : Math.max(0, 1 - (v - 0.5) * 5);

        rotateY.set(percentX * tiltMax * weight);

        const currentYPercent = mouseY.get() * 2 - 1;
        rotateX.set(-currentYPercent * tiltMax * weight + baseTiltX);

        glareX.set(effectiveX * 100);
      });
      const unsubscribeY = mouseY.on("change", (v: number) => {
        const xPos = mouseX.get();
        const weight = xPos <= 0.5 ? 1 : Math.max(0, 1 - (xPos - 0.5) * 5);
        const percentY = v * 2 - 1;
        rotateX.set(-percentY * tiltMax * weight + baseTiltX);
        glareY.set(v * 100);
      });
      return () => {
        unsubscribeX();
        unsubscribeY();
      };
    }
  }, [mouseX, mouseY, tiltMax, baseTiltX, rotateX, rotateY, glareX, glareY]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (mouseX && mouseY) return; // Ignore local mouse if global is provided
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
    [rotateX, rotateY, glareX, glareY, tiltMax, baseTiltX, mouseX, mouseY]
  );

  const handleMouseLeave = () => {
    if (mouseX && mouseY) return;
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
      animate={{
        opacity: 1,
        x: hovered ? 8 : 0
      }}
      transition={{
        x: { duration: 0.3, ease: "easeOut" },
        opacity: { duration: 0.4, delay: 0.4 + index * 0.08 }
      }}
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

      <div className="relative flex items-center gap-3.5 z-[1]">
        <motion.div
          initial={{ borderColor: "rgba(209, 213, 219, 0.8)" }}
          animate={{
            rotateY: hovered ? 360 : 0,
            scale: hovered ? 1.05 : 1,
            backgroundColor: hovered
              ? "rgba(249, 250, 251, 0.5)"
              : "rgba(255, 255, 255, 0)",
            borderColor: hovered
              ? "rgba(107, 114, 128, 0.9)"
              : "rgba(209, 213, 219, 0.8)",
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-7 h-7 rounded-lg border flex items-center justify-center text-gray-900"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ color: hovered ? "#111827" : "#374151" }}
            transition={{ duration: 0.3 }}
          >
            <app.icon className="w-4 h-4" />
          </motion.div>
        </motion.div>
        <motion.span
          animate={{
            x: hovered ? 1 : 0,
            color: hovered ? "#111827" : "#111827",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-[16px] font-bold tracking-tight text-gray-950"
        >
          {app.name}
        </motion.span>
      </div>

      <motion.span
        animate={{
          opacity: hovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.25 }}
        className="relative z-[1] text-[11px] font-black tracking-[0.14em] text-gray-700 uppercase"
      >
        {app.status}
      </motion.span>
    </motion.div>
  );
}

const bannerMessages = [
  {
    text: "Keep visiting. Big updates are in progress.",
    icon: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5" /><path d="M6 17l5-5-5-5" /><circle cx="3" cy="12" r="1.5" fill="currentColor" /></svg>
    )
  },
  {
    text: "Welcome to my world.",
    icon: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
    )
  },
  {
    text: "Thank you for visiting.",
    icon: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
    )
  },
  {
    text: "Real-time collaborative code streaming.",
    icon: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
    )
  },
  {
    text: "Built for developers, by developer.",
    icon: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
    )
  },
];

/* ─────────────── Main Page ─────────────── */

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Current message index for the cycling popup
  const [msgIndex, setMsgIndex] = useState(0);

  // Cycle through messages
  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % bannerMessages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
        animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-[18%] right-[10%] opacity-[0.06] -z-10"
      >
        <HashIcon className="w-32 h-32 text-gray-500" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
        className="absolute top-[12%] left-[43%] opacity-[0.04] -z-10"
      >
        <BracesIcon className="w-24 h-24 text-gray-500" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[40%] right-[32%] opacity-[0.03] -z-10"
      >
        <HeartIcon className="w-28 h-28 text-gray-400" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
        className="absolute top-[65%] left-[15%] opacity-[0.04] -z-10"
      >
        <BracesIcon className="w-36 h-36 text-gray-500" />
      </motion.div>

      <motion.div
        className="absolute top-6 right-6 z-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={msgIndex}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}
            className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-full px-4 py-2 shadow-sm cursor-default min-w-[300px]"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="text-gray-950 shrink-0">
                {bannerMessages[msgIndex]?.icon()}
              </div>
              <span className="text-[13px] text-gray-950 font-extrabold font-[var(--font-plus-jakarta)] tracking-tight whitespace-nowrap">
                {bannerMessages[msgIndex]?.text}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Main content */}
      <main className="relative max-w-[1400px] mx-auto px-8 lg:px-16 min-h-screen flex items-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full py-20">
          {/* Left column: 3D tilt hero text */}
          <TiltCard
            className="relative max-w-xl flex-shrink-0 cursor-default"
            tiltMax={8}
            glare={false}
            scale={1.0}
            baseTiltX={-8}
            mouseX={smoothMouseX}
            mouseY={smoothMouseY}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.p
                className="text-xs font-semibold tracking-[0.25em] text-gray-700 uppercase mb-6"
                style={{ transform: "translateZ(30px)" }}
              >
                Nabin Pokhrel
              </motion.p>

              <motion.h1
                className="text-[2.8rem] md:text-[4rem] lg:text-[4.5rem] font-black leading-[0.92] tracking-[-0.065em] text-gray-950 mb-6"
                style={{ transform: "translateZ(60px)" }}
              >
                Is a
                <br />
                Product
                <br />
                Engineer.
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl font-black text-gray-950 mb-3"
                style={{ transform: "translateZ(45px)" }}
              >
                Practice. Build. Ship. Repeat.
              </motion.p>

              <motion.p
                className="text-base text-gray-800 leading-relaxed mb-4 max-w-xl mt-8"
                style={{ transform: "translateZ(25px)" }}
              >
                I am a full-stack developer with a passion for building innovative and user-friendly applications.
                This is home to products I have worked on actively working.
              </motion.p>

              <motion.p
                className="text-sm text-gray-700 italic"
                style={{ transform: "translateZ(18px)" }}
              >
                Built for developers, by developer.
              </motion.p>
            </motion.div>
          </TiltCard>

          {/* Right column: 3D platform apps card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full max-w-xl flex-shrink-0"
          >
            <motion.div
              className="relative rounded-[12px] overflow-hidden bg-white border border-gray-300 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] selection:bg-emerald-100"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="overflow-hidden">
                {/* Card header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-[13px] font-black tracking-[0.2em] text-gray-900 uppercase">
                    Platform Apps
                  </h2>
                  <span className="text-[11px] text-gray-700 font-bold tracking-wider italic">
                    In Development
                  </span>
                </div>

                {/* App list */}
                <div className="divide-y divide-gray-200">
                  {platformApps.map((app, i) => (
                    <AppRow key={app.name} app={app} index={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
