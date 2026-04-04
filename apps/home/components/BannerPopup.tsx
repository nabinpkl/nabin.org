"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export function BannerPopup() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % bannerMessages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
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
  );
}
