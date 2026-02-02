"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Mail, Send, Github, Linkedin } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function Contact({ lang }: { lang: "es" | "en" }) {
  const isEs = lang === "es";

  const copy = useMemo(() => {
    if (isEs) {
      return {
        kicker: "CONTACTO",
        title: "Hablemos.",
        sub: "Si tienes un proyecto, una idea o una oportunidad, te leo. Respondo rápido y con claridad.",
        name: "Nombre",
        email: "Correo",
        message: "Mensaje",
        button: "Enviar",
        ok: "Listo. Tu mensaje llegó.",
        err: "No se pudo enviar. Intenta de nuevo en un momento.",
        privacy: "Nada de spam. Solo conversaciones reales.",
      };
    }
    return {
      kicker: "CONTACT",
      title: "Let’s talk.",
      sub: "If you have a project, an idea, or an opportunity, I’m all ears. Fast replies, clear communication.",
      name: "Name",
      email: "Email",
      message: "Message",
      button: "Send",
      ok: "Done. Your message was sent.",
      err: "Couldn’t send it. Please try again in a moment.",
      privacy: "No spam. Only real conversations.",
    };
  }, [isEs]);

  const GITHUB = "https://github.com/dmatrios";
  const LINKEDIN = "https://www.linkedin.com/in/daniel-maturrano/";

  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // ✅ honeypot alineado con la API (antes company)
  });

  const disabled = status === "loading";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (disabled) return;

    // honeypot: si viene lleno, bot => no enviamos
    if (form.website.trim().length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          website: form.website,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        console.log("CONTACT API ERROR:", { status: res.status, data });
        throw new Error(data?.error || "bad_status");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "", website: "" });

      window.setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 2500);
    }
  }

  return (
    <section id="contact" aria-label={isEs ? "Contacto" : "Contact"} className="relative">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-14 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 left-1/2 h-64 w-[min(760px,92vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--foreground),0.10),transparent_60%)] blur-2xl" />
          </div>

          <p className="relative text-[12px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.95)] text-center md:text-left">
            {copy.kicker}
          </p>

          <div className="relative mt-5 grid grid-cols-12 gap-6 md:gap-10 items-start">
            <div className="col-span-12 md:col-span-6 min-w-0 text-center md:text-left">
              <h2 className="text-[32px] sm:text-[40px] md:text-[56px] leading-[1.02] font-[850] text-[rgb(var(--foreground))] [text-wrap:balance]">
                {copy.title}
              </h2>

              <p className="mt-4 text-[15px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)] max-w-[70ch] mx-auto md:mx-0">
                {copy.sub}
              </p>

              <div className="mt-7 inline-flex max-w-full items-center gap-3 rounded-full border border-[rgba(var(--border),0.75)] bg-[rgba(var(--background),0.10)] backdrop-blur-xl px-4 py-2 mx-auto md:mx-0">
                <Mail className="h-4 w-4 opacity-80 shrink-0" />
                <span className="text-[13px] font-[650] text-[rgba(var(--foreground),0.92)] truncate">
                  ddmatrios@gmail.com
                </span>

                <span className="h-4 w-px bg-[rgba(var(--border),0.8)]" />

                <div className="inline-flex items-center gap-2">
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="
        inline-flex h-9 w-9 items-center justify-center rounded-full
        border border-[rgba(var(--border),0.75)]
        bg-[rgba(var(--background),0.10)]
        transition
        hover:-translate-y-0.5
        hover:bg-[rgba(var(--background),0.18)]
        hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)]
      "
                  >
                    <Github className="h-4 w-4 opacity-90" />
                  </a>

                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="
        inline-flex h-9 w-9 items-center justify-center rounded-full
        border border-[rgba(var(--border),0.75)]
        bg-[rgba(var(--background),0.10)]
        transition
        hover:-translate-y-0.5
        hover:bg-[rgba(var(--background),0.18)]
        hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)]
      "
                  >
                    <Linkedin className="h-4 w-4 opacity-90" />
                  </a>
                </div>
              </div>

              <p className="mt-4 text-[12px] text-[rgba(var(--muted-foreground),0.9)]">{copy.privacy}</p>
            </div>

            <div className="col-span-12 md:col-span-6 min-w-0">
              <div className="mx-auto w-full max-w-[100%] sm:max-w-[520px] md:max-w-none">
                <div className="rounded-[22px] border border-[rgba(var(--border),0.75)] bg-[rgba(var(--background),0.10)] backdrop-blur-xl overflow-hidden shadow-none md:shadow-[0_22px_80px_rgba(0,0,0,0.16)]">
                  <form onSubmit={onSubmit} className="p-4 sm:p-5 md:p-6">
                    <input
                      value={form.website}
                      onChange={(e) => setForm((s) => ({ ...s, website: e.target.value }))}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="block min-w-0">
                        <span className="text-[12px] tracking-[0.12em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
                          {copy.name}
                        </span>
                        <input
                          value={form.name}
                          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                          required
                          minLength={2}
                          maxLength={80}
                          disabled={disabled}
                          className="
                            mt-2 w-full min-w-0 rounded-[14px]
                            border border-[rgba(var(--border),0.75)]
                            bg-[rgba(var(--background),0.08)]
                            px-4 py-3
                            text-[16px] md:text-[14px] text-[rgb(var(--foreground))]
                            outline-none transition
                            focus:border-[rgba(var(--foreground),0.28)]
                            focus:shadow-[0_0_0_6px_rgba(var(--foreground),0.06)]
                          "
                          placeholder={isEs ? "Tu nombre" : "Your name"}
                        />
                      </label>

                      <label className="block min-w-0">
                        <span className="text-[12px] tracking-[0.12em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
                          {copy.email}
                        </span>
                        <input
                          value={form.email}
                          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                          required
                          maxLength={120}
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          disabled={disabled}
                          className="
                            mt-2 w-full min-w-0 rounded-[14px]
                            border border-[rgba(var(--border),0.75)]
                            bg-[rgba(var(--background),0.08)]
                            px-4 py-3
                            text-[16px] md:text-[14px] text-[rgb(var(--foreground))]
                            outline-none transition
                            focus:border-[rgba(var(--foreground),0.28)]
                            focus:shadow-[0_0_0_6px_rgba(var(--foreground),0.06)]
                          "
                          placeholder="tu@correo.com"
                        />
                      </label>
                    </div>

                    <label className="block mt-4 min-w-0">
                      <span className="text-[12px] tracking-[0.12em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
                        {copy.message}
                      </span>

                      <textarea
                        value={form.message}
                        onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                        required
                        minLength={10}
                        maxLength={2000}
                        disabled={disabled}
                        rows={4}
                        className="
                          mt-2 w-full min-w-0 rounded-[16px]
                          border border-[rgba(var(--border),0.75)]
                          bg-[rgba(var(--background),0.08)]
                          px-4 py-3
                          text-[16px] md:text-[14px] text-[rgb(var(--foreground))]
                          outline-none transition
                          focus:border-[rgba(var(--foreground),0.28)]
                          focus:shadow-[0_0_0_6px_rgba(var(--foreground),0.06)]
                          md:min-h-[160px]
                        "
                        placeholder={isEs ? "Cuéntame qué necesitas…" : "Tell me what you need…"}
                      />
                    </label>

                    <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="min-h-[18px] text-[12px] text-center sm:text-left">
                        {status === "success" && (
                          <span className="text-[rgba(var(--foreground),0.9)]">{copy.ok}</span>
                        )}
                        {status === "error" && (
                          <span className="text-[rgba(var(--muted-foreground),0.95)]">{copy.err}</span>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={disabled}
                        className="
                          inline-flex w-full sm:w-auto justify-center items-center gap-2
                          rounded-full
                          border border-[rgba(var(--border),0.75)]
                          bg-[rgba(var(--background),0.14)]
                          backdrop-blur-xl
                          px-5 py-2.5
                          text-[13px] font-[800]
                          text-[rgb(var(--foreground))]
                          shadow-[0_18px_60px_rgba(0,0,0,0.12)]
                          transition
                          hover:-translate-y-0.5
                          hover:shadow-[0_28px_90px_rgba(0,0,0,0.16)]
                          disabled:opacity-60
                          disabled:hover:translate-y-0
                        "
                      >
                        <Send className="h-4 w-4" />
                        {status === "loading" ? (isEs ? "Enviando…" : "Sending…") : copy.button}
                      </button>
                    </div>
                  </form>

                  <div className="h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.9),transparent)]" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
