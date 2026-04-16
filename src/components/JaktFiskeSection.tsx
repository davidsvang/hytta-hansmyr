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
                <span>90% av Nord-Odal er utmark</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3B5E2B] flex-shrink-0 mt-0.5">—</span>
                <span>Elg, hjort, rådyr, rev, småvilt</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3B5E2B] flex-shrink-0 mt-0.5">—</span>
                <span>
                  Kontakt Nord-Odal Jakt- og Fiskeforening for jaktkort og info
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3B5E2B] flex-shrink-0 mt-0.5">—</span>
                <span>
                  Den store revejakta: Årlig arrangement med 300+ jegere
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Placeholder */}
        <div className="rounded-sm border border-dashed border-[#8B5E3C]/40 p-6 bg-[#F5F0E8]">
          <p className="placeholder-amber font-lato text-sm">
            [MER INNHOLD OM JAKTTIDER OG REGLER KOMMER]
          </p>
        </div>
      </div>
    </section>
  );
}
