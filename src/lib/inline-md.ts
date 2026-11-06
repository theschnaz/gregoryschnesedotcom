/** Render the tiny Markdown subset used in src/data/facts.ts to safe HTML. */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function inlineMd(md: string, linkClass = 'link-accent'): string {
  return esc(md)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => {
      const ext = /^https?:/.test(href);
      return `<a href="${href}" class="${linkClass}"${ext ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
    });
}

/** Plain text (for JSON-LD), e.g. "[Fleetio](/work/fleetio)" -> "Fleetio". */
export function stripInlineMd(md: string): string {
  return md.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

/** Absolute Markdown links for agent-facing output. */
export function absolutizeMd(md: string, base: string): string {
  return md.replace(/\]\((\/[^)\s]*)\)/g, (_, p) => `](${new URL(p, base).href})`);
}
