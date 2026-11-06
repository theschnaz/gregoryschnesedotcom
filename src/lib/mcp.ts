/**
 * Minimal, stateless MCP server (Streamable HTTP transport, JSON responses).
 * https://modelcontextprotocol.io/specification
 *
 * Read-only: every tool returns public facts from this site's content, so the
 * answers always match the HTML pages. No auth, no sessions, no state.
 */
import { getCollection } from 'astro:content';
import { allDocs, essayDoc, factsMarkdown, leadershipMarkdown, projectDoc, resumeMarkdown, workDoc } from './agent';
import { jsonResume } from './json-resume';
import { facts, factsUpdated } from '@/data/facts';
import { stripInlineMd } from './inline-md';
import { leadership, proof, site } from '@/site';

export const SERVER_INFO = { name: 'gregoryschnese-com', title: `${site.name} — profile`, version: '1.0.0' };
const PROTOCOL_VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05'];
const abs = (p: string) => new URL(p, site.url).href;

type Tool = {
  name: string;
  title: string;
  description: string;
  inputSchema: { type: 'object'; properties: Record<string, unknown>; required?: string[] };
};

const slugArg = (what: string, slugs: string[]) => ({
  type: 'object' as const,
  properties: { slug: { type: 'string', enum: slugs, description: `${what} slug` } },
  required: ['slug'],
});

/** Tool list. Slugs are filled in from the content collections. */
export async function tools(): Promise<Tool[]> {
  const [work, projects, writing] = await Promise.all([getCollection('work'), getCollection('projects'), getCollection('writing')]);
  const none = { type: 'object' as const, properties: {} };
  return [
    { name: 'get_profile', title: 'Get profile', description: `Who ${site.name} is: current role, positioning, headline results, leadership, projects and links. Start here.`, inputSchema: none },
    { name: 'get_facts', title: 'Get facts', description: `Short, citable answers to common questions about ${site.name} (role, results, teams led, software built, education, contact).`, inputSchema: none },
    { name: 'list_case_studies', title: 'List case studies', description: 'Quantified growth case studies with headline metrics.', inputSchema: none },
    { name: 'get_case_study', title: 'Get case study', description: 'Full case study (context, problem, what he did, results) as Markdown.', inputSchema: slugArg('Case study', work.map((w) => w.id)) },
    { name: 'list_projects', title: 'List projects', description: 'Software products he designs, builds and grows.', inputSchema: none },
    { name: 'get_project', title: 'Get project', description: 'Project details (what it is, stack, status, link) as Markdown.', inputSchema: slugArg('Project', projects.map((p) => p.id)) },
    { name: 'list_essays', title: 'List essays', description: 'Essays on B2B SaaS growth with a one-line takeaway each.', inputSchema: none },
    { name: 'get_essay', title: 'Get essay', description: 'Full essay as Markdown.', inputSchema: slugArg('Essay', writing.map((w) => w.id)) },
    { name: 'get_resume', title: 'Get resume', description: 'Full resume as JSON Resume (jsonresume.org) plus a Markdown rendering.', inputSchema: none },
    { name: 'get_leadership', title: 'Get leadership', description: 'The demand-gen roles he has managed and developed, by funnel stage, and his team-leadership history.', inputSchema: none },
    { name: 'how_to_contact', title: 'How to contact', description: `Email, LinkedIn and other ways to reach ${site.name}.`, inputSchema: none },
  ];
}

class RpcError extends Error {
  constructor(public code: number, message: string) {
    super(message);
  }
}

const text = (t: string, structured?: unknown) => ({
  content: [{ type: 'text', text: t }],
  ...(structured !== undefined ? { structuredContent: structured } : {}),
});
// structuredContent must be a JSON object, so arrays are wrapped as { items }.
const json = (data: unknown) => text(JSON.stringify(data, null, 2), Array.isArray(data) ? { items: data } : data);

