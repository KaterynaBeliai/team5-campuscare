# Campus support assistant: tasks

### T1: Confirm MVP sources and boundaries

- Milestone 2 status: done — synthetic English-only fixtures retained; no real university data used.

- Task: Confirm whether the instructor approves any Canvas course materials for project use; until then define synthetic course fixtures, supported language, demo-mode behavior, and exclusions for personal data and writes.
- Serves: AC-4, AC-5, AC-6, AC-8, AC-9, AC-10, AC-11
- Owner: Kateryna Beliai, with review by all module owners
- After: none
- Files in scope: `specs/project.md`, `specs/campus-support/spec.md`, `content/approved/sources.json`, `content/synthetic/`
- Check: Source inventory distinguishes synthetic fixtures from real materials; no Canvas material is included without explicit approval for both project use and provider processing; the MVP spec excludes private data and write tools.

### T2: Scaffold the web application and contracts

- Milestone 2 status: done — Next.js scaffold and shared trace/result contracts implemented.

- Task: Create the TypeScript app skeleton and shared request, tool, source, and response types.
- Serves: AC-1, AC-2
- Owner: Kateryna Beliai
- After: T1
- Files in scope: `app/`, `src/types/contracts.ts`, package/configuration files
- Check: The app starts locally; TypeScript accepts the shared contracts; no secrets are committed.

### T3: Build the chat and citation interface

- Milestone 2 status: done — chat, citations, explicit per-request session consent and actual response-mode display implemented.

- Task: Implement question entry, answer/error display, source cards, model-processing consent, demo-mode notice, and informational-prototype notice.
- Serves: AC-1, AC-3, AC-8, AC-10, AC-11
- Owner: Kateryna Beliai
- After: T2
- Files in scope: `app/page.tsx`, `src/components/`
- Check: A sample response displays readable text and clickable source references; empty input is handled visibly.

### T4: Add approved sample corpus and retrieval tools

- Milestone 2 status: done — keyword retrieval with a controlled synonym-expansion candidate and canonical source checks.

- Task: Add synthetic course examples, or instructor-approved course files if approval is granted, and a read-only search tool with source metadata.
- Serves: AC-2, AC-3, AC-4
- Owner: Bohdan Obukh
- After: T1, T2
- Files in scope: `content/synthetic/`, `content/approved/`, `src/knowledge/`, `src/tools/search-course-materials.ts`
- Check: A known course question returns the expected excerpt and source; an unrelated query returns no-match rather than a fabricated result; no personal Canvas data is indexed.

### T5: Implement constrained agent and demo provider

- Milestone 2 status: re-planned — deterministic and Gemini adapters implemented; server credentials configured; Gemini 3.5 Flash-Lite passed production API and browser smoke after 3.8 Flash returned HTTP 503. 108 model-configured trials recorded; 67 provider/execution failures prevent a meaningful full comparison.

- Task: Use Gemini function calling to select registered tools, validate tool inputs/outputs, produce grounded or uncertainty responses, and include a deterministic demo provider.
- Serves: AC-2, AC-3, AC-4, AC-7, AC-9, AC-10
- Owner: Kateryna Beliai
- After: T2, T4
- Files in scope: `src/agent/`, `src/tools/registry.ts`, `src/policy/action-policy.ts`
- Check: Agent calls only registered tools; citations must originate from tool results; no-match yields an uncertainty response; injected instructions in a sample source do not change policy.

### T6: Add bounded chat API

- Milestone 2 status: done — bounded API, input validation, server-side policy and consent enforcement implemented; distributed rate limiting remains a documented limitation.

- Task: Implement the server route with message validation, request limits, safe errors, server-side agent invocation, and enforcement of the session consent state.
- Serves: AC-1, AC-6, AC-10, AC-11
- Owner: Kateryna Beliai
- After: T2, T5
- Files in scope: `app/api/chat/route.ts`
- Check: Valid requests return the documented response shape; empty/oversized requests return a client error; a request without consent never reaches Gemini; message bodies are absent from logs.

### T7: Add safety and privacy evaluation cases

- Milestone 2 status: done — 15 automated checks and replayable task/security evaluation harness implemented; 108 demo and 108 model-configured trials recorded; infrastructure failures explicitly retained.

- Task: Create repeatable cases for supported questions, missing evidence, personal-status requests, write requests, and prompt-injection text.
- Serves: AC-4, AC-5, AC-6, AC-7
- Owner: Ilya Vorobiov
- After: T4, T5
- Files in scope: `evaluation/`, `src/policy/`, `specs/campus-support/tasks.md`
- Check: Each case records expected tool calls and response properties; personal-status and write requests call no tools that access or change private data.

### T8: Connect UI to API and demonstrate end-to-end flow

- Milestone 2 status: re-planned — UI/API connected and live Gemini answer, source card and tool trace verified in browser; missing-source browser case remains pending.

- Task: Connect chat submission to the API and render answer, citations, uncertainty, and error states.
- Serves: AC-1, AC-3, AC-4, AC-8
- Owner: Kateryna Beliai
- After: T3, T6
- Files in scope: `app/page.tsx`, `src/components/`
- Check: A browser demo completes a supported question and a missing-source question with expected citations/fallback, and declining model consent keeps requests in demo mode.

### T9: Document and verify deployment configuration

- Milestone 2 status: re-planned — Vercel production is public at commit 6290a24aedcb10bd8a00ee4d3f9d8cdd0333864b; final release approval remains pending model evaluation.

- Task: Document the selected host, private repository connection method, environment variables, and demo-mode operation.
- Serves: AC-6, AC-9
- Owner: Kateryna Beliai; deployment review by Danylo Mintii
- After: T2, T6
- Files in scope: `README.md`, `.env.example`, deployment configuration
- Check: A clean Vercel Hobby deployment can run in demo mode without a model key; the repository owner can deploy from CLI; the optional Gemini key is server-side and absent from the client bundle.

## Layers

- Layer 1: T1
- Layer 2: T2
- Layer 3: T3, T4
- Layer 4: T5, T7
- Layer 5: T6
- Layer 6: T8, T9
- Can run in parallel: T3 and T4 after T2; T7 can begin after the tool/response contracts in T2 are agreed and finish after T5; T9 documentation can be drafted alongside T6, then verified after the host is selected.
