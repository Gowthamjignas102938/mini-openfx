# MiniOpenFX — Project Memory & Working Agreement

This file is read automatically by Claude Code at the start of every session in
this folder. It exists so a fresh session picks up exactly where a prior one
(here, or in the Claude chat this project was planned in) left off — read it
in full before doing anything else, including before answering a question
that seems simple.

## What this project is

An API-only FX quoting + trading service (no UI in the graded scope) built
against a real assignment brief. A client can: fetch indicative currency
prices, view balances per currency, execute a trade converting one currency
into another, and retrieve trade history. Modelled loosely on real
cross-border FX/payments platforms (we researched the real company "OpenFX"
for grounding — B2B, API-integrated, no end-user UI — which is why "API-only"
is the actual shape of the business being modelled, not a corner being cut).

The brief explicitly evaluates: product thinking (sensible scope, stated
assumptions), API design, data modelling, code quality, and reliability
(expiry handling, validation). Simplicity and correctness are rewarded over
feature count — do not add scope the brief didn't ask for without flagging it
first.

## Locked-in scope decisions (do not silently change these)

- **Single hardcoded demo wallet.** No auth, no `clients`/users table. Every
  endpoint operates on "the" one wallet.
- **Balances are seeded automatically at startup** with fixed starting
  amounts. No funding/deposit endpoint.
- **A fetched price is valid for 15 seconds.** A trade attempted against an
  older price must be rejected and forced to re-fetch. This is the project's
  answer to the brief's "reliability: expiry handling" criterion.
- **Simple financial model, on purpose:** one `trades` table, one `balances`
  table. No separate persisted `quotes` resource, no `ledger_entries` /
  cached-balances split. The 15-second validity check happens inline inside
  the trade request, not as its own stored object.
- **Stack, exactly as the brief names it — do not substitute:** TypeScript,
  NestJS (with Express), PostgreSQL, Redis (price cache), Drizzle ORM, Jest
  for tests, GitHub Actions CI (lint, typecheck, test).
- **Frontend: React + Tailwind CSS** — but explicitly a *bonus*, built only
  after the graded backend (Modules 00–13 in the field guide) is solid and
  submittable. Never let frontend work displace backend/test/CI work.
- **Deliberately considered and rejected**, worth naming in the README's
  trade-offs section rather than silently forgetting: a richer
  indicative-price / firm-quote / ledger-entries model, idempotency keys, a
  real `clients` + API-key auth table, and an alternate stack (Hono, Zod,
  Vitest, Neon serverless Postgres). All reasonable ideas, all consciously
  set aside for a simpler, faster-to-build shape given the time available.

## Working agreement — how to operate in this project

The person building this is a beginner, learning deliberately and slowly, and
explicitly asked for **attempt-first** mode. This is not a preference to
politely nod at — it changes what you should actually do:

1. **Explain the concept before any code** — plain language, define new terms
   as they come up, assume nothing is obvious.
2. **Hand over a task, not a solution, by default.** Describe what a file
   needs to do, its interface, the requirements — and let the person write
   the actual implementation themselves in their editor.
3. **Do not generate whole files or apply large edits unprompted.** If asked
   to "just fix it," prefer the smallest possible change, and still explain
   it — see point 5.
4. **A fallback is fine when the person is stuck** — but say so explicitly
   ("here's the fallback"), and still explain why it works afterward, so even
   the fallback teaches something.
5. **Whenever you do write or change code, explain exactly what changed and
   why, in plain terms a beginner can follow** — not a terse diff summary.
   Assume the person will be asked to explain this code later and needs to
   actually understand it, not just have it work.
6. **When something breaks, walk through the diagnosis out loud** — what the
   error actually means, what it rules in/out, before stating the fix.
7. Prefer small, reviewable, one-thing-at-a-time increments over big
   multi-file rewrites.

## Current status

Last updated from the planning conversation on 2026-09-14.

- **Module 00 (orientation/product thinking): done.** Scope decisions above
  are final.
- **Module 01 (environment/tooling): done.** Repo initialized, `.gitignore`
  in place, connected to GitHub (`github.com/gowthamjignas1029/mini-openfx`),
  first commit pushed to `main`.
- **Module 02 (NestJS foundations): in progress.**
  - Project scaffolded via `nest new . --skip-git` — this scaffold turned out
    to include NestJS's native Observe SDK (`@nestjs/observe`) wired into
    `main.ts` via an `instrument: ObserveInstrument` option, auto-included by
    the CLI. This is **not wanted** for this project (irrelevant to the
    assignment, was failing with `Telemetry rejected (401)` since no real
    API key was ever configured) and should be fully removed, not fixed.
  - `main.ts` has already been edited once to drop the `ObserveInstrument`
    import/usage — **verify this actually took effect** with a clean
    terminal restart (`Ctrl+C`, `clear`, `npm run start:dev` again) before
    assuming it's resolved; last report from the person was that the
    telemetry error line was still visible, which may just be stale terminal
    scrollback rather than a real recurrence. Also check `package.json` for
    an `@nestjs/observe` dependency and `nest-cli.json` for any plugin
    referencing it, in case something beyond `main.ts` is still wiring it in.
  - A hand-written `RatesModule` (`src/rates/{rates.module,rates.controller,
    rates.service}.ts`) exists as a throwaway learning exercise — a
    placeholder `GET /rates/hello` endpoint — and was verified correctly
    wired into `app.module.ts`'s `imports` array. This module is **not**
    part of the real product; it can be deleted once its teaching purpose
    (understanding modules/controllers/services/DI) is served, before
    building the real `PricesModule` in Module 05.
- **Modules 03–14: not started.** Full roadmap, glossary, and resource links
  live in the published field guide (an artifact from the planning
  conversation) — ask the person for the link if it's needed and not
  already available in this session's context.

## First thing to do in a new session

Don't assume the above is still accurate. Inspect the actual repo (file
tree, `git log`, `package.json`, `nest-cli.json`, and the contents of `src/`)
and reconcile reality against "Current status" above before doing anything
else. Report back, in plain language: what's actually implemented and
working right now, what's implemented but possibly broken, and what genuinely
hasn't been started — specifically confirm whether `npm run start:dev` boots
cleanly with no Observe-related error, and whether `GET /` and
`GET /rates/hello` both respond correctly.
