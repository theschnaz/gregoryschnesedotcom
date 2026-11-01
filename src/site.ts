/**
 * Single source of truth for identity facts. Keep these consistent with
 * LinkedIn, X, GitHub and newsletter bios: consistent entity facts are what
 * search engines and AI assistants use to describe you.
 */
export const site = {
  url: 'https://gregoryschnese.com',
  name: 'Gregory Schnese',
  shortName: 'Greg Schnese',
  title: 'Gregory Schnese — Demand Generation & Growth Leader',
  descriptor: 'Technical demand-gen leader who builds',
  description:
    'Gregory Schnese is a B2B SaaS demand generation leader with 15+ years in growth. Director of Demand Generation at FMX; previously scaled inbound ARR 10x at Fleetio. He also builds software: Day, Bitcoin Borrow Die and margin-watch.',
  jobTitle: 'Director of Demand Generation',
  employer: { name: 'FMX', url: 'https://www.gofmx.com' },
  location: 'Northern Virginia',
  email: 'theschnaz@gmail.com',

  /**
   * Google Analytics 4 measurement ID (G-XXXXXXXXXX). Set PUBLIC_GA_MEASUREMENT_ID
   * in Vercel's environment variables (or .env locally). Empty = no GA script.
   * Custom events fire from `data-event` attributes: cta_click, newsletter_click,
   * resume_download, project_click, contact_submit.
   */
  gaMeasurementId: (import.meta.env.PUBLIC_GA_MEASUREMENT_ID ?? '') as string,

  resumePdf: '/gregory-schnese-resume.pdf',

  newsletter: {
    name: 'Bitcoin, Borrow, Die',
    url: 'https://bitcoinborrowdie.com',
    cadence: 'Weekly',
    blurb:
      'A weekly newsletter on using Bitcoin as long-term collateral: borrow against it, never sell it, and model the strategy honestly.',
  },

  social: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/gregory-schnese-608a952' },
    { name: 'X', url: 'https://x.com/theschnaz' },
    { name: 'GitHub', url: 'https://github.com/theschnaz' },
  ],

  repoUrl: 'https://github.com/theschnaz/gregoryschnesedotcom',
} as const;

export const nav = [
  { href: '/work', label: 'Work' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
] as const;

/** Primary CTA used sitewide. */
export const primaryCta = { href: '/contact', label: 'Get in touch' } as const;

/** Big numbers for the proof bar. */
export const proof = [
  { value: 10, suffix: 'x', label: 'Inbound ARR growth', context: 'Fleetio' },
  { value: 2, suffix: 'x', label: 'Trial-to-paid conversion', context: 'Fleetio' },
  { value: 4, prefix: '$', suffix: 'M+', label: 'Annual paid budget managed', context: 'Fleetio' },
  { value: 700, suffix: 'K+', label: 'Members grown', context: 'CoPromote' },
] as const;

export const principles = [
  {
    title: 'Pipeline over leads',
    body: 'An MQL is a proxy, not a result. I bid, budget and report against revenue, and only step up the funnel when the data volume forces it.',
  },
  {
    title: 'Instrument before you spend',
    body: 'If the conversion events, bounties and attribution aren’t wired up, the budget is a guess. Measurement is the first deliverable, not the last.',
  },
  {
    title: 'Ship the tool yourself',
    body: 'The fastest growth teams don’t wait on a ticket queue. I write the SQL, the tracking code and, increasingly, the product, with AI agents as the team.',
  },
] as const;

/**
 * Named testimonials. Add real quotes (with permission) from former CEOs,
 * CMOs and peers; the homepage section only renders when this has entries.
 */
export const testimonials: { quote: string; name: string; title: string }[] = [];
