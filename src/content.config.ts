import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const stat = z.object({ value: z.string(), label: z.string() });

/** Quantified case studies: /work/[slug] */
const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    role: z.string(),
    period: z.string(),
    /** Headline metric shown big on cards, e.g. "10x" */
    metric: z.string(),
    metricLabel: z.string(),
    /** One-sentence mechanism for cards and meta description */
    summary: z.string(),
    stats: z.array(stat).default([]),
    order: z.number(),
  }),
});

/** Things I build: /projects/[slug] */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    status: z.enum(['Live', 'In development', 'Beta', 'Archived']),
    since: z.string(),
    stack: z.array(z.string()).default([]),
    url: z.url().optional(),
    urlLabel: z.string().optional(),
    order: z.number(),
  }),
});

/** Essays and lessons: /writing/[slug] */
const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      series: z.string().optional(),
      seriesPart: z.number().optional(),
      /** Short topic label, e.g. "Paid acquisition" */
      topic: z.string(),
      /** The essay's signature number, shown big on cards */
      stat: z.string(),
      statLabel: z.string(),
      /** One-sentence takeaway shown on cards and as the article TL;DR */
      takeaway: z.string(),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

/** /now updates. The newest entry is shown on /now and the homepage. */
const now = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/now' }),
  schema: z.object({
    updated: z.coerce.date(),
    summary: z.string(),
  }),
});

/** Long-form copy for static pages (e.g. About), shared with the Markdown and MCP outputs. */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({ title: z.string() }),
});

export const collections = { work, projects, writing, now, pages };
