import CabinImage from "./CabinImage";

const row1 = [
  { src: "/images/forsiden.jpeg", alt: "Forsiden av Hytta på Hansmyr", caption: "Hytta på Hansmyr", span: "col-span-2" },
  { src: "/images/engen-på-forsiden.jpeg", alt: "Blomstereng på forsiden", caption: "Blomstereng", span: "" },
  { src: "/images/snille-hester.jpeg", alt: "Hestene på tunet", caption: "Hestene", span: "" },
];

const row2 = [
  { src: "/images/soffa-i-stuen.jpeg", alt: "Stuen innendørs", caption: "Stuen" },
  { src: "/images/veranda-på-forsiden.jpeg", alt: "Verandaen", caption: "Verandaen" },
  { src: "/images/gutta-jobber-med-motorsag.jpeg", alt: "Vedhugging", caption: "Vedhugging" },
  { src: "/images/selvplukket-blomsterbukett.jpeg", alt: "Selvplukket blomsterbukett", caption: "Skogens blomster" },
];

const row3 = [
  { src: "/images/stabburet.jpeg", alt: "Stabburet", caption: "Stabburet", span: "" },
  { src: "/images/landskapet-om-høsten.jpeg", alt: "Høstlandskapet rundt hytta", caption: "Høst på Hansmyr", span: "col-span-2" },
];

const row4 = [
  { src: "/images/hester-på-verandaen.jpeg", alt: "Hester ved verandaen", caption: "Hester ved hytta" },
  { src: "/images/bålplass-foran-hytta.jpeg", alt: "Bålplass foran hytta", caption: "Bålkveld" },
  { src: "/images/bekken.jpeg", alt: "Bekken ved hytta", caption: "Bekken" },
  { src: "/images/peis-i-stua.jpeg", alt: "Peisen i stuen", caption: "Peiskos" },
];

const row5 = [
  { src: "/images/hvit-svart-og-brun-hest.jpeg", alt: "Tre hester på tunet", caption: "Tre hester", span: "col-span-2" },
  { src: "/images/forsiden-inngjeret.jpeg", alt: "Hytta med inngjeret", caption: "Inngjeret", span: "" },
  { src: "/images/to-hester.jpeg", alt: "To hester på beite", caption: "To hester", span: "" },
];

const row6 = [
  { src: "/images/morten-liten-sommerfugl.jpeg", alt: "Morten som liten med sommerfugl på nesen", caption: "Sommerfugl på nesen", span: "" },
  { src: "/images/peis-som-varmer.jpeg", alt: "Peisen som varmer", caption: "Vinterkos", span: "" },
  { src: "/images/venstre-side-solcellepanel.jpeg", alt: "Solcellepanel på hytta", caption: "Solenergi", span: "" },
  { src: "/images/forsiden-fra-venstre.jpeg", alt: "Hytta fra venstre", caption: "Hytta på Hansmyr", span: "" },
];

function GalleryImage({
  src,
  alt,
  caption,
  className = "",
}: {
  src: string | null;
  alt: string;
  caption: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-sm group ${className}`}>
      {src ? (
        <CabinImage
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-[#2C2A1E]/10 flex flex-col items-center justify-center">
          <div className="text-3xl mb-2">📷</div>
          <p className="label-caps text-[#5F5E5A] text-center px-4">Bilde kommer</p>
        </div>
      )}
      {src && (
        <div className="absolute inset-0 bg-[#2C2A1E]/0 group-hover:bg-[#2C2A1E]/50 transition-all duration-300 flex items-end">
          <p className="font-playfair italic text-white text-lg px-5 py-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}

export default function GalleriSection() {
  return (
    <section id="galleri" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="label-caps text-[#3B5E2B] mb-3">Galleri</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#2C2A1E]">
            Bilder fra Hansmyr
          </h2>
        </div>

        {/* Row 1 — 2fr + 1fr + 1fr */}
        <div className="grid grid-cols-4 gap-3 mb-3 h-72">
          {row1.map((img) => (
            <GalleryImage key={img.src} src={img.src} alt={img.alt} caption={img.caption} className={img.span} />
          ))}
        </div>

        {/* Row 2 — 4 equal */}
        <div className="grid grid-cols-4 gap-3 mb-3 h-56">
          {row2.map((img) => (
            <GalleryImage key={img.src} src={img.src} alt={img.alt} caption={img.caption} />
          ))}
        </div>

        {/* Row 3 — 1fr + 2fr */}
        <div className="grid grid-cols-3 gap-3 mb-3 h-64">
          {row3.map((img) => (
            <GalleryImage key={img.src} src={img.src} alt={img.alt} caption={img.caption} className={img.span} />
          ))}
        </div>

        {/* Row 4 — 4 equal */}
        <div className="grid grid-cols-4 gap-3 mb-3 h-56">
          {row4.map((img) => (
            <GalleryImage key={img.src} src={img.src} alt={img.alt} caption={img.caption} />
          ))}
        </div>

        {/* Row 5 — 2fr + 1fr + 1fr */}
        <div className="grid grid-cols-4 gap-3 mb-3 h-64">
          {row5.map((img) => (
            <GalleryImage key={img.src} src={img.src} alt={img.alt} caption={img.caption} className={img.span} />
          ))}
        </div>

        {/* Row 6 — 4 equal */}
        <div className="grid grid-cols-4 gap-3 h-56">
          {row6.map((img) => (
            <GalleryImage key={img.src} src={img.src} alt={img.alt} caption={img.caption} className={img.span} />
          ))}
        </div>

        {/* Instagram placeholder */}
        <div className="mt-10 border border-dashed border-[#2C2A1E]/20 rounded-sm p-10 text-center">
          <div className="text-4xl mb-3">📸</div>
          <p className="label-caps text-[#5F5E5A] mb-1">@hyttapahansmyr</p>
          <p className="text-[#5F5E5A] font-lato font-light text-sm">
            Del ditt opphold — tag oss på Instagram!
          </p>
          <p className="placeholder-amber text-sm mt-3">
            [INSTAGRAM FEED KOMMER — placeholder for nå]
          </p>
        </div>
      </div>
    </section>
  );
}
