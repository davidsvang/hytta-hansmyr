"use client";

import { useEffect } from "react";

// Alle steder med koordinater
const locations = [
  {
    name: "🏡 Hytta på Hansmyr",
    lat: 60.4058517,
    lng: 11.436473,
    color: "#3B5E2B",
    primary: true,
  },
  {
    name: "🏖️ Bukkeneset badestrand",
    lat: 60.3595,
    lng: 11.5052,
    color: "#8B5E3C",
  },
  {
    name: "🛶 Odal Kano og Fritid",
    lat: 60.3620,
    lng: 11.5010,
    color: "#8B5E3C",
  },
  {
    name: "🎣 Fiske i Storsjøen",
    lat: 60.3700,
    lng: 11.4900,
    color: "#8B5E3C",
  },
  {
    name: "📚 Sagstua Skolemuseum",
    lat: 60.4155,
    lng: 11.4420,
    color: "#8B5E3C",
  },
  {
    name: "🍽️ Milepelen Hotell & Vertshus",
    lat: 60.3490,
    lng: 11.5110,
    color: "#8B5E3C",
  },
  {
    name: "⛷️ Prestberget idrettsanlegg",
    lat: 60.4310,
    lng: 11.4650,
    color: "#8B5E3C",
  },
  {
    name: "🗺️ Sagstua sentrum",
    lat: 60.4160,
    lng: 11.4430,
    color: "#5F5E5A",
  },
  {
    name: "🏒 Skøytebane Sand",
    lat: 60.3550,
    lng: 11.5070,
    color: "#5F5E5A",
  },
];

export default function KartMedPins() {
  useEffect(() => {
    // Dynamisk import for å unngå SSR-feil
    (async () => {
      // CSS lastes via global import i layout
      const L = (await import("leaflet")).default;

      const mapEl = document.getElementById("aktiviteter-kart");
      if (!mapEl || (mapEl as HTMLElement & { _leaflet_id?: number })._leaflet_id) return;

      const map = L.map("aktiviteter-kart", {
        center: [60.385, 11.480],
        zoom: 12,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      locations.forEach((loc) => {
        const iconHtml = `
          <div style="
            background: ${loc.primary ? "#3B5E2B" : "#fff"};
            border: 2px solid ${loc.primary ? "#2C3D1E" : "#3B5E2B"};
            border-radius: ${loc.primary ? "50% 50% 50% 0" : "50%"};
            width: ${loc.primary ? "28px" : "20px"};
            height: ${loc.primary ? "28px" : "20px"};
            transform: ${loc.primary ? "rotate(-45deg)" : "none"};
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>`;

        const icon = L.divIcon({
          html: iconHtml,
          className: "",
          iconSize: loc.primary ? [28, 28] : [20, 20],
          iconAnchor: loc.primary ? [14, 28] : [10, 10],
          popupAnchor: [0, -20],
        });

        L.marker([loc.lat, loc.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: var(--font-lato, sans-serif); font-size: 13px; font-weight: 400; padding: 2px 4px;">
              ${loc.name}
            </div>
          `);
      });
    })();
  }, []);

  return (
    <div className="rounded-sm overflow-hidden border border-[#2C2A1E]/10">
      <div className="bg-[#F5F0E8] px-6 py-4 border-b border-[#2C2A1E]/10 flex items-center justify-between">
        <div>
          <h3 className="font-playfair text-xl text-[#2C2A1E]">Kart over området</h3>
          <p className="text-[#5F5E5A] font-lato font-light text-sm mt-0.5">
            Klikk på en markør for å se stedet
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3B5E2B]" />
            <span className="label-caps text-[#5F5E5A]">Hytta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border border-[#3B5E2B] bg-white" />
            <span className="label-caps text-[#5F5E5A]">Aktiviteter</span>
          </div>
        </div>
      </div>
      <div id="aktiviteter-kart" style={{ height: "420px", width: "100%" }} />
    </div>
  );
}
