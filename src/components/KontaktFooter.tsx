export default function KontaktFooter() {
  return (
    <>
      {/* Kontakt section */}
      <section id="kontakt" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="label-caps text-[#3B5E2B] mb-3">Kontakt</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-[#2C2A1E]">
              Ta kontakt
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="space-y-5">
              <div className="flex gap-4">
                <span className="text-xl flex-shrink-0 mt-0.5">📍</span>
                <div>
                  <div className="label-caps text-[#5F5E5A] mb-1">Adresse</div>
                  <div className="font-lato font-light text-[#2C2A1E]">
                    Hansmyrvegen 293, 2120 Sagstua
                    <br />
                    Nord-Odal, Innlandet
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-xl flex-shrink-0 mt-0.5">📞</span>
                <div>
                  <div className="label-caps text-[#5F5E5A] mb-1">Telefon</div>
                  <a
                    href="tel:+4794842174"
                    className="font-lato font-light text-[#2C2A1E] hover:text-[#3B5E2B] transition-colors"
                  >
                    +47 948 42 174
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-xl flex-shrink-0 mt-0.5">✉️</span>
                <div>
                  <div className="label-caps text-[#5F5E5A] mb-1">E-post</div>
                  <a
                    href="mailto:davidstakkengvang@gmail.com"
                    className="font-lato font-light text-[#2C2A1E] hover:text-[#3B5E2B] transition-colors"
                  >
                    davidstakkengvang@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-xl flex-shrink-0 mt-0.5">🕐</span>
                <div>
                  <div className="label-caps text-[#5F5E5A] mb-1">
                    Inn- og utsjekk
                  </div>
                  <div className="font-lato font-light text-[#2C2A1E]">
                    Innsjekk fra kl. 15:00
                    <br />
                    Utsjekk innen kl. 12:00
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-sm overflow-hidden border border-[#2C2A1E]/10 h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d11.436473!3d60.4058517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjDCsDI0JzIxLjEiTiAxMcKwMjYnMTEuMyJF!5e0!3m2!1sno!2sno!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kart — Hytta på Hansmyr kontakt"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C2A1E] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {/* Col 1 */}
            <div>
              <div className="font-playfair text-xl mb-4">
                Hytta på{" "}
                <em className="text-[#3B5E2B] italic">Hansmyr</em>
              </div>
              <p className="font-lato font-light text-white/60 text-sm leading-relaxed mb-4">
                Hansmyrvegen 293
                <br />
                2120 Sagstua, Nord-Odal
              </p>
              <div className="space-y-1">
                <a
                  href="tel:+4794842174"
                  className="font-lato font-light text-white/60 text-sm hover:text-white transition-colors block"
                >
                  +47 948 42 174
                </a>
                <a
                  href="mailto:davidstakkengvang@gmail.com"
                  className="font-lato font-light text-white/60 text-sm hover:text-white transition-colors block"
                >
                  davidstakkengvang@gmail.com
                </a>
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <div className="label-caps text-white/40 mb-4">Utforsk</div>
              <ul className="space-y-2">
                {[
                  ["Historien", "#historien"],
                  ["Naturen", "#sopp"],
                  ["Aktiviteter", "#aktiviteter"],
                  ["Fasiliteter", "#hytten"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="font-lato font-light text-white/60 text-sm hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <div className="label-caps text-white/40 mb-4">Booking</div>
              <ul className="space-y-2">
                {[
                  ["Priser", "#booking"],
                  ["Ledige datoer", "#booking"],
                  ["Husregler", "#husregler"],
                  ["Kontakt oss", "#kontakt"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="font-lato font-light text-white/60 text-sm hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-lato font-light text-white/40 text-xs">
              © 2026 Hytta på Hansmyr · David Stakkeng Vang
            </p>
            <p className="font-lato font-light text-white/40 text-xs">
              Familieeid siden 1854 · Nord-Odal, Innlandet
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
