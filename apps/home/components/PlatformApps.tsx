"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlgoIcon, BrainIcon, CraftIcon, LearnIcon, StreamIcon, AuthIcon } from "./icons";

const platformApps = [
  { name: "Seo/Geo Checker", icon: AlgoIcon, status: "LIVE" },
  { name: "Knowledge Base", icon: BrainIcon, status: "LIVE" },
  { name: "Agentic Blogs", icon: CraftIcon, status: "LIVE" },
  { name: "Learn With Nabin", icon: LearnIcon, status: "COMING SOON" },
  { name: "Stream/Interview", icon: StreamIcon, status: "COMING SOON" },
  { name: "Auth(IDP/IAM server)", icon: AuthIcon, status: "COMING SOON" },
];

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

export function PlatformApps() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="w-full max-w-xl mx-auto lg:mx-0 flex-shrink-0"
    >
      <motion.div
        className="relative rounded-[16px] md:rounded-[12px] overflow-hidden bg-white border border-gray-300 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] selection:bg-emerald-100"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="overflow-hidden">
          {/* Card header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200 gap-2">
            <h2 className="text-[12px] md:text-[13px] font-black tracking-[0.2em] text-gray-900 uppercase">
              Platform Apps
            </h2>
            <span className="text-[10px] md:text-[11px] text-gray-700 font-bold tracking-wider italic">
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
  );
}
