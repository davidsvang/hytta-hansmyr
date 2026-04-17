import { NextRequest, NextResponse } from "next/server";
import { getAllBookings } from "@/lib/redis";

function isAuthed(req: NextRequest) {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const bookings = await getAllBookings();
  bookings.sort((a, b) => new Date(b.godkjentDato).getTime() - new Date(a.godkjentDato).getTime());
  return NextResponse.json(bookings);
}
