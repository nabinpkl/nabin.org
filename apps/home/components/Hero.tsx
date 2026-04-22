"use client";

import { motion, MotionValue } from "framer-motion";
import { TiltCard } from "./TiltCard";

interface HeroProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export function Hero({ mouseX, mouseY }: HeroProps) {
  return (
    <TiltCard
      className="relative w-full max-w-xl flex-shrink-0 cursor-default text-center lg:text-left mx-auto lg:mx-0"
      tiltMax={8}
      glare={false}
      scale={1.0}
      baseTiltX={-8}
      mouseX={mouseX}
      mouseY={mouseY}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.p
          className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-gray-700 uppercase mb-4 md:mb-6"
          style={{ transform: "translateZ(30px)" }}
        >
          Nabin Pokhrel
        </motion.p>
        
        <motion.h1
          className="text-[2.2rem] sm:text-[2.8rem] md:text-[4rem] lg:text-[4.5rem] font-black leading-[0.95] tracking-[-0.065em] text-gray-950 mb-6"
          style={{ transform: "translateZ(60px)" }}
        >
          Is a
          <br />
          Product Mindset
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
          className="text-sm md:text-base text-gray-800 leading-relaxed mb-4 max-w-xl mt-6 md:mt-8 mx-auto lg:mx-0"
          style={{ transform: "translateZ(25px)" }}
        >
          I am a full-stack developer with a passion for building innovative and user-friendly applications. 
          This is home to my portfolio where I showcase my projects, share my thoughts on development, and connect with like-minded individuals.
        </motion.p>

        <motion.p
          className="text-[12px] md:text-sm text-gray-700 italic"
          style={{ transform: "translateZ(18px)" }}
        >
          Open to work and collaboration. Let's work on something amazing together. 
        </motion.p>
      </motion.div>
    </TiltCard>
  );
}
