// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  website?: string; // honeypot
};

const safe = (v: string) =>
  v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);

const json = (data: unknown, status = 200) => NextResponse.json(data, { status });

export async function POST(req: Request) {
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_TO = process.env.CONTACT_TO;
    const CONTACT_FROM = process.env.CONTACT_FROM;

    if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
      return json(
        {
          ok: false,
          error: "MISSING_ENV",
          message: "Faltan variables de entorno (RESEND_API_KEY / CONTACT_TO / CONTACT_FROM).",
        },
        500
      );
    }

    const body = (await req.json()) as Partial<ContactPayload>;

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const subjectFromUser = (body.subject ?? "").trim();
    const message = (body.message ?? "").trim();
    const website = (body.website ?? "").trim(); // honeypot

    // Honeypot: si viene lleno, bot => respondemos ok silencioso
    if (website) return json({ ok: true });

    // Validación básica
    if (name.length < 2 || name.length > 80) {
      return json({ ok: false, error: "INVALID_NAME" }, 400);
    }
    if (!isEmail(email) || email.length > 120) {
      return json({ ok: false, error: "INVALID_EMAIL" }, 400);
    }
    if (subjectFromUser.length > 140) {
      return json({ ok: false, error: "INVALID_SUBJECT" }, 400);
    }
    if (message.length < 10 || message.length > 4000) {
      return json({ ok: false, error: "INVALID_MESSAGE" }, 400);
    }

    const resend = new Resend(RESEND_API_KEY);

    const nowIso = new Date().toISOString();
    const prettyDate = new Date().toLocaleString("es-PE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const subject = subjectFromUser
      ? `Nuevo mensaje — ${subjectFromUser}`
      : `Nuevo mensaje — ${name}`;

    const html = `
      <div style="margin:0;padding:0;background:#0b0b0c;">
        <div style="max-width:720px;margin:0 auto;padding:28px 16px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; color:#eaeaea;">
          
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px;">
            <div style="font-size:14px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(234,234,234,0.72);">
              Portafolio • Contacto
            </div>
            <div style="font-size:12px;color:rgba(234,234,234,0.72);border:1px solid rgba(255,255,255,0.14);padding:6px 10px;border-radius:999px;">
              Nuevo mensaje
            </div>
          </div>

          <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);border-radius:18px;overflow:hidden;">
            
            <div style="padding:18px 18px 10px 18px;border-bottom:1px solid rgba(255,255,255,0.10);">
              <div style="font-size:22px;line-height:1.15;font-weight:700;">
                Nuevo mensaje desde tu portafolio
              </div>
              <div style="margin-top:6px;font-size:13px;color:rgba(234,234,234,0.72);">
                Recibido el ${prettyDate} • <span style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">${nowIso}</span>
              </div>
            </div>

            <div style="padding:14px 18px;display:grid;grid-template-columns:1fr;gap:10px;">
              <div style="display:flex;gap:10px;align-items:flex-start;">
                <div style="width:92px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(234,234,234,0.60);">
                  Nombre
                </div>
                <div style="font-size:14px;color:#ffffff;font-weight:600;">
                  ${safe(name)}
                </div>
              </div>

              <div style="display:flex;gap:10px;align-items:flex-start;">
                <div style="width:92px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(234,234,234,0.60);">
                  Email
                </div>
                <div style="font-size:14px;">
                  <a href="mailto:${encodeURIComponent(email)}" style="color:#ffffff;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.25);padding-bottom:1px;">
                    ${safe(email)}
                  </a>
                  <span style="color:rgba(234,234,234,0.60);font-size:12px;margin-left:8px;">
                    (Reply-To)
                  </span>
                </div>
              </div>

              ${
                subjectFromUser
                  ? `
              <div style="display:flex;gap:10px;align-items:flex-start;">
                <div style="width:92px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(234,234,234,0.60);">
                  Asunto
                </div>
                <div style="font-size:14px;color:#ffffff;font-weight:600;">
                  ${safe(subjectFromUser)}
                </div>
              </div>
              `
                  : ""
              }
            </div>

            <div style="padding:0 18px 18px 18px;">
              <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(234,234,234,0.60);margin-bottom:8px;">
                Mensaje
              </div>
              <div style="background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.12);border-radius:14px;padding:14px;white-space:pre-wrap;line-height:1.6;color:rgba(255,255,255,0.92);font-size:14px;">
                ${safe(message)}
              </div>
            </div>

            <div style="padding:14px 18px;border-top:1px solid rgba(255,255,255,0.10);font-size:12px;color:rgba(234,234,234,0.62);">
              Responder a este correo responderá al remitente (Reply-To).
            </div>
          </div>

          <div style="margin-top:14px;font-size:11px;color:rgba(234,234,234,0.50);text-align:center;">
            Enviado automáticamente desde tu formulario de contacto.
          </div>
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      subject,
      replyTo: email,
      html,
    });

    if (result.error) {
      console.error("RESEND_ERROR:", result.error);
      return json(
        {
          ok: false,
          error: "SEND_FAILED",
          details: result.error,
        },
        502
      );
    }

    return json({ ok: true });
  } catch (err) {
    console.error("CONTACT_API_ERROR:", err);
    return json({ ok: false, error: "UNKNOWN_ERROR" }, 500);
  }
}
