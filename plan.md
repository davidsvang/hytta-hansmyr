# Plan — Mormor + Liv interview content integration (2026-05-16)

## Source

Mormor + Liv interview transcript processed by David. Three content updates locked, ready to ship as one commit. Push directly to main, Vercel auto-deploy.

## Files to touch (in order)

1. `src/components/HistorienSection.tsx` — full restructure (5-part narrative)
2. `src/components/SoppBaerSection.tsx` — sopp sesong update + new "Mormors råd" callout
3. `src/components/AktiviteterSection.tsx` — soppsanking card update + new "Bekken på forsiden" card

One pass per file, no jumping back and forth.

## Detailed changes

### 1. HistorienSection.tsx — full restructure

**Layout:** Hero image on top → centered section-title block → single-column narrative → stats footer.
- Image: `mormor-på-verandaen-forsiden.jpeg` at `max-w-2xl mx-auto aspect-[3/4]` (centered story-portrait)
- Section title block: keep eyebrow "Historien" + h2 "En hytte med sjel" (still fits the new tone)
- Narrative: `max-w-3xl mx-auto` single column, 5 subsections each with h3 heading (`font-playfair text-2xl md:text-3xl text-[#2C2A1E]`) + body paragraphs (existing `text-[#5F5E5A] font-lato font-light text-base leading-relaxed` style)
- Stats footer: keep 1854 / 4+ / 170 — all still accurate. Centered with `flex gap-12 justify-center`.

**Content (5 subsections, David-locked text):**
1. "1854, det første tømmeret" — Hans Myra origin theory, Hansmyra place name
2. "1954, familien tar over" — oldefar from Solør, Rasta-advokat-kontrakt, konsesjon 2 mål, stabbur flytting
3. "Låven som ikke finnes" — låven gone, but its tømmer lives on (under hytta, veranda, snekkerbod by stefar Trond)
4. "Veien som ikke fantes" — 1970s road, before that buss + drosje/walk; mormor 14 år gammel
5. "Hytta i dag" — original 1854 tømmer, sommerhytte by choice, opening to guests

**Removes:** three `placeholder-amber` spans + one dashed-border placeholder block — all gone.

### 2. SoppBaerSection.tsx — two changes

**Change A — Sopp card SESONG field (line 61):**
- Old: "Juli til første frost (høysesong august–oktober)"
- New: "Sensommer til etter første frost (best i oktober og november)"

**Change B — New "Mormors råd" callout, placed BETWEEN fact cards and bilder grid:**
- Style: `bg-white` card with `border border-[#3B5E2B]/20` and `rounded-sm`, slightly different from Allemannsretten (which uses `bg-[#EAF3DE]`) so the two callouts don't visually clash
- Title: "Mormors råd" in h3 with eyebrow-style accent
- Body: David's locked 2-paragraph text about mormor + Liv's 70+ years of plukking, sensesong timing, frosset-sopp-equally-good

### 3. AktiviteterSection.tsx — two changes

**Change A — Soppsanking card (lines 47-54):**
- Tag/badge: "Aug – okt" → "Okt – nov"
- Description: "Juli til første frost. Høysesong august–oktober" → "Sensommer til etter første frost. Best i oktober og november"
- Seasons array: `["Høst", "Sommer"]` → `["Høst"]` (badge says OKT-NOV; keeping Sommer in the filter would be inconsistent — user filtering "Sommer" shouldn't see a card badged as autumn)

**Change B — New "Bekken på forsiden" card:**
- Icon: 🐸
- Title: "Bekken på forsiden"
- Distance: "100 m fra hytta" (matches existing distance-label style — display as the `distance` field which renders in label-caps via the component)
- Description: "Liten skogsbekk. Mest for småbarn som vil finne kryp og dyppe føttene. Vannstanden varierer."
- Seasons: `["Sommer"]`
- No badge (consistent with most other on-tomten cards that lack one)
- **Placement in array:** between "Blåbær på tomten" (på tomten) and "Soppsanking" (i skogen rundt). Natural distance progression: 0m → 100m → in the forest.

## Consistency check (before commit)

After all edits, run:
```
grep -nE "(Sensommer|første frost|oktober og november|Aug – okt|Okt – nov|Høysesong)" src/components/SoppBaerSection.tsx src/components/AktiviteterSection.tsx
```
Expectation:
- SoppBaerSection sopp card SESONG: "Sensommer til etter første frost (best i oktober og november)"
- AktiviteterSection Soppsanking card desc: "Sensommer til etter første frost. Best i oktober og november"
- AktiviteterSection Soppsanking badge: "Okt – nov"
- No remaining "Aug – okt" or "Høysesong august–oktober" anywhere

## Commit

Single commit. Message: `content: integrate mormor + Liv interview — historien, sopp-bær, aktiviteter`

Code-review hook will fire on the commit (per the regex fix in `228e075`). I'll spawn the code-review subagent in the foreground since this is substantial content + structure work, not a one-line config tweak.

## Verification post-deploy

Curl `https://hansmyr.no/` after Vercel deploy:
- HistorienSection: 5 h3 headings visible ("1854, det første tømmeret", etc.); no placeholder-amber spans
- SoppBaerSection: sopp card sesong text shows "Sensommer til etter første frost (best i oktober og november)"; "Mormors råd" block present
- AktiviteterSection: Soppsanking card shows "Okt – nov" badge + sensommer text; new Bekken card present
- Cross-section consistency: sopp season strings match between Sopp & Bær and Aktiviteter
