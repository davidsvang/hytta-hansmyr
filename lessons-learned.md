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
- [x] 2026-05-15 — Source-of-truth numbers (sleeping capacity, dimensions, physical dates, address coordinates) must be verified at the source (physical, official) before they propagate. A wrong "9 soveplasser" estimate landed in `src/app/layout.tsx` meta description, `src/components/HeroSection.tsx` (stat block + body copy + green-strip feature list) — 4 hits across 2 files in the repo alone. Once a number lives in N files, every correction is a project-wide grep + replace + commit. Mitigation: when capturing a source-of-truth number for the first time, mark it `// SOURCE-OF-TRUTH: verified physically YYYY-MM-DD` at the canonical definition site, and reference that constant from all other usages rather than re-stating the number. Worth promoting to a brain lesson.
- [x] 2026-05-15 — Pipe-tests of regex/matcher logic in hooks (or anywhere) must use the *actual* command shapes produced in production, not simplified standalone forms. The PostToolUse hook regex `^[[:space:]]*git[[:space:]]+commit` was pipe-tested against `git commit -m test` (passed) and deployed. The real shape produced by Claude Code's Bash tool is compound: `cd "/path" && git add -A && git commit -m "..."` — does NOT start with `git`, so the anchor failed. Two commits shipped silently without hook firing (`02ea2ae`, the capacity-Round-2 fix; possibly `cc93c52` before that). Fix: regex broadened to `(^|[^[:alnum:]_-])git commit([[:space:]]|$)` matching at any command boundary; commit `228e075` itself served as the verification — hook fired on the compound shape this time. Captured as brain lesson [[test-shape-matches-production-shape]] (sister to [[synthetic-llm-tests-need-batch]], LLM-domain instance of the same shape).
- [x] 2026-05-15 — Hypothesis-as-diagnosis without verification carries a cost. I told David the hook didn't fire because of "worktree binding" — that was a guess, not a verified diagnosis. He planned his next-task framing around moving hooks to user-level scope, which would have been wrong work. Re-testing the hypothesis (does Hook 2 also miss? — no, Hook 2 fires on this session's prompts) immediately would have revealed the binding was fine and the bug was elsewhere. Discipline: when surfacing a "likely cause" to the user, mark it as a hypothesis (not a diagnosis) until at least one orthogonal piece of evidence confirms it, or run the verification step before naming the cause. Captured as a new "Validated incidents" bullet on [[plan-first-verify-correct]].

## Tool
<!-- Specific tools and libraries: what they're good for, what they're not, version-specific notes. -->
