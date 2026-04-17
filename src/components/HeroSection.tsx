import CabinImage from "./CabinImage";

const tags = [
  { emoji: "🐴", label: "Hester på tunet" },
  { emoji: "🏖️", label: "Storsjøen 10 min" },
  { emoji: "🎯", label: "Jakt & friluft" },
  { emoji: "👨‍👩‍👧", label: "Barnefamilier" },
  { emoji: "🌲", label: "Digital detox" },
  { emoji: "🏚️", label: "Eget stabbur" },
];

const stats = [
  { value: "9", label: "Soveplasser" },
  { value: "2", label: "Bygninger" },
  { value: "1,5t", label: "Fra Oslo" },
];

export default function HeroSection() {
  return (
    <>
      {/* Main hero grid */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left — text */}
        <div className="bg-[#F5F0E8] flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-24 pb-16">
          <p className="label-caps text-[#5F5E5A] mb-4">
            Sagstua · Nord-Odal · Innlandet
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[#2C2A1E] mb-6 leading-tight">
            Stille dager i{" "}
            <em className="text-[#3B5E2B] italic">villskogen</em>
          </h1>
          <p className="text-[#5F5E5A] text-lg mb-8 max-w-md leading-relaxed font-lato font-light">
            En autentisk norsk skogshytte for 9 gjester — med hester på tunet,
            blomsterenger og naturen som nærmeste nabo. 1,5 time fra Oslo.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {tags.map((tag) => (
              <span
                key={tag.label}
                className="bg-[#EAF3DE] text-[#3B5E2B] px-3 py-1.5 rounded text-sm font-lato border border-[#3B5E2B]/20"
              >
                {tag.emoji} {tag.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#booking"
              className="label-caps bg-[#3B5E2B] text-white px-6 py-3 rounded hover:bg-[#2C3D1E] transition-colors"
            >
              Book opphold
            </a>
            <a
              href="#historien"
              className="label-caps border border-[#2C2A1E] text-[#2C2A1E] px-6 py-3 rounded hover:bg-[#2C2A1E] hover:text-white transition-colors"
            >
              Les historien
            </a>
          </div>
        </div>

        {/* Right — image */}
        <div className="relative bg-[#2C3D1E] min-h-[50vh] md:min-h-0">
          <CabinImage
            src="/images/forsiden-av-hytta.jpeg"
            alt="Forsiden av Hytta på Hansmyr"
            fill
            className="object-cover opacity-80"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C3D1E]/60 to-transparent" />

          {/* Stats overlay */}
          <div className="absolute bottom-8 left-8 right-8 flex gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-white">
                <div className="font-playfair text-3xl font-normal">
                  {stat.value}
                </div>
                <div className="label-caps text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Green strip */}
      <div className="bg-[#3B5E2B] text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 md:gap-8 text-center">
          {[
            "9 soveplasser",
            "Hytte + stabbur",
            "Familieeid siden 1854",
            "Automatisert booking",
            "AI-assistent 24/7",
          ].map((item) => (
            <span key={item} className="label-caps text-white/90">
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
