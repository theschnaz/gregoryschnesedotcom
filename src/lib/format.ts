export function formatDate(date: Date, style: 'long' | 'short' = 'long') {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: style === 'long' ? 'numeric' : undefined,
    timeZone: 'UTC',
  });
}
