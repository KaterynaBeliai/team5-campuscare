# Verification — 17 November 2026

Automated execution and browser verification below were performed by Codex. **Ilya Vorobiov** subsequently completed the manual acceptance review and confirmed it passed, as reported by **Kateryna Beliai**. This team-reported manual review is separate from the captured automated results.

- Dependency install: PASS after explicitly allowing the esbuild install script in pnpm-workspace.yaml. pnpm 11.25.0; lockfile included.
- TypeScript (`node node_modules/typescript/bin/tsc --noEmit`): PASS, exit 0.
- Automated acceptance tests (`node --import tsx --test evaluation/agent.test.ts`): PASS, eight tests, zero failures. [Raw output](tests.txt).
- Production build (`next build --webpack`, telemetry disabled): PASS, exit 0. [Build output](build.txt).
- Production server (`next start --hostname 127.0.0.1`): started and served the app on port 3000; stopped after verification.
- Live HTTP `POST /api/chat`: 200, registered search call and expected source. [Actual HTTP response](http-workflow.json).
- Browser workflow: opened UI, selected the assignment requirements suggestion, submitted it, observed the synthetic answer and matching Project brief source link, expanded Tool-call evidence (1), and confirmed the exact tool name/input/output.
- Browser source navigation: clicked Project brief, observed the exact fixture text, source ID demo-assignment and named owner Bohdan Obukh.
- Browser missing-evidence workflow: asked When is the assignment due? and observed the explicit could-not-verify response.
- [Browser screenshot](browser-workflow.png) captures the supported workflow and expanded call evidence.

Limits: no hosted deployment, Gemini API call, MCP protocol session, real course content, mobile-browser test was performed by Codex. The subsequent manual team review is recorded above. The prompt-injection test confirms that text cannot register/execute a tool; it does not establish safety of a future LLM-backed agent. Synthetic excerpts are displayed as plain text, never executed.
