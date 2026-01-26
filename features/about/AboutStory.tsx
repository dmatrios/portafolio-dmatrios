"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { Dumbbell, Music2, Heart } from "lucide-react";

export function AboutStory({ lang }: { lang: "es" | "en" }) {
  const isEs = lang === "es";
  const reduceMotion = useReducedMotion();

  const trackRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // ✅ Track más largo + ventanas más amplias = más "quieto"
  // Fase 1 (IN → HOLD → OUT)
  const p1Opacity = useTransform(scrollYProgress, [0.06, 0.16, 0.36, 0.44], [0, 1, 1, 0]);
  const p1Blur = useTransform(scrollYProgress, [0.06, 0.16, 0.36, 0.44], [14, 0, 0, 14]);

  // Fase 2 (IN → HOLD → OUT)
  const p2Opacity = useTransform(scrollYProgress, [0.40, 0.50, 0.70, 0.78], [0, 1, 1, 0]);
  const p2Blur = useTransform(scrollYProgress, [0.40, 0.50, 0.70, 0.78], [14, 0, 0, 14]);

  // Fase 3 (IN → HOLD)
  const p3Opacity = useTransform(scrollYProgress, [0.74, 0.84, 1.0], [0, 1, 1]);
  const p3Blur = useTransform(scrollYProgress, [0.74, 0.84, 1.0], [14, 0, 0]);

  const f1 = useMotionTemplate`blur(${p1Blur}px)`;
  const f2 = useMotionTemplate`blur(${p2Blur}px)`;
  const f3 = useMotionTemplate`blur(${p3Blur}px)`;

  // Escena visible solo durante el track (evita cortes duros)
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  const copy = useMemo(() => {
    if (isEs) {
      return {
        kicker: "SOBRE MÍ",
        img1: "/images/me.jpeg",
        img2: "/images/about-2.jpeg", // tu foto con tu enamorada
        img3: "/images/about-3.jpeg", // gym / música / vida

        p1Title: "Soy Daniel.",
        p1Text:
          "Desarrollo software porque me gusta construir cosas reales: productos claros, rápidos y con intención. " +
          "Con el tiempo entendí que lo que más disfruto no es solo el código, sino el proceso: pensar, decidir, iterar… y dejarlo listo para el mundo.",

        p2Title: "Constancia y proceso.",
        p2Text:
          "Entrenar es parte de mi rutina. Me ayuda a mantener la cabeza en orden y a respetar el proceso: " +
          "no todo sale a la primera, pero lo constante mejora. Ese mismo enfoque lo llevo al desarrollo: menos apuro, más claridad, y decisiones que duren.",

        p3Title: "Música y personas.",
        p3Text:
          "A veces lo mejor que puedo hacer es desconectar un rato. Escuchar música, caminar, conversar… ahí aparecen ideas que no salen frente a la pantalla. " +
          "Y compartir la vida con la persona que amo me recuerda lo que de verdad importa.",

        alt1: "Retrato de Daniel",
        alt2: "Daniel con su enamorada",
        alt3: "Un momento personal",
      };
    }

    return {
      kicker: "ABOUT ME",
      img1: "/images/me.jpeg",
      img2: "/images/about-2.jpeg",
      img3: "/images/about-3.jpeg",

      p1Title: "I’m Daniel.",
      p1Text:
        "I build software because I enjoy creating real things: clear, fast, intentional products. " +
        "Over time I learned it’s not just about code — it’s about the process: thinking, deciding, iterating… and shipping.",

      p2Title: "Consistency and process.",
      p2Text:
        "Training is part of my routine. It keeps me grounded and reminds me to respect the process: " +
        "not everything works the first time, but consistency compounds. I bring that mindset to software: less rush, more clarity, decisions that last.",

      p3Title: "Music and people.",
      p3Text:
        "Sometimes the best thing I can do is step away. Music, a walk, a conversation… that’s where ideas show up. " +
        "And sharing life with the person I love keeps me focused on what truly matters.",

      alt1: "Portrait of Daniel",
      alt2: "Daniel with his partner",
      alt3: "A personal moment",
    };
  }, [isEs]);

  // Helpers de estilo (coherente con tu lenguaje)
  const cardClass =
    "relative overflow-hidden rounded-[28px] border border-[rgba(var(--border),0.75)] bg-[rgba(var(--background),0.10)] backdrop-blur-xl shadow-[0_22px_80px_rgba(0,0,0,0.18)]";
  const pillClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(var(--border),0.75)] bg-[rgba(var(--background),0.12)] backdrop-blur-xl";

  return (
    <section ref={trackRef} className="relative h-[220vh] md:h-[420vh]">
      {/* DESKTOP: escena fija */}
      <motion.div
        className="fixed inset-0 z-0 hidden md:flex items-center justify-center"
        style={{ opacity: sceneOpacity }}
      >
        <div className="absolute inset-0 bg-[rgb(var(--background))]" />

        {/* Glows sutiles */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl dark:bg-white/5" />
          <div className="absolute right-[12%] top-[55%] h-[420px] w-[420px] rounded-full bg-white/5 blur-[90px] dark:bg-white/3" />
        </div>

        {/* ✅ Menos separación con la sección anterior: subimos visualmente */}
        <div className="relative w-full max-w-6xl px-10 -mt-10">
          <div className="grid grid-cols-12 gap-12 items-center">
            {/* ====== FASE 1: imagen izq / texto der ====== */}
            <motion.div
              className="col-span-12 grid grid-cols-12 gap-12 items-center absolute inset-0"
              style={!reduceMotion ? { opacity: p1Opacity, filter: f1 } : undefined}
            >
              <div className="col-span-5">
                <div className={cardClass}>
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={copy.img1}
                      alt={copy.alt1}
                      fill
                      className="object-cover object-center"
                      sizes="400px"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),transparent_50%)]" />
                  </div>
                </div>
              </div>

              <div className="col-span-7 relative">
                <p className="text-[12px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
                  {copy.kicker}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <span className={pillClass}>
                    <Music2 size={16} className="opacity-80" />
                  </span>
                  <h3 className="text-[40px] leading-[1.05] font-[850] text-[rgb(var(--foreground))]">
                    {copy.p1Title}
                  </h3>
                </div>

                <p className="mt-5 text-[17px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)] max-w-[78ch]">
                  {copy.p1Text}
                </p>
              </div>
            </motion.div>

            {/* ====== FASE 2: texto izq / imagen der ====== */}
            <motion.div
              className="col-span-12 grid grid-cols-12 gap-12 items-center absolute inset-0"
              style={!reduceMotion ? { opacity: p2Opacity, filter: f2 } : undefined}
            >
              <div className="col-span-7 relative">
                <p className="text-[12px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
                  {copy.kicker}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <span className={pillClass}>
                    <Dumbbell size={16} className="opacity-80" />
                  </span>
                  <h3 className="text-[40px] leading-[1.05] font-[850] text-[rgb(var(--foreground))]">
                    {copy.p2Title}
                  </h3>
                </div>

                <p className="mt-5 text-[17px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)] max-w-[78ch]">
                  {copy.p2Text}
                </p>
              </div>

              <div className="col-span-5">
                <div className={cardClass}>
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={copy.img2}
                      alt={copy.alt2}
                      fill
                      className="object-cover object-center"
                      sizes="400px"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),transparent_50%)]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ====== FASE 3: imagen izq / texto der ====== */}
            <motion.div
              className="col-span-12 grid grid-cols-12 gap-12 items-center absolute inset-0"
              style={!reduceMotion ? { opacity: p3Opacity, filter: f3 } : undefined}
            >
              <div className="col-span-5">
                <div className={cardClass}>
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={copy.img3}
                      alt={copy.alt3}
                      fill
                      className="object-cover object-center"
                      sizes="400px"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),transparent_50%)]" />
                  </div>
                </div>
              </div>

              <div className="col-span-7 relative">
                <p className="text-[12px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
                  {copy.kicker}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <span className={pillClass}>
                    <Heart size={16} className="opacity-80" />
                  </span>
                  <h3 className="text-[40px] leading-[1.05] font-[850] text-[rgb(var(--foreground))]">
                    {copy.p3Title}
                  </h3>
                </div>

                <p className="mt-5 text-[17px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)] max-w-[78ch]">
                  {copy.p3Text}
                </p>
              </div>
            </motion.div>

            {/* Ghost para que el layout no “brinque” */}
            <div className="invisible col-span-12 grid grid-cols-12 gap-12 items-center">
              <div className="col-span-5">
                <div className={cardClass}>
                  <div className="relative aspect-[4/5]" />
                </div>
              </div>
              <div className="col-span-7">
                <p className="text-[12px] tracking-[0.34em] uppercase">{copy.kicker}</p>
                <div className="mt-8 flex items-center gap-3">
                  <span className={pillClass} />
                  <h3 className="text-[40px] font-[850]">{copy.p2Title}</h3>
                </div>
                <p className="mt-5 text-[17px] leading-relaxed">{copy.p2Text}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* MOBILE: cards (sí, está bien que sea diferente) */}
      <div className="md:hidden px-6 pt-40 pb-10">
        <div className="mx-auto max-w-[720px]">
          <p className="text-[11px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
            {copy.kicker}
          </p>

          <div className="mt-6 space-y-6">
            {/* Card 1 */}
            <div className={`${cardClass} p-4`}>
              <div className="relative overflow-hidden rounded-[18px] border border-[rgba(var(--border),0.65)] bg-[rgba(var(--background),0.10)]">
                <div className="relative aspect-[16/12]">
                  <Image
                    src={copy.img1}
                    alt={copy.alt1}
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className={pillClass}>
                  <Music2 size={15} className="opacity-80" />
                </span>
                <p className="text-[16px] font-semibold text-[rgb(var(--foreground))]">
                  {copy.p1Title}
                </p>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)]">
                {copy.p1Text}
              </p>
            </div>

            {/* Card 2 */}
            <div className={`${cardClass} p-4`}>
              <div className="relative overflow-hidden rounded-[18px] border border-[rgba(var(--border),0.65)] bg-[rgba(var(--background),0.10)]">
                <div className="relative aspect-[16/12]">
                  <Image
                    src={copy.img2}
                    alt={copy.alt2}
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className={pillClass}>
                  <Dumbbell size={15} className="opacity-80" />
                </span>
                <p className="text-[16px] font-semibold text-[rgb(var(--foreground))]">
                  {copy.p2Title}
                </p>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)]">
                {copy.p2Text}
              </p>
            </div>

            {/* Card 3 */}
            <div className={`${cardClass} p-4`}>
              <div className="relative overflow-hidden rounded-[18px] border border-[rgba(var(--border),0.65)] bg-[rgba(var(--background),0.10)]">
                <div className="relative aspect-[16/12]">
                  <Image
                    src={copy.img3}
                    alt={copy.alt3}
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className={pillClass}>
                  <Heart size={15} className="opacity-80" />
                </span>
                <p className="text-[16px] font-semibold text-[rgb(var(--foreground))]">
                  {copy.p3Title}
                </p>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)]">
                {copy.p3Text}
              </p>
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.9),transparent)]" />
        </div>
      </div>
    </section>
  );
}
