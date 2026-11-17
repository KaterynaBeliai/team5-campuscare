import { corpus } from '../../../src/knowledge/load-corpus';
import { notFound } from 'next/navigation';
export default async function Source({params}:{params:Promise<{id:string}>}) {
 const {id}=await params;const source=corpus.find(s=>s.id===id);if(!source) notFound();
 return <main><header><a className="brand" href="/">← CampusCare</a></header><article className="chat"><p className="eyebrow">SYNTHETIC FIXTURE / NOT OFFICIAL COURSE INFORMATION</p><h1>{source.section}</h1><h2>{source.title}</h2><p>{source.text}</p><p className="muted">Module owner: {source.owner} · Review: {source.reviewed}</p><code>{source.id}</code></article></main>;
}
