/** Rough reading time for an MDX body: strips imports/JSX/markdown syntax, 230 wpm. */
export function readingMinutes(body = ''): number {
  const text = body
    .replace(/^import .*$/gm, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`[\]()!-]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}
