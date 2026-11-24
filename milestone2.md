# Milestone 2: Release-Ready Version

**Submission report — 24 November 2026.** This report records the delivered prototype, completed team contributions and the remaining technical limitations. Model-backed trials include provider failures; they are reported without treating them as successful model tests. Kateryna Beliai confirmed that all four members completed their assigned parts and contributed their corrections.

## Version and deployment

- Private repository: [team5-campuscare](https://github.com/KaterynaBeliai/team5-campuscare).
- Submitted application version: [`1ec595c764dc925bfc2463bccccd82b761dd5e3c`](https://github.com/KaterynaBeliai/team5-campuscare/tree/1ec595c764dc925bfc2463bccccd82b761dd5e3c). Subsequent report-only changes do not change the deployed application. Earlier evaluation records retain the exact code version used for each run.
- Production model: `gemini-3.5-flash-lite`; deployment `dpl_EX6UpnBeFAVGKKiNTidXs8XmZNE8`, verified 24 November 2026 after credential rotation and restoration of `GEMINI_ENABLED=true`. Production status: READY. A consented API request completed in Gemini mode, executed search and returned the matching source without fallback.
- Deployment and team confirmation: [release evidence](https://github.com/KaterynaBeliai/team5-campuscare/blob/milestone2-release/evidence/milestone2/release-confirmation.md).
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
- Automated reviewer: Codex. On 24 November 2026, Kateryna Beliai confirmed completion of all members’ assigned work and corrections for Milestone 2, including Ilya Vorobiov’s evaluation/guardrails module. This is a team-owner confirmation, not a claim that Codex independently observed each person’s review or edits.

## Evaluation

Cases were committed before runs at `ca4b9cf0bcc955944a9d54f750da66e129193a1f`. Criteria were AI-assisted drafts. Kateryna Beliai reported that Ilya Vorobiov reviewed them before execution; his exact edits were not supplied. Independent human authorship is not claimed. The assignment asks for person-written criteria before runs: AI-assisted drafting with a reported human review is the documented provenance and remains a compliance limitation; the later completion confirmation does not establish independent human authorship.

### Task suite: `evals/task/`

- [Suite and saved trials](https://github.com/KaterynaBeliai/team5-campuscare/tree/milestone2-release/evals/task).
- Evaluated task: retrieve synthetic course information with exact citations, or decline/express uncertainty where appropriate.
- Cases: 12, including 5 declines; inputs derived from the specified course-question, missing-evidence, privacy, write and greeting scenarios.
- Grader: code in `evals/grader.ts` checks tool calls, retrieved source IDs, uncertainty and forbidden outcomes. No model judge is used.
- Trials: 3 per case per condition; 72 total, model identifier `campuscare-rule-agent-v2 (no LLM)`. Temperature not applicable; max steps 2. A separate Gemini batch is now recorded; see the live-model results below.
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


### Recorded Gemini batch (23 November 2026)

Model: `gemini-3.5-flash-lite`, temperature 0, maximum 2 model steps, 512 output tokens, no retries, 20-second abort timeout. Code version is saved in every record. Three trials per case and condition were recorded once under `runs/gemini/` (108 records). `node --env-file=.env.local --import tsx evals/run.ts gemini` collected them; `node --import tsx evals/report.ts gemini` regraded them offline.

| Suite / condition | Passed / total | Pass rate | Wilson 95% interval | Provider/execution failures |
| --- | --- | --- | --- | --- |
| Task baseline | 19/36 | 52.78% | 37.01–68.01% | 16 |
| Task candidate | 9/36 | 25.00% | 13.75–41.07% | 27 |
| Security before guardrails | 0/18 | 0% | 0–17.59% | 18 |
| Security after guardrails | 12/18 | 66.67% | 43.75–83.72% | 6 |

These rates include infrastructure failures in the denominator. **They do not establish that retrieval became worse or that all baseline attacks succeeded.** Baseline was run before candidate, and service availability changed during the batch. Provider/execution errors total 67. Eleven trials completed model processing; 30 other trials were stopped by the application policy before external processing. Policy-only outcomes are labelled `deterministic-demo` in the result even though the batch is configured for Gemini; no model fallback was substituted for failed calls.

The first task failure, `baseline/T01-1.json`, occurs at the provider stage after about 20 seconds, before an available tool trace. A separate post-batch diagnostic returned `TimeoutError`. The runner intentionally saved only a generic provider/execution failure for other errors, so their individual HTTP causes cannot be reconstructed and are not asserted as quota failures. All failures are retained; none are silently rerun or removed.

The security after-guardrails passes are input-policy blocks. All provider-dependent security trials failed to complete, so no successful live-model resistance claim is made for retrieved/tool-content attacks. A paced, separately named batch with safe per-error metadata is re-planned as follow-up work. The successful 24 November production smoke confirms current connectivity, but does not replace or invalidate this failed batch. **Ilya Vorobiov** owns evaluation interpretation and review; **Kateryna Beliai** owns provider configuration and availability. Existing records must remain immutable.

## Responsible-use audit

| Area | Finding | Mitigation | Remaining limitation | Owner |
| --- | --- | --- | --- | --- |
| Bias | Tiny English-only synthetic corpus cannot represent diverse students | Label scope; decline unsupported questions; no eligibility decisions | No demographic or multilingual coverage claim | Bohdan Obukh |
| Privacy | Consented prompts/excerpts leave the application; free-tier provider may use them for improvement | Consent off by default; warnings; no private-data tools/history; server-only key; metadata-only logs | Heuristic filtering cannot detect all personal information; provider retention outside app control | Kateryna Beliai |
| Intellectual property | Real course material authorization is unverified | Bundle only synthetic fixtures; citations identify fictional sources | Human corpus review and permission needed before adding real material | Bohdan Obukh |
| Disclosure | Demo results can be mistaken for LLM behavior or official advice | Visible mode/fallback/prototype notices; separate evidence folders; no fabricated reviews | Team corrections/completion confirmed by Kateryna; no separate notice-review transcript recorded | Ilya Vorobiov |

## AI-use disclosure

- Accountable owner of the app: **Kateryna Beliai**.
- Codex assisted implementation, tests and this report. The optional user-facing model is Google Gemini, enabled only after session consent. Demo mode is deterministic. No claim of official university advice is made.

## Status

- Changed since Milestone 1: public Vercel deployment, optional Gemini adapter, consent UI, visible fallback, synonym retrieval, source quarantine, bounded traces, 15 tests and replayable evaluation suites.
- Team status: Kateryna Beliai confirmed on 24 November 2026 that all four members completed their assigned contributions and corrections. The table below records module responsibilities and AI-assisted decisions; exact individual edits and separate personal attestations were not supplied.
- Open technical/assessment issues: provider failures prevent a reliable live-model comparison; criteria were AI-assisted rather than independently human-authored; missing-source browser verification is still re-planned (automated no-match checks passed); private-repository access for the instructor must be available. These limitations remain despite completion of team contributions.
- Biggest remaining risk: the successful deployed workflow and deterministic evaluations do not establish general live-model reliability. The report is complete as a record of delivered work and failures, but does not claim that every release-readiness or assessment requirement passed.
- MCP transport, embeddings, real Canvas integration and write operations remain re-planned/excluded, not implemented features.

## Modules and AI-use log

These are named responsibilities and AI-assisted change records, not invented individual commit authorship. Milestone 1 personal confirmations are preserved separately. Kateryna’s 24 November team-completion confirmation covers the assigned contributions and corrections. The entries summarize repository evidence and are not fabricated personal quotations or independent per-member attestations.

| Member | Module | Link to their work | Tool and task | Accepted, changed or rejected | How it was checked |
| --- | --- | --- | --- | --- | --- |
| Kateryna Beliai | Product and Agent Experience | [Agent/UI](https://github.com/KaterynaBeliai/team5-campuscare/tree/milestone2-release/src/agent) | GPT/Codex: adapter, consent, deployment | Integrated consent-gated model path; rejected treating fallback as model success | Automated consent/API tests; production smoke; team contribution/corrections confirmed (20 November) |
| Danylo Mintii | MCP Tools and Integrations | [Registry/tools](https://github.com/KaterynaBeliai/team5-campuscare/tree/milestone2-release/src/tools) | GPT/Codex: input/output contracts | Retained local read-only adapter; rejected claiming MCP transport exists | Registered-tool and invalid-input tests; team contribution/corrections confirmed (20 November) |
| Bohdan Obukh | Knowledge Base and RAG | [Retrieval](https://github.com/KaterynaBeliai/team5-campuscare/tree/milestone2-release/src/knowledge) | GPT/Codex: lexical retrieval and source grounding | Added controlled synonyms; retained synthetic corpus and exact excerpts | Outcome comparison and citation/no-match tests; team contribution/corrections confirmed (20 November) |
| Ilya Vorobiov | Evaluation, Testing and Guardrails | [Evaluation](https://github.com/KaterynaBeliai/team5-campuscare/tree/milestone2-release/evals) | GPT/Codex: cases, grader, policies | Corrected overbroad security scoring; rejected invented human edits or model runs | 15 automated tests; offline regrade; criteria review reported by Kateryna, exact edits unavailable; team contribution/corrections confirmed (20 November) |
