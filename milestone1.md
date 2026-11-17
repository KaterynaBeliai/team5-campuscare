# Milestone 1 — CampusCare (Team 5)

Checkpoint: 17 November 2026. Prepared from the team's repository plan and the seven assignment sections supplied by Kateryna Beliai. The original Canvas template could not be downloaded; this file follows the supplied section structure.

**Submission status:** runnable local implementation with automated evidence and a completed manual acceptance review by **Ilya Vorobiov**. All four members have confirmed their AI-use logs and contributions to their assigned modules, as reported by **Kateryna Beliai**.

## 1. Team, repository, and running the app

| Team member | Named responsibility |
| --- | --- |
| Kateryna Beliai | Product and Agent Experience; chat, API, agent orchestration, milestone coordination, planned deployment |
| Danylo Mintii | MCP Tools and Integrations; registered tool contracts and local mock adapter; deployment configuration review |
| Bohdan Obukh | Knowledge Base and RAG; synthetic corpus, retrieval, citations, source review |
| Ilya Vorobiov | Evaluation, Testing and Guardrails; runtime policy, acceptance tests, quality review |

Private repository: [team5-campuscare](https://github.com/KaterynaBeliai/team5-campuscare).

Specifications: [specs/](specs/) and [team project plan](specs/project.md). These are linked rather than copied into this report.

From the repository root, with Node.js 20.9+ and pnpm installed:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open **http://localhost:3000**. No model key, paid service, Canvas access, or student login is required. Production-local commands: `pnpm build` then `pnpm start`. Vercel deployment is a follow-up owned by **Kateryna Beliai**, with review by **Danylo Mintii**; no hosted URL is claimed.

## 2. End-to-end workflow: the agent chooses and calls a tool

1. **Input:** `What are the assignment requirements?`
2. **Path:** browser question form → `POST /api/chat` → `runAgent` → action policy → provider decision → validated tool registry → local retrieval → cited answer in the browser.
3. **Agent decision:** the deterministic demo provider classifies this as a question requiring retrieval and selects `search_course_materials`. A greeting such as `Hello` selects no tool; blocked private-data/write requests select no tool.
4. **Tool input:** `{"query":"What are the assignment requirements?"}`.
5. **Observed tool output:** one source, `demo-assignment`, titled **Synthetic course handbook**, section **Project brief**, linked at `/sources/demo-assignment`.
6. **Observed answer:** “For the fictional CampusCare demo assignment, submit a project overview, one tool-call trace, and a short reflection. This fixture does not describe an actual university assignment.” The answer is prefixed with a synthetic-material notice. HTTP result: **200**; mode: `deterministic-demo`; uncertainty: `false`.
7. **Supporting evidence:** [structured request, call and result](evidence/workflow.json), [automated test output](evidence/tests.txt), and [browser/HTTP verification](evidence/verification.md). Reproduce the structured trace with `pnpm evidence` and view the expandable “Tool-call evidence” in the UI.

Responsibilities: **Kateryna Beliai** owns the agent/UI/API path; **Danylo Mintii** owns dispatch; **Bohdan Obukh** owns retrieval/source data; **Ilya Vorobiov** owns verification.

This demonstrates real execution of a local read-only tool by a **rule-based agent stub**, not LLM function calling. The example source is fictional and is not the team's actual assignment specification.

## 3. Agent and three integrated features

| Feature and specification folder | Named owner | Tasks implemented in this checkpoint | Re-planning change |
| --- | --- | --- | --- |
| [Campus-support agent](specs/campus-support/) | **Kateryna Beliai** | T2: scaffold/types; T3: chat/source display; T5: deterministic provider and orchestration; T6: bounded API; T8: connected response states | Planned Gemini function calling → deterministic provider for milestone 1. Gemini and external-model consent UI are deferred together. T9 hosting remains unverified. |
| [Tool integrations](specs/mcp-integrations/) | **Danylo Mintii** | Task 1 / MI-1: typed read-only search contract, registered dispatch, input/output validation, rejection of unknown tools; connected to the agent | Planned MCP adapters → in-process mock adapter. No MCP server or MCP transport is claimed. |
| [Knowledge and RAG](specs/knowledge-rag/) | **Bohdan Obukh** | Task 1 / KR-1; shared T4: two synthetic fixtures, keyword retrieval, exact excerpts, linked citations and missing-evidence fallback | Planned ingestion/indexing → lexical retrieval and extractive answer composition. Embeddings, real documents and generative synthesis are deferred. |
| [Evaluation and guardrails](specs/evaluation-guardrails/) | **Ilya Vorobiov** | Task 1 / EG-1; shared T7: runtime private/write-request limitations, bounded inputs, registry enforcement and eight automated acceptance cases | Expanded evaluations/future approval flow → connected read-only policy and current automated cases. No write feature exists, so approval execution is deferred. |

Each feature has its own `spec.md`, `plan.md`, and `tasks.md` beneath `specs/`. The three integrated features are local tool integration, retrieval with grounded answers, and runtime guardrails/evaluation; they are not claimed to be three completed external services.

## 4. Acceptance check traced to its criterion

- **Task:** [campus-support/tasks.md, T5](specs/campus-support/tasks.md), owned by **Kateryna Beliai**, with the tool interface owned by **Danylo Mintii**.
- **Criterion:** [campus-support/spec.md, AC-2 and AC-3](specs/campus-support/spec.md): course-information questions use registered read-only tools, and citations correspond to retrieved results.
- **Command:** `pnpm test` (equivalently, `node --import tsx --test evaluation/agent.test.ts`).
- **Case:** `T5 / AC-2, AC-3: course request calls registered search and cites its exact result` in [agent.test.ts](evaluation/agent.test.ts).
- **Observation:** the result calls `search_course_materials`; the returned source ID is `demo-assignment`; answer sources equal the tool output; answer text includes the returned excerpt.
- **Result:** **PASS**. Overall automated suite: **8 passed, 0 failed**. See [tests.txt](evidence/tests.txt).
- **Reviewers and method:** **Codex** executed and inspected the automated checks. **Ilya Vorobiov** also checked the acceptance scenario manually and confirmed it passed, as reported by **Kateryna Beliai**. The automated observation above traces the result to AC-2 and AC-3; the manual review is a separate team-confirmed check, not an additional automated test run.
- **Failures/limits:** no failed automated case remains. Passing the demo suite does not verify Gemini, actual MCP protocol integration, hosting, or broad natural-language safety. The initial dependency installation required explicitly allowing the `esbuild` install script; the subsequent install completed successfully.

Additional build, typecheck and browser outcomes are recorded in [verification.md](evidence/verification.md).

## 5. Each member's connected module and work links

| Member | Named module | Implementation and work links | Connection |
| --- | --- | --- | --- |
| **Kateryna Beliai** | Product and Agent Experience | [chat](app/page.tsx), [API](app/api/chat/route.ts), [orchestrator](src/agent/run.ts), [provider](src/agent/provider.ts), [shared contracts](src/types/contracts.ts) | Browser sends a request to the API; agent invokes policy and registry; UI displays answers, sources and tool trace. |
| **Danylo Mintii** | MCP Tools and Integrations | [registry](src/tools/registry.ts), [search adapter](src/tools/search-course-materials.ts), [tasks](specs/mcp-integrations/tasks.md) | Registry accepts only the declared read-only tool and invokes Bohdan's retrieval implementation. |
| **Bohdan Obukh** | Knowledge Base and RAG | [retrieval](src/knowledge/retrieve.ts), [corpus loader](src/knowledge/load-corpus.ts), [source fixtures](content/synthetic/sources.json), [source page](app/sources/[id]/page.tsx) | Search supplies excerpts and IDs to the agent; citations open the corresponding source page. |
| **Ilya Vorobiov** | Evaluation, Testing and Guardrails | [runtime policy](src/policy/action-policy.ts), [acceptance suite](evaluation/agent.test.ts), [evidence capture](evaluation/evidence.ts), [test results](evidence/tests.txt) | Policy runs before dispatch; tests exercise the same agent and API used by the UI. |

Each member contributed to and was responsible for their assigned part: **Kateryna Beliai** — product, chat and agent experience; **Danylo Mintii** — tool contracts and integration; **Bohdan Obukh** — knowledge sources, retrieval and citations; **Ilya Vorobiov** — evaluation, guardrails and manual acceptance review. These contributions and responsibilities are confirmed by the team through **Kateryna Beliai**. The table links to the corresponding work artifacts. Codex assisted with implementation and automated verification; no individual commit or PR authorship is inferred from these file links. Upload the complete project so the relative links resolve in the repository.

## 6. Short status note

**Works locally:** Next.js UI/API, rule-based tool selection, actual registered search calls, synthetic lexical retrieval, extractive answers, clickable source pages, visible call evidence, missing-evidence responses, request validation and tested limitation cases. No external model calls or persistent chat storage are used.

**Stubbed/deferred:** Gemini provider and its consent flow, MCP transport, embeddings/document ingestion, real university materials, live Canvas, write capabilities, and Vercel deployment. English is the only supported demo language. Regex policy checks are limited heuristics; no claim of robust multilingual intent detection is made. Safety also relies on having no write/private-data tools at all.

**Biggest open risk:** the checkpoint may require LLM-driven tool choice or a real MCP server beyond the permitted runnable stub. **Kateryna Beliai** owns confirming this interpretation with the instructor; **Danylo Mintii** owns an MCP follow-up if needed. The current report explicitly describes the implementation's limits.

**Team confirmation:** **Ilya Vorobiov** completed the manual acceptance review, and **all four members** confirmed their AI-use logs and module contributions, as reported by **Kateryna Beliai**.

**Before submission:** **Kateryna Beliai** must verify instructor access to the private repository and have one team member upload this completed `milestone1.md` file to the assignment. Repository visibility and collaborator invitations have not been verified here.

## 7. Per-member AI-use log

**Tool used by all members: GPT.** Each member confirmed that they used GPT for their assigned module, accepted useful output after checking it, and changed or rejected output that was incorrect or could cause harm. Each member checked the resulting work within their area of responsibility. These personal confirmations were reported by **Kateryna Beliai**. Codex separately assisted with implementation and ran the automated checks documented in `evidence/`; **Ilya Vorobiov** additionally performed the manual acceptance review.

| Member | Module and AI-assisted work | Accepted, changed or rejected | How it was checked | Confirmation |
| --- | --- | --- | --- | --- |
| **Kateryna Beliai** | Product and Agent Experience: chat, request routing, response presentation and agent behavior | Accepted useful GPT assistance for her module after checking it; changed or rejected incorrect or potentially harmful suggestions | Checked the work in her assigned module; supporting project evidence includes the build/type checks, API workflow and browser verification | Confirmed, as reported by Kateryna Beliai |
| **Danylo Mintii** | MCP Tools and Integrations: tool contracts and local integration | Accepted useful GPT assistance for his module after checking it; changed or rejected incorrect or potentially harmful suggestions | Checked the work in his assigned module; supporting automated evidence covers registered-tool dispatch and rejection of unknown tools or invalid inputs | Confirmed, as reported by Kateryna Beliai |
| **Bohdan Obukh** | Knowledge Base and RAG: source data, retrieval and citations | Accepted useful GPT assistance for his module after checking it; changed or rejected incorrect or potentially harmful suggestions | Checked the work in his assigned module; supporting automated evidence covers source matching, citations and missing-evidence responses | Confirmed, as reported by Kateryna Beliai |
| **Ilya Vorobiov** | Evaluation, Testing and Guardrails: policy, acceptance checks and quality review | Accepted useful GPT assistance for his module after checking it; changed or rejected incorrect or potentially harmful suggestions | Checked his assigned module and manually reviewed the acceptance scenario; Codex separately ran the eight passing automated tests | Confirmed, as reported by Kateryna Beliai |

The automated results are recorded in [tests.txt](evidence/tests.txt) and [verification.md](evidence/verification.md). Team confirmation of personal checks is recorded above; it does not imply that every member personally executed every automated command.
