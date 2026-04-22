"use client";

import { motion, MotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface CursorFollowerProps {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  isHovering: boolean;
}

export function CursorFollower({ pointerX, pointerY, isHovering }: CursorFollowerProps) {
  const [mounted, setMounted] = useState(false);

  // Use springs for smooth movement
  const springX = useSpring(pointerX, { stiffness: 450, damping: 40 });
  const springY = useSpring(pointerY, { stiffness: 450, damping: 40 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-[800px] h-[600px] -ml-[400px] -mt-[300px] z-100 mix-blend-multiply opacity-0"
      style={{
        x: springX,
        y: springY,
        background: `
          radial-gradient(ellipse at center, 
            rgba(0, 0, 0, 0.14) 0%, 
            rgba(0, 0, 0, 0.08) 30%, 
            rgba(0, 0, 0, 0.03) 55%, 
            transparent 80%
          )
        `,
        filter: "blur(60px)",
      }}
      animate={{ 
        opacity: isHovering ? 1 : 0,
        scale: isHovering ? 1 : 0.9,
      }}
      transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
    />
  );
}
