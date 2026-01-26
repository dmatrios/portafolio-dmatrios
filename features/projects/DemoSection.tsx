"use client";

import { useMemo } from "react";

function getYouTubeId(input?: string) {
  if (!input) return null;

  // Si ya es ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

  try {
    const url = new URL(input);
    if (url.hostname.includes("youtube.com")) {
      return url.searchParams.get("v");
    }
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "");
      return id || null;
    }
  } catch {
    // ignore
  }
  return null;
}

export function DemoSection({
  title = "¿Quieres ver un demo?",
  subtitle = "Te muestro el flujo real del producto en pocos minutos.",
  youtube,
}: {
  title?: string;
  subtitle?: string;
  youtube?: string; // url o id
}) {
  const id = useMemo(() => getYouTubeId(youtube), [youtube]);
  if (!id) return null;

  return (
    <section className="mt-14 md:mt-18">
      <div className="rounded-3xl border border-border/50 bg-background/10 p-6 md:p-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-foreground/60">Demo</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-foreground/72 leading-relaxed">{subtitle}</p>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border/50 bg-black">
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
              title="Project demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
