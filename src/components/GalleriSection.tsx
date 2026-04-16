import CabinImage from "./CabinImage";

const row1 = [
  { src: "/images/IMG_6860.jpeg", alt: "Innkjørselen til hytta", caption: "Innkjørselen", wide: true },
  { src: "/images/IMG_6861.jpeg", alt: "Blomstereng med benk", caption: "Blomstereng", wide: false },
  { src: "/images/IMG_6864.jpeg", alt: "Hestene på tunet", caption: "Hestene", wide: false },
];

const row2 = [
  { src: "/images/IMG_0185.jpeg", alt: "Stuen innendørs", caption: "Stuen" },
  { src: "/images/IMG_0183.jpeg", alt: "Morfar på verandaen", caption: "Verandaen" },
  { src: "/images/IMG_0197.jpeg", alt: "Vedhugging med øks", caption: "Vedhugging" },
  { src: "/images/IMG_6881.jpeg", alt: "Frokost på verandaen", caption: "Frokost" },
];

const row3 = [
  { src: null, alt: "Stabburet — bilde mangler", caption: "Stabburet", wide: false },
  { src: "/images/IMG_6886.jpeg", alt: "Storsjøen badestrand", caption: "Storsjøen", wide: true },
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
          <p className="label-caps text-[#5F5E5A] text-center px-4">
            Bilde kommer
          </p>
        </div>
      )}
      {/* Hover overlay */}
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
          <GalleryImage
            src={row1[0].src}
            alt={row1[0].alt}
            caption={row1[0].caption}
            className="col-span-2"
          />
          <GalleryImage src={row1[1].src} alt={row1[1].alt} caption={row1[1].caption} />
          <GalleryImage src={row1[2].src} alt={row1[2].alt} caption={row1[2].caption} />
        </div>

        {/* Row 2 — 4 equal */}
        <div className="grid grid-cols-4 gap-3 mb-3 h-60">
          {row2.map((img) => (
            <GalleryImage key={img.src} src={img.src} alt={img.alt} caption={img.caption} />
          ))}
        </div>

        {/* Row 3 — 1fr + 2fr */}
        <div className="grid grid-cols-3 gap-3 h-72">
          <GalleryImage
            src={row3[0].src}
            alt={row3[0].alt}
            caption={row3[0].caption}
          />
          <GalleryImage
            src={row3[1].src}
            alt={row3[1].alt}
            caption={row3[1].caption}
            className="col-span-2"
          />
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
