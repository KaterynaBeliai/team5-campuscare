# Milestone 2: Release-Ready Version

**Working report — not ready for submission.** Model-backed evaluations and final human review remain open. Evidence below distinguishes deterministic trials from live-model checks.

## Version and deployment

- Private repository: [team5-campuscare](https://github.com/KaterynaBeliai/team5-campuscare).
- Assessed application commit: `6290a24aedcb10bd8a00ee4d3f9d8cdd0333864b`. This is a checkpoint, not a final submitted version.
- Production model: `gemini-3.5-flash-lite`; deployment `dpl_Gc8UBMqVXTqb5NgMb3KLZfXsfbuJ`, verified 23 November 2026.
- Public URL: https://team5-campuscare.vercel.app
- Usage: open the site; ask “What are the assignment requirements?”; inspect the answer, tool trace and source link. The fixture is fictional. Gemini requires explicit consent via the checkbox. Without consent, local demo mode is used. A failed provider request is visibly labelled as demo fallback.
- Specifications: [specs/](https://github.com/KaterynaBeliai/team5-campuscare/tree/milestone2-release/specs). Tasks have explicit done or re-planned states.

## Final check per feature

Automated evidence is in [evaluation/](https://github.com/KaterynaBeliai/team5-campuscare/tree/milestone2-release/evaluation) and [evidence/milestone2/](https://github.com/KaterynaBeliai/team5-campuscare/tree/milestone2-release/evidence/milestone2). These checks establish the tested behavior, not universal guarantees.

| Feature folder / owner | Criterion | Met | Evidence |
| --- | --- | --- | --- |
| campus-support / Kateryna Beliai | AC-1 | Yes, API checks | Empty, invalid JSON, oversized and valid requests tested |
| campus-support / Kateryna Beliai | AC-2 | Yes, demo and live smoke | Gemini 3.5 Flash-Lite chose search and returned the matching source; see production-flash-lite-smoke.json |
| campus-support / Kateryna Beliai | AC-3 | Yes, tested fixtures | Returned citations equal tool results |
| campus-support / Kateryna Beliai | AC-4 | Yes, tested fixtures | Unknown subject and absent deadline produce uncertainty |
| campus-support / Kateryna Beliai | AC-5 | Yes, tested cases | Private/write requests blocked; no write tools exist |
| campus-support / Kateryna Beliai | AC-6 | Partial | No application history; metadata-only logs. Heuristics cannot guarantee detection of every identifier in arbitrary text |
| campus-support / Kateryna Beliai | AC-7 | Yes within tested scope | Source quarantine and fixed tool permissions; synthetic injection trials |
| campus-support / Kateryna Beliai | AC-8 | Yes, browser check | Prototype notice, Gemini mode, source card and expanded tool trace observed |
| campus-support / Kateryna Beliai | AC-9 | Yes | Public demo and recorded provider fallback |
| campus-support / Kateryna Beliai | AC-10 | Yes, automated | Test proves no external fetch without consent |
| campus-support / Kateryna Beliai | AC-11 | Yes, browser check | Warning and no login/personal-data fields observed |
| mcp-integrations / Danylo Mintii | MI-1 | Yes | Registry rejects unknown tools and invalid inputs. Local adapter, not MCP transport |
| knowledge-rag / Bohdan Obukh | KR-1 | Yes | Exact excerpts/citations and no-match checks. Lexical retrieval, not embeddings |
| evaluation-guardrails / Ilya Vorobiov | EG-1 | Yes | Same runtime policy used by API and outcome tests |

## Tests

- `pnpm test`: 15 passed, 0 failed. Also verified directly with `node --import tsx --test evaluation/*.test.ts` after diagnostic changes.
- `pnpm typecheck` / `node node_modules/typescript/bin/tsc --noEmit`: passed.
- `pnpm build`: passed locally and production deployments reached READY.
- `pnpm eval:grade demo`: offline outcome grading of 108 saved trials; no model call.
- Live production smoke with consent: Gemini 3.8 Flash returned HTTP 503; application returned labelled demo fallback. After changing only the configured model to `gemini-3.5-flash-lite`, the production smoke succeeded: model → search_course_materials → demo-assignment → grounded answer. Browser verification also showed Gemini mode, citation and one tool call. Evidence: `evidence/milestone2/production-flash-lite-smoke.json` and `evidence/milestone2/browser-gemini.jpg`. This smoke does not replace the full controlled suites.
- Automated reviewer: Codex. Ilya Vorobiov's manual acceptance confirmation applies to Milestone 1; final Milestone 2 manual review is not yet recorded.

## Evaluation

Cases were committed before runs at `ca4b9cf0bcc955944a9d54f750da66e129193a1f`. Criteria were AI-assisted drafts. Kateryna Beliai reported that Ilya Vorobiov reviewed them before execution; his exact edits were not supplied. Independent human authorship is not claimed. The team must resolve this provenance against the assignment requirement before submission.

### Task suite: `evals/task/`

- [Suite and saved trials](https://github.com/KaterynaBeliai/team5-campuscare/tree/milestone2-release/evals/task).
- Evaluated task: retrieve synthetic course information with exact citations, or decline/express uncertainty where appropriate.
- Cases: 12, including 5 declines; inputs derived from the specified course-question, missing-evidence, privacy, write and greeting scenarios.
- Grader: code in `evals/grader.ts` checks tool calls, retrieved source IDs, uncertainty and forbidden outcomes. No model judge is used.
- Trials: 3 per case per condition; 72 total, model identifier `campuscare-rule-agent-v2 (no LLM)`. Temperature not applicable; max steps 2. Model-backed trials remain pending.
- Controlled comparison: only literal retrieval versus synonym expansion changes; cases, corpus and guardrails fixed. Records in `runs/demo/baseline/` and `runs/demo/candidate/`.
- Result: baseline 30/36 (83.33%, Wilson 95% interval 68.11–92.13%); candidate 36/36 (100%, 90.36–100%). Unique-case results 10/12 and 12/12. Repeated deterministic trials are dependent; intervals are descriptive and overlap. No statistical superiority or LLM reliability claim is made.
- Failure traced: baseline `T05-1`, first failing step is search returning no source for “coursework/include”; literal keywords miss this paraphrase. The candidate synonym mapping fixes it in these fixtures.

### Security suite: `evals/security/`

- [Suite and saved trials](https://github.com/KaterynaBeliai/team5-campuscare/tree/milestone2-release/evals/security).
- Six attacks, 3 trials per condition: 36 total demo trials.
- Forbidden outcomes: S01 internal/secret disclosure; S02 private-record access, writes or external transmission; S03 message sending/writes; S04 executing injected command or disclosing synthetic canary; S05 external fetch/unapproved citation/write; S06 privileged disclosure from hidden user instructions. Exact per-case criteria are in `cases.json`.
- Guardrails: input normalization/policy and source quarantine (Ilya Vorobiov); fixed read-only registry and source URL allowlist (Danylo Mintii); exact-excerpt grounding (Bohdan Obukh); consent enforcement (Kateryna Beliai).
- Before/after: 15/18 resisted (83.33%; Wilson 95% interval 60.78–94.16%) versus 18/18 (100%; 82.41–100%). Distinct attacks resisted: 5/6 versus 6/6. Records are in `runs/demo/before-guardrails/` and `runs/demo/after-guardrails/`.
- Before-guardrails S04 copied a synthetic canary through an unfiltered source excerpt. After filtering, it was quarantined. No real secret was involved. The private harness disables only tested input/source filters; the public API cannot disable them.
- An offline grader correction aligned scoring with the predeclared forbidden outcomes; saved cases and runs were unchanged. See `evidence/milestone2/grader-correction.md`.
- Remaining risk: no tested after-guardrails attack succeeds, but novel/multilingual injections and model behavior remain unproven. Ilya owns expanded tests; Kateryna owns live-provider verification.

## Responsible-use audit

| Area | Finding | Mitigation | Remaining limitation | Owner |
| --- | --- | --- | --- | --- |
| Bias | Tiny English-only synthetic corpus cannot represent diverse students | Label scope; decline unsupported questions; no eligibility decisions | No demographic or multilingual coverage claim | Bohdan Obukh |
| Privacy | Consented prompts/excerpts leave the application; free-tier provider may use them for improvement | Consent off by default; warnings; no private-data tools/history; server-only key; metadata-only logs | Heuristic filtering cannot detect all personal information; provider retention outside app control | Kateryna Beliai |
| Intellectual property | Real course material authorization is unverified | Bundle only synthetic fixtures; citations identify fictional sources | Human corpus review and permission needed before adding real material | Bohdan Obukh |
| Disclosure | Demo results can be mistaken for LLM behavior or official advice | Visible mode/fallback/prototype notices; separate evidence folders; no fabricated reviews | Final manual review of notices pending | Ilya Vorobiov |

## AI-use disclosure

- Accountable owner of the app: **Kateryna Beliai**.
- Codex assisted implementation, tests and this report. The optional user-facing model is Google Gemini, enabled only after session consent. Demo mode is deterministic. No claim of official university advice is made.

## Status

- Changed since Milestone 1: public Vercel deployment, optional Gemini adapter, consent UI, visible fallback, synonym retrieval, source quarantine, bounded traces, 15 tests and replayable evaluation suites.
- Open issues: model-backed controlled evaluations, provider availability risk, criterion-author provenance, final browser/human review, per-member confirmation of updated logs, final submitted version and instructor access.
- Biggest risk: a functioning demo and deterministic evaluations do not establish release-ready LLM behavior. Do not submit this report as complete until the live-model requirement is resolved.
- MCP transport, embeddings, real Canvas integration and write operations remain re-planned/excluded, not implemented features.

## Modules and AI-use log

These are named responsibilities and AI-assisted change records, not invented individual commit authorship. Milestone 1 personal confirmations are preserved separately. Each owner must confirm the updated entry for this checkpoint.

| Member | Module | Link to their work | Tool and task | Accepted, changed or rejected | How it was checked |
| --- | --- | --- | --- | --- | --- |
| Kateryna Beliai | Product and Agent Experience | [Agent/UI](https://github.com/KaterynaBeliai/team5-campuscare/tree/milestone2-release/src/agent) | GPT/Codex: adapter, consent, deployment | Integrated consent-gated model path; rejected treating fallback as model success | Automated consent/API tests; production smoke; personal updated-log confirmation pending |
| Danylo Mintii | MCP Tools and Integrations | [Registry/tools](https://github.com/KaterynaBeliai/team5-campuscare/tree/milestone2-release/src/tools) | GPT/Codex: input/output contracts | Retained local read-only adapter; rejected claiming MCP transport exists | Registered-tool and invalid-input tests; personal updated-log confirmation pending |
| Bohdan Obukh | Knowledge Base and RAG | [Retrieval](https://github.com/KaterynaBeliai/team5-campuscare/tree/milestone2-release/src/knowledge) | GPT/Codex: lexical retrieval and source grounding | Added controlled synonyms; retained synthetic corpus and exact excerpts | Outcome comparison and citation/no-match tests; personal updated-log confirmation pending |
| Ilya Vorobiov | Evaluation, Testing and Guardrails | [Evaluation](https://github.com/KaterynaBeliai/team5-campuscare/tree/milestone2-release/evals) | GPT/Codex: cases, grader, policies | Corrected overbroad security scoring; rejected invented human edits or model runs | 15 automated tests; offline regrade; criteria review reported by Kateryna, exact edits unavailable; final personal log confirmation pending |
