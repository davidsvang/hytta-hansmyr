import CabinImage from "./CabinImage";

export default function JaktFiskeSection() {
  return (
    <section id="jakt" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="label-caps text-[#3B5E2B] mb-3">Jakt og fiske</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#2C2A1E]">
            Et eldorado i villmarken
          </h2>
        </div>

        {/* Hero-bilde jakt */}
        <div className="relative h-72 rounded-sm overflow-hidden mb-10">
          <CabinImage
            src="/images/morten-luftgever-klippet.jpeg"
            alt="Jakt ved stabburet"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C2A1E]/60 to-transparent flex items-end">
            <p className="font-playfair italic text-white text-xl p-8">
              Stabburet i bakgrunnen — midt i villmarken
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Fiske */}
          <div className="bg-[#F5F0E8] rounded-sm border border-[#2C2A1E]/10 p-8">
            <div className="text-4xl mb-4">🎣</div>
            <h3 className="font-playfair text-2xl text-[#2C2A1E] mb-5">Fiske</h3>
            <ul className="space-y-3 text-[#5F5E5A] font-lato font-light text-sm">
              <li className="flex gap-3">
                <span className="text-[#3B5E2B] flex-shrink-0 mt-0.5">—</span>
                <span>Storsjøen: Gratis fiske, intet fiskekort nødvendig</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3B5E2B] flex-shrink-0 mt-0.5">—</span>
                <span>En av landets mest fiskerike sjøer</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3B5E2B] flex-shrink-0 mt-0.5">—</span>
                <span>Gjedde, abbor, ørret og mer</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3B5E2B] flex-shrink-0 mt-0.5">—</span>
                <span>Guidede fisketurer: Odal Fritid & Turistservice</span>
              </li>
            </ul>
          </div>

          {/* Jakt */}
          <div className="bg-[#F5F0E8] rounded-sm border border-[#2C2A1E]/10 p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="font-playfair text-2xl text-[#2C2A1E] mb-5">Jakt</h3>
            <ul className="space-y-3 text-[#5F5E5A] font-lato font-light text-sm">
              <li className="flex gap-3">
                <span className="text-[#3B5E2B] flex-shrink-0 mt-0.5">—</span>
                <span>Nord-Odal forvalter ca. 200 000 mål med gran- og furuskog — utenfor ulvesonen</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3B5E2B] flex-shrink-0 mt-0.5">—</span>
                <span><strong>Elg:</strong> Sesong starter tidlig oktober. Kontakt lokale elglag via Nord-Odal JFF</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3B5E2B] flex-shrink-0 mt-0.5">—</span>
                <span><strong>Rådyr og bukk:</strong> Jaktkort via iNatur.no. Søknadsfrist ca. 1. september. Maks 15 bukkekort og 25 rådyrkort per sesong</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3B5E2B] flex-shrink-0 mt-0.5">—</span>
                <span><strong>Hare og småvilt:</strong> Stabil og god bestand. Jaktkort kjøpes via iNatur.no eller gjennom foreningen</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3B5E2B] flex-shrink-0 mt-0.5">—</span>
                <span><strong>Den store revejakta:</strong> Arrangeres hvert år i januar av Nord-Odal JFF — ca. 350 deltakere. Kr 350 for voksne, 150 for junior. Påmelding via foreningen</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3B5E2B] flex-shrink-0 mt-0.5">—</span>
                <span>Obligatorisk innrapportering etter endt jakt, uavhengig av fangst</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3B5E2B] flex-shrink-0 mt-0.5">—</span>
                <span>Kontakt Nord-Odal JFF: <a href="mailto:post@nordodaljff.no" className="text-[#3B5E2B] underline">post@nordodaljff.no</a> · Tlf: 984 47 095</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Jakttider tabell */}
        <div className="rounded-sm border border-[#2C2A1E]/10 bg-[#F5F0E8] p-6">
          <h4 className="font-playfair text-lg text-[#2C2A1E] mb-4">Jakttider i Nord-Odal</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-lato font-light text-[#5F5E5A]">
            {[
              { art: "🦌 Elg", tid: "Oktober" },
              { art: "🦌 Rådyr / bukk", tid: "August – februar" },
              { art: "🐺 Rev", tid: "Oktober – mars (+ januar-event)" },
              { art: "🐇 Hare", tid: "Oktober – februar" },
              { art: "🦢 Småvilt", tid: "Oktober – desember" },
            ].map((row) => (
              <div key={row.art} className="flex justify-between border-b border-[#2C2A1E]/10 pb-2">
                <span>{row.art}</span>
                <span className="text-[#3B5E2B]">{row.tid}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#5F5E5A] mt-4 font-lato font-light">
            Jakttider fastsettes av Miljødirektoratet og kan endres. Sjekk alltid gjeldende regler på{" "}
            <a href="https://www.njff.no/hedmark/nordodal/jakt" target="_blank" rel="noopener noreferrer" className="text-[#3B5E2B] underline">
              njff.no/hedmark/nordodal
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
