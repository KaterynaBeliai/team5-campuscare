# Read-only tool integration

Owner: **Danylo Mintii**.

## Acceptance criterion

- MI-1: Registered search dispatch validates the tool name and input, returns source records, and rejects unregistered or write tools.

Integration: browser → API → agent → policy/tool registry → retrieval → cited answer.

Implementation: [src/tools/](../../src/tools/). Only synthetic data; no credentials or external source connection.
