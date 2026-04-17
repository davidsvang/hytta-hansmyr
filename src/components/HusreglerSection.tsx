const rules = [
  {
    icon: "🐾",
    title: "Dyr",
    desc: "Hjertelig velkomne!",
  },
  {
    icon: "🚬",
    title: "Røyking",
    desc: "Kun utendørs",
  },
  {
    icon: "🔞",
    title: "Aldersgrense",
    desc: "18 år. Yngre barn kun med foresatte.",
  },
  {
    icon: "🎵",
    title: "Støy",
    desc: "Musikk med måte — ro etter kl. 23:00",
  },
  {
    icon: "🔥",
    title: "Bål",
    desc: "Generelt bålforbud 15. april – 15. september. Utenfor forbudsperioden: alltid ansvarlig bålbrenning. Den som tenner bål er ansvarlig. Bålet skal være fullstendig slukket. Aldri brent søppel, plast eller hageavfall.",
  },
  {
    icon: "🗑️",
    title: "Søppel",
    desc: "Tas med og leveres ved Nord-Odal gjenvinningsstasjon (Fv 209 mot Granerud industrifelt, mellom Sand og Mo)",
  },
  {
    icon: "🔑",
    title: "Innsjekk",
    desc: "Fra kl. 15:00. Kode til kodeboks sendes ved bekreftet booking.",
  },
  {
    icon: "🧹",
    title: "Utsjekk",
    desc: "Innen kl. 12:00. Kjøkkenutstyr vaskes og settes på plass.",
  },
  {
    icon: "🚧",
    title: "Gjerdet",
    desc: "Ikke gå inn bak gjerdet — privat område",
  },
  {
    icon: "💥",
    title: "Skader",
    desc: "Meldes til David umiddelbart. Ødeleggelser erstattes.",
  },
];

import CabinImage from "./CabinImage";

export default function HusreglerSection() {
  return (
    <section id="husregler" className="py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <p className="label-caps text-[#3B5E2B] mb-3">Husregler</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-[#2C2A1E]">
              Vi tar vare på hverandre og hytta
            </h2>
          </div>
          <div className="relative h-52 rounded-sm overflow-hidden">
            <CabinImage
              src="/images/bålplass-foran-hytta.jpeg"
              alt="Bålplass foran hytta"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A1E]/40 to-transparent flex items-end">
              <p className="font-playfair italic text-white text-sm px-4 py-3">Bålplass foran hytta</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rules.map((rule) => (
            <div
              key={rule.title}
              className="bg-white rounded-sm border border-[#2C2A1E]/10 p-5"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{rule.icon}</span>
                <div>
                  <h3 className="font-lato font-normal text-[#2C2A1E] text-sm mb-1">
                    {rule.title}
                  </h3>
                  <p className="font-lato font-light text-[#5F5E5A] text-xs leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Check-in/out highlight */}
        <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
          <div className="bg-[#EAF3DE] rounded-sm border border-[#3B5E2B]/20 p-4 text-center">
            <div className="font-playfair text-2xl text-[#3B5E2B]">15:00</div>
            <div className="label-caps text-[#5F5E5A] mt-1">Innsjekk</div>
          </div>
          <div className="bg-[#EAF3DE] rounded-sm border border-[#3B5E2B]/20 p-4 text-center">
            <div className="font-playfair text-2xl text-[#3B5E2B]">12:00</div>
            <div className="label-caps text-[#5F5E5A] mt-1">Utsjekk</div>
          </div>
        </div>
      </div>
    </section>
  );
}
