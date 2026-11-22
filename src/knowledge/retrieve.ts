import { corpus } from './load-corpus';
import type { KnowledgeSource } from '../types/contracts';
export type RetrievalMode = 'literal'|'expanded';
const stop = new Set(['what','when','where','which','does','have','with','from','that','this','please','about','course','student']);
const synonyms: Record<string,string[]> = {coursework:['assignment'],homework:['assignment'],deliverables:['requirements'],include:['requirements'],consultation:['office','hours'],consultations:['office','hours'],lecturer:['instructor']};
export function retrieve(query: string, sources: KnowledgeSource[] = corpus, mode: RetrievalMode = 'expanded'): KnowledgeSource[] {
 const original=[...new Set(query.toLowerCase().match(/[a-z]+/g)??[])].filter(w=>w.length>2&&!stop.has(w));
 if (/\b(due|deadline|date)\b/i.test(query)) return [];
 const words=new Set(original.flatMap(w=>mode==='expanded'?[w,...(synonyms[w]??[])]:[w]));
 return sources.map(source=>({source,score:source.keywords.filter(w=>words.has(w)).length})).filter(r=>r.score>0).sort((a,b)=>b.score-a.score).slice(0,2).map(r=>r.source);
}
