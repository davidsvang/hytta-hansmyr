# Tasks

## To Do
# Priority: 🔴 must do  🟡 should do  🟢 nice to have


## In Progress
# Claude moves tasks here when starting them


## Blocked
# Tasks waiting on something (a decision, external info, another task finishing)

- 🔴 **Implementere pricing-spec + rengjøring/sengetøy-bundle** — blokkert på: David's review av `pricing-spec.md` (5 §15 design-valg) + Finn.no-kalibrering (PEAK_MULTIPLIER + fellesferie-uker). Multi-fil bundle, må spec-es som én pakke:
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
- [x] Kapasitet Round 2 — HyttenSection bed-count (3→4) + total badge (literal 9 → derived `sleepingRooms.reduce`) + BookingSection dropdown wired to ny `MAKS_GJESTER` konstant. Commit `02ea2ae` 2026-05-15.
- [x] Hook regex-fiks — PostToolUse Hook 1 broadened til å matche `cd "/path" && git commit` compound shell-shape. Commit `228e075` 2026-05-15. Verifisert firing på samme commit.
- [x] Hook quirks dokumentert permanent i lessons-learned.md (session-scoped, fires-on-intent, false-positive-on-echo). Commit `0c9f6bc` 2026-05-15.
- [x] Mormor + Liv interview integrert prosjekt-bredt — HistorienSection 5-delt narrativ erstatter 3 placeholder-amber slots; SoppBaerSection sopp-SESONG primær-kilde-korrigert + "Mormors råd" callout; AktiviteterSection Soppsanking-oppdatering + ny "Bekken på forsiden" card. Commit `f094294` 2026-05-16. Grandmother-stories open thread i brain wiki lukket.
- [x] Pricing-redesign Q1–Q4 + full implementation spec drafted (`pricing-spec.md`). Awaiting David's 5 §15 design-valg før implementering. (2026-05-15)
