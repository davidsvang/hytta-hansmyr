"use client";

import { useState, useEffect, useCallback } from "react";
import type { BookingRecord } from "@/lib/redis";
import { formaterPris } from "@/lib/pricing";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("nb-NO", { day: "numeric", month: "short", year: "numeric" });
}

function exportCSV(bookings: BookingRecord[]) {
  const header = ["Navn", "E-post", "Telefon", "Innsjekk", "Utsjekk", "Netter", "Gjester", "Totalpris", "Betalt", "Betalt dato", "Godkjent dato"];
  const rows = bookings.map((b) => [
    b.navn, b.epost, b.telefon,
    b.innsjekk, b.utsjekk,
    b.netter, b.gjester,
    b.totalpris,
    b.betalt ? "Ja" : "Nei",
    b.betaltDato ? formatDate(b.betaltDato) : "",
    formatDate(b.godkjentDato),
  ]);
  const csv = [header, ...rows].map((r) => r.map((v) => `"${v}"`).join(";")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `hansmyr-bookinger-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = useCallback(async (pw: string) => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/bookings", { headers: { Authorization: `Bearer ${pw}` } });
    if (res.ok) {
      setBookings(await res.json());
      setPassword(pw);
      localStorage.setItem("admin_pw", pw);
    } else {
      setError("Feil passord");
      localStorage.removeItem("admin_pw");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("admin_pw");
    if (saved) fetchBookings(saved);
  }, [fetchBookings]);

  const toggleBetalt = async (b: BookingRecord) => {
    await fetch("/api/admin/mark-paid", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${password}` },
      body: JSON.stringify({ id: b.id, betalt: !b.betalt }),
    });
    setBookings((prev) => prev.map((x) => x.id === b.id ? { ...x, betalt: !b.betalt, betaltDato: !b.betalt ? new Date().toISOString() : undefined } : x));
  };

  const totalInntekt = bookings.reduce((s, b) => s + b.totalpris, 0);
  const totalBetalt = bookings.filter((b) => b.betalt).reduce((s, b) => s + b.totalpris, 0);
  const totalUbetalt = totalInntekt - totalBetalt;

  if (!password) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-6">
        <div className="bg-white rounded-sm border border-[#2C2A1E]/10 p-10 max-w-sm w-full">
          <h1 className="font-playfair text-2xl text-[#2C2A1E] mb-6">Admin — Hansmyr</h1>
          <form onSubmit={(e) => { e.preventDefault(); fetchBookings(inputPw); }}>
            <input
              type="password"
              value={inputPw}
              onChange={(e) => setInputPw(e.target.value)}
              placeholder="Passord"
              className="w-full border border-[#2C2A1E]/20 rounded-sm px-3 py-2 font-lato text-sm mb-3 bg-[#F5F0E8] focus:outline-none focus:border-[#3B5E2B]"
            />
            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-[#3B5E2B] text-white label-caps py-2 rounded hover:bg-[#2C3D1E] transition-colors">
              {loading ? "Logger inn..." : "Logg inn"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="label-caps text-[#3B5E2B] mb-1">Hytta på Hansmyr</p>
            <h1 className="font-playfair text-3xl text-[#2C2A1E]">Bookinger & regnskap</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => exportCSV(bookings)} className="label-caps text-[#3B5E2B] border border-[#3B5E2B] px-4 py-2 rounded hover:bg-[#EAF3DE] transition-colors text-sm">
              Last ned CSV
            </button>
            <button onClick={() => { setPassword(""); localStorage.removeItem("admin_pw"); }} className="label-caps text-[#5F5E5A] border border-[#2C2A1E]/20 px-4 py-2 rounded hover:bg-white transition-colors text-sm">
              Logg ut
            </button>
          </div>
        </div>

        {/* Sammendrag */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total inntekt", value: formaterPris(totalInntekt), sub: `${bookings.length} bookinger` },
            { label: "Betalt", value: formaterPris(totalBetalt), sub: `${bookings.filter(b => b.betalt).length} bookinger`, green: true },
            { label: "Utestående", value: formaterPris(totalUbetalt), sub: `${bookings.filter(b => !b.betalt).length} bookinger` },
          ].map((s) => (
            <div key={s.label} className={`bg-white rounded-sm border p-5 ${s.green ? "border-[#3B5E2B]/30" : "border-[#2C2A1E]/10"}`}>
              <p className="label-caps text-[#5F5E5A] mb-1">{s.label}</p>
              <p className={`font-playfair text-2xl ${s.green ? "text-[#3B5E2B]" : "text-[#2C2A1E]"}`}>{s.value}</p>
              <p className="text-xs font-lato text-[#9A9890] mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabell */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-sm border border-[#2C2A1E]/10 p-10 text-center text-[#5F5E5A] font-lato font-light">
            Ingen bookinger ennå.
          </div>
        ) : (
          <div className="bg-white rounded-sm border border-[#2C2A1E]/10 overflow-hidden">
            <table className="w-full text-sm font-lato">
              <thead>
                <tr className="border-b border-[#2C2A1E]/10 bg-[#F5F0E8]">
                  {["Gjest", "Innsjekk", "Utsjekk", "Netter", "Gjester", "Pris", "Betalt", ""].map((h) => (
                    <th key={h} className="label-caps text-[#5F5E5A] text-left px-4 py-3 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-[#2C2A1E]/5 hover:bg-[#F5F0E8]/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-[#2C2A1E] font-normal">{b.navn}</p>
                      <p className="text-[#9A9890] text-xs">{b.epost}</p>
                      {b.telefon && <p className="text-[#9A9890] text-xs">{b.telefon}</p>}
                    </td>
                    <td className="px-4 py-3 text-[#2C2A1E]">{formatDate(b.innsjekk)}</td>
                    <td className="px-4 py-3 text-[#2C2A1E]">{formatDate(b.utsjekk)}</td>
                    <td className="px-4 py-3 text-[#2C2A1E]">{b.netter}</td>
                    <td className="px-4 py-3 text-[#2C2A1E]">{b.gjester}</td>
                    <td className="px-4 py-3">
                      <p className="text-[#2C2A1E] font-normal">{formaterPris(b.totalpris)}</p>
                      <div className="text-[#9A9890] text-xs">
                        {b.prislinjer.map((l, i) => <p key={i}>{l.label}</p>)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {b.betalt ? (
                        <span className="inline-block bg-[#EAF3DE] text-[#3B5E2B] label-caps px-2 py-0.5 rounded text-[10px]">Betalt</span>
                      ) : (
                        <span className="inline-block bg-[#8B5E3C]/10 text-[#8B5E3C] label-caps px-2 py-0.5 rounded text-[10px]">Venter</span>
                      )}
                      {b.betaltDato && <p className="text-[#9A9890] text-xs mt-1">{formatDate(b.betaltDato)}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleBetalt(b)}
                        className={`label-caps text-xs px-3 py-1.5 rounded border transition-colors ${
                          b.betalt
                            ? "border-[#8B5E3C]/30 text-[#8B5E3C] hover:bg-[#8B5E3C]/10"
                            : "border-[#3B5E2B] text-[#3B5E2B] hover:bg-[#EAF3DE]"
                        }`}
                      >
                        {b.betalt ? "Merk ubetalt" : "Merk betalt"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
