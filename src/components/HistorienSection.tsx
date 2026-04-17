import CabinImage from "./CabinImage";

export default function HistorienSection() {
  return (
    <section id="historien" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
              <CabinImage
                src="/images/mormor-på-verandaen-forsiden.jpeg"
                alt="Mormor på verandaen"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#3B5E2B]/30 rounded-sm -z-10" />
          </div>

          {/* Text */}
          <div>
            <p className="label-caps text-[#3B5E2B] mb-4">Historien</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-[#2C2A1E] mb-8">
              En hytte med sjel
            </h2>

            <div className="space-y-5 text-[#5F5E5A] font-lato font-light text-base leading-relaxed">
              <p>Noen steder bærer på historier. Hytta på Hansmyr er et slikt sted.</p>

              <p>
                Langt inne i skogen på Hansmyr, i det stille hjørnet av Nord-Odal
                som de fleste kjører forbi uten å vite om, står en hytte som har
                tilhørt familien Stakkeng i generasjoner. Den ble bygd i 1854 av{" "}
                <span className="placeholder-amber">[NAVN — venter på mormor]</span>
                , og har siden den dag stått stille mens verden rundt har forandret seg.
              </p>

              <p>
                <span className="placeholder-amber">[ORIGINAL NAVN PÅ HYTTA — venter på mormor]</span>
              </p>

              <p>
                Stabburet — det lille røde bygget ti meter fra hytta — er også fra
                1854, og ble opprinnelig brukt som husmannsplass der familien var
                selvforsynt med dyr og jord. Tidligere eide familien Linstad eiendommen.
              </p>

              <p>
                I dag åpnes dørene for første gang for gjester utenfra — slik at
                også andre kan oppleve roen, naturen og den unike stemningen som
                råder på Hansmyr.
              </p>

              <div className="rounded-sm border border-dashed border-[#8B5E3C]/40 p-4 bg-[#F5F0E8]">
                <p className="placeholder-amber text-sm">Mer familiehistorie legges til senere.</p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-[#2C2A1E]/10">
              <div className="flex gap-12">
                <div>
                  <div className="font-playfair text-3xl text-[#3B5E2B]">1854</div>
                  <div className="label-caps text-[#5F5E5A] mt-1">Byggeår</div>
                </div>
                <div>
                  <div className="font-playfair text-3xl text-[#3B5E2B]">4+</div>
                  <div className="label-caps text-[#5F5E5A] mt-1">Generasjoner</div>
                </div>
                <div>
                  <div className="font-playfair text-3xl text-[#3B5E2B]">170</div>
                  <div className="label-caps text-[#5F5E5A] mt-1">År med historie</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
