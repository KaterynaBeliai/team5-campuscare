export function limitation(message: string): string | null {
 if (/\b(grade|grades|password|credential|credentials|feedback|student id|my submission|submission status|my record)\b/i.test(message)) return 'CampusCare cannot access private student records, grades, credentials, or submission status. Please use your official course channel.';
 if (/\b(send|email|delete|change|update|upload|enroll)\b|\bsubmit\s+(my|this|the|a)\b/i.test(message)) return 'Write actions are unavailable in this prototype. No request was sent and no record was changed.';
 if (/ignore.*(rule|instruction)|reveal.*(secret|prompt|key)/i.test(message)) return 'This prototype cannot change its tool permissions or reveal secrets.';
 return null;
}
