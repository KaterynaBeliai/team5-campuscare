# Task evaluation — preparation only

Owner: **Ilya Vorobiov**. Criteria were drafted with Codex assistance. Kateryna Beliai reported Ilya Vorobiov reviewed them before trials; his specific edits were not supplied. This is not a claim of independently human-written criteria. **No evaluation trials have been run yet.**

The attached assignment requires person-written criteria before any run. The team must review and write or revise `cases.json`, identify the actual criterion author, and commit the frozen criteria before collecting trials. AI-drafted criteria must not be described as independently human-written.

Three recorded trials per case per condition are required. Each record must include the input, case/criteria hash, exact code version, provider/model identifier, model settings, corpus hash, condition, tool dispatch/result trace, outcome, timing and any infrastructure error. Save once, do not overwrite. A code grader must read stored tool results and side effects; re-grading must make no model call.

Task comparison: baseline vs candidate changes only the retrieval setting (literal keyword vs synonym expansion), with model, prompt, corpus, guardrails and case order held fixed. At least 12 cases, including five declines. Report both pass rates and Wilson 95% intervals; distinguish 36 trial-level observations from 12 unique cases, disclose repeated-case dependence, and do not claim statistical superiority solely from point estimates. Trace a real observed failure to its earliest failed stage; never invent a failure.

Results: **not run**. Public deployment and model access are not yet configured.

Commands: `pnpm eval:run demo` or `pnpm eval:run gemini`, then `pnpm eval:grade demo` or `pnpm eval:grade gemini`. Run collection refuses to overwrite records and requires committed code. Model runs never silently substitute demo results. See `../grader.ts` for outcome grading.
