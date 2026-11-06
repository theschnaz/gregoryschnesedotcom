/** MCP server endpoint (Streamable HTTP). Runs as a Vercel function; everything else is static. */
import type { APIRoute } from 'astro';
import { handleMcp } from '@/lib/mcp';

export const prerender = false;

export const ALL: APIRoute = ({ request }) => handleMcp(request);
