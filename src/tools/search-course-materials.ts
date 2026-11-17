import { retrieve } from '../knowledge/retrieve';
export function searchCourseMaterials(input: {query: string}) { return retrieve(input.query); }
