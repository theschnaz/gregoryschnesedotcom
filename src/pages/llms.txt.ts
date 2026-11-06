import { allDocs } from '@/lib/agent';
import { facts } from '@/data/facts';
import { stripInlineMd } from '@/lib/inline-md';
import { site } from '@/site';

/** llms.txt (https://llmstxt.org): an index of Markdown pages for agents. */
export async function GET() {
  const docs = await allDocs();
  const u = (p: string) => new URL(p, site.url).href;
  const section = (prefix: string) =>
    docs
      .filter((d) => d.path.startsWith(prefix) && d.path !== `${prefix.replace(/\/$/, '')}.md`)
      .map((d) => `- [${d.title}](${u(d.path)}): ${d.description}`)
      .join('\n');
  const body = `# ${site.name}

> ${site.description}

${stripInlineMd(facts[0].a)} Contact: ${site.email}.

Every page has a Markdown version at the same URL plus \`.md\`. All content in one file: ${u('/llms-full.txt')}

## Agent endpoints
- [MCP server](${u('/mcp')}): Streamable HTTP, no auth. Tools: profile, case studies, projects, essays, resume, facts, contact. Manifest: ${u('/.well-known/mcp.json')}
- [JSON Resume](${u('/resume.json')}): machine-readable resume (jsonresume.org schema)
- [Facts](${u('/facts.md')}): short answers to common questions about ${site.name}

## Profile
- [Home](${u('/index.md')}): positioning, results, leadership, projects
- [About](${u('/about.md')}): career story
- [Resume](${u('/resume.md')}): full work history
- [Now](${u('/now.md')}): current focus
- [Advisory](${u('/advisory.md')}): engagement types
- [Contact](${u('/contact.md')})

## Case studies
${section('/work/')}

## Projects
${section('/projects/')}

## Writing
${section('/writing/')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
