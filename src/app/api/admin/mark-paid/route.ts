import { NextRequest, NextResponse } from "next/server";
import { updateBookingRecord } from "@/lib/redis";

function isAuthed(req: NextRequest) {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, betalt } = await req.json();
  await updateBookingRecord(id, {
    betalt,
    betaltDato: betalt ? new Date().toISOString() : undefined,
  });
  return NextResponse.json({ ok: true });
}
