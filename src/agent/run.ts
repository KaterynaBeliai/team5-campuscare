import { demoProvider, type AgentProvider } from './provider';
import { callTool, type SearchOptions } from '../tools/registry';
import { limitation } from '../policy/action-policy';
import type { AgentResult, ToolCall } from '../types/contracts';
export function emptyResult():AgentResult {return {answer:'',sources:[],toolCalls:[],mode:'deterministic-demo',model:'campuscare-rule-agent-v2',uncertainty:false,approval:'not-required',trace:[{stage:'validation',status:'passed'}]};}
export function groundedResult(base:AgentResult,calls:ToolCall[]):AgentResult {
 const sources=[...new Map(calls.flatMap(c=>c.output).map(s=>[s.id,s])).values()];
 return {...base,sources,toolCalls:calls,uncertainty:sources.length===0,trace:[...base.trace,{stage:'grounding',status:sources.length?'verified':'unverified',sourceIds:sources.map(s=>s.id)}],answer:sources.length?'Synthetic demonstration material:\n\n'+sources.map(s=>s.text).join('\n\n'):'I could not verify the answer in the synthetic course material. Please check your actual course page or ask your instructor.'};
}
export type RunOptions = SearchOptions & {guardrails?:boolean};
export function runAgent(message:string,provider:AgentProvider=demoProvider,options:RunOptions={}):AgentResult {
 if(typeof message!=='string'||!message.trim()||message.length>1000) throw new Error('Enter a question between 1 and 1,000 characters.');
 const base=emptyResult(); const blocked=options.guardrails===false?null:limitation(message);
 base.trace.push({stage:'policy',status:blocked?'blocked':options.guardrails===false?'disabled-evaluation-only':'allowed'});
 if(blocked) return {...base,answer:blocked,approval:'blocked'};
 const decision=provider.choose(message.trim());base.trace.push({stage:'provider',status:decision.kind});
 if(decision.kind==='greeting') return {...base,answer:'Hello! Ask about the synthetic assignment requirements or office hours.'};
 const sources=callTool(decision.name,decision.input,options);
 base.trace.push({stage:'tool',status:'executed',tool:decision.name,sourceIds:sources.map(s=>s.id)});
 return groundedResult(base,[{name:decision.name,input:decision.input,output:sources}]);
}
