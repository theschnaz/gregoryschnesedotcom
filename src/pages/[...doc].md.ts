/** Markdown twin of every page: /about.md, /work/fleetio.md, /index.md, ... */
import type { APIRoute, GetStaticPaths } from 'astro';
import { allDocs, type Doc } from '@/lib/agent';

export const getStaticPaths: GetStaticPaths = async () =>
  (await allDocs()).map((doc) => ({ params: { doc: doc.path.slice(1, -3) }, props: { doc } }));

export const GET: APIRoute = ({ props }) =>
  new Response((props as { doc: Doc }).doc.markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
