import { retrieve, type RetrievalMode } from '../knowledge/retrieve';
import { corpus } from '../knowledge/load-corpus';
import { unsafeSource } from '../policy/action-policy';
import type { KnowledgeSource } from '../types/contracts';
export const toolDefinition = {
 name:'search_course_materials',description:'Search synthetic course material. Read-only; no Canvas connection.',access:'read',
 inputSchema:{type:'object',properties:{query:{type:'string',minLength:1,maxLength:1000}},required:['query'],additionalProperties:false},
 outputSchema:{type:'array',items:{type:'object',required:['id','title','section','url','text']}}
} as const;
// Options are server-only dependency injection for isolated evaluation. HTTP callers cannot set them.
export type SearchOptions = { retrieval?:RetrievalMode; sources?:KnowledgeSource[]; filterSources?:boolean };
export function callTool(name:string,input:unknown,options:SearchOptions={}) {
 if(name!==toolDefinition.name) throw new Error('Tool is not registered');
 if(!input||typeof input!=='object'||Array.isArray(input)) throw new Error('Invalid tool input');
 const args=input as Record<string,unknown>;
 if(Object.keys(args).some(k=>k!=='query')||typeof args.query!=='string'||!args.query.trim()||args.query.length>1000) throw new Error('Invalid tool input');
 const result=retrieve(args.query.trim(),options.sources??corpus,options.retrieval);
 // Only inventory IDs with their canonical local URLs may reach the answer.
 return result.filter(s=> {
  const approved=corpus.find(c=>c.id===s.id);
  if(!approved||s.url!==approved.url||typeof s.text!=='string') return false;
  return options.filterSources===false||!unsafeSource(s.text);
 });
}
