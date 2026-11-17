export type Decision = {kind:'greeting'} | {kind:'tool'; name:string; input:{query:string}};
export interface AgentProvider { choose(message: string): Decision }
// Explicit rule-based stub. No LLM or external service is used in milestone 1.
export const demoProvider: AgentProvider = {
 choose(message) {
  if (/^(hi|hello|hey|thanks|thank you)[!. ]*$/i.test(message)) return {kind:'greeting'};
  return {kind:'tool', name:'search_course_materials', input:{query:message}};
 }
};
