"use client";

import { useEffect } from "react";

const locations = [
  {
    name: "Hytta på Hansmyr",
    emoji: "🏡",
    lat: 60.4058517,
    lng: 11.436473,
    desc: "Din base for oppholdet",
    primary: true,
  },
  {
    name: "Bukkeneset badestrand",
    emoji: "🏖️",
    lat: 60.37754,
    lng: 11.60038,
    desc: "Storsjøen — opptil 26°, badeflåte og volleyball",
    primary: false,
  },
  {
    name: "Odal Kano og Fritid",
    emoji: "🛶",
    lat: 60.37668,
    lng: 11.69116,
    desc: "Kano, SUP og hengekøyer. Tlf: +47 98 06 16 69",
    primary: false,
  },
  {
    name: "Fiske i Storsjøen",
    emoji: "🎣",
    lat: 60.3702,
    lng: 11.6217,
    desc: "Gratis fiske — intet fiskekort nødvendig",
    primary: false,
  },
  {
    name: "Sagstua Skolemuseum",
    emoji: "📚",
    lat: 60.38811,
    lng: 11.53776,
    desc: "Sigurd Hoels barndomshjem fra 1856. Åpent søndager",
    primary: false,
  },
  {
    name: "Milepelen Hotell & Vertshus",
    emoji: "🍽️",
    lat: 60.39153,
    lng: 11.54071,
    desc: "Restaurant med lokal tradisjonsmat. Tlf: +47 62 97 01 30",
    primary: false,
  },
  {
    name: "Prestberget idrettsanlegg",
    emoji: "⛷️",
    lat: 60.39742,
    lng: 11.53683,
    desc: "30 km preparerte skiløyper. Diskgolf 10 hull.",
    primary: false,
  },
];

export default function KartMedPins() {
  useEffect(() => {
    (async () => {
      const L = (await import("leaflet")).default;

      const mapEl = document.getElementById("aktiviteter-kart");
      if (!mapEl || (mapEl as HTMLElement & { _leaflet_id?: number })._leaflet_id) return;

      const map = L.map("aktiviteter-kart", {
        center: [60.390, 11.570],
        zoom: 11,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      // CartoDB Positron — rent og moderne utseende
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      locations.forEach((loc) => {
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;

        const iconHtml = loc.primary
          ? `<div style="
              background: #3B5E2B;
              border: 3px solid #fff;
              border-radius: 50% 50% 50% 0;
              width: 32px;
              height: 32px;
              transform: rotate(-45deg);
              box-shadow: 0 2px 8px rgba(0,0,0,0.35);
              display: flex;
              align-items: center;
              justify-content: center;
            "></div>`
          : `<div style="
              background: #fff;
              border: 2.5px solid #3B5E2B;
              border-radius: 50%;
              width: 22px;
              height: 22px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.25);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 11px;
            "></div>`;

        const icon = L.divIcon({
          html: iconHtml,
          className: "",
          iconSize: loc.primary ? [32, 32] : [22, 22],
          iconAnchor: loc.primary ? [16, 32] : [11, 11],
          popupAnchor: [0, -20],
        });

        const popupContent = `
          <div style="font-family: sans-serif; min-width: 180px; padding: 4px 2px;">
            <div style="font-size: 15px; margin-bottom: 2px;">${loc.emoji} <strong style="color: #2C2A1E;">${loc.name}</strong></div>
            <div style="font-size: 12px; color: #5F5E5A; margin-bottom: 10px; line-height: 1.5;">${loc.desc}</div>
            <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" style="
              display: inline-block;
              background: #3B5E2B;
              color: white;
              font-size: 11px;
              padding: 5px 12px;
              border-radius: 3px;
              text-decoration: none;
              letter-spacing: 0.05em;
            ">Få veibeskrivelse →</a>
          </div>
        `;

        L.marker([loc.lat, loc.lng], { icon })
          .addTo(map)
          .bindPopup(popupContent, { maxWidth: 240 });
      });
    })();
  }, []);

  return (
    <div className="rounded-sm overflow-hidden border border-[#2C2A1E]/10">
      <div className="bg-[#F5F0E8] px-6 py-4 border-b border-[#2C2A1E]/10 flex items-center justify-between">
        <div>
          <h3 className="font-playfair text-xl text-[#2C2A1E]">Kart over området</h3>
          <p className="text-[#5F5E5A] font-lato font-light text-sm mt-0.5">
            Klikk på en markør for å se stedet og få veibeskrivelse
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3B5E2B]" />
            <span className="label-caps text-[#5F5E5A]">Hytta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-[#3B5E2B] bg-white" />
            <span className="label-caps text-[#5F5E5A]">Aktiviteter</span>
          </div>
        </div>
      </div>
      <div id="aktiviteter-kart" style={{ height: "460px", width: "100%" }} />
    </div>
  );
}
