# AGENTS.md

Metadata for AI coding agents working on this repository. Human-facing docs (Norwegian) live in user-memory and on the live site at hansmyr.no.

## What this project is

A vacation-rental website for a single family-owned cabin at Hansmyr (Norway). Built on Next.js 14 (App Router) + TypeScript + Tailwind, deployed on Vercel at hansmyr.no.

**Why this exists:** Familieeid hytte siden 1854, David (22 år) åpner for utleie i 2026 for første gang. *(Family-owned cabin since 1854; David, age 22, opens it for rental in 2026 for the first time.)*

The user-facing site is in Norwegian. Code, comments, and AI-agent docs (this file) are in English.

## Architecture

### Booking flow — the load-bearing data path

1. Guest fills out form in `src/components/BookingSection.tsx` → POSTs to `/api/booking`.
2. API generates a UUID token, stores the pending booking in Upstash Redis under `pending:<token>` with 30-day TTL, and emails David via Resend with a "Godkjenn booking" button linking to `/api/approve-booking?token=<token>`.
3. David clicks the approval link → API reads the pending booking, appends to two Redis keys (`booked-ranges` for calendar display, `booking-records` for the admin/accounting view), deletes the pending entry, and sends the guest a confirmation email with the itemized price and Vipps payment instructions.
4. Admin dashboard at `/admin` (password-protected via `ADMIN_PASSWORD`) reads `booking-records`, lets David toggle paid/unpaid status, and exports CSV for tax accounting.

### Vipps payment is manual

Payment is **not automated**. The confirmation email tells the guest to send Vipps to David's personal number `+47 948 42 174`. David manually marks each booking as paid in `/admin` after the Vipps notification arrives. Do not try to wire up Stripe, Vipps Checkout, or any automated payment integration without explicit instruction — manual is intentional (reflects David's current situation as a private person, not an AS).

### Key files

- `src/components/BookingSection.tsx` — booking form with live price estimation
- `src/app/api/booking/route.ts` — submission endpoint (Resend + Redis pending)
- `src/app/api/approve-booking/route.ts` — approval endpoint (Resend confirmation + Redis records)
- `src/app/api/admin/bookings/route.ts` + `mark-paid/route.ts` — admin endpoints (password-protected)
- `src/app/admin/page.tsx` — admin dashboard with CSV export
- `src/lib/redis.ts` — Upstash Redis client and shared types
- `src/lib/pricing.ts` — price calculator (weekday/weekend rates + package deals for 3-night and 7-night stays)

### Images

Static photos live under `public/images/`. The `CabinImage.tsx` wrapper component is used everywhere instead of `next/image` directly — keep using it for consistency.

### Environment variables

Full env vars list maintained in user-memory `project_hansmyr.md` (single source of truth — do not duplicate here, it will drift). Covers Resend, Upstash Redis, site URL, and admin password.

## Deploy and dev workflow

- Vercel auto-deploys on every push to `main`. No manual deploy step.
- Domain `hansmyr.no` is registered with Domeneshop and points at Vercel via DNS.
- Local dev: `npm run dev` from repo root (Next.js dev server on port 3000).
- All env vars must be configured in the Vercel project dashboard for production. For local dev, copy them into a gitignored `.env.local` file.

## Things NOT to do

- **Do not store secrets in code.** Use `.env` (gitignored) for local dev, Vercel project env vars for production. The `.gitignore` already covers `.env`, `.env*.local`, and `.vercel`.
- **Do not bypass the admin password check.** `/admin` reads `ADMIN_PASSWORD` from env. Don't hardcode a fallback. Don't add a "dev mode" that skips it.
- **Do not commit `.next/` or `out/` build artefacts.** `.gitignore` covers both at any depth (the leading-slash bug was fixed in commit `83df4c7`). If they show up in `git status`, the rule is wrong.
- **Do not wire up automated payments** without explicit instruction (see Vipps section above).
- **Do not store credentials inline** in commands, URLs, or files — see Credential handling below.

## Credential handling — deny-list

When Claude Code asks for permission to run a bash command, DENY if the command contains any of these literal patterns:

- `ghp_` followed by alphanumerics — GitHub classic PAT
- `github_pat_` — GitHub fine-grained PAT
- `sk-ant-` — Anthropic API key
- `sk-` followed by 20+ alphanumerics — OpenAI / generic
- `Bearer <token-shaped-string>` — any auth header with a literal token

Reason: approved permission patterns are stored verbatim in `.claude/.../settings.local.json`. Approving once = plaintext token on disk until manually scrubbed. Preventive rule for this project; demonstrated in bobilvei (commits `6cfad72` AGENTS.md deny-list, `cd4aedf` gitignore broadening). For full GitHub auth rules and PAT renewal workflow, see user-memory `github_auth_rule.md`.

Correct alternatives:

- **GitHub API calls** → use the `gh` CLI (`gh pr create`, `gh pr view`, etc.). `gh` handles auth via its own macOS keyring entry, never inline.
- **git push / pull / fetch** → osxkeychain handles auth on this Mac, never inline. Plain `https://github.com/davidsvang/...` URLs only.
- **Anthropic / API calls from scripts** → read the key from an environment variable inside the script, never as a command-line argument.

If a tool genuinely needs an inline credential (rare), pass it via stdin or a temp file with restrictive permissions, never via the command-line string Claude Code would store as a permission.
