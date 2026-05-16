import CabinImage from "./CabinImage";

export default function SoppBaerSection() {
  return (
    <section className="py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="label-caps text-[#3B5E2B] mb-3">Direkte på tomten</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#2C2A1E]">
            Skogens gaver
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Blåbær */}
          <div className="bg-white rounded-sm border border-[#2C2A1E]/10 overflow-hidden">
            <div className="relative h-72">
              <CabinImage
                src="/images/blåbær.jpeg"
                alt="Blåbær på skogbunnen"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-2xl mb-2">🫐</div>
              <h3 className="font-playfair text-2xl text-[#2C2A1E] mb-4">Blåbær</h3>
              <dl className="space-y-3">
                <div className="flex gap-4">
                  <dt className="label-caps text-[#5F5E5A] w-20 flex-shrink-0">Sesong</dt>
                  <dd className="text-[#2C2A1E] font-lato font-light text-sm">Mid-juli til slutten av august</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="label-caps text-[#5F5E5A] w-20 flex-shrink-0">Lokasjon</dt>
                  <dd className="text-[#2C2A1E] font-lato font-light text-sm">Skogbunnen rundt hytta</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="label-caps text-[#5F5E5A] w-20 flex-shrink-0">Tips</dt>
                  <dd className="text-[#2C2A1E] font-lato font-light text-sm">Ta med en bøtte — her er det nok til alle!</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Sopp */}
          <div className="bg-white rounded-sm border border-[#2C2A1E]/10 overflow-hidden">
            <div className="relative h-72">
              <CabinImage
                src="/images/kilovis-med-kanttarell.jpeg"
                alt="Kilovis med kantarell fra skogen"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-2xl mb-2">🍄</div>
              <h3 className="font-playfair text-2xl text-[#2C2A1E] mb-4">Sopp</h3>
              <dl className="space-y-3">
                <div className="flex gap-4">
                  <dt className="label-caps text-[#5F5E5A] w-20 flex-shrink-0">Sesong</dt>
                  <dd className="text-[#2C2A1E] font-lato font-light text-sm">Sensommer til etter første frost (best i oktober og november)</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="label-caps text-[#5F5E5A] w-20 flex-shrink-0">Typer</dt>
                  <dd className="text-[#2C2A1E] font-lato font-light text-sm">Kantarell, steinsopp, piggsopp</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="label-caps text-[#5F5E5A] w-20 flex-shrink-0">Viktig</dt>
                  <dd className="text-[#2C2A1E] font-lato font-light text-sm">Spis aldri sopp du ikke er 100% sikker på</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="label-caps text-[#5F5E5A] w-20 flex-shrink-0">App</dt>
                  <dd className="text-[#2C2A1E] font-lato font-light text-sm">&ldquo;Soppkontroll&rdquo; fra Norges sopp- og nyttevekstforbund</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Mormors råd — family knowledge callout, sits between the fact cards
            and the bilder grid because it directly elaborates on the Sopp SESONG field. */}
        <div className="bg-white rounded-sm border border-[#3B5E2B]/20 p-6 mb-12">
          <p className="label-caps text-[#3B5E2B] mb-2">Familiekunnskap</p>
          <h3 className="font-playfair text-2xl text-[#2C2A1E] mb-4">Mormors råd</h3>
          <div className="space-y-3 text-[#5F5E5A] font-lato font-light text-sm leading-relaxed">
            <p>
              Mormor og søsteren Liv har plukket sopp i denne skogen i over 70
              år. De er bestemte på når den beste tida er: senere enn de fleste
              tror. Slutten av oktober, begynnelsen av november, ofte rett før
              eller etter den første nattefrosten.
            </p>
            <p>
              Frosset sopp er like bra som ufrosset, ifølge dem. Så ikke gi opp
              om termometeret faller.
            </p>
          </div>
        </div>

        {/* Sopp-bilder grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
            <CabinImage src="/images/kurver-med-kantarell.jpeg" alt="Kurver med kantarell" fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
              <p className="font-playfair italic text-white text-sm">Kantarell fra skogen</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
            <CabinImage src="/images/skog-for-sopp.jpeg" alt="Skogen rundt hytta" fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
              <p className="font-playfair italic text-white text-sm">Skogen på Hansmyr</p>
            </div>
          </div>
        </div>

        {/* Allemannsretten */}
        <div className="bg-[#EAF3DE] rounded-sm border border-[#3B5E2B]/20 p-6">
          <h3 className="font-lato font-normal text-[#2C2A1E] mb-3">
            🌿 Allemannsretten
          </h3>
          <ul className="space-y-2 text-[#5F5E5A] font-lato font-light text-sm">
            <li>Allemannsretten gjelder — fri plukking for alle</li>
            <li>Ta ikke mer enn du trenger</li>
            <li>Bevar naturen — gå varsomt i terrenget</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
