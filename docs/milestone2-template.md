# Milestone 2: Release-Ready Version (Week 14, team, out of class)

One member uploads this completed file to its Canvas assignment for the team. This is the version you defend in Week 15. Point to the repository's `specs/` folder rather than copying it.

## Version and deployment

- Private repository link: <URL>
- Submitted commit, tag or version: <exact version>
- Public URL on the free host: <URL>
- Usage instructions: <how to use the main workflow>

## Final check per feature

`specs/` is current: every task is marked done, failed or re-planned. Check every feature listed in `specs/project.md` against its specification: the agent and at least three integrated features, such as MCP servers, Agent Skills and RAG.

| Feature folder | Criterion | Met | Evidence |
| --- | --- | --- | --- |
| `<agent feature>/` | AC-1 | <yes or no> | <test, trace or observation> |
| `<feature>/` | AC-1 | <yes or no> | <test, trace or observation> |
| `<feature>/` | AC-1 | <yes or no> | <test, trace or observation> |
| `<feature>/` | AC-1 | <yes or no> | <test, trace or observation> |

## Tests

- Command: <command>
- Result: <pass, or each failure explained>

## Evaluation

Keep the evaluation in an `evals/` folder in the repository, beside `specs/`, with one folder per suite. Point to it rather than copying it.

Each suite folder holds:

- `README.md`: what the suite checks, the command that runs it, and its results
- a cases file: each case's input, whether the agent should act or decline, a pass criterion a person writes before any run, and where the case came from
- the grader: code that reads the outcome, such as the app's stored data or the tool results, rather than the agent's reply
- `runs/`: three trials per case, each saved with its trace, the model identifier and the settings, so the grader re-scores them with no model call

A model judge may replace code only where code cannot read the outcome, and only with its agreement with your own labels on at least 10 outputs, given as kappa. Record each run once and commit it: Ollama runs cost nothing, and OpenRouter `:free` models limit requests per day.

### Task suite: `evals/task/`

- Evaluated task: <the agent's main task>
- Cases: <number, at least 10; how many are decline cases, at least 2; where they came from, such as failures read in the app's traces>
- Grader: <what it reads; for a model judge, its kappa against your labels>
- Trials: <trials per case; model identifier and settings>
- Controlled comparison: <one change, such as a prompt, model, tool or retrieval setting, run in `runs/baseline/` and `runs/candidate/` with everything else held fixed>
- Result: <both pass rates, each with its 95% interval, and the claim worded for those intervals>
- One failure traced: <trial, its first failing step in the trace, and the cause>

### Security suite: `evals/security/`

- Attacks: <number of adversarial cases, at least 5, such as prompt injection typed by a user or hidden in retrieved or tool content>
- Outcome that must not happen: <per case, such as a tool call without approval or private data in the reply>
- Guardrails: <each guardrail, where it sits (input, retrieved or tool content, before a tool call) and its owner>
- Before and after: <attacks resisted over attack trials, in `runs/before-guardrails/` and `runs/after-guardrails/`, everything else held fixed>
- Remaining risk: <each attack that still succeeds, and why it is accepted or what would close it>

## Responsible-use audit

| Area | Finding | Mitigation | Remaining limitation | Owner |
| --- | --- | --- | --- | --- |
| Bias | <finding> | <mitigation> | <limitation> | <member> |
| Privacy | <finding> | <mitigation> | <limitation> | <member> |
| Intellectual property | <finding> | <mitigation> | <limitation> | <member> |
| Disclosure | <finding> | <mitigation> | <limitation> | <member> |

## AI-use disclosure

- Accountable owner of the app: <member>

## Status

- Changed since Milestone 1: <changes>
- Open issues: <issues>
- Biggest remaining risk: <risk>

## Modules and AI-use log

| Member | Module | Link to their work | Tool and task | Accepted, changed or rejected | How it was checked |
| --- | --- | --- | --- | --- | --- |
| <name> | <module> | <link> | <tool: task> | <decision> | <check> |
