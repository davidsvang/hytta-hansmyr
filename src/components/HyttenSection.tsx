const sleepingRooms = [
  {
    icon: "🛖",
    title: "Hytta — stue",
    desc: "Køyeseng: enkel nede + enkel oppe",
    beds: 2,
    featured: false,
    image: "/images/stua-køyeseng.jpeg",
    imageAlt: "Køyeseng i stuen",
  },
  {
    icon: "🛏️",
    title: "Hytta — soverom",
    desc: "To køyesenger, alle enkle",
    beds: 4,
    featured: false,
    image: "/images/dør-til-soverom-4-single.jpeg",
    imageAlt: "Soverom med fire senger",
  },
  {
    icon: "🏚️",
    title: "Stabburet",
    desc: "En enkel seng + køyeseng",
    beds: 3,
    featured: true,
    image: "/images/stabburet.jpeg",
    imageAlt: "Stabburet utenfra",
  },
];

const facilities = [
  { icon: "💧", title: "Rent kildevann", desc: "Bekk + borebrønn med håndpumpe" },
  { icon: "🚿", title: "Friluftsdusj", desc: "Vannsekk og fotpumpe under åpen himmel" },
  { icon: "⚡", title: "Aggregat", desc: "Strøm til lys, lading og kokeplate" },
  { icon: "🔥", title: "Vedovn", desc: "Ekstrem varme, hytta blir fort varm" },
  { icon: "🚽", title: "Gassdo inne", desc: "Innendørs toalett med gass" },
  { icon: "🌲", title: "Digital detox", desc: "Svakt signal. Naturen er underholdningen." },
  { icon: "🅿️", title: "Parkering", desc: "Ved gjerdet, kort gåtur over enga" },
  { icon: "🐴", title: "Hester", desc: "Beiter fritt rundt tunet" },
  { icon: "🍳", title: "Kjøkken", desc: "Gryter, panner, fullt bestikk" },
  { icon: "🪵", title: "Bålgrill", desc: "Klar for grilling og bålkveld" },
  { icon: "🧊", title: "Fryseboks", desc: "For mat og drikke" },
  { icon: "🎲", title: "Brettspill", desc: "For koselige kvelder inne" },
  { icon: "🛏️", title: "Sengetøy", desc: "Mot lite tillegg (bestilles ved booking)" },
  { icon: "🔧", title: "Verktøy", desc: "Diverse tilgjengelig" },
  { icon: "🩹", title: "Førstehjelpsskrin", desc: "Alltid tilgjengelig" },
  { icon: "🪑", title: "Utemøbler", desc: "Benker og bord ute" },
];

import CabinImage from "./CabinImage";

export default function HyttenSection() {
  return (
    <section id="hytten" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="label-caps text-[#3B5E2B] mb-3">Hytten</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#2C2A1E]">
            Fasiliteter & soveplasser
          </h2>
        </div>

        {/* Sleeping rooms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {sleepingRooms.map((room) => (
            <div
              key={room.title}
              className={`rounded-sm border overflow-hidden ${
                room.featured
                  ? "border-[#3B5E2B]"
                  : "border-[#2C2A1E]/10"
              } relative`}
            >
              {/* Room image */}
              <div className="relative h-44">
                <CabinImage src={room.image} alt={room.imageAlt} fill className="object-cover" />
                {room.featured && (
                  <span className="absolute top-3 right-3 label-caps bg-[#3B5E2B] text-white px-2 py-1 rounded text-[10px]">
                    Kan leies separat
                  </span>
                )}
              </div>
              <div className={`p-5 ${room.featured ? "bg-[#EAF3DE]" : "bg-[#F5F0E8]"}`}>
              <div className="text-2xl mb-2">{room.icon}</div>
              <h3 className="font-playfair text-xl text-[#2C2A1E] mb-2">
                {room.title}
              </h3>
              <p className="text-[#5F5E5A] font-lato font-light text-sm mb-4">
                {room.desc}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: room.beds }).map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-3 bg-[#3B5E2B]/30 rounded-sm"
                    />
                  ))}
                </div>
                <span className="label-caps text-[#5F5E5A]">
                  {room.beds} senger
                </span>
              </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total beds badge */}
        <div className="flex items-center gap-4 mb-12 p-4 bg-[#EAF3DE] rounded-sm border border-[#3B5E2B]/20 max-w-sm">
          <span className="font-playfair text-4xl text-[#3B5E2B]">9</span>
          <div>
            <div className="font-lato font-light text-[#2C2A1E]">
              Totalt soveplasser
            </div>
            <div className="label-caps text-[#5F5E5A]">
              Hytte + stabbur
            </div>
          </div>
        </div>

        {/* Interiør-bildestrip */}
        <div className="grid grid-cols-3 gap-3 mb-16 h-52">
          <div className="relative rounded-sm overflow-hidden">
            <CabinImage src="/images/lite-praktisk-kjøkken.jpeg" alt="Kjøkkenet" fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
              <p className="font-playfair italic text-white text-sm">Kjøkkenet</p>
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden">
            <CabinImage src="/images/liten-tv-i-stuen.jpeg" alt="Stuen med TV" fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
              <p className="font-playfair italic text-white text-sm">Stuen</p>
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden">
            <CabinImage src="/images/inngangsdør-ved-kjøkkenet.jpeg" alt="Inngangsdøren" fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
              <p className="font-playfair italic text-white text-sm">Inngang</p>
            </div>
          </div>
        </div>

        {/* Facilities grid */}
        <div>
          <h3 className="font-playfair text-2xl text-[#2C2A1E] mb-6">
            Hva som er inkludert
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {facilities.map((f) => (
              <div
                key={f.title}
                className="flex gap-3 p-4 rounded-sm border border-[#2C2A1E]/10 bg-[#F5F0E8] hover:border-[#3B5E2B]/30 transition-colors"
              >
                <span className="text-xl flex-shrink-0">{f.icon}</span>
                <div>
                  <div className="font-lato font-normal text-sm text-[#2C2A1E]">
                    {f.title}
                  </div>
                  <div className="font-lato font-light text-xs text-[#5F5E5A] mt-0.5">
                    {f.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
