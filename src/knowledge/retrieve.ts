import { corpus } from './load-corpus';
import type { KnowledgeSource } from '../types/contracts';
const stop = new Set(['what','when','where','which','does','have','with','from','that','this','please','about','course','student']);
export function retrieve(query: string, sources: KnowledgeSource[] = corpus): KnowledgeSource[] {
 const words = [...new Set(query.toLowerCase().match(/[a-z]+/g) ?? [])].filter(w => w.length > 2 && !stop.has(w));
 // Dates are absent from the reviewed fixture: don't answer due-date questions with a vaguely related brief.
 if (/\b(due|deadline|date)\b/i.test(query)) return [];
 return sources.map(source => ({source, score: words.filter(w => source.keywords.includes(w)).length}))
  .filter(row => row.score >= 1).sort((a,b) => b.score-a.score).slice(0,2).map(row=>row.source);
}
