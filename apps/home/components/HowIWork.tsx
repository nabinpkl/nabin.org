"use client";

import { motion } from "framer-motion";
import { Dumbbell, Hammer, Rocket, Repeat, type LucideIcon } from "lucide-react";

type Pillar = {
  title: string;
  icon: LucideIcon;
  body: string;
};

const pillars: Pillar[] = [
  {
    title: "Practice",
    icon: Dumbbell,
    body: "Sharpen fundamentals. Read source, write prototypes, stay close to the edges of the stack where the interesting problems live.",
  },
  {
    title: "Build",
    icon: Hammer,
    body: "End-to-end ownership. From schema to pixel, I care about the whole path a request travels and the person on the other end of it.",
  },
  {
    title: "Ship",
    icon: Rocket,
    body: "Release early, measure honestly. Real users beat perfect plans. The first version is a question; the next version is the answer.",
  },
  {
    title: "Repeat",
    icon: Repeat,
    body: "Compound the lessons. Every cycle feeds the next — sharper instincts, better taste, fewer wasted turns.",
  },
];

export function HowIWork() {
  return (
    <section id="how-i-work" className="scroll-mt-24 mt-24 lg:mt-32 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-10 lg:mb-14"
      >
        <p className="text-[11px] md:text-xs font-black tracking-[0.25em] text-emerald-700 uppercase mb-3">
          How I Work
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-[-0.04em] text-gray-950">
          Practice. Build. Ship. Repeat.
        </h2>
        <p className="text-sm md:text-base text-gray-700 mt-4 max-w-xl mx-auto">
          A small loop, run honestly, beats a grand plan run once.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: i * 0.08,
            }}
            whileHover={{ y: -4 }}
            className="relative rounded-[14px] bg-white border border-gray-300 p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.18)] transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg border border-gray-300 bg-gray-50 flex items-center justify-center text-gray-900">
                <pillar.icon className="w-4.5 h-4.5" strokeWidth={2.25} />
              </div>
              <span className="text-[10px] font-black tracking-[0.22em] text-gray-500 uppercase">
                0{i + 1}
              </span>
            </div>
            <h3 className="text-lg font-black tracking-tight text-gray-950 mb-2">
              {pillar.title}
            </h3>
            <p className="text-[13px] md:text-sm text-gray-700 leading-relaxed">
              {pillar.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
