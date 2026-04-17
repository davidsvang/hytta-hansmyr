import { NextResponse } from "next/server";
import { getBookedRanges } from "@/lib/redis";

export async function GET() {
  const ranges = await getBookedRanges();
  return NextResponse.json(ranges);
}
