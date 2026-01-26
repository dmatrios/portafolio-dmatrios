"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  title: string;
  coverSrc?: string;
  images: string[];
};

function uniq(arr: string[]) {
  return Array.from(new Set(arr.filter(Boolean)));
}

export function ProjectGallery({ title, coverSrc, images }: Props) {
  const all = useMemo(() => uniq([coverSrc ?? "", ...images]), [coverSrc, images]);

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);

  const hasMany = all.length > 1;
  const src = all[active];

  const next = () => setActive((v) => (v + 1) % all.length);
  const prev = () => setActive((v) => (v - 1 + all.length) % all.length);

  // ✅ autoplay suave + pausado en hover + se detiene si modal está abierto
  useEffect(() => {
    if (!hasMany || paused || open) return;
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % all.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [all.length, hasMany, paused, open]);

  // ✅ lock scroll cuando abre el lightbox
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollBarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollBarW > 0) document.body.style.paddingRight = `${scrollBarW}px`;

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [open]);

  // ✅ keyboard en lightbox
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (!hasMany) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, hasMany, all.length]);

  return (
    <div className="min-w-0 w-full">
      {/* Main */}
      <div
        className="group relative overflow-hidden rounded-[28px] border border-border/50 bg-background/20 backdrop-blur"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative aspect-[16/10] w-full">
          {/* transición premium entre imágenes */}
          <AnimatePresence mode="wait">
            {src ? (
              <motion.img
                key={src}
                src={src}
                alt={`${title} preview`}
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover cursor-zoom-in"
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onClick={() => setOpen(true)}
              />
            ) : (
              <motion.div
                key="no-media"
                className="absolute inset-0 grid place-items-center text-sm text-foreground/55"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No media
              </motion.div>
            )}
          </AnimatePresence>

          {/* overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-90" />

          {/* Expand (visible en mobile, hover en desktop) */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="
              absolute right-3 top-3
              pointer-events-auto
              inline-flex items-center gap-2
              rounded-full border border-white/15 bg-black/35 px-3 py-2
              text-xs text-white/90 backdrop-blur
              shadow-[0_10px_30px_-18px_rgba(0,0,0,.7)]
              transition
              md:opacity-0 md:translate-y-1 md:group-hover:opacity-100 md:group-hover:translate-y-0
              hover:bg-black/45 hover:border-white/25
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
            "
            aria-label="Open fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
            <span className="hidden sm:inline">Expand</span>
          </button>

          {/* arrows (hover desktop) */}
          {hasMany ? (
            <>
              <button
                type="button"
                onClick={prev}
                className="
                  absolute left-3 top-1/2 -translate-y-1/2
                  rounded-full border border-white/14 bg-black/35 p-2.5
                  text-white/90 backdrop-blur
                  shadow-[0_18px_40px_-22px_rgba(0,0,0,.8)]
                  opacity-0 transition
                  group-hover:opacity-100
                  hover:bg-black/50 hover:border-white/25
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                "
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={next}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  rounded-full border border-white/14 bg-black/35 p-2.5
                  text-white/90 backdrop-blur
                  shadow-[0_18px_40px_-22px_rgba(0,0,0,.8)]
                  opacity-0 transition
                  group-hover:opacity-100
                  hover:bg-black/50 hover:border-white/25
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                "
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}

          {/* contador */}
          {hasMany ? (
            <div className="pointer-events-none absolute left-3 bottom-3 inline-flex items-center rounded-full border border-white/12 bg-black/35 px-3 py-1.5 text-xs text-white/85 backdrop-blur">
              {active + 1} / {all.length}
            </div>
          ) : null}
        </div>
      </div>

      {/* Thumbs */}
      {hasMany ? (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-7">
          {all.slice(0, 12).map((s, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={`${s}-${idx}`}
                type="button"
                onClick={() => setActive(idx)}
                className={[
                  "relative overflow-hidden rounded-2xl border bg-background/15 backdrop-blur",
                  "aspect-[16/10] w-full",
                  "transition",
                  isActive
                    ? "border-white/35 shadow-[0_12px_30px_-20px_rgba(0,0,0,.7)]"
                    : "border-border/40 hover:border-border/70",
                ].join(" ")}
                aria-label={`Open image ${idx + 1}`}
              >
                <img
                  src={s}
                  alt={`${title} thumbnail ${idx + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>
      ) : null}

      <p className="mt-4 text-xs text-foreground/55">
        Auto-preview activado. Pasa el mouse para pausar.
      </p>

      {/* Lightbox */}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[2147483647] bg-black/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)} // ✅ click afuera cierra
          >
            {/* Container: full screen en mobile, card en desktop */}
            <motion.div
              className="
                relative h-full w-full pointer-events-auto
                md:mx-auto md:my-6 md:h-auto md:max-h-[calc(100vh-48px)] md:max-w-6xl
                md:overflow-hidden md:rounded-[28px] md:border md:border-white/10 md:bg-black
              "
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} // ✅ evita cerrar cuando haces click adentro
            >
              {/* Top bar (mobile): baja para que no la tape el header + safe area */}
              <div
                className="
                  absolute left-0 right-0 z-20
                  flex items-center justify-between gap-3 px-4
                  top-[calc(env(safe-area-inset-top)+12px)]
                  md:hidden
                "
              >
                <div className="text-xs text-white/75">
                  {active + 1} / {all.length}
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="
                    inline-flex items-center justify-center
                    rounded-full border border-white/14 bg-black/40 p-2.5
                    text-white/95 backdrop-blur
                    shadow-[0_18px_40px_-22px_rgba(0,0,0,.8)]
                    transition hover:bg-black/55 hover:border-white/25
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                  "
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Close (desktop) */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="
                  absolute right-3 top-3 z-20 hidden md:inline-flex
                  rounded-full border border-white/12 bg-black/40 p-2.5
                  text-white/95 backdrop-blur
                  shadow-[0_18px_40px_-22px_rgba(0,0,0,.8)]
                  transition hover:bg-black/55 hover:border-white/25
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                "
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* media */}
              <div className="relative h-full w-full md:bg-black">
                <div className="relative h-full w-full md:aspect-[16/10] md:h-auto">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`lb-${src}`}
                      src={src}
                      alt={`${title} fullscreen`}
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-contain bg-black"
                      initial={{ opacity: 0, scale: 0.995 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.005 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    />
                  </AnimatePresence>
                </div>

                {/* arrows overlay (touch-friendly) */}
                {hasMany ? (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      className="
                        absolute left-3 top-1/2 -translate-y-1/2 z-20
                        rounded-full border border-white/14 bg-black/40 p-3
                        text-white/95 backdrop-blur
                        shadow-[0_18px_50px_-22px_rgba(0,0,0,.9)]
                        transition hover:bg-black/60 hover:border-white/25
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                      "
                      aria-label="Previous"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                      type="button"
                      onClick={next}
                      className="
                        absolute right-3 top-1/2 -translate-y-1/2 z-20
                        rounded-full border border-white/14 bg-black/40 p-3
                        text-white/95 backdrop-blur
                        shadow-[0_18px_50px_-22px_rgba(0,0,0,.9)]
                        transition hover:bg-black/60 hover:border-white/25
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                      "
                      aria-label="Next"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                ) : null}

                {/* contador desktop abajo */}
                {hasMany ? (
                  <div className="hidden md:flex items-center justify-center gap-3 p-4">
                    <div className="text-xs text-white/70">
                      {active + 1} / {all.length}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* safe-area bottom (iOS) */}
              <div className="md:hidden h-[env(safe-area-inset-bottom)]" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
