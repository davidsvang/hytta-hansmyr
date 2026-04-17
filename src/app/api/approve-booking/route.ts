import { NextRequest, NextResponse } from "next/server";
import { redis, addBookedRange, PendingBooking } from "@/lib/redis";

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

  // Send confirmation email to guest
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const formatDate = (d: string) =>
      new Date(d).toLocaleDateString("nb-NO", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      });

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Hytta på Hansmyr <booking@hansmyr.no>",
        to: [booking.epost],
        reply_to: "davidstakkengvang@gmail.com",
        subject: "Booking bekreftet — Hytta på Hansmyr!",
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2C2A1E;">
            <div style="background: #3B5E2B; padding: 24px 32px; margin-bottom: 32px;">
              <h1 style="color: white; margin: 0; font-size: 22px; font-weight: normal;">
                Hytta på Hansmyr
              </h1>
            </div>
            <div style="padding: 0 32px 32px;">
              <h2 style="font-size: 20px; font-weight: normal; margin-bottom: 16px;">
                Hei ${booking.navn} — bookingen din er bekreftet! 🎉
              </h2>
              <div style="background: #F5F0E8; border-radius: 4px; padding: 20px 24px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 15px;"><strong>Innsjekk:</strong> ${formatDate(booking.innsjekk)}</p>
                <p style="margin: 0 0 8px; font-size: 15px;"><strong>Utsjekk:</strong> ${formatDate(booking.utsjekk)}</p>
                <p style="margin: 0; font-size: 15px;"><strong>Gjester:</strong> ${booking.gjester}</p>
              </div>
              <p style="color: #5F5E5A; line-height: 1.7; margin-bottom: 16px;">
                Vi gleder oss til å ta imot deg! Betaling skjer via Vipps — du vil motta en lenke fra oss separat.
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
