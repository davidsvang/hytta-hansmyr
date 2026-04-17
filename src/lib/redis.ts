import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export type BookingRange = {
  innsjekk: string;
  utsjekk: string;
  navn: string;
};

export type PendingBooking = {
  innsjekk: string;
  utsjekk: string;
  navn: string;
  epost: string;
  telefon: string;
  gjester: string;
  melding: string;
};

export async function getBookedRanges(): Promise<BookingRange[]> {
  const data = await redis.get<BookingRange[]>("booked-ranges");
  return data ?? [];
}

export async function addBookedRange(range: BookingRange): Promise<void> {
  const existing = await getBookedRanges();
  existing.push(range);
  await redis.set("booked-ranges", existing);
}
