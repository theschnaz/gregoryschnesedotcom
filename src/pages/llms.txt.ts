import { getCollection } from 'astro:content';
import { site } from '@/site';

/** llms.txt (https://llmstxt.org). Near-zero cost, optional signal for agentic tools. */
export async function GET() {
  const work = (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);
  const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
  const writing = (await getCollection('writing', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  const u = (p: string) => new URL(p, site.url).href;
  const body = `# ${site.name}

> ${site.description}

${site.name} is ${site.jobTitle} at ${site.employer.name}, based in ${site.location}. Contact: ${site.email}.

## Case studies
${work.map((w) => `- [${w.data.title}](${u(`/work/${w.id}`)}): ${w.data.summary}`).join('\n')}

## Projects
${projects.map((p) => `- [${p.data.title}](${u(`/projects/${p.id}`)}): ${p.data.tagline}`).join('\n')}

## Writing
${writing.map((p) => `- [${p.data.title}](${u(`/writing/${p.id}`)}): ${p.data.description}`).join('\n')}

## About
- [About](${u('/about')})
- [Resume](${u('/resume')})
- [Now](${u('/now')})
- [Advisory](${u('/advisory')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
