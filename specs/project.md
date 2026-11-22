# CampusCare: project plan

## Project

- Members (4): Kateryna Beliai, Danylo Mintii, Bohdan Obukh, Ilya Vorobiov
- Private repository: [team5-campuscare](https://github.com/KaterynaBeliai/team5-campuscare)
- Instructor collaborator: `ozelalisen` and `kateryna.abramova@auk.edu.ua` (verify both invitations in GitHub before submission)
- The app in one sentence: CampusCare helps students find verified answers in instructor-approved course materials through a web chat whose agent selects and calls narrowly scoped tools.
- MVP audience: students seeking course information; the MVP uses only synthetic examples or course materials explicitly approved and supplied for this project, with no student account or record access.

## Named modules

| Member | Module they own and defend |
| --- | --- |
| Kateryna Beliai | Product and Agent Experience: chat, request routing, response presentation, and initial agent behavior |
| Danylo Mintii | MCP Tools and Integrations: typed tool contracts, mock tools in the MVP, and later MCP adapters |
| Bohdan Obukh | Knowledge Base and RAG: approved source curation, retrieval, citations, and later document indexing |
| Ilya Vorobiov | Evaluation, Testing and Guardrails: action policy, approval flow, test cases, and quality reporting |

## Architecture

- Components: Next.js browser app; same-origin server API route; Gemini-backed agent orchestration behind a provider interface; deterministic demo agent; typed tool registry; instructor-approved course-material corpus; source references; and server-side action policy. No login, live Canvas connection, student database, or persistent chat history in the MVP.
- Deployment: Vercel Hobby under Kateryna Beliai's personal account, with production deployment run by Kateryna from the repository root after reviewed changes are merged. This avoids requiring paid Vercel team collaboration features. The app is a noncommercial class prototype. Keep standard Next.js build settings and server-only environment variables; verify the Hobby account can deploy the private project before the checkpoint demo.
- No-cost operation: synthetic course examples and mock read-only tools are bundled with the app. The agent can use `gemini-3.8-flash` on the Gemini Developer API Free Tier after the user accepts the model-processing notice. Set request-size limits; do not attach billing or silently fall back to a paid endpoint. If the model quota is unavailable or consent is declined, use a labeled deterministic demo mode. Recheck model availability and free-tier terms before the demonstration because quotas and model availability can change.
- Data privacy: use synthetic examples for the MVP. Do not connect to Canvas, collect Canvas credentials, student identifiers, grades, submissions, or private feedback. Any real course materials require instructor approval that explicitly covers both project use and sending excerpts to the model provider; otherwise keep them out of the model-backed path. Before the first model-backed request in a session, disclose that the question and relevant synthetic/approved excerpts are sent to Google's Gemini API Free Tier and ask the user to agree; Google states that Free Tier content may be used to improve its products. If the user declines, do not send the prompt externally and use deterministic demo mode. Tell users not to enter personal or confidential information. Never log message bodies, secrets, or personal data. Keep any model key server-side. Provide a clear notice that the MVP is an informational prototype and not an official university channel.
- Repository hygiene: keep planning files under `specs/`, app source outside `specs/`, use `.env.example` for variable names only, and never commit secrets or private source documents.

## Features

| Folder | Feature | Owner | State | Dependency |
| --- | --- | --- | --- | --- |
| `campus-support/` | Initial course-information assistant over approved or synthetic course materials | Kateryna Beliai | demo implemented; module contribution confirmed | none |
| `mcp-integrations/` | Add MCP adapters for approved, read-only sources, including Canvas only if explicitly authorized | Danylo Mintii | demo implemented; module contribution confirmed | `campus-support/` tool contracts; instructor authorization for Canvas |
| `knowledge-rag/` | Expand approved course-material ingestion, retrieval, and citation quality | Bohdan Obukh | demo implemented; module contribution confirmed | `campus-support/` source contract |
| `evaluation-guardrails/` | Add repeatable evaluations, expanded guardrails, and human approval for any future write action | Ilya Vorobiov | demo implemented; module contribution confirmed | `campus-support/` response/action contracts |

Each feature folder contains its own `spec.md`, `plan.md`, and `tasks.md`. The later features are independent additions to the first feature's stable interfaces; they do not expand the MVP's data permissions by default.

## Shared interface contracts

- `KnowledgeSource`: stable source ID, title, public URL or repository-relative path, section, text excerpt, and last-reviewed date.
- `Tool`: stable name, plain-language purpose, JSON input schema, JSON output schema, read/write classification, timeout, and error shape. The agent may call only registered tools.
- `AgentResult`: answer text, source references, tool-call summary, uncertainty state, and approval state. Never include internal secrets or hidden reasoning.
- `ActionPolicy`: default deny for writes; a future write tool must be separately registered, require explicit user confirmation immediately before execution, and report the result without claiming success before the tool confirms it.

## Checkpoint status

All four module folders now exist beneath `specs/`. The code was prepared with Codex assistance from the team plan. Named module ownership is unchanged. Kateryna Beliai confirmed each member’s module contribution and GPT-use checks, and Ilya Vorobiov’s completed manual acceptance review. See [milestone1.md](../milestone1.md) for observed evidence and remaining submission steps. Gemini, MCP transport and Vercel deployment are deferred.

## Milestone 2 changes

The integrated release adds optional Gemini tool selection, consent-gated external processing, deterministic fallback, expanded lexical retrieval, source quarantine, structured traces and replayable task/security suites. The public baseline is https://team5-campuscare.vercel.app. Final release evidence belongs in `milestone2.md`; do not treat the baseline commit as the completed release.

- **Kateryna Beliai:** model adapter, consent/UI/API, release and disclosure.
- **Danylo Mintii:** bounded registered-tool integration and canonical output validation; MCP protocol adapter remains re-planned.
- **Bohdan Obukh:** synonym expansion, synthetic corpus/citations and retrieval comparison; embeddings remain re-planned.
- **Ilya Vorobiov:** policy, source quarantine, outcome grader, evaluation cases and responsible-use audit. User-reported criteria review is recorded without inventing his specific edits.
