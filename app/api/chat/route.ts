import { answerRequest } from '../../../src/agent/model';
export async function POST(request: Request) {
 // Bound the streamed body, including clients without Content-Length.
 const reader = request.body?.getReader();
 if (!reader) return Response.json({error:'A JSON body is required.'},{status:400});
 const chunks: Uint8Array[] = []; let size=0;
 while (true) {
  const {done,value}=await reader.read(); if(done) break;
  size+=value.length;
  if(size>8192) { await reader.cancel(); return Response.json({error:'Request is too large.'},{status:413}); }
  chunks.push(value);
 }
 const body = new Uint8Array(size); let offset=0;
 for(const chunk of chunks) {body.set(chunk,offset);offset+=chunk.length;}
 let data: unknown;
 try {data=JSON.parse(new TextDecoder().decode(body));} catch {return Response.json({error:'Invalid JSON.'},{status:400});}
 if(!data || typeof data!=='object' || !('message' in data) || typeof data.message!=='string' || !data.message.trim() || data.message.length>1000) return Response.json({error:'Enter a question between 1 and 1,000 characters.'},{status:400});
 try {return Response.json(await answerRequest(data.message, 'consent' in data && data.consent === true),{headers:{'Cache-Control':'no-store'}});}
 catch {return Response.json({error:'The demo could not complete this request.'},{status:500});}
}
