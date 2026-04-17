"use client";

import { useState } from "react";

const prices = [
  {
    label: "Hverdag",
    sublabel: "man–tor",
    price: "1 200",
    unit: "kr / natt",
    popular: false,
  },
  {
    label: "Helg",
    sublabel: "fre–søn",
    price: "1 900",
    unit: "kr / natt",
    popular: true,
  },
  {
    label: "Langhelg",
    sublabel: "3 netter",
    price: "4 800",
    unit: "kr",
    popular: false,
  },
  {
    label: "Uke",
    sublabel: "7 netter",
    price: "8 500",
    unit: "kr",
    popular: false,
  },
];

// Calendar helpers
function generateDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay: firstDay === 0 ? 6 : firstDay - 1, daysInMonth };
}

const MONTHS_NO = [
  "Januar", "Februar", "Mars", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Desember",
];
const DAYS_NO = ["Ma", "Ti", "On", "To", "Fr", "Lø", "Sø"];

// Sample booked ranges (update these manually or connect to a database later)
const bookedDates = new Set([
  "2026-5-10", "2026-5-11", "2026-5-12",
  "2026-5-17", "2026-5-18", "2026-5-19", "2026-5-20",
  "2026-6-5", "2026-6-6", "2026-6-7",
  "2026-6-20", "2026-6-21", "2026-6-22", "2026-6-23", "2026-6-24",
]);

