# Release confirmation — 24 November 2026

Application commit: `1ec595c764dc925bfc2463bccccd82b761dd5e3c`.
Production deployment: `dpl_EX6UpnBeFAVGKKiNTidXs8XmZNE8`, READY.
URL: https://team5-campuscare.vercel.app/

Vercel metadata confirmed the production secret was updated. The missing non-secret `GEMINI_ENABLED=true` was restored and `GEMINI_MODEL=gemini-3.5-flash-lite` configured before the new deployment. Secret values are excluded from evidence.

Observed API smoke: POST /api/chat with message “What are the assignment requirements?” and consent=true returned mode=gemini, model=gemini-3.5-flash-lite, a search_course_materials call, source demo-assignment, provider completed and grounding verified. No fallback was returned. This is a single successful smoke, not a rerun of the full evaluation.

Kateryna Beliai confirmed that all team members completed their assigned contributions and corrections. This is reported team-owner confirmation. No exact unprovided human edits, personal quotations, new model trials or independently observed individual reviews are inferred.
