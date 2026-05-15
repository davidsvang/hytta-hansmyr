# Tasks

## To Do
# Priority: 🔴 must do  🟡 should do  🟢 nice to have


## In Progress
# Claude moves tasks here when starting them

- 🔴 **Pricing-redesign — låse Q2–Q4 + skrive samlet spec** (BLOCKER 2). Q1 (rengjøring + sengetøy) låst 2026-05-12, se decisions.md. Q2 (minimumsopphold) under behandling.


## Blocked
# Tasks waiting on something (a decision, external info, another task finishing)

- 🔴 **Implementere pricing-spec + rengjøring/sengetøy-bundle** — blokkert på: full pricing-spec ferdig (Q2–Q4 må låses først). Multi-fil bundle, må spec-es som én pakke:
  - `src/components/BookingSection.tsx` — to nye felter (sengetøy ja/nei + antall senger ved leie; rengjøring ja/nei)
  - `src/lib/pricing.ts` — nye linjer i `lines` for rengjøring + sengetøy; fix langhelg-bug (3-natt pakke skal kun gjelde fre–søn-tunge opphold)
  - `src/lib/redis.ts` — `PendingBooking` + `BookingRecord` får `tarMedSengetoy: boolean`, `antallSenger: number`, `vaskerSelv: boolean`
  - `src/app/api/booking/route.ts` + `src/app/api/approve-booking/route.ts` — e-postmaler viser valgene + sjekkliste i bekreftelsen + vilkårsavsnitt om 1 500 kr bot
  - `src/app/admin/page.tsx` + `src/app/api/admin/bookings/route.ts` — synliggjøre rengjøring/sengetøy-status per booking, inkludert om bot er fakturert
  - CSV-eksport — kolonner for sengetøy/vask/bot-status

- 🟡 **Kalibrere Q3 (sesong) og Q4 (kapasitet) mot markedet** — sjekke Finn.no + Airbnb for hytter i Nord-Odal, Sør-Odal, Eidsvoll, Stange. Tall i pricing-specen markeres `// CALIBRATION_TBD` til denne kjøringen er gjort.


## Done
# Claude moves tasks here when complete, with date

- [x] Q1 av pricing-blockers låst — rengjøring (0/600 kr) + sengetøy (0/150 kr per seng) + 1 500 kr bot-mekanisme. Se decisions.md (2026-05-12).
- [x] Q2 av pricing-blockers låst — 2 netter minimum hele sesongen, ingen skifte-dag, re-evaluering før 2027. Se decisions.md (2026-05-12).
- [x] Q3 av pricing-blockers låst — to-nivå sesong (peak uke 27–31, shoulder ellers), pakker følger multiplikator, `PEAK_MULTIPLIER` CALIBRATION_TBD. Se decisions.md (2026-05-15).
- [x] Q4 av pricing-blockers låst — `MAKS_GJESTER = 10` (6 hytte + 4 stabbur), flat pris, ingen per-gjest-fee. Se decisions.md (2026-05-15).
- [x] Kapasitet-korreksjon 9→10 sweep gjennomført prosjekt-bredt: `src/app/layout.tsx`, `src/components/HeroSection.tsx` (3 hits). Brain wiki + memory uberørt. (2026-05-15)
- [x] Q3 av pricing-blockers låst — to-nivå sesong (peak uke 27–31 vs shoulder), multiplikator på alt inkl. pakker. PEAK_MULTIPLIER + PEAK_WEEKS-bekreftelse til Finn.no-runden. Se decisions.md (2026-05-12).
