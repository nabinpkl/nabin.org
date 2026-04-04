"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMax?: number;
  glare?: boolean;
  scale?: number;
  baseTiltX?: number;
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
}

export function TiltCard({
  children,
  className,
  tiltMax = 12,
  glare = true,
  scale = 1.02,
  baseTiltX = 0,
  mouseX,
  mouseY,
}: TiltCardProps) {
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
