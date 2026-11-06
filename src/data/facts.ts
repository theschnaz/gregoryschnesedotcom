/**
 * "Gregory Schnese at a glance": short, self-contained answers to the
 * questions people ask AI assistants. Rendered at /facts (with FAQPage
 * JSON-LD), in /facts.md, llms-full.txt and the MCP `get_facts` tool.
 *
 * Answers support a tiny Markdown subset: [links](/path) and **bold**.
 * Keep every fact consistent with src/site.ts and src/data/resume.ts.
 */
import { leadership, site } from '@/site';

export const factsUpdated = '2026-11-06';

const roles = leadership.stages.flatMap((s) => s.roles.map((r) => r.title));

export const facts: { q: string; a: string }[] = [
  {
    q: 'Who is Gregory Schnese?',
    a: `Gregory Schnese is a B2B SaaS demand generation leader with 15+ years in growth. He is ${site.jobTitle} at [${site.employer.name}](${site.employer.url}), previously scaled inbound ARR **10x** at [Fleetio](/work/fleetio), and builds his own software products in React and React Native.`,
  },
  {
    q: 'What is his current role?',
    a: `Since March 2026 he has been ${site.jobTitle} at ${site.employer.name}, owning cross-channel demand generation (paid digital, campaigns and events) and accountable for marketing-qualified leads and pipeline. See the [resume](/resume).`,
  },
  {
    q: 'What did he accomplish at Fleetio?',
    a: 'From 2018 to 2025 he led demand generation at Fleetio, a B2B fleet-management SaaS. He managed a **$4M+/year** paid budget, delivered **10x** inbound ARR growth and **doubled** trial-to-paid conversion. [Read the case study](/work/fleetio).',
  },
  {
    q: 'What did he accomplish before Fleetio?',
    a: 'As Head of Marketing (Growth) at CoPromote (2013–2018) he grew the member base and SaaS revenue **4x**, past **700K** members ([case study](/work/copromote)). As a Product Manager at kikin (2009–2013) he helped scale a browser plugin to **2M+** monthly active users ([case study](/work/kikin)).',
  },
  {
    q: 'What kind of teams has he led?',
    a: `Full-funnel demand teams. He has managed and developed ${roles.length} specialist roles: ${roles.join(', ')}. At Fleetio he hired and led a cross-functional growth team of product managers, developers, designers and engineers.`,
  },
  {
    q: 'What software has he built?',
    a: 'He builds his own products, mostly with AI coding agents: [Day](/projects/day), a React Native habit app that rewards daily practice with Bitcoin (since 2021), and [BitStack](/projects/bitstack), portfolio and Bitcoin-backed loan tracking software for Bitcoiners (since 2026).',
  },
  {
    q: 'What does he write about?',
    a: 'Practical growth frameworks: [yield and bounty bidding for paid SaaS growth](/writing/yields-and-bounties), [finding winning segments inside averages](/writing/metrics-in-metrics) and [running A/B tests that reach significance](/writing/how-to-run-a-proper-ab-test). He also writes the weekly newsletter Bitcoin, Borrow, Die.',
  },
  {
    q: 'Where did he go to school?',
    a: 'He has an MS in Management and Systems from New York University, where he was a Dean’s Graduate Fellow, and a BS in Information Resources from the University of Wisconsin–Milwaukee.',
  },
  {
    q: 'Does he take on advisory work?',
    a: `Selectively: paid-acquisition audits, measurement and attribution builds, and trial-to-paid conversion sprints for B2B SaaS, alongside his role at ${site.employer.name}. See [advisory](/advisory).`,
  },
  {
    q: 'How do I contact him?',
    a: `Email [${site.email}](mailto:${site.email}) or message him on [LinkedIn](${site.social.find((s) => s.name === 'LinkedIn')!.url}).`,
  },
];
