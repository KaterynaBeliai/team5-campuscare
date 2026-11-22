import { readFileSync,writeFileSync,mkdirSync,existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { runAgent, type RunOptions } from '../src/agent/run';
import { runModelAgent } from '../src/agent/model';
import { corpus } from '../src/knowledge/load-corpus';
import type { Case,Trial } from './grader';
const hash=(s:string)=>createHash('sha256').update(s).digest('hex');
async function main(){
 const mode=process.argv[2];if(!['demo','gemini'].includes(mode)) throw new Error('Usage: pnpm eval:run demo|gemini');
 if(mode==='gemini'&&(!process.env.GEMINI_API_KEY||!process.env.GEMINI_MODEL||process.env.GEMINI_ENABLED!=='true')) throw new Error('Configure Gemini before collecting trials; no demo substitution allowed');
 const codeVersion=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
 if(execFileSync('git',['status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim()) throw new Error('Commit code and criteria before collecting immutable trials');
 for(const suite of ['task','security']){
  const raw=readFileSync(`evals/${suite}/cases.json`,'utf8');const cases:Case[]=JSON.parse(raw);
  const conditions=suite==='task'?['baseline','candidate']:['before-guardrails','after-guardrails'];
  for(const condition of conditions)for(const c of cases)for(let trial=1;trial<=3;trial++){
   const folder=`evals/${suite}/runs/${mode}/${condition}`;mkdirSync(folder,{recursive:true});const path=`${folder}/${c.id}-${trial}.json`;
   if(existsSync(path)) throw new Error(`Refusing to overwrite ${path}`);
   const options:RunOptions={retrieval:condition==='baseline'?'literal':'expanded'};
   if(suite==='security') {options.guardrails=condition!=='before-guardrails';options.filterSources=options.guardrails;}
   let input=c.input??c.payload??'';
   if(suite==='security'&&c.surface!=='user') {input='What are the assignment requirements?';options.sources=[{...corpus[0],text:c.payload!}];}
   const started=Date.now();const record:Trial={schemaVersion:1,suite,case:c,trial,condition,codeVersion,criteriaHash:hash(raw),corpusHash:hash(JSON.stringify(corpus)),model:mode==='gemini'?process.env.GEMINI_MODEL!:'campuscare-rule-agent-v2 (no LLM)',settings:{temperature:mode==='gemini'?0:null,maxSteps:2,maxRetries:0,...options,sources:options.sources?'synthetic attack fixture':undefined},startedAt:new Date().toISOString(),durationMs:0};
   try {record.result=mode==='gemini'?await runModelAgent(input,options):runAgent(input,undefined,options);}catch {record.error='Provider or execution failed; credentials and raw error omitted';}
   record.durationMs=Date.now()-started;writeFileSync(path,JSON.stringify(record,null,2)+'\n',{flag:'wx'});
   console.log(`${suite}/${condition}/${c.id}/${trial}: recorded`);
  }
 }
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
