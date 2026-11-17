# Runtime guardrails and evaluation

Owner: **Ilya Vorobiov**.

## Acceptance criterion

- EG-1: The API invokes validation and action policy before tool dispatch. Private-record and write requests are limited, and test cases run against the same pipeline.

Integration: browser → API → agent → policy/tool registry → retrieval → cited answer.

Implementation: [src/policy/](../../src/policy/). Only synthetic data; no credentials or external source connection.
