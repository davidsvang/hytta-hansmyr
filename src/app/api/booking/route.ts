import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { navn, epost, telefon, innsjekk, utsjekk, gjester, melding } = body;

    if (!navn || !epost || !innsjekk || !utsjekk) {
      return NextResponse.json({ error: "Mangler påkrevde felt" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "E-post ikke konfigurert" }, { status: 500 });
    }

    const formatDate = (d: string) =>
      new Date(d).toLocaleDateString("nb-NO", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      });

    const innDate = new Date(innsjekk);
    const utDate = new Date(utsjekk);
    const netter = Math.round((utDate.getTime() - innDate.getTime()) / (1000 * 60 * 60 * 24));

    // Store pending booking with a token (expires in 30 days)
    const token = randomUUID();
    await redis.set(
      `pending:${token}`,
      { innsjekk, utsjekk, navn, epost, telefon, gjester, melding },
      { ex: 60 * 60 * 24 * 30 }
    );

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hansmyr.no";
    const approveUrl = `${siteUrl}/api/approve-booking?token=${token}`;

    const emailHtml = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2C2A1E;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #2C3D1E;">
          <tr>
            <td style="padding: 24px 32px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: normal; letter-spacing: 0.05em;">
                Ny bookingforespørsel — Hytta på Hansmyr
              </h1>
            </td>
          </tr>
        </table>
        <div style="padding: 0 32px 32px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr style="border-bottom: 1px solid #E8E3D8;">
              <td style="padding: 12px 0; font-size: 13px; color: #5F5E5A; text-transform: uppercase; letter-spacing: 0.1em; width: 140px;">Navn</td>
              <td style="padding: 12px 0; font-size: 16px;">${navn}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E8E3D8;">
              <td style="padding: 12px 0; font-size: 13px; color: #5F5E5A; text-transform: uppercase; letter-spacing: 0.1em;">E-post</td>
              <td style="padding: 12px 0; font-size: 16px;"><a href="mailto:${epost}" style="color: #3B5E2B;">${epost}</a></td>
            </tr>
            ${telefon ? `
            <tr style="border-bottom: 1px solid #E8E3D8;">
              <td style="padding: 12px 0; font-size: 13px; color: #5F5E5A; text-transform: uppercase; letter-spacing: 0.1em;">Telefon</td>
              <td style="padding: 12px 0; font-size: 16px;"><a href="tel:${telefon}" style="color: #3B5E2B;">${telefon}</a></td>
            </tr>` : ""}
            <tr style="border-bottom: 1px solid #E8E3D8;">
              <td style="padding: 12px 0; font-size: 13px; color: #5F5E5A; text-transform: uppercase; letter-spacing: 0.1em;">Innsjekk</td>
              <td style="padding: 12px 0; font-size: 16px;">${formatDate(innsjekk)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E8E3D8;">
              <td style="padding: 12px 0; font-size: 13px; color: #5F5E5A; text-transform: uppercase; letter-spacing: 0.1em;">Utsjekk</td>
              <td style="padding: 12px 0; font-size: 16px;">${formatDate(utsjekk)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E8E3D8;">
              <td style="padding: 12px 0; font-size: 13px; color: #5F5E5A; text-transform: uppercase; letter-spacing: 0.1em;">Varighet</td>
              <td style="padding: 12px 0; font-size: 16px; font-weight: bold; color: #3B5E2B;">${netter} natt${netter !== 1 ? "er" : ""}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E8E3D8;">
              <td style="padding: 12px 0; font-size: 13px; color: #5F5E5A; text-transform: uppercase; letter-spacing: 0.1em;">Gjester</td>
              <td style="padding: 12px 0; font-size: 16px;">${gjester || "1"} ${parseInt(gjester) === 1 ? "gjest" : "gjester"}</td>
            </tr>
            ${melding ? `
            <tr>
              <td style="padding: 12px 0; font-size: 13px; color: #5F5E5A; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Melding</td>
              <td style="padding: 12px 0; font-size: 15px; line-height: 1.6;">${melding.replace(/\n/g, "<br>")}</td>
            </tr>` : ""}
          </table>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${approveUrl}" style="display: inline-block; background: #3B5E2B; color: white; padding: 14px 32px; text-decoration: none; font-family: Georgia, serif; font-size: 16px; border-radius: 2px; letter-spacing: 0.05em;">
              ✅ Godkjenn booking
            </a>
          </div>

          <p style="font-size: 12px; color: #9A9890; text-align: center; margin: 0;">
            Klikk knappen for å bekrefte — gjesten får automatisk bekreftelsesmail og kalenderen oppdateres.
          </p>

          <p style="font-size: 13px; color: #9A9890; margin-top: 24px;">
            Sendt fra hansmyr.no · ${new Date().toLocaleString("nb-NO")}
          </p>
        </div>
      </div>
    `;

    const confirmationHtml = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2C2A1E; background: #ffffff;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #2C3D1E;">
          <tr>
            <td style="padding: 24px 32px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: normal; letter-spacing: 0.05em;">Hytta på Hansmyr</h1>
            </td>
          </tr>
        </table>
        <div style="padding: 32px;">
          <h2 style="font-size: 22px; font-weight: normal; color: #2C2A1E; margin-bottom: 16px;">
            Hei ${navn} — vi har mottatt forespørselen din!
          </h2>
          <p style="color: #5F5E5A; line-height: 1.7; margin-bottom: 20px;">
            Takk for din henvendelse. Vi har registrert ønsket ditt om å leie hytta på Hansmyr:
          </p>
          <div style="background: #F5F0E8; border-radius: 4px; padding: 20px 24px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px; font-size: 15px; color: #2C2A1E;"><strong>Innsjekk:</strong> ${formatDate(innsjekk)}</p>
            <p style="margin: 0 0 8px; font-size: 15px; color: #2C2A1E;"><strong>Utsjekk:</strong> ${formatDate(utsjekk)}</p>
            <p style="margin: 0 0 8px; font-size: 15px; color: #2C2A1E;"><strong>Antall netter:</strong> ${netter}</p>
            <p style="margin: 0; font-size: 15px; color: #2C2A1E;"><strong>Gjester:</strong> ${gjester || "1"}</p>
          </div>
          <p style="color: #5F5E5A; line-height: 1.7; margin-bottom: 20px;">
            Vi svarer deg som regel innen 24 timer. Når bookingen er bekreftet får du informasjon om betaling via Vipps (+47 948 42 174).
          </p>
          <p style="color: #5F5E5A; line-height: 1.7;">Spørsmål? Svar på denne e-posten, så hjelper vi deg.</p>
          <p style="margin-top: 32px; color: #9A9890; font-size: 13px;">— David, Hytta på Hansmyr</p>
        </div>
      </div>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Hytta på Hansmyr <booking@hansmyr.no>",
        to: ["davidstakkengvang@gmail.com"],
        reply_to: epost,
        subject: `Bookingforespørsel: ${formatDate(innsjekk)} → ${formatDate(utsjekk)} (${netter} netter)`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Kunne ikke sende e-post" }, { status: 500 });
    }

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Hytta på Hansmyr <booking@hansmyr.no>",
        to: [epost],
        reply_to: "davidstakkengvang@gmail.com",
        subject: "Vi har mottatt forespørselen din — Hytta på Hansmyr",
        html: confirmationHtml,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "Noe gikk galt" }, { status: 500 });
  }
}
