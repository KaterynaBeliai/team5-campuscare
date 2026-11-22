export function normalize(message: string): string { return message.normalize('NFKC').replace(/[\u200b-\u200f\u202a-\u202e\u2060-\u206f\ufeff]/g,'').toLowerCase(); }
export function limitation(message: string): string | null {
 const text=normalize(message);
 if (/\b(grade|grades|password|credential|credentials|feedback|student id|my submission|submission status|my record|api[ _-]?key|token)\b|[\w.+-]+@[\w.-]+\.[a-z]{2,}|\b\+?\d[\d ()-]{8,}\d\b/.test(text)) return 'CampusCare cannot process private records, credentials or contact details. Please ask a general question without personal information.';
 if (/\b(send|email|delete|change|update|upload|enroll)\b|\bsubmit\s+(my|this|the|a)\b/.test(text)) return 'Write actions are unavailable. No request was sent and no record was changed.';
 if (/ignore.*(rule|instruction)|reveal.*(secret|prompt|key)|hidden instructions|system prompt|developer instruction|system override/.test(text)) return 'This request cannot override the policy or reveal internal instructions.';
 return null;
}
export function unsafeSource(text: string): boolean {
 return /ignore.{0,80}(rule|instruction|question)|system override|delete_record|api[ _-]?key|canary_m2|https?:\/\//i.test(normalize(text));
}
