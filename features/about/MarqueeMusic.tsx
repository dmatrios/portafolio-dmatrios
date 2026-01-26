"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Track } from "./types";

type Props = {
  tracks: Track[];
  onSelect: (t: Track) => void;
  speedPxPerSec?: number; // desktop
  mobileIntervalMs?: number; // mobile
};

export function MarqueeMusic({
  tracks,
  onSelect,
  speedPxPerSec = 48,
  mobileIntervalMs = 2600,
}: Props) {
  const reduceMotion = useReducedMotion();

  const rootRef = useRef<HTMLDivElement | null>(null);

  // Desktop marquee refs
  const trackRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);
  const pausedRef = useRef<boolean>(false);

  // Mobile slider refs
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const mobileTimerRef = useRef<number | null>(null);
  const mobileIndexRef = useRef<number>(0);
  const isDownRef = useRef(false);
  const movedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  // duplicamos para loop estable
  const desktopItems = useMemo(() => [...tracks, ...tracks], [tracks]);
  const mobileItems = useMemo(() => [...tracks, ...tracks, ...tracks], [tracks]);

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  // ---------- Desktop marquee ----------
  useEffect(() => {
    if (reduceMotion) return;
    const trackEl = trackRef.current;
    const contentEl = contentRef.current;
    if (!trackEl || !contentEl) return;

    const measure = () => {
      // contentEl contiene 2 copias; la mitad es “loopWidth”
      const loopWidth = contentEl.scrollWidth / 2;
      return loopWidth > 0 ? loopWidth : 0;
    };

    const step = (t: number) => {
      if (!lastRef.current) lastRef.current = t;
      const dt = (t - lastRef.current) / 1000;
      lastRef.current = t;

      const loopWidth = measure();
      if (loopWidth <= 0) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      if (!pausedRef.current) {
        offsetRef.current += speedPxPerSec * dt;
        if (offsetRef.current >= loopWidth) offsetRef.current -= loopWidth;

        // translateX negativo para mover hacia la izquierda
        contentEl.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = 0;
    };
  }, [reduceMotion, speedPxPerSec, desktopItems.length]);

  // ---------- Mobile: 1 en 1 infinito ----------
  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;

    // arrancar al centro
    requestAnimationFrame(() => {
      const third = el.scrollWidth / 3;
      if (third > 0) el.scrollLeft = third;
    });

    const onScroll = () => {
      const third = el.scrollWidth / 3;
      if (!Number.isFinite(third) || third <= 0) return;

      if (el.scrollLeft < third * 0.5) el.scrollLeft += third;
      else if (el.scrollLeft > third * 1.5) el.scrollLeft -= third;
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [mobileItems.length]);

  const stopMobileTimer = () => {
    if (mobileTimerRef.current) window.clearInterval(mobileTimerRef.current);
    mobileTimerRef.current = null;
  };

  const startMobileTimer = () => {
    stopMobileTimer();
    mobileTimerRef.current = window.setInterval(() => {
      const el = mobileRef.current;
      if (!el) return;

      const cardW = getMobileCardWidth();
      if (!cardW) return;

      mobileIndexRef.current += 1;
      el.scrollBy({ left: cardW, behavior: "smooth" });
    }, mobileIntervalMs);
  };

  const getMobileCardWidth = () => {
    const el = mobileRef.current;
    if (!el) return 0;
    const first = el.querySelector<HTMLElement>("[data-mcard='1']");
    if (!first) return 0;

    // card width + gap (gap-5 => 20px)
    const w = first.getBoundingClientRect().width;
    return Math.round(w + 20);
  };

  useEffect(() => {
    // solo en mobile: autoplay 1-por-1
    startMobileTimer();
    return () => stopMobileTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileIntervalMs]);

  // Mobile drag (swipe)
  const onMobilePointerDown = (e: React.PointerEvent) => {
    const el = mobileRef.current;
    if (!el) return;
    isDownRef.current = true;
    movedRef.current = false;
    stopMobileTimer();

    startXRef.current = e.clientX;
    startScrollLeftRef.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };

  const onMobilePointerMove = (e: React.PointerEvent) => {
    const el = mobileRef.current;
    if (!el || !isDownRef.current) return;

    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 6) movedRef.current = true;

    el.scrollLeft = startScrollLeftRef.current - dx;
  };

  const onMobilePointerUp = (e: React.PointerEvent) => {
    const el = mobileRef.current;
    if (!el) return;
    isDownRef.current = false;
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {}

    // snap al card más cercano
    const cardW = getMobileCardWidth();
    if (cardW) {
      const target = Math.round(el.scrollLeft / cardW) * cardW;
      el.scrollTo({ left: target, behavior: "smooth" });
    }

    startMobileTimer();
  };

  return (
    <div ref={rootRef} className="relative w-full">
      {/* ============ DESKTOP marquee ============ */}
      <div
        className="hidden md:block"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div
          ref={trackRef}
          className="relative w-full overflow-hidden px-6 md:px-10 lg:px-14 py-10"
        >
          <div
            ref={contentRef}
            className="flex w-max items-center gap-7 will-change-transform"
          >
            {desktopItems.map((t, i) => (
              <motion.button
                key={`${t.title}-${i}`}
                type="button"
                onClick={() => onSelect(t)}
                whileHover={!reduceMotion ? { scale: 1.03, y: -3 } : undefined}
                whileTap={!reduceMotion ? { scale: 0.985 } : undefined}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="
                  group relative shrink-0
                  w-[280px] lg:w-[300px]
                  aspect-square
                  rounded-2xl overflow-hidden
                  border border-white/10 bg-white/5
                  shadow-[0_22px_80px_rgba(0,0,0,0.28)]
                "
              >
                <img
                  src={t.cover}
                  alt={t.title}
                  draggable={false}
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute bottom-3 left-3">
                  <div className="max-w-[230px] rounded-full border border-white/14 bg-white/10 backdrop-blur-xl px-3.5 py-2 shadow-[0_16px_50px_rgba(0,0,0,0.28)]">
                    <p className="truncate text-[12.5px] font-[800] tracking-wide text-white/92">
                      {t.artist} — {t.title}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ============ MOBILE 1-by-1 autoplay infinite ============ */}
      <div className="md:hidden px-6 py-8">
        <div
          ref={mobileRef}
          onPointerDown={onMobilePointerDown}
          onPointerMove={onMobilePointerMove}
          onPointerUp={onMobilePointerUp}
          onPointerCancel={() => {
            isDownRef.current = false;
            startMobileTimer();
          }}
          className="
            w-full overflow-x-auto overflow-y-hidden
            flex gap-5
            cursor-grab active:cursor-grabbing
            select-none
            [scrollbar-width:none]
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
            snap-x snap-mandatory
          "
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* padding lateral para “centrar” mejor */}
          <div className="shrink-0 w-2" />

          {mobileItems.map((t, i) => (
            <motion.button
              key={`${t.title}-m-${i}`}
              data-mcard={i === 0 ? "1" : undefined}
              type="button"
              onClick={() => {
                if (movedRef.current) return;
                onSelect(t);
              }}
              whileTap={!reduceMotion ? { scale: 0.985 } : undefined}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="
                snap-center
                group relative shrink-0
                w-[84vw] max-w-[360px]
                aspect-square
                rounded-2xl overflow-hidden
                border border-white/10 bg-white/5
                shadow-[0_22px_80px_rgba(0,0,0,0.28)]
              "
            >
              <img
                src={t.cover}
                alt={t.title}
                draggable={false}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute bottom-3 left-3">
                <div className="max-w-[240px] rounded-full border border-white/14 bg-white/10 backdrop-blur-xl px-3.5 py-2 shadow-[0_16px_50px_rgba(0,0,0,0.28)]">
                  <p className="truncate text-[12.5px] font-[800] tracking-wide text-white/92">
                    {t.artist} — {t.title}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}

          <div className="shrink-0 w-2" />
        </div>
      </div>
    </div>
  );
}
