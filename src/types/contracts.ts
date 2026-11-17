export type KnowledgeSource = { id: string; title: string; section: string; url: string; text: string; keywords: string[]; synthetic: true; owner: string; reviewed: string };
export type ToolCall = { name: string; input: {query: string}; output: KnowledgeSource[] };
export type AgentResult = { answer: string; sources: KnowledgeSource[]; toolCalls: ToolCall[]; mode: 'deterministic-demo'; uncertainty: boolean; approval: 'not-required' | 'blocked' };
