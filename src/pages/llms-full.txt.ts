import { allDocs } from '@/lib/agent';
import { site } from '@/site';

/** Every page's Markdown in one file, for agents that want full context in one request. */
export async function GET() {
  const docs = await allDocs();
  const order = ['/index.md', '/facts.md', '/about.md', '/resume.md'];
  const ranked = [...docs].sort((a, b) => {
    const ia = order.indexOf(a.path), ib = order.indexOf(b.path);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
  const body = `# ${site.name} — full site content\n\n> ${site.description}\n\n${ranked
    .map((d) => `<!-- ${new URL(d.path, site.url).href} -->\n${d.markdown}`)
    .join('\n\n')}`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
