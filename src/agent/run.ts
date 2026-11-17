import { demoProvider, type AgentProvider } from './provider';
import { callTool } from '../tools/registry';
import { limitation } from '../policy/action-policy';
import type { AgentResult } from '../types/contracts';
export function runAgent(message: string, provider: AgentProvider = demoProvider): AgentResult {
 if (typeof message !== 'string' || !message.trim() || message.length > 1000) throw new Error('Enter a question between 1 and 1,000 characters.');
 const base: AgentResult = {answer:'',sources:[],toolCalls:[],mode:'deterministic-demo',uncertainty:false,approval:'not-required'};
 const blocked = limitation(message);
 if (blocked) return {...base,answer:blocked,approval:'blocked'};
 const decision = provider.choose(message.trim());
 if (decision.kind==='greeting') return {...base,answer:'Hello! Ask about the synthetic assignment requirements or office hours.'};
 const sources = callTool(decision.name,decision.input);
 return {...base, sources, toolCalls:[{name:decision.name,input:decision.input,output:sources}], uncertainty: sources.length===0,
  answer: sources.length ? 'Synthetic demonstration material:\n\n'+sources.map(s=>s.text).join('\n\n') : 'I could not verify the answer in the synthetic course material. Please check your actual course page or ask your instructor.'};
}
