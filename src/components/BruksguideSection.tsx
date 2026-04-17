"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import CabinImage from "./CabinImage";

const guides = [
  {
    icon: "⚡",
    title: "Aggregat",
    content: (
      <div className="space-y-3 text-[#5F5E5A] font-lato font-light text-sm leading-relaxed">
        <p>Start aggregatet — ikke noe hokus pokus. Følg anvisningene på siden av maskinen.</p>
        <p>Bruker du det mye, husk å fylle bensin. Kanne finnes i boden.</p>
      </div>
    ),
    comingSoon: false,
    placeholder: null,
  },
  {
    icon: "🚽",
    title: "Gassdo",
    content: (
      <div className="space-y-3 text-[#5F5E5A] font-lato font-light text-sm leading-relaxed">
        <p className="placeholder-amber">[TRINN-FOR-TRINN GUIDE KOMMER — David fyller inn]</p>
      </div>
    ),
    comingSoon: false,
    placeholder: null,
  },
  {
    icon: "🚿",
    title: "Friluftsdusj",
    content: (
      <div className="space-y-3 text-[#5F5E5A] font-lato font-light text-sm leading-relaxed">
        <p className="placeholder-amber">[TRINN-FOR-TRINN GUIDE KOMMER — David fyller inn]</p>
      </div>
    ),
    comingSoon: false,
    placeholder: null,
  },
  {
    icon: "🔥",
    title: "Vedovn",
    content: (
      <div className="space-y-3 text-[#5F5E5A] font-lato font-light text-sm leading-relaxed">
        <div className="relative h-40 rounded-sm overflow-hidden mb-4">
          <CabinImage src="/images/fyr-i-peisen-stua.jpeg" alt="Fyr i peisen" fill className="object-cover" />
        </div>
        <p>Vedovnen brukes til å varme hytten — ikke til matlaging. Bruk stekeovnen for mat!</p>
      </div>
    ),
    comingSoon: false,
    placeholder: null,
  },
  {
    icon: "💧",
    title: "Vannpumpe",
    content: (
      <div className="space-y-3 text-[#5F5E5A] font-lato font-light text-sm leading-relaxed">
        <div className="relative h-56 rounded-sm overflow-hidden mb-4">
          <CabinImage src="/images/vannpumpe.jpeg" alt="Håndpumpe ved brønnen" fill className="object-cover object-bottom" />
        </div>
        <p>Bare å pumpe løs — vannet er rent og trygt å drikke.</p>
        <p>Det kan være litt grums i bunnen første gang. Pump til vannet er klart før du bruker det.</p>
        <p>Foretrekker du å være på den sikre siden? Ta gjerne med eget vann.</p>
      </div>
    ),
    comingSoon: false,
    placeholder: null,
  },
];

export default function BruksguideSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="guider" className="py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="label-caps text-[#3B5E2B] mb-3">Guider</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#2C2A1E]">
            Bruksguide for hytta
          </h2>
          <p className="text-[#5F5E5A] font-lato font-light mt-4 max-w-xl">
            Alt du trenger å vite for å trives på Hansmyr. Guidene oppdateres
            løpende.
          </p>
        </div>

        <div className="max-w-2xl space-y-3">
          {guides.map((guide, i) => (
            <div
              key={guide.title}
              className="bg-white rounded-sm border border-[#2C2A1E]/10 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F5F0E8]/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl">{guide.icon}</span>
                  <span className="font-lato font-normal text-[#2C2A1E]">
                    {guide.title}
                  </span>
                  {guide.comingSoon && (
                    <span className="label-caps bg-[#EAF3DE] text-[#3B5E2B] px-2 py-0.5 rounded text-[10px]">
                      Kommer snart
                    </span>
                  )}
                </div>
                <ChevronDown
                  size={18}
                  className={`text-[#5F5E5A] transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === i && (
                <div className="px-5 pb-5 border-t border-[#2C2A1E]/10 pt-4">
                  {guide.comingSoon ? (
                    <p className="placeholder-amber text-sm">
                      {guide.placeholder}
                    </p>
                  ) : (
                    guide.content
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