async function callTool(name: string, args: Record<string, unknown> = {}) {
  const slug = String(args.slug ?? '');
  const find = async <C extends 'work' | 'projects' | 'writing'>(c: C) => {
    const entry = (await getCollection(c)).find((e) => e.id === slug);
    if (!entry) throw new RpcError(-32602, `Unknown ${c} slug "${slug}". Call the matching list_* tool for valid slugs.`);
    return entry;
  };
  switch (name) {
    case 'get_profile':
      return text((await allDocs()).find((d) => d.path === '/index.md')!.markdown);
    case 'get_facts':
      return text(factsMarkdown(), { updated: factsUpdated, facts: facts.map((f) => ({ question: f.q, answer: stripInlineMd(f.a) })) });
    case 'list_case_studies':
      return json(
        (await getCollection('work'))
          .sort((a, b) => a.data.order - b.data.order)
          .map((w) => ({ slug: w.id, title: w.data.title, company: w.data.company, role: w.data.role, period: w.data.period, metric: `${w.data.metric} ${w.data.metricLabel}`, summary: w.data.summary, url: abs(`/work/${w.id}`) })),
      );
    case 'get_case_study':
      return text(workDoc((await find('work')) as never).markdown);
    case 'list_projects':
      return json(
        (await getCollection('projects'))
          .sort((a, b) => a.data.order - b.data.order)
          .map((p) => ({ slug: p.id, title: p.data.title, tagline: p.data.tagline, status: p.data.status, since: p.data.since, stack: p.data.stack, website: p.data.url, url: abs(`/projects/${p.id}`) })),
      );
    case 'get_project':
      return text(projectDoc((await find('projects')) as never).markdown);
    case 'list_essays':
      return json(
        (await getCollection('writing', ({ data }) => !data.draft)).map((p) => ({ slug: p.id, title: p.data.title, topic: p.data.topic, takeaway: p.data.takeaway, url: abs(`/writing/${p.id}`) })),
      );
    case 'get_essay':
      return text(essayDoc((await find('writing')) as never).markdown);
    case 'get_resume': {
      const r = jsonResume();
      return { content: [{ type: 'text', text: resumeMarkdown() }], structuredContent: r };
    }
    case 'get_leadership':
      return text(leadershipMarkdown(), { stages: leadership.stages, highlights: leadership.highlights, results: proof });
    case 'how_to_contact':
      return json({ email: site.email, linkedin: site.social.find((s) => s.name === 'LinkedIn')!.url, other: site.social.filter((s) => s.name !== 'LinkedIn'), website: site.url });
    default:
      throw new RpcError(-32602, `Unknown tool "${name}"`);
  }
}

type Req = { jsonrpc?: string; id?: string | number | null; method?: string; params?: Record<string, unknown> };

async function dispatch(req: Req) {
  switch (req.method) {
    case 'initialize': {
      const asked = String(req.params?.protocolVersion ?? '');
      return {
        protocolVersion: PROTOCOL_VERSIONS.includes(asked) ? asked : PROTOCOL_VERSIONS[0],
        capabilities: { tools: { listChanged: false }, resources: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions: `Public, read-only facts about ${site.name}, ${site.jobTitle} at ${site.employer.name}. Start with get_profile or get_facts. Cite ${site.url} pages when quoting.`,
      };
    }
    case 'ping':
      return {};
    case 'tools/list':
      return { tools: await tools() };
    case 'tools/call':
      return callTool(String(req.params?.name ?? ''), (req.params?.arguments as Record<string, unknown>) ?? {});
    case 'resources/list':
      return {
        resources: (await allDocs()).map((d) => ({ uri: abs(d.path), name: d.path.slice(1), title: d.title, description: d.description, mimeType: 'text/markdown' })),
      };
    case 'resources/read': {
      const uri = String(req.params?.uri ?? '');
      const doc = (await allDocs()).find((d) => abs(d.path) === uri);
      if (!doc) throw new RpcError(-32002, `Resource not found: ${uri}`);
      return { contents: [{ uri, mimeType: 'text/markdown', text: doc.markdown }] };
    }
    case 'resources/templates/list':
      return { resourceTemplates: [] };
    case 'prompts/list':
      return { prompts: [] };
    default:
      throw new RpcError(-32601, `Method not found: ${req.method}`);
  }
}

async function handleOne(req: Req) {
  const isNotification = req.id === undefined || req.id === null;
  try {
    if (req.jsonrpc !== '2.0' || typeof req.method !== 'string') throw new RpcError(-32600, 'Invalid Request');
    const result = await dispatch(req);
    return isNotification ? null : { jsonrpc: '2.0', id: req.id, result };
  } catch (e) {
    if (isNotification) return null;
    const err = e instanceof RpcError ? e : new RpcError(-32603, 'Internal error');
    return { jsonrpc: '2.0', id: req.id ?? null, error: { code: err.code, message: err.message } };
  }
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version, Authorization',
  'Access-Control-Expose-Headers': 'Mcp-Session-Id',
};

export async function handleMcp(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (request.method === 'GET') {
    // No server-initiated stream; return a human/agent-readable pointer instead.
    if (!(request.headers.get('accept') ?? '').includes('text/event-stream')) {
      return new Response(
        JSON.stringify({ ...SERVER_INFO, transport: 'streamable-http', endpoint: abs('/mcp'), usage: 'POST JSON-RPC 2.0 messages to this URL.', manifest: abs('/.well-known/mcp.json') }, null, 2),
        { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } },
      );
    }
    return new Response('Method Not Allowed', { status: 405, headers: { ...CORS, Allow: 'POST, OPTIONS' } });
  }
  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: { ...CORS, Allow: 'POST, GET, OPTIONS' } });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }, { status: 400, headers: CORS });
  }
  const batch = Array.isArray(body);
  const messages = (batch ? body : [body]) as Req[];
  const results = (await Promise.all(messages.map((r) => handleOne(r)))).filter(Boolean);
  if (results.length === 0) return new Response(null, { status: 202, headers: CORS });
  return Response.json(batch ? results : results[0], { headers: CORS });
}
