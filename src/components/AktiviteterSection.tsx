"use client";

import { useState } from "react";

type Season = "Alle" | "Sommer" | "Høst" | "Vinter" | "Kultur" | "Jakt";

const activities = [
  {
    icon: "🏖️",
    title: "Bukkeneset badestrand",
    distance: "10 min",
    desc: "Storsjøen, opptil 26°, badeflåte og volleyball",
    seasons: ["Sommer"] as Season[],
  },
  {
    icon: "🛶",
    title: "Odal Kano og Fritid",
    distance: "10 min",
    desc: "Kano, SUP, hengekøyer. Tlf: +47 98 06 16 69",
    seasons: ["Sommer"] as Season[],
  },
  {
    icon: "🎣",
    title: "Fiske i Storsjøen",
    distance: "10 min",
    desc: "Gratis — intet fiskekort nødvendig",
    seasons: ["Sommer", "Høst"] as Season[],
  },
  {
    icon: "⛵",
    title: "Historisk trebåt VB54",
    distance: "15 min",
    desc: "Søndager 20. juni–22. aug fra Mo brygge kl. 14",
    seasons: ["Sommer"] as Season[],
  },
  {
    icon: "🫐",
    title: "Blåbær på tomten",
    distance: "På tomten",
    desc: "Mid-juli til slutten av august",
    seasons: ["Sommer"] as Season[],
    badge: "Mid-juli – aug",
  },
  {
    icon: "🍄",
    title: "Soppsanking",
    distance: "I skogen rundt",
    desc: "Juli til første frost. Høysesong august–oktober",
    seasons: ["Høst", "Sommer"] as Season[],
    badge: "Aug – okt",
  },
  {
    icon: "🥾",
    title: "Turgåing",
    distance: "Fra tomten",
    desc: "Merkede og umerkede skogsveier. Se ut.no for kart",
    seasons: ["Sommer", "Høst"] as Season[],
  },
  {
    icon: "🚴",
    title: "Sykling",
    distance: "I nærområdet",
    desc: "Langs mange skogsveier og stier",
    seasons: ["Sommer", "Høst"] as Season[],
  },
  {
    icon: "📚",
    title: "Sagstua Skolemuseum",
    distance: "5 min",
    desc: "Sigurd Hoels barndomshjem fra 1856. Søndager åpent",
    seasons: ["Kultur"] as Season[],
  },
  {
    icon: "🍽️",
    title: "Milepelen Hotell & Vertshus",
    distance: "10 min",
    desc: "Restaurant med lokal tradisjonsmat. Tlf: +47 62 97 01 30",
    seasons: ["Kultur"] as Season[],
  },
  {
    icon: "🎯",
    title: "Nord-Odal Jakt og Fiskeforening",
    distance: "Kommunen",
    desc: "Elg, hjort, rådyr, småvilt. 90% av kommunen er utmark",
    seasons: ["Jakt"] as Season[],
  },
  {
    icon: "🦊",
    title: "Den store revejakta",
    distance: "Kommunen",
    desc: "Over 300 jegere. Kontakt Nord-Odal JFF for info",
    seasons: ["Jakt"] as Season[],
  },
  {
    icon: "⛷️",
    title: "Skiløyper fra Prestberget",
    distance: "10 min",
    desc: "30 km preparerte løyper",
    seasons: ["Vinter"] as Season[],
  },
  {
    icon: "🏒",
    title: "Skøytebane på Sand",
    distance: "10 min",
    desc: "Nord-Odal IL — naturis utendørs",
    seasons: ["Vinter"] as Season[],
  },
  {
    icon: "🎿",
    title: "Diskgolfbane Prestberget",
    distance: "10 min",
    desc: "10-hull, gratis, åpen hele døgnet",
    seasons: ["Vinter"] as Season[],
  },
];

const seasons: Season[] = ["Alle", "Sommer", "Høst", "Vinter", "Kultur", "Jakt"];

export default function AktiviteterSection() {
  const [activeSeason, setActiveSeason] = useState<Season>("Alle");

  const filtered =
    activeSeason === "Alle"
      ? activities
      : activities.filter((a) => a.seasons.includes(activeSeason));

  return (
    <section id="aktiviteter" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <p className="label-caps text-[#3B5E2B] mb-3">I nærheten</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#2C2A1E] mb-6">
            Aktiviteter & turguide
          </h2>

          {/* Season filter */}
          <div className="flex flex-wrap gap-2">
            {seasons.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSeason(s)}
                className={`label-caps px-4 py-2 rounded border transition-colors ${
                  activeSeason === s
                    ? "bg-[#3B5E2B] text-white border-[#3B5E2B]"
                    : "border-[#2C2A1E]/20 text-[#5F5E5A] hover:border-[#3B5E2B] hover:text-[#3B5E2B]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Activity cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {filtered.map((act) => (
            <div
              key={act.title}
              className="p-5 rounded-sm border border-[#2C2A1E]/10 bg-[#F5F0E8] hover:border-[#3B5E2B]/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{act.icon}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-lato font-normal text-[#2C2A1E] text-sm">
                      {act.title}
                    </h3>
                    {act.badge && (
                      <span className="label-caps text-[10px] bg-[#EAF3DE] text-[#3B5E2B] px-2 py-0.5 rounded flex-shrink-0">
                        {act.badge}
                      </span>
                    )}
                  </div>
                  <p className="label-caps text-[#3B5E2B] mt-1">
                    {act.distance}
                  </p>
                  <p className="text-[#5F5E5A] font-lato font-light text-xs mt-1 leading-relaxed">
                    {act.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map section */}
        <div className="rounded-sm overflow-hidden border border-[#2C2A1E]/10">
          <div className="bg-[#F5F0E8] px-6 py-4 border-b border-[#2C2A1E]/10">
            <h3 className="font-playfair text-xl text-[#2C2A1E]">Kart over området</h3>
            <p className="text-[#5F5E5A] font-lato font-light text-sm mt-1">
              Hansmyrvegen 293, 2120 Sagstua, Nord-Odal
            </p>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d11.436473!3d60.4058517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjDCsDI0JzIxLjEiTiAxMcKwMjYnMTEuMyJF!5e0!3m2!1sno!2sno!4v1"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kart — Hytta på Hansmyr"
          />
        </div>
      </div>
    </section>
  );
}
