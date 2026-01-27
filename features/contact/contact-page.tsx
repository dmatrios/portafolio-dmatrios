"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Github, Instagram, Linkedin, Mail, Send } from "lucide-react";

type Lang = "es" | "en";
type Status = "idle" | "loading" | "success" | "error";

type ContactPayload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  website?: string; // honeypot (debe coincidir con tu API)
};

type FieldErrors = Partial<Record<keyof Omit<ContactPayload, "website">, string>>;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());
}

// ✅ Ahora sí: usa tu API Route (Resend) y deja logs claros si falla
async function submitContact(payload: ContactPayload) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.ok) {
    console.log("CONTACT API ERROR:", { status: res.status, data });
    throw new Error(data?.error || "bad_status");
  }

  return data as { ok: true };
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="h-4 w-4 rounded-full border border-[rgba(var(--foreground),0.35)] border-t-[rgba(var(--foreground),0.95)] animate-spin"
    />
  );
}

export default function ContactPage({ lang }: { lang: Lang }) {
  const isEs = lang === "es";

  const copy = useMemo(() => {
    if (isEs) {
      return {
        kicker: "CONTACTO",
        title: "Hablemos.",
        sub: "Si tienes un proyecto, una idea o una oportunidad, te leo. Comunicación clara, cero vueltas.",
        howTitle: "Cómo trabajo",
        how: [
          "Entiendo el objetivo y el contexto real (sin suposiciones).",
          "Propongo una solución simple, premium y medible.",
          "Iteramos rápido: feedback corto, mejoras visibles.",
        ],
        formTitle: "Envíame un mensaje",
        name: "Nombre",
        email: "Correo",
        subject: "Asunto (opcional)",
        message: "Mensaje",
        placeholderName: "Tu nombre",
        placeholderEmail: "tu@correo.com",
        placeholderSubject: "Ej: Landing, app, redesign…",
        placeholderMessage: "Cuéntame qué necesitas…",
        button: "Enviar mensaje",
        sending: "Enviando…",
        ok: "Listo. Tu mensaje llegó.",
        err: "No se pudo enviar. Intenta de nuevo en un momento.",
        reply: "Respondo usualmente en 24–48h.",
        small: "Nada de spam. Solo conversaciones reales.",
        required: "Este campo es obligatorio.",
        invalidEmail: "Escribe un correo válido.",
        minMessage: "Cuéntame un poco más (mín. 10 caracteres).",
        socialTitle: "Encuéntrame",
        github: "GitHub",
        linkedin: "LinkedIn",
        instagram: "Instagram",
        emailLabel: "Email",
      };
    }

    return {
      kicker: "CONTACT",
      title: "Let’s talk.",
      sub: "If you have a project, an idea, or an opportunity, I’m all ears. Clear comms, fast iterations.",
      howTitle: "How I work",
      how: [
        "I understand the goal and real constraints first.",
        "Then I propose a premium, simple, measurable solution.",
        "We iterate fast: short feedback loops, visible improvements.",
      ],
      formTitle: "Send a message",
      name: "Name",
      email: "Email",
      subject: "Subject (optional)",
      message: "Message",
      placeholderName: "Your name",
      placeholderEmail: "you@email.com",
      placeholderSubject: "e.g. Landing, app, redesign…",
      placeholderMessage: "Tell me what you need…",
      button: "Send message",
      sending: "Sending…",
      ok: "Done. Your message was sent.",
      err: "Couldn’t send it. Please try again in a moment.",
      reply: "I usually reply within 24–48h.",
      small: "No spam. Only real conversations.",
      required: "This field is required.",
      invalidEmail: "Please enter a valid email.",
      minMessage: "Tell me a bit more (min 10 characters).",
      socialTitle: "Find me",
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram",
      emailLabel: "Email",
    };
  }, [isEs]);

  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FieldErrors>({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // ✅ honeypot alineado con la API
  });

  const disabled = status === "loading";

  function validate(next: typeof form): FieldErrors {
    const e: FieldErrors = {};

    if (!next.name.trim()) e.name = copy.required;

    if (!next.email.trim()) e.email = copy.required;

    if (!next.message.trim()) e.message = copy.required;
    else if (next.message.trim().length < 10) e.message = copy.minMessage;

    return e;
  }

  function setField<K extends keyof typeof form>(key: K, value: string) {
    setForm((s) => {
      const next = { ...s, [key]: value };
      const nextErrors = validate(next);
      setErrors((prev) => ({ ...prev, ...nextErrors }));
      return next;
    });
  }

  function blurField(field: keyof Omit<ContactPayload, "website">) {
    setTouched((s) => ({ ...s, [field]: true }));
  }

  const showError = (field: keyof Omit<ContactPayload, "website">) =>
    Boolean(touched[field] && errors[field]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (disabled) return;

    // honeypot: si viene lleno, bot => no enviamos
    if (form.website.trim().length > 0) return;

    const nextErrors = validate(form);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      const payload: ContactPayload = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || undefined,
        message: form.message.trim(),
        website: form.website.trim() || undefined,
      };

      await submitContact(payload);

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
      setErrors({});
      setTouched({});

      window.setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 2500);
    }
  }

  return (
    <section aria-label={isEs ? "Contacto" : "Contact"} className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 left-1/2 h-72 w-[min(900px,92vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--foreground),0.10),transparent_60%)] blur-3xl" />
        <div className="absolute -bottom-28 left-1/2 h-72 w-[min(780px,92vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--foreground),0.06),transparent_60%)] blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-14 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <p className="text-[12px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.95)] text-center md:text-left">
            {copy.kicker}
          </p>

          <h1 className="mt-4 text-center md:text-left text-[34px] sm:text-[44px] md:text-[56px] leading-[1.02] font-[850] text-[rgb(var(--foreground))] [text-wrap:balance]">
            {copy.title}
          </h1>

          <p className="mt-4 text-center md:text-left text-[15px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)] max-w-[75ch] mx-auto md:mx-0">
            {copy.sub}
          </p>

          <div className="mt-8 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.9),transparent)]" />
        </motion.div>

        <div className="mt-10 grid grid-cols-12 gap-6 md:gap-10 items-start">
          <motion.aside
            initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="col-span-12 md:col-span-5 min-w-0"
          >
            <div className="rounded-[22px] border border-[rgba(var(--border),0.75)] bg-[rgba(var(--background),0.10)] backdrop-blur-xl p-5 sm:p-6 shadow-none md:shadow-[0_22px_80px_rgba(0,0,0,0.14)]">
              <p className="text-[12px] tracking-[0.12em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
                {copy.howTitle}
              </p>

              <ul className="mt-4 space-y-3">
                {copy.how.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(var(--foreground),0.55)]" />
                    <span className="text-[14px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.9),transparent)]" />

              <p className="mt-6 text-[12px] tracking-[0.12em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
                {copy.socialTitle}
              </p>

              <div className="mt-4 grid gap-3">
                <a
                  href="https://github.com/dmatrios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-[16px] border border-[rgba(var(--border),0.70)] bg-[rgba(var(--background),0.06)] px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.14)]"
                >
                  <Github className="h-4 w-4 opacity-80" />
                  <span className="text-[13px] font-[800] text-[rgba(var(--foreground),0.92)]">
                    {copy.github}
                  </span>
                  <span className="ml-auto text-[13px] text-[rgba(var(--muted-foreground),0.95)] truncate">
                    github.com/dmatrios
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/in/daniel-maturrano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-[16px] border border-[rgba(var(--border),0.70)] bg-[rgba(var(--background),0.06)] px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.14)]"
                >
                  <Linkedin className="h-4 w-4 opacity-80" />
                  <span className="text-[13px] font-[800] text-[rgba(var(--foreground),0.92)]">
                    {copy.linkedin}
                  </span>
                  <span className="ml-auto text-[13px] text-[rgba(var(--muted-foreground),0.95)] truncate">
                    linkedin.com/in/dmatrios
                  </span>
                </a>

                <a
                  href="https://instagram.com/dmatrios._0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-[16px] border border-[rgba(var(--border),0.70)] bg-[rgba(var(--background),0.06)] px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.14)]"
                >
                  <Instagram className="h-4 w-4 opacity-80" />
                  <span className="text-[13px] font-[800] text-[rgba(var(--foreground),0.92)]">
                    {copy.instagram}
                  </span>
                  <span className="ml-auto text-[13px] text-[rgba(var(--muted-foreground),0.95)] truncate">
                    @dmatrios._0
                  </span>
                </a>

                <a
                  href="mailto:ddmatrios@gmail.com"
                  className="group flex items-center gap-3 rounded-[16px] border border-[rgba(var(--border),0.70)] bg-[rgba(var(--background),0.06)] px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.14)]"
                >
                  <Mail className="h-4 w-4 opacity-80" />
                  <span className="text-[13px] font-[800] text-[rgba(var(--foreground),0.92)]">
                    {copy.emailLabel}
                  </span>
                  <span className="ml-auto text-[13px] text-[rgba(var(--muted-foreground),0.95)] truncate">
                    ddmatrios@gmail.com
                  </span>
                </a>
              </div>

              <p className="mt-5 text-[12px] text-[rgba(var(--muted-foreground),0.9)]">{copy.small}</p>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="col-span-12 md:col-span-7 min-w-0"
          >
            <div className="mx-auto w-full sm:max-w-[640px] md:max-w-none">
              <div className="rounded-[22px] border border-[rgba(var(--border),0.75)] bg-[rgba(var(--background),0.10)] backdrop-blur-xl overflow-hidden shadow-none md:shadow-[0_22px_80px_rgba(0,0,0,0.16)]">
                <div className="p-5 sm:p-6">
                  <p className="text-[12px] tracking-[0.12em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
                    {copy.formTitle}
                  </p>

                  <form onSubmit={onSubmit} className="mt-5">
                    <input
                      value={form.website}
                      onChange={(e) => setField("website", e.target.value)}
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
                          onChange={(e) => setField("name", e.target.value)}
                          onBlur={() => blurField("name")}
                          disabled={disabled}
                          maxLength={80}
                          className={[
                            "mt-2 w-full min-w-0 rounded-[14px] px-4 py-3",
                            "border bg-[rgba(var(--background),0.08)]",
                            "text-[16px] md:text-[14px] text-[rgb(var(--foreground))]",
                            "outline-none transition",
                            "focus:border-[rgba(var(--foreground),0.28)] focus:shadow-[0_0_0_6px_rgba(var(--foreground),0.06)]",
                            "hover:border-[rgba(var(--foreground),0.18)]",
                            showError("name")
                              ? "border-[rgba(255,80,80,0.55)] focus:shadow-[0_0_0_6px_rgba(255,80,80,0.10)]"
                              : "border-[rgba(var(--border),0.75)]",
                          ].join(" ")}
                          placeholder={copy.placeholderName}
                        />
                        <div className="mt-2 min-h-[16px]">
                          {showError("name") && (
                            <span className="text-[12px] text-[rgba(255,120,120,0.95)]">{errors.name}</span>
                          )}
                        </div>
                      </label>

                      <label className="block min-w-0">
                        <span className="text-[12px] tracking-[0.12em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
                          {copy.email}
                        </span>
                        <input
                          value={form.email}
                          onChange={(e) => setField("email", e.target.value)}
                          onBlur={() => blurField("email")}
                          disabled={disabled}
                          maxLength={120}
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          className={[
                            "mt-2 w-full min-w-0 rounded-[14px] px-4 py-3",
                            "border bg-[rgba(var(--background),0.08)]",
                            "text-[16px] md:text-[14px] text-[rgb(var(--foreground))]",
                            "outline-none transition",
                            "focus:border-[rgba(var(--foreground),0.28)] focus:shadow-[0_0_0_6px_rgba(var(--foreground),0.06)]",
                            "hover:border-[rgba(var(--foreground),0.18)]",
                            showError("email")
                              ? "border-[rgba(255,80,80,0.55)] focus:shadow-[0_0_0_6px_rgba(255,80,80,0.10)]"
                              : "border-[rgba(var(--border),0.75)]",
                          ].join(" ")}
                          placeholder={copy.placeholderEmail}
                        />
                        <div className="mt-2 min-h-[16px]">
                          {showError("email") && (
                            <span className="text-[12px] text-[rgba(255,120,120,0.95)]">{errors.email}</span>
                          )}
                        </div>
                      </label>
                    </div>

                    <label className="block mt-1 min-w-0">
                      <span className="text-[12px] tracking-[0.12em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
                        {copy.subject}
                      </span>
                      <input
                        value={form.subject}
                        onChange={(e) => setField("subject", e.target.value)}
                        onBlur={() => blurField("subject")}
                        disabled={disabled}
                        maxLength={120}
                        className={[
                          "mt-2 w-full min-w-0 rounded-[14px] px-4 py-3",
                          "border border-[rgba(var(--border),0.75)] bg-[rgba(var(--background),0.08)]",
                          "text-[16px] md:text-[14px] text-[rgb(var(--foreground))]",
                          "outline-none transition",
                          "focus:border-[rgba(var(--foreground),0.28)] focus:shadow-[0_0_0_6px_rgba(var(--foreground),0.06)]",
                          "hover:border-[rgba(var(--foreground),0.18)]",
                        ].join(" ")}
                        placeholder={copy.placeholderSubject}
                      />
                      <div className="mt-2 min-h-[16px]" />
                    </label>

                    <label className="block mt-1 min-w-0">
                      <span className="text-[12px] tracking-[0.12em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
                        {copy.message}
                      </span>
                      <textarea
                        value={form.message}
                        onChange={(e) => setField("message", e.target.value)}
                        onBlur={() => blurField("message")}
                        disabled={disabled}
                        rows={5}
                        maxLength={2000}
                        className={[
                          "mt-2 w-full min-w-0 rounded-[16px] px-4 py-3",
                          "border bg-[rgba(var(--background),0.08)]",
                          "text-[16px] md:text-[14px] text-[rgb(var(--foreground))]",
                          "outline-none transition",
                          "focus:border-[rgba(var(--foreground),0.28)] focus:shadow-[0_0_0_6px_rgba(var(--foreground),0.06)]",
                          "hover:border-[rgba(var(--foreground),0.18)]",
                          "md:min-h-[180px]",
                          showError("message")
                            ? "border-[rgba(255,80,80,0.55)] focus:shadow-[0_0_0_6px_rgba(255,80,80,0.10)]"
                            : "border-[rgba(var(--border),0.75)]",
                        ].join(" ")}
                        placeholder={copy.placeholderMessage}
                      />
                      <div className="mt-2 min-h-[16px]">
                        {showError("message") && (
                          <span className="text-[12px] text-[rgba(255,120,120,0.95)]">{errors.message}</span>
                        )}
                      </div>
                    </label>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                          text-[13px] font-[850]
                          text-[rgb(var(--foreground))]
                          shadow-[0_18px_60px_rgba(0,0,0,0.12)]
                          transition
                          hover:-translate-y-0.5
                          hover:shadow-[0_28px_90px_rgba(0,0,0,0.16)]
                          disabled:opacity-60
                          disabled:hover:translate-y-0
                        "
                      >
                        {status === "loading" ? <Spinner /> : <Send className="h-4 w-4" />}
                        <span className="whitespace-nowrap">{status === "loading" ? copy.sending : copy.button}</span>
                      </button>
                    </div>

                    <p className="mt-4 text-[12px] text-[rgba(var(--muted-foreground),0.9)] text-center sm:text-left">
                      {copy.reply}
                    </p>
                  </form>
                </div>

                <div className="h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.9),transparent)]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
