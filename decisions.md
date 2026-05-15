# Decisions

Record important choices here so you never re-debate them.
Claude should add to this whenever a meaningful decision is made during a session.

## Format
Each entry follows this pattern:
- **What:** The decision in one line
- **Why:** The reasoning (so future-you remembers the logic)
- **Date:** When it was decided
- **Wiki:** Link to related wiki page if one exists (optional)

---

## Architecture & Tech Choices


## Patterns & Conventions

### Pricing — Rengjøring og sengetøy (Q1 av 4 pricing-blockers)

- **What:** Valgfri rengjøring (0 kr selv-vask / 600 kr bestilt) + valgfri sengetøy (0 kr egen / 150 kr per seng faktisk brukt). Etterfaktura-bot 1 500 kr via Vipps hvis "selv-vask" ikke holder mål.
  **Why:**
    - Norsk hyttetradisjon — gjest forventer valget, ikke tvungen fee.
    - 600 kr ≈ 10 % av typisk booking — lavt nok til å være attraktivt, høyt nok til å være verdt Davids tid.
    - 150 kr/seng = bransjestandard for sengetøy-utleie i Norge (50–180 kr/sett).
    - 1 500 kr bot ≈ realistisk innkall-pris for ekstern vask (kalibrert mot Renus Vinger, Kongsvinger).
    - Sjekkliste (oppvask, benker, gulv, toalett, søppel til Nord-Odal gjenvinningsstasjon Fv 209, sengetøy, personlige eiendeler) sendes i bekreftelsesmail + henges i hytta. Vilkår om 1 500 kr bot aksepteres som del av booking-bekreftelsen.
  **Date:** 2026-05-12
  **Sources:**
    - Sengetøy-prising: hytteservice-risor.no, vaskesmart.no
    - Backup-vask: Renus Vinger (Kongsvinger, dekker Nord-Odal) — pris-referanse for bot-størrelse
  **Spor D-avhengighet:** David vasker selv første sesong (2026). Hvis det blir for mye, eskalér til Renus Vinger. Ny vurdering før sesong 2027.
  **Wiki:** [[hansmyrhytta]] (project page) · [[anchor-thresholds-to-external-research]] (sengetøy + bot tall anchored til ekstern referanse, ikke intuisjon)


### Pricing — Sesongvariasjon (Q3 av 4 pricing-blockers)

- **What:** To-nivå sesong-modell. Peak = uke 27–31 (fellesferien + én uke på hver side); resten av sesongen (1. juni – 30. sept utenfor disse ukene) = shoulder. Én `PEAK_MULTIPLIER` ganger alle priser, inkl. langhelg- og uke-pakker.
  **Why:**
    - Juli er kanonisk dyrere i norsk hytteutleie — markedet forventer det, flat pricing etterlater margin på bordet.
    - Tre nivåer er overkill for første sesong uten data til å kalibrere midt-sjiktet.
    - Pakker følger multiplikatoren (ikke flate) — flate pakker ville skapt rabatt-skjevhet (alle ville valgt uke-pakken i juli); "pakker forsvinner i peak" er forvirrende å forklare; konsistent multiplikator er reneste reglen.
    - Uke-numre, ikke datoer — fanger fellesferien presist år for år; datoer drifter.
  **CALIBRATION_TBD:**
    - `PEAK_MULTIPLIER` — sannsynlig 1.2–1.4 basert på norsk hyttemarked, ankres mot Finn.no/Airbnb-listings i Nord-Odal/Sør-Odal/Eidsvoll/Stange-området (30-min kalibreringsrunde før implementering).
    - `PEAK_WEEKS = [27, 28, 29, 30, 31]` — låst som intervall; verifiser mot Norges offisielle fellesferie-uker for 2026 før implementering.
  **Date:** 2026-05-15
  **Wiki:** [[hansmyrhytta]] · [[anchor-thresholds-to-external-research]]

### Pricing — Kapasitet (Q4 av 4 pricing-blockers)

