"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TECH_LOGOS } from "@/shared/ui/tech-logos";

export function TechMarquee() {
  const items = useMemo(() => TECH_LOGOS, []);
  const looped = useMemo(() => items.concat(items), [items]);

  // =========================
  // DESKTOP (sticky + scroll)
  // =========================
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const inViewRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(inViewRef, { amount: 0.35, once: true });

  const [maxX, setMaxX] = useState(0);

  useEffect(() => {
    const calc = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const viewportW = section.clientWidth;
      const trackW = track.scrollWidth;

      setMaxX(Math.max(0, trackW - viewportW));
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight;

      const start = viewportH;
      const end = -rect.height;

      const progress = (start - rect.top) / (start - end);
      const clamped = Math.min(1, Math.max(0, progress));

      const x = -maxX * clamped;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [maxX]);

  const spacerPx = useMemo(() => {
    const raw = maxX * 0.9;
    return Math.max(520, Math.min(1400, raw + 420));
  }, [maxX]);

  return (
    <section id="tech" className="relative w-full">
      {/* =========================
    MOBILE: marquee automático (sin huecos)
   ========================= */}
      <div className="md:hidden overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="py-10"
        >
          <div className="mx-auto w-full max-w-[720px] px-5">
            <div className="relative rounded-3xl border border-border/40 bg-background/18 backdrop-blur-md p-4 overflow-hidden">
              {/* fade en bordes para que nunca “corte feo” */}
              <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" />

              <div className="relative overflow-hidden">
                {/* Track: w-max + duplicado exacto */}
                <div className="tech-marquee-track flex w-max gap-3">
                  {looped.map(({ Icon, name }, idx) => (
                    <div
                      key={`${name}-m-${idx}`}
                      className="
                  shrink-0
                  rounded-2xl
                  border border-border/40
                  bg-background/20
                  backdrop-blur-md
                  shadow-sm
                  flex items-center justify-center
                  w-[72px] h-[72px]
                  p-4
                "
                      aria-label={name}
                      title={name}
                    >
                      <Icon className="w-full h-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =========================
          DESKTOP: tu efecto actual
         ========================= */}
      <section ref={sectionRef} className="hidden md:block relative w-full">
        <div className="sticky top-0 h-[55svh] flex items-center overflow-hidden">
          <motion.div
            ref={inViewRef}
            initial={{ opacity: 0, y: 14, scale: 0.99 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full"
          >
            <div ref={trackRef} className="flex gap-4 px-10 will-change-transform">
              {looped.map(({ Icon, name }, idx) => (
                <div
                  key={`${name}-d-${idx}`}
                  className="
                    shrink-0
                    rounded-3xl
                    border border-border/40
                    bg-background/18 backdrop-blur-md
                    shadow-sm
                    flex items-center justify-center
                    w-[clamp(96px,10vw,156px)] h-[clamp(96px,10vw,156px)]
                    p-6
                    transition
                    hover:-translate-y-1 hover:shadow-md
                  "
                  aria-label={name}
                  title={name}
                >
                  <Icon className="w-full h-full" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div style={{ height: spacerPx }} aria-hidden="true" />
      </section>
    </section>
  );
}
