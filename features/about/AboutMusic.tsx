"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";

import { MusicMarquee } from "./MusicMarquee";
import type { Track } from "./types";

function spotifyIdFromUrl(input: string): string {
  if (!input) return "";

  const uri = input.match(/spotify:(track|playlist):([a-zA-Z0-9]+)/);
  if (uri?.[2]) return uri[2];

  const web = input.match(/open\.spotify\.com\/track\/([a-zA-Z0-9]+)/);
  if (web?.[1]) return web[1];

  const q = input.match(/^([a-zA-Z0-9]+)\?/);
  if (q?.[1]) return q[1];

  const isId = /^[a-zA-Z0-9]{18,32}$/.test(input);
  if (isId) return input;

  return "";
}

export function AboutMusic({ lang }: { lang: "es" | "en" }) {
  const isEs = lang === "es";
  const reduceMotion = useReducedMotion();

  const ui = useMemo(
    () =>
      isEs
        ? { title: "Un poco de mis gustos musicales", close: "Cerrar" }
        : { title: "A bit of my music taste", close: "Close" },
    [isEs]
  );

  const tracks = useMemo<Track[]>(() => {
    const raw = [
      {
        spotify: "https://open.spotify.com/track/45J4avUb9Ni0bnETYaYFVJ?si=33edfa6bc11f427e",
        title: "luther",
        artist: "Kendrick Lamar",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02d9985092cd88bffd97653b58",
      },
      {
        spotify: "https://open.spotify.com/track/3GCdLUSnKSMJhs4Tj6CV3s?si=3a48d20adb754c81", // 👈 tú pegas link
        title: "All Stars",
        artist: "Kendrick Lamar",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02c027ad28821777b00dcaa888",
      },
      {
        spotify: "https://open.spotify.com/track/7rbECVPkY5UODxoOUVKZnA?si=ec8843c85a0f4235", // 👈 tú pegas link
        title: "I Wonder",
        artist: "Kanye West",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0226f7f19c7f0381e56156c94a",
      },
      {
        spotify: "https://open.spotify.com/track/5mCPDVBb16L4XQwDdbRUpz?si=ddad635459ad40ae", // 👈 tú pegas link
        title: "Passionfruit",
        artist: "Drake",
        cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e024f0fd9dad63977146e685700",
      },

      {
        spotify: "https://open.spotify.com/track/5TRPicyLGbAF2LGBFbHGvO?si=10b2f83f06224a6b", // 👈 tú pegas link
        title: "Flashing Lights",
        artist: "Kanye West",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0226f7f19c7f0381e56156c94a",
      },
      {
        spotify: "https://open.spotify.com/track/3KJ3opyV29269SXkPrc19l?si=74e4ee4ee8474f1e", // 👈 tú pegas link
        title: "120",
        artist: "Bad Bunny",
        cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02005ee342f4eef2cc6e8436ab",
      },
      {
        spotify: "https://open.spotify.com/artist/4SsVbpTthjScTS7U2hmr1X?si=27c8f2ba53ce4864", // 👈 tú pegas link
        title: "pasiempre",
        artist: "Tainy",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02f885fb64a381318a1c9c14e4",
      },
      {
        spotify: "https://open.spotify.com/track/69ZaPBHhRMRDjRpW1ivnOU?si=d98e5054db454790", // 👈 tú pegas link
        title: "como antes",
        artist: "Bad Bunny",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02519266cd05491a5b5bc22d1e",
      },
      {
        spotify: "https://open.spotify.com/track/2OWVCFTolecLiGZPquvWvT?si=163219c6ef904ca6", // 👈 tú pegas link
        title: "estamos bien",
        artist: "Bad Bunny",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02519266cd05491a5b5bc22d1e",
      },
      {
        spotify: "https://open.spotify.com/track/02tO6ZalO34vImCrOpuWF3?si=2a00c010f4fe4533", // 👈 tú pegas link
        title: "chinita linda",
        artist: "Alvaro Diaz",
        cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e024385062efd655ededc0d2caa",
      },
      {
        spotify: "https://open.spotify.com/track/3sK8wGT43QFpWrvNQsrQya?si=ea713df3989b42e6", // 👈 tú pegas link
        title: "DtMF",
        artist: "Bad Bunny",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02bbd45c8d36e0e045ef640411",
      },
      {
        spotify: "https://open.spotify.com/track/38UYeBLfvpnDSG9GznZdnL?si=4aa1be98e72a40d7", // 👈 tú pegas link
        title: "tormenta",
        artist: "Gorillaz",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e024b0ddebba0d5b34f2a2f07a4",
      },
    ];

    return raw.map((t) => {
      const id = spotifyIdFromUrl(t.spotify);
      return {
        id,
        title: t.title,
        artist: t.artist,
        cover: t.cover,
        spotifyUrl: id ? `https://open.spotify.com/track/${id}` : "",
      };
    });
  }, []);

  const [active, setActive] = useState<Track | null>(null);

  return (
    <section className="relative w-full overflow-hidden pt-10 pb-8">
      <motion.div
        initial={!reduceMotion ? { opacity: 0, y: 14, filter: "blur(10px)" } : false}
        whileInView={!reduceMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-14"
      >
        <h2 className="text-[28px] md:text-[34px] leading-[1.06] font-[850] text-[rgb(var(--foreground))] [text-wrap:balance]">
          {ui.title}
        </h2>
      </motion.div>

      <div className="mt-2">
        <MusicMarquee tracks={tracks} onSelect={setActive} speedPxPerSec={44} />
      </div>

      {/* modal reproductor */}
      {active && (
        <div className="fixed inset-0 z-[80] flex items-end md:items-center justify-center p-4">
          <button
            className="absolute inset-0 bg-black/60"
            aria-label={ui.close}
            onClick={() => setActive(null)}
            type="button"
          />

          <motion.div
            initial={!reduceMotion ? { opacity: 0, y: 10, scale: 0.98 } : false}
            animate={!reduceMotion ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              relative w-full max-w-[640px]
              rounded-[26px]
              border border-white/12
              bg-black/75
              backdrop-blur-2xl
              shadow-[0_28px_120px_rgba(0,0,0,0.35)]
              overflow-hidden
              flex flex-col
            "
          >
            <div className="flex items-center justify-between px-5 py-4 flex-shrink-0">
              <div className="min-w-0">
                <p className="text-[14px] font-[850] text-white/95 truncate">
                  {active.artist} — {active.title}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActive(null)}
                className="
                  inline-flex h-10 w-10 items-center justify-center
                  rounded-full border border-white/12
                  bg-white/10 backdrop-blur-xl
                  transition hover:-translate-y-0.5 hover:bg-white/16
                  flex-shrink-0 ml-3
                "
                aria-label={ui.close}
              >
                <X size={18} className="text-white/90" />
              </button>
            </div>

            <div className="flex-1 min-h-0 px-5 pb-5 flex flex-col">
              {active.id ? (
                <div className="rounded-[18px] border border-white/10 bg-black/40 overflow-hidden">
                  <iframe
                    title={`${active.artist} - ${active.title}`}
                    src={`https://open.spotify.com/embed/track/${active.id}?utm_source=generator`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="w-full"
                  />
                </div>
              ) : (
                <div className="rounded-[18px] border border-white/10 bg-white/5 p-5 flex items-center justify-center flex-1">
                  <p className="text-[13px] text-white/80 text-center">
                    {isEs
                      ? "Pega el link/ID de Spotify de este track para habilitar el reproductor."
                      : "Paste this track’s Spotify link/ID to enable the player."}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
