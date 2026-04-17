import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: (process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL)!,
  token: (process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN)!,
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

export type BookingRecord = {
  id: string;
  navn: string;
  epost: string;
  telefon: string;
  innsjekk: string;
  utsjekk: string;
  netter: number;
  gjester: string;
  melding: string;
  totalpris: number;
  prislinjer: { label: string; amount: number }[];
  betalt: boolean;
  betaltDato?: string;
  godkjentDato: string;
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

export async function getAllBookings(): Promise<BookingRecord[]> {
  const data = await redis.get<BookingRecord[]>("booking-records");
  return data ?? [];
}

export async function addBookingRecord(record: BookingRecord): Promise<void> {
  const existing = await getAllBookings();
  existing.push(record);
  await redis.set("booking-records", existing);
}

export async function updateBookingRecord(id: string, updates: Partial<BookingRecord>): Promise<void> {
  const existing = await getAllBookings();
  const idx = existing.findIndex((b) => b.id === id);
  if (idx !== -1) {
    existing[idx] = { ...existing[idx], ...updates };
    await redis.set("booking-records", existing);
  }
}
