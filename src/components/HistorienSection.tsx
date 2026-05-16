import CabinImage from "./CabinImage";

export default function HistorienSection() {
  return (
    <section id="historien" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero portrait — story-feature opener */}
        <div className="relative max-w-2xl mx-auto aspect-[3/4] rounded-sm overflow-hidden mb-12">
          <CabinImage
            src="/images/mormor-på-verandaen-forsiden.jpeg"
            alt="Mormor på verandaen"
            fill
            className="object-cover"
          />
          <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#3B5E2B]/30 rounded-sm -z-10" />
        </div>

        {/* Section title block */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="label-caps text-[#3B5E2B] mb-4">Historien</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#2C2A1E]">
            En hytte med sjel
          </h2>
        </div>

        {/* Narrative — single centered column */}
        <div className="max-w-3xl mx-auto space-y-14 text-[#5F5E5A] font-lato font-light text-base leading-relaxed">
          {/* 1 */}
          <div className="space-y-5">
            <h3 className="font-playfair text-2xl md:text-3xl text-[#2C2A1E]">
              1854, det første tømmeret
            </h3>
            <p>
              Hytta ble reist i 1854, dypt inne i skogen i det som den gang het
              Hansmyra, en plass i Nord-Odal. Hvem som faktisk hugget og felte
              tømmerstokkene er borte med tiden. Det vi vet er at navnet
              sannsynligvis stammer fra en mann ved navn Hans Myra, etter
              datidens skikk med å forme etternavn av fornavn og sted. Men dette
              er familiens gjetning, ikke et bevist faktum.
            </p>
            <p>Stedet selv heter Hansmyra. Det har det alltid gjort.</p>
          </div>

          {/* 2 */}
          <div className="space-y-5">
            <h3 className="font-playfair text-2xl md:text-3xl text-[#2C2A1E]">
              1954, familien tar over
            </h3>
            <p>
              Hytta hadde vært i Lindstad-familiens eie i hundre år da min
              oldefar oppsøkte den i 1954. Han var vokst opp i Solør og hadde
              lenge ønsket seg et sted for seg selv, et fristed utenfor familiens
              vante stier. Han fant det her, i nabobygda Nord-Odal.
            </p>
            <p>
              Kontrakten ble skrevet hos en advokat ved Rasta skole. Da familien
              overtok, var hytta akkurat 100 år gammel.
            </p>
            <p>
              Det var ikke selvsagt at den skulle bli familiens. Konsesjonsreglene
              tillot bare to mål, så tomten måtte avgrenses nøye. Stabburet, som
              opprinnelig sto et annet sted på eiendommen, ble noen år senere
              flyttet for å rommes innenfor de to målene. Det står der det står i
              dag, fortsatt bygd av samme tømmer.
            </p>
          </div>

          {/* 3 */}
          <div className="space-y-5">
            <h3 className="font-playfair text-2xl md:text-3xl text-[#2C2A1E]">
              Låven som ikke finnes
            </h3>
            <p>
              På høyre side av hytta sto det engang en stor låve. Den er borte
              nå, revet ned for lenge siden, men på en måte er den fortsatt her.
              Da stokkene under hovedhytta begynte å råtne, ble huset jekket
              opp, og de råtne stokkene byttet ut med tømmer fra låven. Senere
              ble verandaen bygd av samme materiale, av lokale snekkere. Og det
              som opprinnelig var et åpent vedskjul med tak og noen planker,
              tettet stefar Trond igjen, isolerte, la skikkelig gulv og satte
              opp benk, også her med tømmer fra låven.
            </p>
            <p>
              Slik lever låven videre. Den er under hytta, rundt verandaen, og
              inne i snekkerboden.
            </p>
          </div>

          {/* 4 */}
          <div className="space-y-5">
            <h3 className="font-playfair text-2xl md:text-3xl text-[#2C2A1E]">
              Veien som ikke fantes
            </h3>
            <p>
              I dag tar det halvannen time å kjøre fra Oslo. Slik har det ikke
              alltid vært. Veien opp til hytta kom først på 1970-tallet. Før det
              måtte familien ta bussen fra Oslo med bytte underveis, gå av i
              bygda, og derfra enten ringe noen som kunne hente med drosje, om
              de hadde med mye bagasje, eller gå opp den lange stien til fots.
              En reise til hytta tok en hel dag.
            </p>
            <p>
              Mormor var 14 år gammel da familien overtok. Hun og søsknene gikk
              til fots gjennom skogen til skolen, og tok på seg skiene om
              vinteren.
            </p>
          </div>

          {/* 5 */}
          <div className="space-y-5">
            <h3 className="font-playfair text-2xl md:text-3xl text-[#2C2A1E]">
              Hytta i dag
            </h3>
            <p>
              Tømmeret i hovedhytta er originalt fra 1854. Stabburet er
              originalt, bare flyttet. Verandaen, snekkerboden og de byttede
              stokkene er nyere, men det er det samme tømmeret som binder alt
              sammen.
            </p>
            <p>
              Hytta har vært i familien i over 70 år nå. Den er ikke pusset opp
              til moderne standard, og det er med vilje. Den er en sommerhytte
              slik den alltid har vært, et fristed for noen som vil ut i skogen
              og puste inn frisk luft kun en liten kjøretur fra Oslo.
            </p>
            <p>
              Nå åpner vi opp for at du og dere også skal få oppleve denne
              skjulte skatten.
            </p>
          </div>
        </div>

        {/* Stats footer */}
        <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-[#2C2A1E]/10">
          <div className="flex gap-12 justify-center">
            <div className="text-center">
              <div className="font-playfair text-3xl text-[#3B5E2B]">1854</div>
              <div className="label-caps text-[#5F5E5A] mt-1">Byggeår</div>
            </div>
            <div className="text-center">
              <div className="font-playfair text-3xl text-[#3B5E2B]">4+</div>
              <div className="label-caps text-[#5F5E5A] mt-1">Generasjoner</div>
            </div>
            <div className="text-center">
              <div className="font-playfair text-3xl text-[#3B5E2B]">170</div>
              <div className="label-caps text-[#5F5E5A] mt-1">År med historie</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
