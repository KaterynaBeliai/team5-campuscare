'use client';
import { useState, type FormEvent } from 'react';
import type { AgentResult } from '../src/types/contracts';
export default function Page() {
 const [consent,setConsent]=useState(false);
 const [question,setQuestion]=useState(''); const [result,setResult]=useState<AgentResult|null>(null);
 const [error,setError]=useState(''); const [busy,setBusy]=useState(false);
 async function ask(event:FormEvent) {
  event.preventDefault(); setError('');setResult(null);
  if(!question.trim()) {setError('Enter a question first.');return;}
  setBusy(true);
  try {const response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:question,consent})}); const data=await response.json(); if(!response.ok) throw new Error(data.error);setResult(data);}
  catch(e) {setError(e instanceof Error?e.message:'Something went wrong. Please try again.');} finally {setBusy(false);}
 }
 return <main>
  <header><a className="brand" href="/">✳ CampusCare</a><span className="badge">TEAM 05 / MILESTONE 02</span></header>
  <section className="intro"><p className="eyebrow">A LITTLE CLARITY FOR YOUR COURSE</p><h1>Find the answer.<br/><span>See the source.</span></h1><p className="lede">Ask a course question and follow the evidence, from a read-only tool call to the material behind your answer.</p></section>
  <div className="grid"><section className="chat"><div className="sectionhead"><h2>Your course companion</h2><span className="pill">{result?.mode==='gemini'?'Gemini + verified sources':'Local demo'}</span></div>
   <p className="muted">English · synthetic sample material · optional Gemini mode</p>
   <div className="consent"><label><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/> Use Gemini for this session</label><p className="muted">Optional: your question and retrieved synthetic excerpts will be sent to Google. Free-tier content may be used to improve Google products. Do not include personal or confidential information. Leave unchecked to keep processing local. If Gemini is unavailable, the answer is labeled as a local demo.</p></div><form onSubmit={ask}><label htmlFor="question">What would you like to know?</label><textarea id="question" value={question} onChange={e=>setQuestion(e.target.value)} maxLength={1000} placeholder="What are the assignment requirements?" rows={4}/><div className="formfoot"><small>{question.length}/1000</small><button disabled={busy}>{busy?'Checking sources…':'Find an answer'}</button></div></form>
   <div className="suggestions">{['What are the assignment requirements?','When are office hours?','When is the assignment due?'].map(q=><button className="suggestion" key={q} onClick={()=>setQuestion(q)}>{q}</button>)}</div>
   <div aria-live="polite" aria-busy={busy}>{error&&<p role="alert" className="error">{error}</p>}{result&&<article className="answer"><p className="eyebrow">{result.approval==='blocked'?'LIMITATION':result.uncertainty?'MORE INFORMATION NEEDED':'ANSWER / SYNTHETIC EXAMPLE'}</p><p className="muted">Mode: {result.mode}{result.model ? ` · ${result.model}` : ''}</p>{result.fallbackReason&&<p role="status">{result.fallbackReason}</p>}<p className="answertext">{result.answer}</p>{result.sources.map(s=><a className="source" href={s.url} key={s.id}>{s.title} / {s.section} <span>Open source</span></a>)}<details><summary>Tool-call evidence ({result.toolCalls.length})</summary><pre>{JSON.stringify(result.toolCalls,null,2)}</pre></details></article>}</div>
  </section><aside><p className="eyebrow">HOW IT WORKS</p><ol><li><strong>Ask a question</strong><p>Use a general question about the sample course.</p></li><li><strong>The agent chooses a tool</strong><p>Gemini selects the search tool when enabled; local demo mode uses deterministic routing.</p></li><li><strong>Check the source</strong><p>Open the exact synthetic excerpt used in the answer.</p></li></ol><div className="notice"><strong>A prototype, with clear limits.</strong><p>Not an official university channel. No Canvas, student records, or write actions. Do not enter personal or confidential information. Chat is not saved; refreshing clears this view.</p></div></aside></div>
  <footer>CampusCare <span>Built for learning. Grounded in sources.</span></footer>
 </main>;
}
