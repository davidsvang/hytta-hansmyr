import { NextRequest, NextResponse } from "next/server";
import { redis, addBookedRange, PendingBooking } from "@/lib/redis";
import { beregnPris, formaterPris } from "@/lib/pricing";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/godkjenn?status=error", req.url));
  }

  const booking = await redis.get<PendingBooking>(`pending:${token}`);

  if (!booking) {
    return NextResponse.redirect(new URL("/godkjenn?status=ugyldig", req.url));
  }

  await addBookedRange({
    innsjekk: booking.innsjekk,
    utsjekk: booking.utsjekk,
    navn: booking.navn,
  });

  await redis.del(`pending:${token}`);

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const formatDate = (d: string) =>
      new Date(d).toLocaleDateString("nb-NO", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      });

    const { total, netter, lines } = beregnPris(booking.innsjekk, booking.utsjekk);
    const totalFormatted = formaterPris(total);
    const prisLinjer = lines.map(l => `<p style="margin: 0 0 4px; font-size: 14px; color: #5F5E5A;">${l.label}: ${formaterPris(l.amount)}</p>`).join("");

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Hytta på Hansmyr <booking@hansmyr.no>",
        to: [booking.epost],
        reply_to: "davidstakkengvang@gmail.com",
        subject: "Booking bekreftet — Hytta på Hansmyr!",
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2C2A1E; background: #ffffff;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background: #2C3D1E;">
              <tr>
                <td style="padding: 24px 32px;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: normal; letter-spacing: 0.05em;">
                    Hytta på Hansmyr
                  </h1>
                </td>
              </tr>
            </table>
            <div style="padding: 32px;">
              <h2 style="font-size: 22px; font-weight: normal; color: #2C2A1E; margin-bottom: 16px;">
                Hei ${booking.navn} — bookingen din er bekreftet!
              </h2>
              <div style="background: #F5F0E8; border-radius: 4px; padding: 20px 24px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 15px; color: #2C2A1E;"><strong>Innsjekk:</strong> ${formatDate(booking.innsjekk)}</p>
                <p style="margin: 0 0 8px; font-size: 15px; color: #2C2A1E;"><strong>Utsjekk:</strong> ${formatDate(booking.utsjekk)}</p>
                <p style="margin: 0 0 8px; font-size: 15px; color: #2C2A1E;"><strong>Antall netter:</strong> ${netter}</p>
                <p style="margin: 0; font-size: 15px; color: #2C2A1E;"><strong>Gjester:</strong> ${booking.gjester}</p>
              </div>
              <div style="background: #EAF3DE; border-left: 3px solid #3B5E2B; padding: 16px 20px; margin-bottom: 24px; border-radius: 2px;">
                ${prisLinjer}
                <p style="margin: 8px 0 6px; font-size: 16px; color: #2C2A1E; border-top: 1px solid #3B5E2B; padding-top: 8px;"><strong>Totalt: ${totalFormatted}</strong></p>
                <p style="margin: 0; font-size: 14px; color: #3B5E2B;">Betal via Vipps til <strong>+47 948 42 174</strong> (David Stakkeng Vang)</p>
              </div>
              <p style="color: #5F5E5A; line-height: 1.7; margin-bottom: 16px;">
                Vi gleder oss til å ta imot deg! Merk Vipps-betalingen med ditt navn og innsjekk-dato.
              </p>
              <p style="color: #5F5E5A; line-height: 1.7;">
                Spørsmål? Svar på denne e-posten.
              </p>
              <p style="margin-top: 32px; color: #9A9890; font-size: 13px;">
                — David, Hytta på Hansmyr
              </p>
            </div>
          </div>
        `,
      }),
    });
  }

  const navn = encodeURIComponent(booking.navn);
  return NextResponse.redirect(new URL(`/godkjenn?status=ok&navn=${navn}`, req.url));
}