function CalendarMonth({ year, month }: { year: number; month: number }) {
  const { firstDay, daysInMonth } = generateDays(year, month);
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );
  const today = new Date();

  return (
    <div className="bg-white rounded-sm border border-[#2C2A1E]/10 p-5">
      <div className="font-lato font-normal text-[#2C2A1E] text-sm mb-3">
        {MONTHS_NO[month]} {year}
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS_NO.map((d) => (
          <div key={d} className="label-caps text-[#5F5E5A] text-center text-[9px]">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const key = `${year}-${month + 1}-${day}`;
          const booked = bookedDates.has(key);
          const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          return (
            <div
              key={i}
              className={`aspect-square flex items-center justify-center rounded text-xs font-lato font-light ${
                isPast
                  ? "text-[#2C2A1E]/20"
                  : booked
                  ? "bg-[#8B5E3C]/15 text-[#8B5E3C]"
                  : "bg-[#EAF3DE] text-[#3B5E2B] hover:bg-[#3B5E2B] hover:text-white cursor-pointer transition-colors"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

type FormState = "idle" | "loading" | "success" | "error";

export default function BookingSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    navn: "",
    epost: "",
    telefon: "",
    innsjekk: "",
    utsjekk: "",
    gjester: "2",
    melding: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setFormState("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Noe gikk galt. Prøv igjen.");
        setFormState("error");
      }
    } catch {
      setErrorMsg("Kunne ikke sende. Sjekk internettforbindelsen din.");
      setFormState("error");
    }
  };

  // Today's date as min value for date inputs
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <section id="booking" className="py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="label-caps text-[#3B5E2B] mb-3">Booking</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#2C2A1E]">
            Priser & ledige datoer
          </h2>
        </div>

        {/* Price cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {prices.map((p) => (
            <div
              key={p.label}
              className={`relative rounded-sm border p-5 text-center ${
                p.popular
                  ? "border-[#3B5E2B] bg-[#EAF3DE]"
                  : "border-[#2C2A1E]/10 bg-white"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 label-caps bg-[#3B5E2B] text-white px-3 py-0.5 rounded-full text-[9px]">
                  Mest populær
                </div>
              )}
              <div className="label-caps text-[#5F5E5A] mb-1">{p.label}</div>
              <div className="label-caps text-[#5F5E5A]/70 mb-3">{p.sublabel}</div>
              <div className="font-playfair text-3xl text-[#2C2A1E]">
                {p.price}
              </div>
              <div className="label-caps text-[#5F5E5A] mt-1">{p.unit}</div>
            </div>
          ))}
        </div>

        <p className="text-[#5F5E5A] font-lato font-light text-sm mb-10">
          Kun stabburet: fra 700 kr / natt · Sengetøy og håndklær: tillegg per person
        </p>

        {/* Booking form */}
        <div className="bg-white rounded-sm border border-[#2C2A1E]/10 p-6 mb-10 max-w-2xl">
          {formState === "success" ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🌲</div>
              <h3 className="font-playfair text-2xl text-[#2C2A1E] mb-3">
                Forespørsel sendt!
              </h3>
              <p className="text-[#5F5E5A] font-lato font-light leading-relaxed mb-6">
                Takk, {form.navn.split(" ")[0]}! Vi har mottatt forespørselen din og svarer
                vanligvis innen 24 timer på <strong>{form.epost}</strong>.
              </p>
              <p className="text-[#5F5E5A] font-lato font-light text-sm">
                Betaling skjer via Vipps etter bekreftelse.
              </p>
              <button
                onClick={() => {
                  setFormState("idle");
                  setForm({ navn: "", epost: "", telefon: "", innsjekk: "", utsjekk: "", gjester: "2", melding: "" });
                }}
                className="mt-6 label-caps text-[#3B5E2B] border border-[#3B5E2B] px-5 py-2 rounded hover:bg-[#EAF3DE] transition-colors text-sm"
              >
                Send ny forespørsel
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="font-playfair text-xl text-[#2C2A1E] mb-5">
                Send bookingforespørsel
              </h3>

              {/* Name + email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="label-caps text-[#5F5E5A] block mb-2">
                    Navn <span className="text-[#8B5E3C]">*</span>
                  </label>
                  <input
                    type="text"
                    name="navn"
                    value={form.navn}
                    onChange={handleChange}
                    required
                    placeholder="Ola Nordmann"
                    className="w-full border border-[#2C2A1E]/20 rounded-sm px-3 py-2 font-lato font-light text-sm text-[#2C2A1E] bg-[#F5F0E8] focus:outline-none focus:border-[#3B5E2B] placeholder:text-[#2C2A1E]/30"
                  />
                </div>
                <div>
                  <label className="label-caps text-[#5F5E5A] block mb-2">
                    E-post <span className="text-[#8B5E3C]">*</span>
                  </label>
                  <input
                    type="email"
                    name="epost"
                    value={form.epost}
                    onChange={handleChange}
                    required
                    placeholder="ola@example.com"
                    className="w-full border border-[#2C2A1E]/20 rounded-sm px-3 py-2 font-lato font-light text-sm text-[#2C2A1E] bg-[#F5F0E8] focus:outline-none focus:border-[#3B5E2B] placeholder:text-[#2C2A1E]/30"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="label-caps text-[#5F5E5A] block mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="telefon"
                  value={form.telefon}
                  onChange={handleChange}
                  placeholder="+47 000 00 000"
                  className="w-full border border-[#2C2A1E]/20 rounded-sm px-3 py-2 font-lato font-light text-sm text-[#2C2A1E] bg-[#F5F0E8] focus:outline-none focus:border-[#3B5E2B] placeholder:text-[#2C2A1E]/30"
                />
              </div>

              {/* Dates + guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="label-caps text-[#5F5E5A] block mb-2">
                    Innsjekk <span className="text-[#8B5E3C]">*</span>
                  </label>
                  <input
                    type="date"
                    name="innsjekk"
                    value={form.innsjekk}
                    onChange={handleChange}
                    min={todayStr}
                    required
                    className="w-full border border-[#2C2A1E]/20 rounded-sm px-3 py-2 font-lato font-light text-sm text-[#2C2A1E] bg-[#F5F0E8] focus:outline-none focus:border-[#3B5E2B]"
                  />
                </div>
                <div>
                  <label className="label-caps text-[#5F5E5A] block mb-2">
                    Utsjekk <span className="text-[#8B5E3C]">*</span>
                  </label>
                  <input
                    type="date"
                    name="utsjekk"
                    value={form.utsjekk}
                    onChange={handleChange}
                    min={form.innsjekk || todayStr}
                    required
                    className="w-full border border-[#2C2A1E]/20 rounded-sm px-3 py-2 font-lato font-light text-sm text-[#2C2A1E] bg-[#F5F0E8] focus:outline-none focus:border-[#3B5E2B]"
                  />
                </div>
                <div>
                  <label className="label-caps text-[#5F5E5A] block mb-2">
                    Antall gjester
                  </label>
                  <select
                    name="gjester"
                    value={form.gjester}
                    onChange={handleChange}
                    className="w-full border border-[#2C2A1E]/20 rounded-sm px-3 py-2 font-lato font-light text-sm text-[#2C2A1E] bg-[#F5F0E8] focus:outline-none focus:border-[#3B5E2B]"
                  >
                    {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "gjest" : "gjester"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="mb-5">
                <label className="label-caps text-[#5F5E5A] block mb-2">
                  Melding (valgfritt)
                </label>
                <textarea
                  name="melding"
                  value={form.melding}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Spørsmål om hytten, spesielle ønsker, osv."
                  className="w-full border border-[#2C2A1E]/20 rounded-sm px-3 py-2 font-lato font-light text-sm text-[#2C2A1E] bg-[#F5F0E8] focus:outline-none focus:border-[#3B5E2B] placeholder:text-[#2C2A1E]/30 resize-none"
                />
              </div>

              {/* Error */}
              {formState === "error" && (
                <div className="mb-4 bg-[#8B5E3C]/10 border border-[#8B5E3C]/30 rounded-sm px-4 py-3 text-sm text-[#8B5E3C] font-lato">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={formState === "loading"}
                className={`label-caps px-8 py-3 rounded transition-colors w-full sm:w-auto ${
                  formState === "loading"
                    ? "bg-[#3B5E2B]/50 text-white cursor-not-allowed"
                    : "bg-[#3B5E2B] text-white hover:bg-[#2C3D1E]"
                }`}
              >
                {formState === "loading" ? "Sender..." : "Send forespørsel →"}
              </button>

              <p className="text-[#5F5E5A] font-lato font-light text-xs mt-3">
                Vi svarer vanligvis innen 24 timer. Betaling via Vipps etter bekreftelse.
              </p>
            </form>
          )}
        </div>

        {/* Calendar */}
        <h3 className="font-playfair text-xl text-[#2C2A1E] mb-4">
          Kalender — ledige datoer
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <CalendarMonth year={2026} month={4} />
          <CalendarMonth year={2026} month={5} />
          <CalendarMonth year={2026} month={6} />
        </div>
        {/* Legend */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#EAF3DE]" />
            <span className="label-caps text-[#5F5E5A]">Ledig</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#8B5E3C]/15" />
            <span className="label-caps text-[#5F5E5A]">Opptatt</span>
          </div>
        </div>
      </div>
    </section>
  );
}
