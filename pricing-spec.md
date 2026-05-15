# Pricing Spec — Hansmyrhytta

Spec for the pricing-redesign that unblocks the first real booking.
**Status: draft for David's review. Do not implement until approved.**

Captures Q1–Q4 decisions (locked in `decisions.md` 2026-05-12 / 2026-05-15), defines the new `pricing.ts` API, data model, form, API, email and admin changes as one implementation bundle.

---

## 1. Goals

1. Fix the langhelg-bug (3-night package overcharges any 3-night stay, regardless of weekday/weekend mix).
2. Land the four locked pricing decisions (cleaning, linen, season multiplier, capacity) as one consistent change set.
3. Keep guest-facing simplicity: at most 4 line items in the breakdown — `base × multiplier`, `sengetøy`, `rengjøring`, optional package discount.
4. Make the model defensible — every constant has a named, documentable source (or a `CALIBRATION_TBD` marker if it doesn't yet).

---

## 2. Locked decisions (one-line recap)

| # | Topic | Decision |
|---|---|---|
| Q1 | Rengjøring | Valgfri: 0 kr selv-vask / 600 kr bestilt. 1 500 kr bot via Vipps post-stay hvis selv-vask ikke holder mål. |
| Q1 | Sengetøy | Valgfri: 0 kr egen / 150 kr per *faktisk brukt* seng (hyttas). |
| Q2 | Minimum | 2 netter hele sesongen (1. juni – 30. sept). Ingen skifte-dag. |
| Q3 | Sesong | To-nivå: peak uke 27–31 × `PEAK_MULTIPLIER`, shoulder ellers. Pakker følger multiplikator. |
| Q4 | Kapasitet | `MAKS_GJESTER = 10` (6 hytte + 4 stabbur). Flat pris, ingen per-gjest-fee. |

Full reasoning + sources in `decisions.md`.

---

## 3. The langhelg-bug fix

**Current bug** ([`src/lib/pricing.ts:32`](src/lib/pricing.ts)): `if (resterendeNetter === 3)` fires the 4 800 kr langhelg-package for *any* 3-night stay. Mon–Thu pays 1 200 kr too much.

**Recommended fix — packages as price-caps, not price-floors.**

For any segment of N nights where a package exists (N ∈ {3, 7}):
```
package_price = min(sum_of_per_night_prices, PRIS_PACKAGE)
```

Why this is the cleanest fix:
- Guest never overpays vs per-night — bug eliminated by construction.
- Package still works as intended in weekend-heavy stays (fre–søn 3 netter caps at 4 800 instead of 5 700 = 900 kr rabatt).
- No definitional debate about "what counts as a langhelg" (Thu–Sun? Fri–Mon? Fri–Sun?).
- Works orthogonally with the season multiplier — both per-night sum and package price get multiplied, the cap relationship is preserved.

**Alternative I considered and rejected** — restrict langhelg to fre–søn only (the original-intent fix). Cleaner naming, but creates a cliff where Thu–Sun (1 hverdag + 2 helg = 5 000 kr) is more expensive than Fri–Mon (3 helg = 4 800 kr) by 200 kr. Bad UX, and re-introduces the definitional debate.

**Decision point for David at review:** confirm price-cap approach, or pick the named-fre–søn alternative.

---

## 4. Constants & types — new `src/lib/pricing.ts`

```ts
// Base per-natt-priser (shoulder season)
const PRIS_HVERDAG = 1200;    // man–tor
const PRIS_HELG    = 1900;    // fre–søn

// Pakke-cap (shoulder season). Per beregningen i §3 brukes som et tak,
// ikke en flat sats. Caps gjelder per "package window" (3 eller 7 netter).
const PRIS_LANGHELG = 4800;   // 3-natt cap
const PRIS_UKE      = 8500;   // 7-natt cap

// Sesong-multiplikator. CALIBRATION_TBD — sannsynlig 1.2–1.4, ankres mot
// Finn.no/Airbnb-listings i Nord-Odal/Sør-Odal/Eidsvoll/Stange.
// Reversal: hvis peak-belegget faller > 20% vs shoulder, vurder å redusere.
const PEAK_MULTIPLIER = 1.30; // CALIBRATION_TBD

// Peak-uker (ISO uke-nummer). Fellesferien + én uke på hver side.
// Verifiser mot Norges offisielle fellesferie-uker for 2026 før implementering.
const PEAK_WEEKS = [27, 28, 29, 30, 31]; // CALIBRATION_TBD (verifisering)

// Rengjøring + sengetøy
const PRIS_RENGJORING = 600;       // 0 hvis vasker selv
const PRIS_SENGETOY_PER_SENG = 150; // per faktisk brukt seng

// Kapasitet (Q4) — eksponert som SOURCE-OF-TRUTH konstant.
// SOURCE-OF-TRUTH: 6 hytte + 4 stabbur, fysisk verifisering pending neste hyttebesøk.
export const MAKS_GJESTER = 10;
export const MAKS_SENGER  = 10; // 1:1 med MAKS_GJESTER; bekreft ved hyttebesøk hvis split nødvendig

// Sesong-vindu (kalender)
export const SESONG_START = "06-01"; // 1. juni
export const SESONG_SLUTT = "09-30"; // 30. sept

// Minimumsopphold
export const MIN_NETTER = 2;
```

**Reversal-path comments** (per [[reversal-path-in-code]]):
- `PEAK_MULTIPLIER`: comment names what would justify changing it (peak-belegg vs shoulder gap).
- `PEAK_WEEKS`: comment names the verification source (Norges offisielle fellesferie).
- `MAKS_GJESTER`: comment names the physical-verification commitment.

---

## 5. Algorithm — new `beregnPris()` signature

```ts
type PrisInput = {
  innsjekk: string;          // YYYY-MM-DD
  utsjekk: string;           // YYYY-MM-DD
  vaskerSelv: boolean;       // true = 0 kr; false = +600 kr
  tarMedSengetoy: boolean;   // true = 0 kr
  antallSengerSengetoy: number; // 0 if tarMedSengetoy=true; else 1–10
};

type PriceBreakdown = {
  netter: number;
  total: number;
  lines: { label: string; amount: number }[];
  validation: { ok: boolean; errors: string[] }; // see §11
};

export function beregnPris(input: PrisInput): PriceBreakdown;
```

**Algorithm sketch:**

1. **Validate** input (see §11). If invalid, return `{ total: 0, validation: { ok: false, errors } }`.
2. **Compute night sequence.** Walk `innsjekk` → `utsjekk - 1`, emit one `{ date, isWeekend, isPeak }` per night.
   - `isWeekend = dag ∈ {fre=5, lør=6, søn=0}` (preserved from current code).
   - `isPeak = ISO-uke(date) ∈ PEAK_WEEKS`.
3. **Compute per-night base sum.**
   - Sum: `Σ (isWeekend ? PRIS_HELG : PRIS_HVERDAG)`.
4. **Apply package caps.** For full uker (7 netter), cap at `PRIS_UKE`. For 3-natt-segmenter, cap at `PRIS_LANGHELG`. Caps apply to consecutive-night windows; algorithm picks the optimal partitioning (greedy from longest-pakke-first is sufficient — see §5a).
5. **Apply season multiplier.** If *any* night in the booking falls in `PEAK_WEEKS`, multiply the base+pakke sum by `PEAK_MULTIPLIER`. (Decision: multiplier applies *per booking*, not per night — simpler explanation in email, slight bias toward "if any peak night, the whole stay is peak". See §5b.)
6. **Add rengjøring** if `vaskerSelv = false`: `+PRIS_RENGJORING`.
7. **Add sengetøy** if `tarMedSengetoy = false`: `+antallSengerSengetoy × PRIS_SENGETOY_PER_SENG`.
8. **Build `lines[]`** with display labels (see §5c for examples).
9. **Return.**

### 5a. Pakke-partisjonering

Greedy from longest:
1. `heleUker = floor(netter / 7)`, `rest = netter % 7`. Apply `heleUker × PRIS_UKE` cap.
2. If `rest === 3`, apply `PRIS_LANGHELG` cap on those 3 nights.
3. If `rest ∈ {1, 2}`, per-night only.
4. If `rest ∈ {4, 5, 6}`, per-night only (no 4–6-natt pakke exists).

**Edge case:** for `rest = 6`, per-night may exceed `PRIS_UKE`. Acceptable — guest can choose to book 7 netter for the uke-pakken if they want the discount. Not our job to upsell.

**Tip for review:** I considered DP-optimal partitioning but rejected — adds complexity without meaningful benefit at these constant values. If David wants to revisit, the function is small enough to swap.

### 5b. Mixed peak/shoulder stays

A booking straddling a peak boundary (e.g. starts uke 26, ends uke 27) currently gets multiplied as a whole. Alternative: per-night multiplier ("the night IS peak or not"). Decision for David at review:
- **Whole-booking** (recommended): simpler email explanation, slight rounding bias toward peak when boundary-crossing.
- **Per-night**: more "fair", but creates weird email lines like "3 netter × 1900 + 2 netter × 1900 × 1.3".

### 5c. Example breakdowns

**Example 1 — Mon-Wed (2 hverdag) in shoulder, no extras:**
```
2 hverdager × 1 200 kr  →  2 400 kr
─────────────────────────────────────
Totalt:                    2 400 kr
```

**Example 2 — Fri–Mon (3 helg) in shoulder, sengetøy fra hytta (4 senger), bestiller rengjøring:**
```
3 helgenetter × 1 900 kr (pakke-cap)  →  4 800 kr
Sengetøy (4 senger × 150 kr)          →    600 kr
Rengjøring                            →    600 kr
──────────────────────────────────────────────────
Totalt:                                   6 000 kr
```

**Example 3 — Mon–Wed (3 hverdag) in shoulder, no extras (the bug case):**
```
3 hverdager × 1 200 kr  →  3 600 kr   ← old code would have charged 4 800
─────────────────────────────────────
Totalt:                    3 600 kr
```

**Example 4 — 1 uke (lør-lør) i peak (uke 28), egen sengetøy, selv-vask:**
```
1 uke (7 netter, pakke-cap)  →  8 500 kr
Sesong-tillegg (peak)        →  +2 550 kr   ← PEAK_MULTIPLIER × base = 11 050; difference shown as line
──────────────────────────────────────────
Totalt:                          11 050 kr
```

(Alternative display: show multiplier inline, e.g. "1 uke i peak (8 500 × 1.30) → 11 050 kr". Decision for David at review — single-line is denser, two-line is more explicit. I lean two-line for transparency.)

---

## 6. Data model — `src/lib/redis.ts`

New fields on both `PendingBooking` and `BookingRecord`:

```ts
type PendingBooking = {
  // ... existing fields ...

  // Q1 — sengetøy
  tarMedSengetoy: boolean;
  antallSengerSengetoy: number; // 0 hvis tarMedSengetoy=true

  // Q1 — rengjøring
  vaskerSelv: boolean;          // true = selv-vask; false = bestilt 600 kr

  // Q4 — eksplisitt gjestetall (allerede i form, men bekreft type)
  antallGjester: number;        // 1–MAKS_GJESTER
};

type BookingRecord = {
  // ... existing fields, including alt fra PendingBooking ...

  // Post-checkout admin-felt (Q1)
  botFakturert: boolean;        // 1 500 kr selv-vask-bot via Vipps
  botFakturertDato?: string;    // ISO date, optional
  inspeksjonsNotat?: string;    // free text, optional
};
```

**Migration note:** Redis stores JSON blobs (no schema migrations). Existing bookings will be read with `?? undefined` defaults — handled in the read path, not via data migration. Code defensively reads with nullish-coalescing fallbacks (per [[env-var-prefix-aliasing]] discipline — same pattern, different domain).

---

## 7. Form — `src/components/BookingSection.tsx`

**New fields to add to the form (in this order, after dates and guest count):**

1. **Antall gjester** (existing — verify max validation = `MAKS_GJESTER`).

2. **Sengetøy** — radio group:
   - ☐ Jeg tar med eget sengetøy (0 kr)
   - ☐ Jeg ønsker sengetøy fra hytta (150 kr per seng)

3. **Antall senger med sengetøy** — numeric input, *kun synlig hvis ovenstående = "hyttas"*. Min 1, max `MAKS_SENGER`. Default = `antallGjester` (most common case = 1 bed per guest).

4. **Rengjøring** — radio group:
   - ☐ Jeg vasker selv (sjekkliste følger i bekreftelsen, 0 kr)
   - ☐ Bestill rengjøring (600 kr)

5. **Vilkår-checkbox** *(NEW)*:
   - ☐ "Jeg godtar at hvis jeg velger selv-vask og hytta ikke er rengjort etter sjekkliste, faktureres 1 500 kr via Vipps for innkalt vask. Inspisert ved utsjekk."

   Required to submit. Stores `vilkaarGodtatt: true` on `PendingBooking`.

**Live price estimation:** already exists, must update when any of the new fields change.

**Form-submission validation:** see §11.

---

## 8. API endpoints

### `POST /api/booking` ([`src/app/api/booking/route.ts`](src/app/api/booking/route.ts))

Changes:
- Parse new fields from body (`tarMedSengetoy`, `antallSengerSengetoy`, `vaskerSelv`, `antallGjester`, `vilkaarGodtatt`).
- Validate `vilkaarGodtatt === true` — reject 400 if false.
- Validate `antallGjester` between 1 and `MAKS_GJESTER`.
- Validate `antallSengerSengetoy` between 0 and `MAKS_SENGER`, and consistency with `tarMedSengetoy`.
- Pass full input to `beregnPris()`; store full breakdown in Redis pending entry.
- Email to David includes new fields in the "godkjenn booking" preview (sengetøy/rengjøring choices, antall senger).

### `GET /api/approve-booking` ([`src/app/api/approve-booking/route.ts`](src/app/api/approve-booking/route.ts))

Changes:
- Confirmation email to guest:
  - Itemised breakdown matching §5c examples.
  - Sjekkliste-section if `vaskerSelv = true` (see §9).
  - Vilkår-recap mentioning the 1 500 kr bot (already accepted at booking, but visible in confirmation as reference).
- `BookingRecord` initialised with `botFakturert: false`.

### `GET /api/admin/bookings` + `POST /api/admin/mark-paid`

Read path returns the new fields. Mark-paid endpoint unchanged.

### NEW: `POST /api/admin/mark-bot-charged` *(optional, can be inline in mark-paid)*

Toggles `botFakturert` + sets `botFakturertDato`. Could share endpoint with mark-paid (e.g. `?field=botFakturert` query param) — David's call on review.

---

## 9. Email templates

**Approval-request email (to David):** add a "Tillegg" section showing sengetøy/rengjøring choices and bed count.

**Confirmation email (to guest):**

1. **Bekreftelse-header** — booking dates, guest count.
2. **Pris-spesifikasjon** — line-by-line from `beregnPris()`. Format: label + right-aligned amount, total at bottom.
3. **Vipps-instruksjon** — payment to +47 948 42 174 (existing).
4. **Sjekkliste-seksjon (conditional)** — only if `vaskerSelv = true`:

   > **Sjekkliste — slik leverer du hytta ren**
   > Vi har lagt sjekklisten på kjøkkenbenken også. Hvis hytta ikke er klargjort etter denne listen, faktureres 1 500 kr via Vipps for innkalt vask (vilkår godtatt ved booking).
   >
   > - Oppvask gjort og satt på plass
   > - Kjøkkenbenker, bord og gass tørket av
   > - Gulv kostet
   > - Toalett tømt og rengjort
   > - Søppel tatt med til Nord-Odal gjenvinningsstasjon (Fv 209)
   > - Sengetøy (hvis brukt fra hytta) lagt sammen
   > - Personlige eiendeler tatt med

5. **Vilkår-paragraf (alltid)** — 2-3 setninger om ankomst-/avreise-tid, 23:00 stille-tid, 18+ aldersgrense, og selv-vask-bot-mekanismen.

**Email-rendering reminder** (per [[gmail-inline-styles]]): cards/surfaces need both `style` + `bgcolor`. Existing templates already follow this pattern — preserve.

---

## 10. Admin — `/admin` page

New columns on the booking table:
- **Sengetøy** (✓/✗ + bed count if hyttas)
- **Rengjøring** (Selv / Bestilt)
- **Bot fakturert** (✓/✗ + date if true) — toggle button

**CSV export** ([[csv-export-as-accounting-bridge]]): add columns for `tarMedSengetoy`, `antallSengerSengetoy`, `vaskerSelv`, `botFakturert`, `botFakturertDato`, `inspeksjonsNotat`. Column order in spec'd appendix below.

---

## 11. Validation rules

Server-side validation in `/api/booking`:

| Rule | Error message (Norwegian) |
|---|---|
| `netter >= MIN_NETTER` (2) | "Minimumsopphold er 2 netter." |
| `1 <= antallGjester <= MAKS_GJESTER` (10) | "Antall gjester må være mellom 1 og 10." |
| `tarMedSengetoy = true` → `antallSengerSengetoy = 0` | "Antall senger med sengetøy skal være 0 når du tar med eget." |
| `tarMedSengetoy = false` → `1 <= antallSengerSengetoy <= MAKS_SENGER` | "Velg antall senger som trenger sengetøy (1–10)." |
| `vilkaarGodtatt = true` | "Du må godta vilkårene for å bestille." |
| Sesong-vindu: `innsjekk` og `utsjekk` mellom 1. juni og 30. sept (samme år) | "Vi leier ut 1. juni – 30. september." |
| Ingen overlapp med eksisterende `booked-ranges` | "Disse datoene er allerede opptatt." |

Client-side mirrors these for UX, but server is the authority.

---

## 12. Implementation phases (rollout order)

To minimize the size of any single PR:

1. **Phase 1 — pure pricing.ts refactor.** Rewrite `beregnPris()` with the new signature and bug fix. Add unit tests covering §5c examples + edge cases (Mon-Wed, Fri-Mon, peak-boundary, 8-night stay = uke + 1, etc.). No UI changes yet. Mergeable independently.

2. **Phase 2 — data model.** Add new fields to `redis.ts`. Defensive read paths with `?? undefined`. No UI changes yet. Mergeable independently.

3. **Phase 3 — form + API.** Update `BookingSection.tsx`, `/api/booking`, `/api/approve-booking`. Email templates updated. Mergeable as one (form and API are coupled).

4. **Phase 4 — admin + CSV.** New columns, mark-bot-charged endpoint, CSV columns. Mergeable independently.

5. **Phase 5 — calibration.** 30-min Finn.no/Airbnb anchoring run. Lock `PEAK_MULTIPLIER` to final value. Update comment from `CALIBRATION_TBD` to source link.

6. **Phase 6 — end-to-end test booking.** David books a real test against the live site (with refund). Sanity-check email rendering across Gmail desktop/Gmail iOS/Outlook.

Each phase produces 1–2 commits. Code-review runs after each.

---

## 13. CALIBRATION_TBD checklist (Phase 5 prep)

Things to lock before Phase 3 ships:

- [ ] `PEAK_MULTIPLIER` — anchored against 5–10 Finn.no/Airbnb listings for cabins in Nord-Odal, Sør-Odal, Eidsvoll, Stange. Compute median peak/shoulder ratio. Document source in comment.
- [ ] `PEAK_WEEKS = [27, 28, 29, 30, 31]` — verify against Norges offisielle fellesferie-uker for 2026. Source: skatteetaten.no or NHO ferieliste.
- [ ] `MAKS_GJESTER = 10` distribution (6 hytte + 4 stabbur) — physically verify on next cabin visit. Update `// SOURCE-OF-TRUTH:` comment with verification date.
- [ ] Renus Vinger backup-cleaner — confirm 1 500 kr is realistic against current 2026 rates. Phone or email Renus before launch.

---

## 14. Out of scope / deliberately deferred

- **Automated Vipps payment.** Manual only — explicit project rule (`AGENTS.md`).
- **Per-guest fee or capacity-based pricing.** Locked flat for 2026; re-evaluate before 2027 if data justifies.
- **Skifte-dag-regel.** Locked off for 2026; re-evaluate before 2027.
- **3-night minimum in peak.** Locked at 2-night minimum for 2026; revisit for 2027.
- **Who-cleans operational details (Spor D).** First-season = David vasker selv. Backup = Renus Vinger. Lives in `apningsplan.md` Spor D, not this spec.
- **Bot-prosedyre UX.** Inspection workflow, photo-evidence storage, dispute handling — not spec'd here. First-pass: David inspects manually, decides, marks via admin. Refine after first incident if any.
- **Multi-year support.** Constants assume 2026. Year-roll handling (e.g. `PEAK_WEEKS` for 2027 vs 2026) deferred to Phase 5 of next season's prep.

---

## 15. Decisions David should pick at review

These need your explicit ✓ or alternative before implementation starts:

1. **Langhelg-fix design (§3)** — price-cap (recommended) vs named-fre–søn-restriction.
2. **Mixed peak/shoulder stays (§5b)** — whole-booking multiplier (recommended) vs per-night.
3. **Multi-line vs single-line peak display (§5c Example 4)** — explicit sesong-tillegg line (recommended) vs inline `× 1.30`.
4. **Mark-bot-charged endpoint (§8)** — separate endpoint vs query-param on mark-paid.
5. **CSV column order** — append new columns at end (recommended, doesn't break existing bookkeeper workflow) vs insert in logical position.

Anything I missed, or want to push back on?

---

## Appendix — CSV column order

Existing (verify against current code):
`booking_id, navn, epost, telefon, innsjekk, utsjekk, antall_netter, antall_gjester, total_kr, betalt, opprettet`

New (appended):
`tar_med_sengetoy, antall_senger_sengetoy, sengetoy_kr, vasker_selv, rengjoring_kr, bot_fakturert, bot_fakturert_dato, inspeksjons_notat`
