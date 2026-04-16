"use client";

import { useState } from "react";

const chatMessages = [
  {
    role: "ai",
    text: "Hei! Jeg kan hjelpe deg med alt om Hytta på Hansmyr — fasiliteter, aktiviteter, veibeskrivelse og booking. Hva lurer du på? 🌲",
  },
  {
    role: "user",
    text: "Er det hester man kan hilse på?",
  },
  {
    role: "ai",
    text: "Ja! To vakre brune hester beiter fritt rundt tunet 🐴 De er rolige og vant med folk. Barna elsker dem!",
  },
];

export default function DagbokSection() {
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="dagbok" className="py-20 bg-[#2C2A1E]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gjestebok */}
          <div>
            <p className="label-caps text-[#EAF3DE]/60 mb-3">Hyttedagbok</p>
            <h2 className="font-playfair text-4xl text-white mb-4">
              Hva gjestene sier
            </h2>

            {/* New in 2026 */}
            <div className="border border-white/10 rounded-sm p-6 mb-8">
              <p className="label-caps text-[#8B5E3C] mb-3">Nyoppstartet 2026</p>
              <p className="text-white/70 font-lato font-light leading-relaxed">
                Hytta på Hansmyr tar imot sine første gjester i 2026. Vi gleder
                oss til å høre hva du synes!
              </p>
            </div>

            {/* Guest submission form */}
            {submitted ? (
              <div className="border border-[#3B5E2B]/50 bg-[#3B5E2B]/10 rounded-sm p-6">
                <p className="text-white font-lato font-light">
                  Takk! Vi modererer meldingen din og publiserer den snart. 🌿
                </p>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div>
                  <label className="label-caps text-white/50 block mb-2">
                    Ditt navn
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Ola Nordmann"
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 font-lato font-light text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#3B5E2B]"
                    required
                  />
                </div>
                <div>
                  <label className="label-caps text-white/50 block mb-2">
                    Din melding
                  </label>
                  <textarea
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="Del din opplevelse fra Hansmyr..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 font-lato font-light text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#3B5E2B] resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="label-caps bg-[#3B5E2B] text-white px-6 py-3 rounded hover:bg-[#2C3D1E] transition-colors"
                >
                  Send din historie
                </button>
              </form>
            )}
          </div>

          {/* AI chat */}
          <div>
            <p className="label-caps text-[#EAF3DE]/60 mb-3">AI-assistent</p>
            <h2 className="font-playfair text-4xl text-white mb-4">
              Spørsmål? Vi svarer alltid.
            </h2>
            <p className="text-white/50 font-lato font-light text-sm mb-6">
              Demo-chat — ekte AI kobles til i neste fase.
            </p>

            {/* Chat window */}
            <div className="border border-white/10 rounded-sm overflow-hidden">
              <div className="bg-white/5 px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#3B5E2B] rounded-full" />
                  <span className="label-caps text-white/60">
                    Hytta på Hansmyr — AI
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-4 min-h-64">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-sm font-lato font-light text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#3B5E2B] text-white"
                          : "bg-white/10 text-white/80"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-white/10 p-3 flex gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Still et spørsmål..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-sm px-3 py-2 font-lato font-light text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#3B5E2B]"
                />
                <button className="label-caps bg-[#3B5E2B] text-white px-4 py-2 rounded hover:bg-[#2C3D1E] transition-colors text-[10px]">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
