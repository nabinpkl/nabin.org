"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { HashIcon, BracesIcon, HeartIcon } from "./icons";

interface BackgroundProps {
  gradientBg: MotionValue<string>;
  spotlightBg: MotionValue<string>;
  shadowBg: MotionValue<string>;
}

export function Background({ gradientBg, spotlightBg, shadowBg }: BackgroundProps) {
  return (
    <>
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
        <HashIcon className="w-16 h-16 md:w-32 md:h-32 text-gray-500" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
        className="absolute top-[8%] left-[10%] md:top-[12%] md:left-[43%] opacity-[0.04] -z-10"
      >
        <BracesIcon className="w-12 h-12 md:w-24 md:h-24 text-gray-500" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[40%] right-[5%] md:right-[32%] opacity-[0.03] -z-10"
      >
        <HeartIcon className="w-14 h-14 md:w-28 md:h-28 text-gray-400" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[15%] left-[10%] md:top-[65%] md:left-[15%] opacity-[0.04] -z-10"
      >
        <BracesIcon className="w-20 h-20 md:w-36 md:h-36 text-gray-500" />
      </motion.div>
    </>
  );
}
