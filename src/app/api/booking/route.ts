import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { navn, epost, telefon, innsjekk, utsjekk, gjester, melding } = body;

    // Basic validation
    if (!navn || !epost || !innsjekk || !utsjekk) {
      return NextResponse.json(
        { error: "Mangler påkrevde felt" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "E-post ikke konfigurert" },
        { status: 500 }
      );
    }

    // Format dates for display
    const formatDate = (d: string) => {
      const date = new Date(d);
      return date.toLocaleDateString("nb-NO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    const innDate = new Date(innsjekk);
    const utDate = new Date(utsjekk);
    const netter = Math.round(
      (utDate.getTime() - innDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const emailHtml = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2C2A1E;">
        <div style="background: #3B5E2B; padding: 24px 32px; margin-bottom: 32px;">
          <h1 style="color: white; margin: 0; font-size: 22px; font-weight: normal; letter-spacing: 0.05em;">
            🏡 Ny bookingforespørsel — Hytta på Hansmyr
          </h1>
        </div>

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
            ${
              telefon
                ? `
            <tr style="border-bottom: 1px solid #E8E3D8;">
              <td style="padding: 12px 0; font-size: 13px; color: #5F5E5A; text-transform: uppercase; letter-spacing: 0.1em;">Telefon</td>
              <td style="padding: 12px 0; font-size: 16px;"><a href="tel:${telefon}" style="color: #3B5E2B;">${telefon}</a></td>
            </tr>`
                : ""
            }
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
            ${
              melding
                ? `
            <tr>
              <td style="padding: 12px 0; font-size: 13px; color: #5F5E5A; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Melding</td>
              <td style="padding: 12px 0; font-size: 15px; line-height: 1.6;">${melding.replace(/\n/g, "<br>")}</td>
            </tr>`
                : ""
            }
          </table>

          <div style="background: #EAF3DE; border-left: 3px solid #3B5E2B; padding: 16px 20px; border-radius: 2px; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 14px; color: #3B5E2B;">
              💡 Svar på denne e-posten for å bekrefte bookingen, og send Vipps-lenke for betaling.
            </p>
          </div>

          <p style="font-size: 13px; color: #9A9890; margin: 0;">
            Sendt fra hyttapahansmyr.no · ${new Date().toLocaleString("nb-NO")}
          </p>
        </div>
      </div>
    `;

    // Send via Resend REST API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hytta på Hansmyr <onboarding@resend.dev>",
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "Noe gikk galt" }, { status: 500 });
  }
}
