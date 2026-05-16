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

- [x] 2026-05-16 — Domain-expertise content (sopp season, foraging timing, route conditions) drifts from AI scaffolding the same way physical numbers do — but it reads as fluent so it survives review. Primary-source pass against a domain expert (mormor + Liv interview) corrected sopp SESONG from "Juli til første frost (høysesong august–oktober)" → "Sensommer til etter første frost (best i oktober og november)", cascaded to AktiviteterSection (badge, desc, seasons array filter). Quoting the source in the user-facing content ("Mormors råd" callout naming "70+ år") converts the fact from anonymous claim to attributed knowledge. Captured as [[primary-source-correction-of-ai-guessed-domain-facts]].
- [x] 2026-05-16 — When one canonical source (interview transcript, spec doc, design decision) flows to multiple consuming sections, the discipline is: plan per-section extracts in plan.md → edit one file at a time complete-pass → cross-section consistency grep for invariants → single atomic commit. Today's mormor + Liv interview flowed to HistorienSection + SoppBaerSection + AktiviteterSection; the sopp-season text was an invariant that had to match across SoppBaer (SESONG field) and Aktiviteter (Soppsanking desc). Without the consistency grep, the correction could have shipped in one section but been forgotten in the other. Sister to the source-of-truth-numbers derive-don't-restate property — that's the mechanism for numerics; this is the mechanism for prose where derivation isn't possible. Captured as [[single-source-fan-out-with-consistency-check]].

## Hook quirks (by design)
<!-- Behaviours of the `.claude/settings.json` hooks that look like bugs but aren't.
     Each documents what the quirk is, why it's not a bug, and why we're not fixing it.
     A future agent debugging the hook should read this first before re-diagnosing. -->

- **Session-scoped, not repo-scoped.** The hansmyrhytta `PostToolUse` hook fires on **any** `git commit` Bash call in the session, regardless of which repo's working tree is the target. Committing to `~/All Claude/brain` from a hansmyrhytta session still triggers the "spawn code-review" reminder. *Why it's not a bug:* Claude Code loads hooks from the session-start `.claude/settings.json`; it has no model of "this Bash call targets repo X, not repo Y." Filtering by CWD inside the hook would be complex and error-prone, and the exception rule ("skip if docs-only and no `src/` files changed") handles cross-repo commits correctly anyway — verifying no `src/` is changed in *any* repo by the commit is the same check. *Why we're not fixing it:* the false-positive cost is ~one sentence of mental overhead per cross-repo commit, vs the complexity of a path-aware hook. Accept and document.

- **Fires on command intent, not commit success.** PostToolUse hooks fire after the Bash tool runs, regardless of the inner command's exit code. A `git commit` that produces "nothing to commit, working tree clean" still triggers the reminder. *Why it's not a bug:* the hook only sees the tool input (the command string) and tool output (exit code + stdout/stderr); making the regex parse the output for "nothing to commit" would couple the hook to git's text output, which is fragile across git versions and locales. *Why we're not fixing it:* harmless — Claude verifies the actual commit state before deciding whether to run code-review, and a no-op commit is trivially exempt from review.

- **Rare false-positive on `echo "git commit"` and `grep 'git commit' file`.** The current regex `(^|[^[:alnum:]_-])git commit([[:space:]]|$)` matches `git commit` anywhere in a Bash command including inside quoted string literals. *Why it's not a bug:* tightening the regex to "only outside quoted strings" would require a real shell parser, not a regex. Such commands are rare in normal coding workflow (when do you ever `echo "git commit"`?), and the cost of the false-positive is a manual skip of code-review, not a wrong action. *Why we're not fixing it:* the principle from [[test-shape-matches-production-shape]] applies in reverse — even with correct shape matching, semantic false-positives are expected from any regex-based matcher; accept and document rather than chase a parser. The 9-shape pipe-test enumeration that landed in `228e075` is the documented bound: 4 positive shapes match, 4 negative shapes don't, the 1 remaining ambiguity (literal-in-string) is the known cost.
