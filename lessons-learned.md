# Lessons Learned — Hansmyrhytta

Transferable learnings from this project. Synced to the brain vault at `~/All Claude/brain` via `/sync-to-wiki`.

## How this works

- Add an entry under whichever section fits as a lesson emerges.
- Each entry starts with a sync marker:
  - `[ ]` — not yet synced to the wiki
  - `[x]` — already synced (don't edit; add a fresh entry if the lesson evolves)
- Run `/sync-to-wiki` to push unsynced entries. Claude updates the brain and flips the markers.
- Entry format: `- [ ] yyyy-mm-dd — Short summary. Detail.`

## Technical
<!-- API gotchas, library quirks, performance findings, architecture decisions and the why. -->

## Process
<!-- Planning patterns, debugging approaches, discipline rules, what to do/not do. -->

- [ ] 2026-05-12 — CLAUDE.md is a pointer file (`@AGENTS.md` + `WIKI_PATH`), must stay ≤ 5 lines forever. All project content goes to AGENTS.md. If they start fighting, the rule was broken.
- [ ] 2026-05-15 — Source-of-truth numbers (sleeping capacity, dimensions, physical dates, address coordinates) must be verified at the source (physical, official) before they propagate. A wrong "9 soveplasser" estimate landed in `src/app/layout.tsx` meta description, `src/components/HeroSection.tsx` (stat block + body copy + green-strip feature list) — 4 hits across 2 files in the repo alone. Once a number lives in N files, every correction is a project-wide grep + replace + commit. Mitigation: when capturing a source-of-truth number for the first time, mark it `// SOURCE-OF-TRUTH: verified physically YYYY-MM-DD` at the canonical definition site, and reference that constant from all other usages rather than re-stating the number. Worth promoting to a brain lesson.

## Tool
<!-- Specific tools and libraries: what they're good for, what they're not, version-specific notes. -->
