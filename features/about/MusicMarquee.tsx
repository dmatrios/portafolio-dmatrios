"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Track } from "./types";

type Props = {
  tracks: Track[];
  onSelect: (t: Track) => void;
  speedPxPerSec?: number; // marquee desktop
};

export function MusicMarquee({ tracks, onSelect, speedPxPerSec = 42 }: Props) {
  // ===== Desktop marquee refs =====
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const laneRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const xRef = useRef(0);
  const pausedRef = useRef(false);

  // ===== Mobile slider refs =====
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const [mobileReady, setMobileReady] = useState(false);

  // duplicated lane (for seamless loop)
  const laneItems = useMemo(() => [...tracks, ...tracks], [tracks]);

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  // ===== Desktop marquee loop (transform translateX) =====
  useEffect(() => {
    if (reduceMotion) return;

    const lane = laneRef.current;
    const wrap = wrapRef.current;
    if (!lane || !wrap) return;

    const measure = () => {
      // width of 1 set (half of lane because duplicated)
      const total = lane.scrollWidth;
      const half = total / 2;
      return { total, half };
    };

    let { half } = measure();

    const onResize = () => {
      const m = measure();
      half = m.half;
      // keep x inside bounds
      if (half > 0) xRef.current = xRef.current % half;
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(lane);
    ro.observe(wrap);

    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!pausedRef.current) {
        xRef.current += speedPxPerSec * dt;
        if (half > 0 && xRef.current >= half) xRef.current -= half;
        lane.style.transform = `translate3d(${-xRef.current}px,0,0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion, speedPxPerSec, laneItems.length]);

  // ===== Mobile: init to middle set + infinite reposition =====
  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;

    setMobileReady(true);

    const init = () => {
      const third = el.scrollWidth / 3;
      if (!Number.isFinite(third) || third <= 0) return;
      el.scrollLeft = third;
    };

    const id = requestAnimationFrame(init);

    const onScroll = () => {
      const third = el.scrollWidth / 3;
      if (!Number.isFinite(third) || third <= 0) return;

      if (el.scrollLeft < third * 0.5) el.scrollLeft += third;
      else if (el.scrollLeft > third * 1.5) el.scrollLeft -= third;
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      el.removeEventListener("scroll", onScroll);
    };
  }, [tracks.length]);

  const mobileItems = useMemo(() => [...tracks, ...tracks, ...tracks], [tracks]);

  const mobileStep = (dir: -1 | 1) => {
    const el = mobileRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollBy({ left: w * dir, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* ===== DESKTOP/TABLET: MARQUEE ===== */}
      <div className="hidden md:block">
        <div
          ref={wrapRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
          className="relative w-full overflow-hidden"
        >
          {/* lane */}
          <div
            ref={laneRef}
            className="flex w-max items-center gap-7 px-6 md:px-10 lg:px-14 py-10 will-change-transform"
          >
            {laneItems.map((t, i) => (
              <motion.button
                key={`${t.title}-${i}`}
                type="button"
                onClick={() => onSelect(t)}
                whileHover={!reduceMotion ? { scale: 1.03, y: -4 } : undefined}
                whileTap={!reduceMotion ? { scale: 0.985 } : undefined}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="
                  group relative shrink-0
                  w-[280px] lg:w-[300px]
                  aspect-square
                  rounded-2xl
                  overflow-hidden
                  border border-white/10
                  bg-white/5
                  shadow-[0_22px_80px_rgba(0,0,0,0.30)]
                "
              >
                <img
                  src={t.cover}
                  alt={t.title}
                  draggable={false}
                  className="h-full w-full object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                <div className="absolute bottom-3 left-3">
                  <div className="max-w-[230px] rounded-full border border-white/14 bg-white/10 backdrop-blur-xl px-3 py-1.5 shadow-[0_16px_50px_rgba(0,0,0,0.28)]">
                    <p className="truncate text-[12px] font-[750] tracking-wide text-white/92">
                      {t.artist} — {t.title}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* fade edges (premium, sin cuadros) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-[linear-gradient(to_right,rgb(var(--background))_10%,transparent)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-[linear-gradient(to_left,rgb(var(--background))_10%,transparent)]" />
        </div>
      </div>

      {/* ===== MOBILE: 1x1 slider ===== */}
      <div className="md:hidden">
        <div className="relative">
          {/* flechas */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-[5] flex items-center justify-between px-4">
            <button
              type="button"
              aria-label="Prev"
              onClick={() => mobileStep(-1)}
              className="
                pointer-events-auto
                inline-flex h-11 w-11 items-center justify-center
                rounded-full
                border border-white/14
                bg-white/10
                backdrop-blur-xl
                shadow-[0_18px_60px_rgba(0,0,0,0.18)]
                transition
                hover:-translate-y-0.5 hover:bg-white/16
                active:translate-y-0
              "
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              aria-label="Next"
              onClick={() => mobileStep(1)}
              className="
                pointer-events-auto
                inline-flex h-11 w-11 items-center justify-center
                rounded-full
                border border-white/14
                bg-white/10
                backdrop-blur-xl
                shadow-[0_18px_60px_rgba(0,0,0,0.18)]
                transition
                hover:-translate-y-0.5 hover:bg-white/16
                active:translate-y-0
              "
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div
            ref={mobileRef}
            className="
              w-full
              overflow-x-auto overflow-y-hidden
              flex
              snap-x snap-mandatory
              px-6
              py-10
              gap-6
              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {mobileItems.map((t, i) => (
              <button
                key={`${t.title}-${i}`}
                type="button"
                onClick={() => onSelect(t)}
                className="
                  snap-center
                  shrink-0
                  w-[86vw]
                  max-w-[360px]
                  aspect-square
                  rounded-2xl
                  overflow-hidden
                  border border-white/10
                  bg-white/5
                  shadow-[0_22px_80px_rgba(0,0,0,0.30)]
                  relative
                "
              >
                <img
                  src={t.cover}
                  alt={t.title}
                  draggable={false}
                  className="h-full w-full object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                <div className="absolute bottom-3 left-3">
                  <div className="max-w-[240px] rounded-full border border-white/14 bg-white/10 backdrop-blur-xl px-3 py-1.5 shadow-[0_16px_50px_rgba(0,0,0,0.28)]">
                    <p className="truncate text-[12px] font-[750] tracking-wide text-white/92">
                      {t.artist} — {t.title}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-[linear-gradient(to_right,rgb(var(--background))_20%,transparent)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-[linear-gradient(to_left,rgb(var(--background))_20%,transparent)]" />
        </div>
      </div>
    </div>
  );
}
