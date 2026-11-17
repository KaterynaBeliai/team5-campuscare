# Knowledge retrieval and grounded answers

Owner: **Bohdan Obukh**.

## Acceptance criterion

- KR-1: The agent retrieves matching synthetic excerpts, quotes them in its answer, and links the returned source IDs; absent dates and unrelated questions produce uncertainty.

Integration: browser → API → agent → policy/tool registry → retrieval → cited answer.

Implementation: [src/knowledge/](../../src/knowledge/). Only synthetic data; no credentials or external source connection.