- **What:** `MAKS_GJESTER = 10` (6 i hovedhytte + 4 i stabbur). Flat pris for full kapasitet — ingen per-gjest-fee, ingen base/max-split.
  **Why:**
    - Hytta er "én enhet" — gjester leier stedet, ikke en seng. Matcher norsk hytte-norm.
    - 4-måneders sesong + førstegangs-vert → hver pricing-dimensjon er friksjon ved booking og support; per-gjest-fee tvinger gjest til å forutsi gruppestørrelse og korrigere midt i prosessen. Ikke verdt marginal revenue.
    - Reviews og bookinger > margin-optimalisering i 2026. Flat pricing minimerer friksjon.
    - Full fysisk kapasitet (ikke lavere soft cap) — eksisterende policy-ankere (18+ aldersgrense, 23:00 stille-tid, husregler) er enforcement-mekanismen mot "party house"-bekymringer, ikke prising.
  **Re-evaluering:** Sesong 2026→2027. Hvis gruppe-størrelse-fordelingen rettferdiggjør differensiering, vurder per-gjest-modell for 2027.
  **Distribusjon:** 6 hytte + 4 stabbur — eksakt fordeling verifiseres fysisk ved neste hyttebesøk; 10 totalt er låst.
  **Korreksjon:** Tidligere tall "9 soveplasser" var feil estimat. Stabbur har 4 plasser, ikke det som ble antatt. Korrigert prosjekt-bredt 2026-05-15 (commit fix: correct sleeping capacity from 9 to 10).
  **Date:** 2026-05-15
  **Wiki:** [[hansmyrhytta]]

### Pricing — Minimumsopphold (Q2 av 4 pricing-blockers)

- **What:** 2 netter minimum hele sesongen (1. juni – 30. sept). Ingen skifte-dag-regel. Vurder å skjerpe til 3 netter i juli for 2027-sesongen basert på 2026-erfaring.
  **Why:**
    - Off-grid-snuoperasjon (vedfylling, generator-sjekk, vannpumpe-priming, vask) er ~lik per booking uansett opphold-lengde — minimum-stay reduserer ikke arbeidet per booking, kun antall bookinger.
    - Førstegangs-utleier uten reviews kan ikke avvise helge-bookinger (fre–søn = 2 netter) som er naturlig inngang for nye gjester.
    - 1-natts ekskluderes (mest support-arbeid per krone), men 2-natts holder døren åpen for impulse-booking.
    - Skifte-dag-regel droppet første sesong — for mye stivhet for nytt produkt uten review-historikk.
  **Date:** 2026-05-12
  **Re-evaluering:** Sesong-skiftet 2026→2027. Hvis 2-natts-bookinger i juli dominerer kalenderen og blokkerer uke-bookinger, skjerp til 3 netter i toppsesong.
  **Wiki:** [[hansmyrhytta]]


### Pricing — Sesongvariasjon (Q3 av 4 pricing-blockers)

- **What:** To-nivå sesong-modell. **Peak** = ukenumre 27–31 (fellesferien + én uke før og etter). **Shoulder** = resten av sesongen (1. juni – 30. sept utenfor peak-uker). Multiplikator `PEAK_MULTIPLIER` (CALIBRATION_TBD, sannsynlig 1.2–1.4) påført alle priser inkl. pakker.
  **Why:**
    - Juli er kanonisk dyrere i norsk hytteutleie — flat prising etterlater margin på bordet.
    - Tre nivåer er overkill første sesong uten kalibreringsdata for mid-tier.
    - Pakker (langhelg + uke) følger samme multiplikator → unngår discount-skew (alle ville valgt uke-pakken i juli ved flat pakke-pris).
    - "Pakker forsvinner i peak" er forvirrende å forklare gjest. Konsistent multiplikator er ryddigst.
    - Ukenumre fanger fellesferien presist år for år; kalenderdatoer drifter.
  **Date:** 2026-05-12
  **CALIBRATION_TBD:**
    - `PEAK_MULTIPLIER` — eksakt verdi venter på Finn.no-runden (Nord-Odal / Sør-Odal / Eidsvoll / Stange-sammenlignbare). Range-estimat 1.2–1.4.
    - `PEAK_WEEKS` — låst som interval (27–31), men verifiser mot Norges offisielle fellesferie-uker for 2026 før implementering.
  **Wiki:** [[hansmyrhytta]] · [[anchor-thresholds-to-external-research]]


## Things We Tried and Rejected
