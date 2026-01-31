"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";

export function About({ lang }: { lang: "es" | "en" }) {
  const isEs = lang === "es";
  const trackRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });

  // 2 golpes + body (mismo estilo que SkillsClaim)
  const firstOpacity = useTransform(scrollYProgress, [0.18, 0.30], [0, 1]);
  const firstY = useTransform(scrollYProgress, [0.18, 0.30], [18, 0]);
  const firstBlur = useTransform(scrollYProgress, [0.18, 0.30], [12, 0]);

  const secondOpacity = useTransform(scrollYProgress, [0.28, 0.42], [0, 1]);
  const secondY = useTransform(scrollYProgress, [0.28, 0.42], [18, 0]);
  const secondBlur = useTransform(scrollYProgress, [0.28, 0.42], [12, 0]);

  const bodyOpacity = useTransform(scrollYProgress, [0.44, 0.60], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.44, 0.60], [10, 0]);
  const bodyBlur = useTransform(scrollYProgress, [0.44, 0.60], [10, 0]);

  const imgOpacity = useTransform(scrollYProgress, [0.24, 0.44], [0, 1]);
  const imgY = useTransform(scrollYProgress, [0.24, 0.44], [18, 0]);
  const imgBlur = useTransform(scrollYProgress, [0.24, 0.44], [10, 0]);

  const firstFilter = useMotionTemplate`blur(${firstBlur}px)`;
  const secondFilter = useMotionTemplate`blur(${secondBlur}px)`;
  const bodyFilter = useMotionTemplate`blur(${bodyBlur}px)`;
  const imgFilter = useMotionTemplate`blur(${imgBlur}px)`;

  const copy = useMemo(() => {
    if (isEs) {
      return {
        kicker: "ACERCA DE MÍ",
        first: "Construyo software",
        second: "con criterio y enfoque en ejecución.",
        p1: "Soy Daniel Maturrano, egresado de Desarrollo de Software en ISIL. Desarrollo soluciones tecnológicas end-to-end: desde la interfaz y el diseño, hasta la API, la data y el deploy.",
        p2: "Trabajo como freelancer y me obsesionan los detalles: claridad en el código, experiencia fluida y entregas con estándar premium. Fuera de la compu, el gym es parte de mi rutina.",
        cta: "Conocer más",
        imgAlt: "Foto de Daniel Maturrano",
      };
    }
    return {
      kicker: "ABOUT",
      first: "I build software",
      second: "with judgment and execution focus.",
      p1: "I’m Daniel Maturrano, a Software Development graduate from ISIL. I build end-to-end tech solutions: from interface and design, to API, data and deploy.",
      p2: "I work as a freelancer and I care about details: clear code, smooth UX, and premium-level delivery. Outside the laptop, the gym is part of my routine.",
      cta: "Learn more",
      imgAlt: "Portrait of Daniel Maturrano",
    };
  }, [isEs]);

  const aboutHref = isEs ? "/es/about" : "/en/about";

  return (
    <section id="about" aria-label={isEs ? "Acerca de mí" : "About"} className="relative">
      {/* Desktop: track alto + sticky (SIN scroll interno) */}
      <section ref={trackRef} className="hidden md:block relative">
        <div className="relative min-h-[190vh]">
          <div className="sticky top-24">
            {/* ✅ CLAVE: overflow-hidden evita la “barrita interna” del sticky */}
            <div className="relative overflow-hidden">
              <div className="mx-auto w-full max-w-[1400px] px-8 lg:px-14">
                <div className="relative py-16">
                  {/* Glows dentro del recorte (no empujan el layout) */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-28 left-1/2 h-64 w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--foreground),0.10),transparent_60%)] blur-2xl" />
                    <div className="absolute -bottom-28 right-[-140px] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(var(--foreground),0.08),transparent_62%)] blur-2xl" />
                  </div>

                  <div className="relative grid grid-cols-12 gap-10 items-center">
                    {/* Texto izquierda */}
                    <div className="col-span-7">
                      <motion.p
                        initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.7 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-[12px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.95)]"
                      >
                        {copy.kicker}
                      </motion.p>

                      <motion.h2
                        style={{ opacity: firstOpacity, y: firstY, filter: firstFilter }}
                        className="mt-6 font-[850] text-[72px] leading-[1.00] text-[rgb(var(--foreground))] [text-wrap:balance] max-w-[18ch]"
                      >
                        {copy.first}
                      </motion.h2>

                      <motion.h2
                        style={{ opacity: secondOpacity, y: secondY, filter: secondFilter }}
                        className="mt-2 font-[850] text-[72px] leading-[1.00] text-[rgb(var(--foreground))] [text-wrap:balance] max-w-[24ch]"
                      >
                        {copy.second}
                      </motion.h2>

                      <motion.div style={{ opacity: bodyOpacity, y: bodyY, filter: bodyFilter }}>
                        <p className="mt-8 text-[15px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)] max-w-[86ch]">
                          {copy.p1}
                        </p>
                        <p className="mt-4 text-[15px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)] max-w-[86ch]">
                          {copy.p2}
                        </p>

                        <div className="mt-10 flex items-center gap-3">
                          <Link
                            href={aboutHref}
                            className="
                              inline-flex items-center justify-center
                              rounded-full
                              border border-[rgba(var(--border),0.75)]
                              bg-[rgba(var(--background),0.12)]
                              backdrop-blur-xl
                              px-5 py-2.5
                              text-[13px] font-[750]
                              text-[rgb(var(--foreground))]
                              shadow-[0_18px_60px_rgba(0,0,0,0.12)]
                              transition
                              hover:-translate-y-0.5
                              hover:shadow-[0_28px_90px_rgba(0,0,0,0.16)]
                            "
                          >
                            {copy.cta}
                          </Link>

                          {/* Download CV: place PDF in public/Daniel-Maturrano-CV.pdf */}
                          <a
                            href="/Daniel-Maturrano-CV.pdf"
                            download
                            aria-label={isEs ? "Descargar CV" : "Download CV"}
                            className="
                              inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                              border border-[rgba(var(--border),0.75)] bg-[rgba(var(--background),0.06)]
                              backdrop-blur-md transition hover:-translate-y-0.5
                            "
                          >
                            <Image src="/file.svg" alt="file" width={16} height={16} />
                            <span>{isEs ? "Descargar CV" : "Download CV"}</span>
                          </a>
                        </div>
                      </motion.div>
                    </div>

                    {/* Imagen derecha (más chica y nítida) */}
                    <motion.div
                      style={{ opacity: imgOpacity, y: imgY, filter: imgFilter }}
                      className="col-span-5"
                    >
                      <div
                        className="
                          relative overflow-hidden
                          rounded-[26px]
                          border border-[rgba(var(--border),0.75)]
                          bg-[rgba(var(--background),0.10)]
                          backdrop-blur-xl
                          shadow-[0_22px_80px_rgba(0,0,0,0.18)]
                          mx-auto
                          w-[340px] lg:w-[380px]
                        "
                      >
                        <div className="relative aspect-[4/5]">
                          <Image
                            src="/images/me.jpeg"
                            alt={copy.imgAlt}
                            fill
                            className="object-cover object-center"
                            sizes="(min-width: 1024px) 380px, 340px"
                            priority={false}
                          />
                        </div>

                        {/* glass highlight */}
                        <div className="pointer-events-none absolute inset-0">
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),transparent_48%)]" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-16 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.9),transparent)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: simple (foto arriba, texto abajo) */}
      <div className="md:hidden overflow-x-hidden">
        <div className="mx-auto w-full max-w-[720px] px-5 py-14">
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-[11px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
              {copy.kicker}
            </p>

            <div
              className="
                mt-5 relative overflow-hidden
                rounded-[22px]
                border border-[rgba(var(--border),0.75)]
                bg-[rgba(var(--background),0.10)]
                backdrop-blur-xl
                shadow-[0_22px_80px_rgba(0,0,0,0.16)]
              "
            >
              <div className="relative aspect-[16/12]">
                <Image
                  src="/images/me.jpeg"
                  alt={copy.imgAlt}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),transparent_48%)]" />
              </div>
            </div>

            <h2 className="mt-7 text-[30px] leading-[1.04] font-[850] text-[rgb(var(--foreground))] [text-wrap:balance]">
              {copy.first} {copy.second}
            </h2>

            <p className="mt-4 text-[14px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)]">
              {copy.p1}
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)]">
              {copy.p2}
            </p>

            <div className="mt-7 flex items-center gap-3">
              <Link
                href={aboutHref}
                className="
                  inline-flex items-center justify-center
                  rounded-full
                  border border-[rgba(var(--border),0.75)]
                  bg-[rgba(var(--background),0.12)]
                  backdrop-blur-xl
                  px-5 py-2.5
                  text-[13px] font-[750]
                  text-[rgb(var(--foreground))]
                  shadow-[0_18px_60px_rgba(0,0,0,0.12)]
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-[0_28px_90px_rgba(0,0,0,0.16)]
                "
              >
                {copy.cta}
              </Link>

              <a
                href="/Daniel-Maturrano-CV.pdf"
                download
                aria-label={isEs ? "Descargar CV" : "Download CV"}
                className="
                  inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                  border border-[rgba(var(--border),0.75)] bg-[rgba(var(--background),0.06)]
                  backdrop-blur-md transition hover:-translate-y-0.5
                "
              >
                <Image src="/file.svg" alt="file" width={16} height={16} />
                <span>{isEs ? "Descargar CV" : "Download CV"}</span>
              </a>
            </div>

            <div className="mt-12 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.9),transparent)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
