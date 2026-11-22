# CampusCare — milestone 2 candidate

A runnable, English-only course-information prototype using **synthetic examples**. It is not an official university service.

## Run

Requires Node.js 22+ and pnpm. From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. Ask **What are the assignment requirements?**, inspect the tool-call evidence, and open the cited synthetic source. Try **When is the assignment due?** for the missing-evidence case.

```sh
pnpm test
pnpm typecheck
pnpm build
pnpm evidence
```

For production locally: `pnpm build` then `pnpm start`. No API key is needed. By default the server sends no prompts externally. Optional Gemini mode requires server configuration and explicit per-request user consent. No message bodies are logged by application code; chat exists only in the open browser view.

## Connected modules

| Named owner | Module | Implementation |
| --- | --- | --- |
| Kateryna Beliai | Product and Agent Experience | `app/`, `src/agent/` |
| Danylo Mintii | MCP Tools and Integrations | `src/tools/` (local registry; MCP transport deferred) |
| Bohdan Obukh | Knowledge Base and RAG | `src/knowledge/`, `content/synthetic/` |
| Ilya Vorobiov | Evaluation, Testing and Guardrails | `src/policy/`, `evaluation/` |

Browser → same-origin API → deterministic agent → policy and registry → keyword retrieval → extractive answer with source links. The policy executes before any tool call. Greeting requests call no tool. Other allowed requests select the registered course-search tool. This is a rule-based agent stub, not LLM inference. Retrieval is lexical and the answer quotes retrieved excerpts; embeddings and generative synthesis are deferred.

See [specs/](specs/), [milestone1.md](milestone1.md), and [workflow evidence](evidence/workflow.json). All code in this checkpoint was AI-assisted; the named owners have confirmed their module contributions and personal GPT-use entries through Kateryna Beliai. Ilya Vorobiov completed the manual acceptance review; see milestone1.md.

## Deployment follow-up

Kateryna Beliai owns the planned Vercel deployment; Danylo Mintii reviews configuration. Import the private repository into Vercel with Next.js defaults, use the repository root, and deploy the demo without environment secrets. Hosting has not been executed or verified here. Add hosting rate limits before wider use. Do not enable an external model until its API/model availability is verified and explicit consent is implemented. Real materials require instructor authorization.

## Optional Gemini mode

Set server-only `GEMINI_API_KEY`, `GEMINI_MODEL` (verify an available function-calling model for your account), and `GEMINI_ENABLED=true`. Use a project with billing disabled if the demo must remain free. Never commit keys. The consent checkbox is off by default and resets on reload. Private-record/write/injection requests detected by policy are blocked before any external call. The response shows actual mode; provider failures fall back to demo with an explanation.

AI SDK 7 handles bounded model/tool steps. The answer is composed from validated returned excerpts; arbitrary generated text is not shown as a factual answer. Sources are synthetic; no Canvas integration exists. No MCP transport or embeddings are claimed.

## Evaluation

`pnpm eval:run demo` records three trials per case in both conditions, once, after code is committed. `pnpm eval:grade demo` replays the code grader offline. Use `gemini` in place of `demo` only with server credentials configured locally; missing model access is an error, never a silent demo run. Task suite: 12 cases / 5 declines. Security suite: 6 attacks. See `evals/` for provenance and interval caveats. These are AI-assisted criteria with user-reported Ilya review, not independently human-written criteria.

## Known limits

No production-wide rate limiting; regex personal-data detection is incomplete. Do not enter sensitive data. Model-provider processing terms and quotas must be checked for the account. Real course information, persistent conversation, authentication and writes are outside scope. The release report distinguishes demo from live-model results.
