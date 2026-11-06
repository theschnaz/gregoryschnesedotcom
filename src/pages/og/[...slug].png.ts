/**
 * Build-time Open Graph images (1200×630) for every page, rendered with
 * Satori → resvg. BaseLayout points og:image at /og/<path>.png by default.
 *
 * Layouts:
 *  - "hero":   homepage/about — positioning line, headshot, proof row
 *  - "metric": case studies and essays — one big number + title
 *  - "title":  everything else
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { proof, site } from '@/site';

type Card = {
  layout: 'hero' | 'metric' | 'title';
  eyebrow: string;
  title: string;
  metric?: string;
  metricLabel?: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const work = await getCollection('work');
  const projects = await getCollection('projects');
  const writing = await getCollection('writing', ({ data }) => !data.draft);

  const t = (eyebrow: string, title: string): Card => ({ layout: 'title', eyebrow, title });
  const cards: Record<string, Card> = {
    index: { layout: 'hero', eyebrow: `${site.jobTitle} · ${site.employer.name}`, title: 'I build B2B SaaS demand engines and the software behind them.' },
    about: { layout: 'hero', eyebrow: 'About', title: 'A growth marketer who writes the code.' },
    work: t('Case studies', 'Growth I’ve led, and how.'),
    projects: t('Things I build', 'I design, build and grow my own products.'),
    writing: t('Writing', 'Field notes on growth.'),
    now: t('Now', 'What I’m doing now.'),
    advisory: t('Advisory', 'Selective help for B2B SaaS demand engines.'),
    resume: t('Resume', '15+ years of B2B SaaS growth.'),
    contact: t('Contact', 'The best way to reach me.'),
    facts: t('At a glance', 'Gregory Schnese, in short answers.'),
    agents: t('For AI agents', 'Built to be read by agents, too.'),
    newsletter: t('Newsletter', site.newsletter.name),
    '404': t('404', 'Page not found.'),
  };
  for (const w of work)
    cards[`work/${w.id}`] = { layout: 'metric', eyebrow: `Case study · ${w.data.company}`, title: w.data.metricLabel, metric: w.data.metric, metricLabel: `${w.data.role} · ${w.data.period}` };
  for (const p of projects) cards[`projects/${p.id}`] = t(`Project · ${p.data.title}`, p.data.tagline);
  for (const p of writing)
    cards[`writing/${p.id}`] = { layout: 'metric', eyebrow: `Essay · ${p.data.topic}`, title: p.data.title, metric: p.data.stat, metricLabel: p.data.statLabel };

  return Object.entries(cards).map(([slug, card]) => ({ params: { slug }, props: card }));
};

// ---------- assets (loaded once per build) ----------
const require = createRequire(import.meta.url);
const font = (w: number) => readFile(require.resolve(`@fontsource/inter/files/inter-latin-${w}-normal.woff`));
let assets: Promise<{ fonts: Buffer[]; photo: string }> | undefined;
const loadAssets = () =>
  (assets ??= (async () => ({
    fonts: await Promise.all([font(500), font(700), font(800)]),
    photo: `data:image/jpeg;base64,${(await readFile(resolve(process.cwd(), 'src/assets/profile.jpg'))).toString('base64')}`,
  }))());

// ---------- tokens ----------
// Light theme, matching the site's default tokens in src/styles/global.css.
const C = {
  bg: '#fbfaf7',
  ink: '#141412',
  muted: '#5c5a55',
  line: 'rgba(20,20,18,0.10)',
  accent: '#c2410c', // text-safe accent on light
  accentBright: '#fb923c', // decorative
  accentSoft: '#fde7d6',
};

// Minimal hyperscript helper so Satori doesn't need React/JSX.
type Node = { type: string; props: { style?: Record<string, unknown>; children?: unknown; src?: string; width?: number; height?: number } };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style, children, ...extra },
});
const div = (style: Record<string, unknown>, children?: unknown) => h('div', { display: 'flex', ...style }, children);

const frame = (children: Node[]) =>
  div(
    {
      width: 1200,
      height: 630,
      position: 'relative',
      flexDirection: 'column',
      background: C.bg,
      color: C.ink,
      fontFamily: 'Inter',
      overflow: 'hidden',
    },
    [
      // accent glow
      div({ position: 'absolute', top: -260, right: -200, width: 760, height: 760, borderRadius: 760, backgroundImage: `radial-gradient(circle, rgba(251,146,60,0.22), rgba(251,146,60,0) 65%)` }),
      // graph-paper texture
      div({
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(to right, ${C.line} 1px, transparent 1px), linear-gradient(to bottom, ${C.line} 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
        opacity: 0.6,
      }),
      // left accent rule
      div({ position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, background: C.accent }),
      div({ position: 'relative', flexDirection: 'column', width: 1200, height: 630, boxSizing: 'border-box', padding: '56px 72px 52px 80px', justifyContent: 'space-between' }, children),
    ],
  );

const topBar = (eyebrow: string) =>
  div({ alignItems: 'center', justifyContent: 'space-between', fontSize: 22, letterSpacing: 3, textTransform: 'uppercase', color: C.muted, fontWeight: 500 }, [
    div({ alignItems: 'center', gap: 14 }, [div({ width: 12, height: 12, borderRadius: 12, background: C.accent }), eyebrow]),
    div({ fontWeight: 700, letterSpacing: 0, textTransform: 'none', color: C.ink, fontSize: 24 }, ['G', h('span', { color: C.accent }, '.')]),
  ]);

const byline = (photo: string) =>
  div({ alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${C.line}`, paddingTop: 26 }, [
    div({ alignItems: 'center', gap: 18 }, [
      h('img', { width: 60, height: 60, borderRadius: 60, objectFit: 'cover', border: `2px solid ${C.accent}` }, undefined, { src: photo, width: 60, height: 60 }),
      div({ flexDirection: 'column' }, [
        div({ fontSize: 26, fontWeight: 700 }, site.name),
        div({ fontSize: 20, color: C.muted, marginTop: 2 }, `${site.jobTitle}, ${site.employer.name}`),
      ]),
    ]),
    div({ fontSize: 22, color: C.muted }, 'gregoryschnese.com'),
  ]);

function heroCard(c: Card, photo: string) {
  return frame([
    topBar(c.eyebrow),
    div({ alignItems: 'center', justifyContent: 'space-between', gap: 48 }, [
      div({ flexDirection: 'column', width: 690 }, [
        div({ fontSize: 62, fontWeight: 800, letterSpacing: -2.5, lineHeight: 1.04 }, c.title),
        div({ marginTop: 22, fontSize: 26, color: C.muted, lineHeight: 1.35 }, `${site.name} — 15+ years of B2B SaaS growth. Scaled Fleetio’s inbound ARR 10x.`),
      ]),
      div({ position: 'relative', width: 270, height: 270 }, [
        div({ position: 'absolute', top: 16, left: 16, width: 270, height: 270, borderRadius: 40, background: C.accentBright }),
        h('img', { position: 'absolute', top: 0, left: 0, width: 270, height: 270, borderRadius: 40, objectFit: 'cover' }, undefined, { src: photo, width: 270, height: 270 }),
      ]),
    ]),
    div({ borderTop: `1px solid ${C.line}`, paddingTop: 24, justifyContent: 'space-between' },
      proof.map((p) =>
        div({ flexDirection: 'column', width: 240 }, [
          div({ fontSize: 44, fontWeight: 800, letterSpacing: -1.5 }, [`${'prefix' in p ? p.prefix : ''}${p.value}`, h('span', { color: C.accent }, p.suffix)]),
          div({ fontSize: 17, color: C.muted, marginTop: 2 }, p.label),
        ]),
      ),
    ),
  ]);
}

function metricCard(c: Card, photo: string) {
  const len = c.metric?.length ?? 0;
  const size = len <= 5 ? 150 : len <= 7 ? 124 : 104;
  return frame([
    topBar(c.eyebrow),
    div({ flexDirection: 'column' }, [
      div({ alignItems: 'flex-end', gap: 36 }, [
        div({ fontSize: size, fontWeight: 800, letterSpacing: -size / 24, lineHeight: 0.9, color: C.accent, whiteSpace: 'nowrap', flexShrink: 0 }, c.metric),
        c.metricLabel ? div({ fontSize: 21, color: C.muted, lineHeight: 1.35, maxWidth: 380, paddingBottom: 8 }, c.metricLabel) : div({}),
      ]),
      div({ marginTop: 30, fontSize: c.title.length > 44 ? 46 : 54, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1, maxWidth: 1000 }, c.title),
    ]),
    byline(photo),
  ]);
}

function titleCard(c: Card, photo: string) {
  return frame([
    topBar(c.eyebrow),
    div({ fontSize: c.title.length > 70 ? 56 : c.title.length > 40 ? 66 : 84, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, maxWidth: 1000 }, c.title),
    byline(photo),
  ]);
}

export const GET: APIRoute = async ({ props }) => {
  const c = props as Card;
  const { fonts, photo } = await loadAssets();
  const tree = c.layout === 'hero' ? heroCard(c, photo) : c.layout === 'metric' ? metricCard(c, photo) : titleCard(c, photo);

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: fonts[0], weight: 500, style: 'normal' },
      { name: 'Inter', data: fonts[1], weight: 700, style: 'normal' },
      { name: 'Inter', data: fonts[2], weight: 800, style: 'normal' },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
