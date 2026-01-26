"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function ScrollHint() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      // Oculta cuando ya bajó un poco
      setShow((window.scrollY || 0) < 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
        >
          <div
            className={[
              "flex items-center gap-3 rounded-full px-4 py-2",
              "backdrop-blur-xl bg-background/35",
              "border border-border/50",
              "shadow-[0_10px_40px_rgba(0,0,0,0.18)]",
              "text-foreground/85",
            ].join(" ")}
          >
            {/* Mouse outline */}
            <div className="relative h-8 w-5 rounded-full border border-foreground/25">
              <motion.span
                aria-hidden="true"
                className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-foreground/70"
                animate={{ y: [0, 10, 0], opacity: [0.65, 0.9, 0.65] }}
                transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Subtle label (desktop) */}
            <span className="hidden sm:block text-xs tracking-wide text-foreground/70">
              Scroll
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
