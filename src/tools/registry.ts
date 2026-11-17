import { searchCourseMaterials } from './search-course-materials';
export const toolDefinition = {
 name: 'search_course_materials', description: 'Search local synthetic course material. Read-only; no Canvas connection.',
 access: 'read', inputSchema: {type: 'object', properties: {query: {type:'string', minLength:1, maxLength:1000}}, required:['query'], additionalProperties:false},
 outputSchema: {type:'array', items:{type:'object', required:['id','title','section','url','text']}},
} as const;
export function callTool(name: string, input: unknown) {
 if (name !== toolDefinition.name) throw new Error('Tool is not registered');
 if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid tool input');
 const args = input as Record<string,unknown>;
 if (Object.keys(args).some(k=>k!=='query') || typeof args.query !== 'string' || !args.query.trim() || args.query.length>1000) throw new Error('Invalid tool input');
 const result = searchCourseMaterials({query:args.query.trim()});
 if (!result.every(s => typeof s.id==='string' && typeof s.text==='string' && s.url.startsWith('/sources/'))) throw new Error('Invalid tool output');
 return result;
}
