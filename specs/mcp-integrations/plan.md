# Read-only tool integration: plan

Owner: **Danylo Mintii**.

## Milestone 1 re-planning

MCP transport planned → milestone 1 uses an in-process typed registry. It is an integrated mock adapter, not an MCP server.

Connect through the contracts in `src/types/contracts.ts`. Preserve the shared no-write and no-private-data boundaries.

Danylo Mintii confirmed their module contribution and checked GPT-assisted work, as reported by Kateryna Beliai. Ilya Vorobiov completed the manual acceptance review; see `../../milestone1.md`.
