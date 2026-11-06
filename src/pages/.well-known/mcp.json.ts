/** MCP discovery manifest (server.json-style), generated from the live tool list. */
import { SERVER_INFO, tools } from '@/lib/mcp';
import { site } from '@/site';

export async function GET() {
  const manifest = {
    $schema: 'https://static.modelcontextprotocol.io/schemas/2025-09-29/server.schema.json',
    name: 'com.gregoryschnese/profile',
    title: SERVER_INFO.title,
    description: `Read-only, public facts about ${site.name}: profile, results, case studies, projects, essays, resume and contact.`,
    version: SERVER_INFO.version,
    websiteUrl: site.url,
    remotes: [{ type: 'streamable-http', url: new URL('/mcp', site.url).href }],
    tools: (await tools()).map(({ name, title, description }) => ({ name, title, description })),
    resources: { markdown: new URL('/llms.txt', site.url).href, full: new URL('/llms-full.txt', site.url).href },
  };
  return new Response(JSON.stringify(manifest, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
