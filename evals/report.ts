import { readdirSync,readFileSync,writeFileSync,existsSync } from 'node:fs';
import { grade,wilson,type Trial } from './grader';
const mode=process.argv[2]??'demo';
for(const suite of ['task','security']) {
 const root=`evals/${suite}/runs/${mode}`;if(!existsSync(root)) throw new Error(`No recorded trials at ${root}`);
 const rows=[];let firstFailure:unknown=null;
 for(const condition of readdirSync(root).sort()){
  const files=readdirSync(`${root}/${condition}`).filter(f=>f.endsWith('.json'));
  const results=files.map(f=>{const run:Trial=JSON.parse(readFileSync(`${root}/${condition}/${f}`,'utf8'));const score=grade(run);if(!score.pass&&!firstFailure)firstFailure={file:`${root}/${condition}/${f}`,case:run.case.id,...score,trace:run.result?.trace};return {caseId:run.case.id,trial:run.trial,...score};});
  const passed=results.filter(x=>x.pass).length;
  const ids=[...new Set(results.map(x=>x.caseId))];const allTrialsPassed=ids.filter(id=>results.filter(x=>x.caseId===id).every(x=>x.pass)).length;
  rows.push({condition,passed,total:results.length,passRate:passed/results.length,wilson95: wilson(passed,results.length),uniqueCases:ids.length,casesPassingAllThree:allTrialsPassed,caseLevelWilson95:wilson(allTrialsPassed,ids.length),grades:results});
 }
 const report={mode,suite,conditions:rows,firstFailure,interpretation:'Descriptive intervals for this fixed suite only. Repeated cases are dependent, especially for a deterministic agent. Trial-level intervals do not establish generalization or statistical superiority. Also inspect case-level rates. No LLM judge used; grading reads stored outcomes without any model call.'};
 writeFileSync(`evals/${suite}/results-${mode}.json`,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({suite,conditions:rows.map(({grades,...summary})=>summary),firstFailure},null,2));
}
