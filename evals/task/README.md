# Task evaluation — recorded demo trials

Owner: **Ilya Vorobiov**. Criteria were drafted with Codex assistance. Kateryna Beliai reported Ilya Vorobiov reviewed them before trials; his specific edits were not supplied. This is not a claim of independently human-written criteria. Demo trials were recorded from commit `ca4b9cf0bcc955944a9d54f750da66e129193a1f`, after the case definitions were committed. A separate Gemini batch is recorded under `runs/gemini/`; provider failures limit interpretation.

The attached assignment requires person-written criteria before any run. The team must review and write or revise `cases.json`, identify the actual criterion author, and commit the frozen criteria before collecting trials. AI-drafted criteria must not be described as independently human-written.

Three recorded trials per case per condition are required. Each record must include the input, case/criteria hash, exact code version, provider/model identifier, model settings, corpus hash, condition, tool dispatch/result trace, outcome, timing and any infrastructure error. Save once, do not overwrite. A code grader must read stored tool results and side effects; re-grading must make no model call.

Task comparison: baseline vs candidate changes only the retrieval setting (literal keyword vs synonym expansion), with model, prompt, corpus, guardrails and case order held fixed. At least 12 cases, including five declines. Report both pass rates and Wilson 95% intervals; distinguish 36 trial-level observations from 12 unique cases, disclose repeated-case dependence, and do not claim statistical superiority solely from point estimates. Trace a real observed failure to its earliest failed stage; never invent a failure.

Results (deterministic demo, not LLM evidence): Baseline: 30/36 trials (83.33%; Wilson 95% CI 68.11–92.13%). Candidate: 36/36 (100%; 90.36–100%). The first baseline failure is T05-1: literal retrieval returns no source for the coursework/include wording. Synonym expansion fixes this in the candidate.

Immutable trial records: `runs/demo/`. Offline report: `results-demo.json`. Repeated deterministic trials are dependent; these descriptive intervals do not establish generalization or statistical superiority.

Commands: `pnpm eval:run demo` or `pnpm eval:run gemini`, then `pnpm eval:grade demo` or `pnpm eval:grade gemini`. Run collection refuses to overwrite records and requires committed code. Model runs never silently substitute demo results. See `../grader.ts` for outcome grading.

## Gemini batch

See `results-gemini.json` and `runs/gemini/` for all saved outcomes and offline grades. The combined 108-record batch contains 67 provider/execution failures, 11 completed model results and 30 pre-provider policy blocks. Failures remain in denominators. Batch order and changing availability confound quality comparison. Security infrastructure failures do not mean attacks succeeded. See the recorded Gemini batch section in `../../milestone2.md` for rates, intervals and limitations.
