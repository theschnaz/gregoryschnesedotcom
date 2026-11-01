/**
 * Build-time Open Graph images (1200×630) for every page, rendered with
 * Satori → resvg. BaseLayout points og:image at /og/<path>.png by default.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { site } from '@/site';

type Card = { eyebrow: string; title: string; metric?: string };

export const getStaticPaths: GetStaticPaths = async () => {
  const work = await getCollection('work');
  const projects = await getCollection('projects');
  const writing = await getCollection('writing', ({ data }) => !data.draft);

  const cards: Record<string, Card> = {
    index: { eyebrow: `${site.jobTitle} · ${site.employer.name}`, title: 'I build B2B SaaS demand engines and the software behind them.' },
    work: { eyebrow: 'Case studies', title: 'Growth I’ve led, and how.' },
    projects: { eyebrow: 'Things I build', title: 'Proof that I can ship, not just strategize.' },
    writing: { eyebrow: 'Writing', title: 'Notes on growth, measurement and building.' },
    about: { eyebrow: 'About', title: 'A growth marketer who writes the code.' },
    now: { eyebrow: 'Now', title: 'What I’m doing now.' },
    advisory: { eyebrow: 'Advisory', title: 'Selective help for B2B SaaS demand engines.' },
    resume: { eyebrow: 'Resume', title: '15+ years of B2B SaaS growth.' },
    contact: { eyebrow: 'Contact', title: 'Get in touch.' },
    newsletter: { eyebrow: 'Newsletter', title: site.newsletter.name },
    '404': { eyebrow: '404', title: 'Page not found.' },
  };
  for (const w of work) cards[`work/${w.id}`] = { eyebrow: `Case study · ${w.data.company}`, title: w.data.metricLabel, metric: w.data.metric };
  for (const p of projects) cards[`projects/${p.id}`] = { eyebrow: `Project · ${p.data.status}`, title: `${p.data.title}: ${p.data.tagline}` };
  for (const p of writing) cards[`writing/${p.id}`] = { eyebrow: p.data.series ?? 'Writing', title: p.data.title };

  return Object.entries(cards).map(([slug, card]) => ({ params: { slug }, props: card }));
};

const require = createRequire(import.meta.url);
const font = (w: number) => readFile(require.resolve(`@fontsource/inter/files/inter-latin-${w}-normal.woff`));
let fonts: Promise<Buffer[]> | undefined;

// Minimal hyperscript helper so we don't need React/JSX for Satori.
const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ props }) => {
  const { eyebrow, title, metric } = props as Card;
  fonts ??= Promise.all([font(500), font(700)]);
  const [regular, bold] = await fonts;

  const tree = h(
    'div',
    { width: 1200, height: 630, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px 80px', background: '#fbfaf7', color: '#141412', fontFamily: 'Inter' },
    [
      h('div', { display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, color: '#5c5a55', letterSpacing: 2, textTransform: 'uppercase' }, [
        h('div', { width: 14, height: 14, borderRadius: 7, background: '#c2410c' }),
        eyebrow,
      ]),
      h('div', { display: 'flex', flexDirection: 'column' }, [
        ...(metric ? [h('div', { fontSize: 160, fontWeight: 700, color: '#c2410c', letterSpacing: -6, lineHeight: 1 }, metric)] : []),
        h('div', { fontSize: metric ? 64 : title.length > 60 ? 60 : 72, fontWeight: 700, letterSpacing: -2, lineHeight: 1.08, maxWidth: 1000 }, title),
      ]),
      h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 28, borderTop: '2px solid #e4e1da', paddingTop: 28 }, [
        h('div', { display: 'flex', fontWeight: 700 }, [site.name, h('span', { color: '#c2410c' }, '.')]),
        h('div', { color: '#5c5a55' }, 'gregoryschnese.com'),
      ]),
    ],
  );

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: regular, weight: 500, style: 'normal' },
      { name: 'Inter', data: bold, weight: 700, style: 'normal' },
    ],
  });
  const png = new Resvg(svg).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
