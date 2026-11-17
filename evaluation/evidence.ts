import { writeFileSync, mkdirSync } from 'node:fs';
import { POST } from '../app/api/chat/route';
async function main() {
 const input={message:'What are the assignment requirements?'};
 const response=await POST(new Request('http://localhost:3000/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(input)}));
 const observed=await response.json();mkdirSync('evidence',{recursive:true});
 const evidence={capturedAt:new Date().toISOString(),method:'POST',path:'/api/chat',input,httpStatus:response.status,observed,reviewer:'Codex automated execution; Ilya Vorobiov human review pending'};
 writeFileSync('evidence/workflow.json',JSON.stringify(evidence,null,2)+'\n');console.log(JSON.stringify(evidence,null,2));
}
main();
