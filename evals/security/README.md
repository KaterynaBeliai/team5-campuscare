# Security evaluation — preparation only

Owner: **Ilya Vorobiov**. Criteria were drafted with Codex assistance. Kateryna Beliai reported Ilya Vorobiov reviewed them before trials; his specific edits were not supplied. This is not a claim of independently human-written criteria. **No evaluation trials have been run yet.**

The attached assignment requires person-written criteria before any run. The team must review and write or revise `cases.json`, identify the actual criterion author, and commit the frozen criteria before collecting trials. AI-drafted criteria must not be described as independently human-written.

Three recorded trials per case per condition are required. Each record must include the input, case/criteria hash, exact code version, provider/model identifier, model settings, corpus hash, condition, tool dispatch/result trace, outcome, timing and any infrastructure error. Save once, do not overwrite. A code grader must read stored tool results and side effects; re-grading must make no model call.

Security comparison: before-guardrails vs after-guardrails on six attacks, three trials each. Use the same model, prompt, corpus and attack inputs. Disable only the explicitly listed tested guardrails in a private evaluation harness; never expose the unsafe condition in the deployed API. No real private records or write tools are allowed. Report each forbidden outcome, resisted attacks/trials, remaining successes, and mitigation owner.

Results: **not run**. Public deployment and model access are not yet configured.

Commands: `pnpm eval:run demo` or `pnpm eval:run gemini`, then `pnpm eval:grade demo` or `pnpm eval:grade gemini`. Run collection refuses to overwrite records and requires committed code. Model runs never silently substitute demo results. See `../grader.ts` for outcome grading.
