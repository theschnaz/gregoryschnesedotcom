/**
 * Agent-facing content. One place that turns the site's content into clean
 * Markdown documents, used by:
 *   - /<page>.md twins            (src/pages/[...doc].md.ts)
 *   - /llms.txt, /llms-full.txt
 *   - the MCP server at /mcp      (src/pages/mcp.ts)
 * Everything is derived from src/site.ts, src/data/* and content collections,
 * so the machine-readable outputs never drift from the HTML pages.
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { advisory, leadership, principles, proof, site } from '@/site';
import { certifications, education, experience, profileSummary, projects as resumeProjects, skills } from '@/data/resume';
import { facts, factsUpdated } from '@/data/facts';
import { absolutizeMd } from './inline-md';
import { readingMinutes } from './reading';

export type Doc = { path: string; title: string; description: string; markdown: string };

const abs = (p: string) => new URL(p, site.url).href;
const linkedin = site.social.find((s) => s.name === 'LinkedIn')!.url;

export { mdPathFor } from './paths';

// ---------- MDX -> Markdown ----------
const lookup = (expr: string): string => {
  const v = expr.split('.').slice(1).reduce<unknown>((o, k) => (o as Record<string, unknown>)?.[k], site);
  return typeof v === 'string' ? v : '';
};

export function mdxToMarkdown(body = ''): string {
  let s = body
    .replace(/^(import|export) .*$/gm, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/=\{(site(?:\.\w+)+)\}/g, (_, e) => `="${lookup(e)}"`)
    .replace(/\{(site(?:\.\w+)+)\}/g, (_, e) => lookup(e))
    .replace(/<Image\b[^>]*\balt="([^"]*)"[^>]*\/>/g, (_, alt) => `*[Figure: ${alt}]*`)
    .replace(/<figcaption>([\s\S]*?)<\/figcaption>/g, (_, c) => `*${c.trim()}*`)
    .replace(/<\/?figure>/g, '')
    .replace(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, text) => `[${text}](${href})`)
    .replace(/^[ \t]+(?=\S)/gm, '');
  s = absolutizeMd(s, site.url);
  return s.replace(/\n{3,}/g, '\n\n').trim();
}

// ---------- helpers ----------
const sorted = {
  work: async () => (await getCollection('work')).sort((a, b) => a.data.order - b.data.order),
  projects: async () => (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order),
  writing: async () =>
    (await getCollection('writing', ({ data }) => !data.draft)).sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()),
  now: async () => (await getCollection('now')).sort((a, b) => b.data.updated.valueOf() - a.data.updated.valueOf()),
};

const footer = (path: string) =>
  `\n\n---\n\nSource: ${abs(path === '/index.md' ? '/' : path.replace(/\.md$/, ''))} · Contact: ${site.email} · LinkedIn: ${linkedin}`;

const proofLine = () =>
  proof.map((p) => `- **${'prefix' in p ? p.prefix : ''}${p.value}${p.suffix}** ${p.label.toLowerCase()} (${p.context})`).join('\n');

export const workDoc = (e: CollectionEntry<'work'>): Doc => ({
  path: `/work/${e.id}.md`,
  title: e.data.title,
  description: e.data.summary,
  markdown: `# ${e.data.title}

**${e.data.company}** · ${e.data.role} · ${e.data.period}

> ${e.data.summary}

${e.data.stats.map((s) => `- **${s.value}**: ${s.label}`).join('\n')}

${mdxToMarkdown(e.body)}`,
});

export const projectDoc = (e: CollectionEntry<'projects'>): Doc => ({
  path: `/projects/${e.id}.md`,
  title: e.data.title,
  description: e.data.description,
  markdown: `# ${e.data.title}

${e.data.tagline}

- Status: ${e.data.status}
- Since: ${e.data.since}
- Stack: ${e.data.stack.join(', ')}${e.data.url ? `\n- Website: ${e.data.url}` : ''}
- Built by: ${site.name}

${mdxToMarkdown(e.body)}`,
});

export const essayDoc = (e: CollectionEntry<'writing'>): Doc => ({
  path: `/writing/${e.id}.md`,
  title: e.data.title,
  description: e.data.description,
  markdown: `# ${e.data.title}

By ${site.name} · ${e.data.topic} · ${readingMinutes(e.body)} min read

> ${e.data.description}

**TL;DR:** ${e.data.takeaway}

**Key number:** ${e.data.stat}, ${e.data.statLabel}.

${mdxToMarkdown(e.body)}`,
});

export function resumeMarkdown(): string {
  return `# ${site.name} — Resume

${site.jobTitle} · ${site.email} · ${site.url}

${profileSummary}

## Experience

${experience
  .map((j) => `### ${j.title}, ${j.company}\n${j.period} · ${j.location}\n\n${j.bullets.map((b) => `- ${b}`).join('\n')}`)
  .join('\n\n')}

## Projects

${resumeProjects.map((p) => `- **${p.name}** (${p.role}, ${p.period}): ${p.description}`).join('\n')}

## Education

${education.map((e) => `- **${e.school}**: ${e.degree}${e.detail ? ` (${e.detail})` : ''}`).join('\n')}

## Certifications

${certifications.map((c) => `- ${c.name}, ${c.issuer} (${c.date})`).join('\n')}

## Skills

${skills.join(' · ')}

PDF: ${abs(site.resumePdf)} · JSON Resume: ${abs('/resume.json')}`;
}

export function factsMarkdown(): string {
  return `# ${site.name} at a glance

Last updated ${factsUpdated}.

${facts.map((f) => `## ${f.q}\n\n${absolutizeMd(f.a, site.url)}`).join('\n\n')}`;
}

export function leadershipMarkdown(): string {
  return `## Leadership

I build and lead full-funnel demand teams: specialists who each own a stage of the funnel.

${leadership.stages.map((s) => `**${s.stage}**\n${s.roles.map((r) => `- **${r.title}**: ${r.body}`).join('\n')}`).join('\n\n')}

${leadership.highlights.map((h) => `- ${h.company}: ${h.text}`).join('\n')}`;
}

/** Every page's Markdown twin. */
export async function allDocs(): Promise<Doc[]> {
  const [work, projects, writing, nowEntries] = await Promise.all([sorted.work(), sorted.projects(), sorted.writing(), sorted.now()]);
  const about = (await getEntry('pages', 'about'))!;
  const now = nowEntries[0];

  const docs: Doc[] = [
    {
      path: '/index.md',
      title: site.title,
      description: site.description,
      markdown: `# ${site.name}

**${site.descriptor}.** ${site.jobTitle} at ${site.employer.name}.

I build B2B SaaS demand engines and the software behind them. ${site.description}

## Results

${proofLine()}

## Case studies

${work.map((w) => `- [${w.data.title}](${abs(`/work/${w.id}.md`)}): ${w.data.summary}`).join('\n')}

${leadershipMarkdown()}

## Things I build

${projects.map((p) => `- [${p.data.title}](${abs(`/projects/${p.id}.md`)}): ${p.data.tagline}`).join('\n')}

## How I work

${principles.map((p) => `- **${p.title}.** ${p.body}`).join('\n')}

## Writing

${writing.map((p) => `- [${p.data.title}](${abs(`/writing/${p.id}.md`)}): ${p.data.takeaway}`).join('\n')}

## More

- [About](${abs('/about.md')}) · [Resume](${abs('/resume.md')}) · [Facts](${abs('/facts.md')}) · [Now](${abs('/now.md')}) · [Advisory](${abs('/advisory.md')})
- Everything in one file: ${abs('/llms-full.txt')}
- MCP server: ${abs('/mcp')}`,
    },
    { path: '/about.md', title: 'About', description: site.description, markdown: `# About ${site.name}\n\n${mdxToMarkdown(about.body)}` },
    {
      path: '/work.md',
      title: 'Case studies',
      description: 'Quantified B2B SaaS growth case studies.',
      markdown: `# Case studies\n\n${work.map((w) => `## [${w.data.title}](${abs(`/work/${w.id}.md`)})\n\n**${w.data.metric}** ${w.data.metricLabel} · ${w.data.company}, ${w.data.period}\n\n${w.data.summary}`).join('\n\n')}`,
    },
    ...work.map(workDoc),
    {
      path: '/projects.md',
      title: 'Projects',
      description: 'Software Gregory Schnese designs, builds and grows.',
      markdown: `# Things I build\n\nI design, build and grow my own products, now mostly with AI coding agents.\n\n${projects.map((p) => `## [${p.data.title}](${abs(`/projects/${p.id}.md`)})\n\n${p.data.tagline} (${p.data.status}, since ${p.data.since})`).join('\n\n')}`,
    },
    ...projects.map(projectDoc),
    {
      path: '/writing.md',
      title: 'Writing',
      description: 'Essays on B2B SaaS growth.',
      markdown: `# Writing: field notes on growth\n\n${writing.map((p) => `## [${p.data.title}](${abs(`/writing/${p.id}.md`)})\n\n${p.data.topic} · **${p.data.stat}** ${p.data.statLabel}\n\n${p.data.takeaway}`).join('\n\n')}`,
    },
    ...writing.map(essayDoc),
    { path: '/resume.md', title: 'Resume', description: `Resume of ${site.name}`, markdown: resumeMarkdown() },
    { path: '/facts.md', title: 'At a glance', description: `Facts about ${site.name}`, markdown: factsMarkdown() },
    {
      path: '/now.md',
      title: 'Now',
      description: now.data.summary,
      markdown: `# What ${site.name} is doing now\n\nUpdated ${now.data.updated.toISOString().slice(0, 10)}.\n\n${mdxToMarkdown(now.body)}`,
    },
    {
      path: '/advisory.md',
      title: 'Advisory',
      description: 'Selective advisory for B2B SaaS demand engines.',
      markdown: `# Advisory\n\nI take on a small number of advisory engagements each quarter, alongside my full-time role.\n\n${advisory.engagements.map((e) => `## ${e.title}\n\n${e.body}\n\nBest for: ${e.fit}`).join('\n\n')}\n\n## The best fit\n\n${advisory.bestFit.map((f) => `- ${f}`).join('\n')}\n\nStart with an email: ${site.email}`,
    },
    {
      path: '/contact.md',
      title: 'Contact',
      description: `How to reach ${site.name}`,
      markdown: `# Contact ${site.name}\n\n- Email: ${site.email}\n- LinkedIn: ${linkedin}\n${site.social.filter((s) => s.name !== 'LinkedIn').map((s) => `- ${s.name}: ${s.url}`).join('\n')}`,
    },
    {
      path: '/newsletter.md',
      title: site.newsletter.name,
      description: site.newsletter.blurb,
      markdown: `# ${site.newsletter.name}\n\n${site.newsletter.blurb}\n\nCadence: ${site.newsletter.cadence}. Subscribe: ${site.newsletter.url}`,
    },
    {
      path: '/agents.md',
      title: 'For AI agents',
      description: `Machine-readable ways to learn about ${site.name}.`,
      markdown: agentsMarkdown(),
    },
  ];
  return docs.map((d) => ({ ...d, markdown: d.markdown.trim() + footer(d.path) + '\n' }));
}

export function agentsMarkdown(): string {
  return `# For AI agents

Ways for agents and LLM tools to read accurate, current information about ${site.name}.

- **Markdown pages:** add \`.md\` to any page URL (e.g. ${abs('/work/fleetio.md')}); the home page is ${abs('/index.md')}.
- **llms.txt:** ${abs('/llms.txt')} (index) and ${abs('/llms-full.txt')} (all content in one file).
- **MCP server:** ${abs('/mcp')} (Streamable HTTP, no auth). Manifest: ${abs('/.well-known/mcp.json')}.
- **JSON Resume:** ${abs('/resume.json')}
- **Facts (Q&A):** ${abs('/facts.md')}
- **Structured data:** schema.org ProfilePage / Person JSON-LD on every profile page.`;
}
