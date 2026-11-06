# gregoryschnese.com

Personal site of Gregory Schnese: an "operator portfolio" with positioning, quantified case studies, projects, writing and one clear call to action.

**Stack:** Astro 7 · Tailwind CSS v4 · MDX content collections · Satori OG images · Vercel · Google Analytics 4. The site ships no framework JS; the only scripts are small inline ones for the theme toggle and scroll reveals.

## Develop

```sh
npm install
npm run dev        # http://localhost:4321 (includes the /mcp server)
npm run build      # Vercel output in .vercel/output/ (static pages + /mcp function), then IndexNow
npm run preview    # serves the static output (no /mcp; use dev for that)
npm run check      # astro check (types + diagnostics)
```

Node 22.12+ is required.

## Where things live

| What | Where |
| --- | --- |
| Identity facts, CTA, proof bar, principles, testimonials | `src/site.ts` |
| Resume (HTML `/resume` + About sidebar) | `src/data/resume.ts`, PDF in `public/` |
| Case studies `/work/*` | `src/content/work/*.mdx` |
| Projects `/projects/*` | `src/content/projects/*.mdx` |
| Writing `/writing/*` | `src/content/writing/*.mdx` |
| `/now` (newest entry wins) | `src/content/now/YYYY-MM.mdx` |
| Design tokens | `src/styles/global.css` (`@theme`) |
| JSON-LD (ProfilePage / Person / BlogPosting / FAQPage) | `src/lib/schema.ts` |
| About bio | `src/content/pages/about.mdx` |
| Facts Q&A `/facts` | `src/data/facts.ts` |
| Markdown twins (`/<page>.md`), `llms.txt`, `llms-full.txt` | `src/lib/agent.ts`, `src/pages/[...doc].md.ts` |
| MCP server `/mcp` (+ `/.well-known/mcp.json`) | `src/lib/mcp.ts`, `src/pages/mcp.ts` |
| JSON Resume `/resume.json` | `src/lib/json-resume.ts` |
| IndexNow (production builds only) | `scripts/indexnow.mjs`, key file in `public/` |
| OG images (generated at build) | `src/pages/og/[...slug].png.ts` |
| Intro video (og:video), poster | `public/media/`, regenerate with `npm run og:video` (needs Playwright + ffmpeg) |
| Legacy URL redirects | `astro.config.mjs` (`redirects`) |
| Headers for `.md` / `.txt` / `.json` agent files | `vercel.json` |
| Google Analytics | `src/layouts/BaseLayout.astro`, ID via `PUBLIC_GA_MEASUREMENT_ID` |

Schemas for every collection are in `src/content.config.ts`; the build fails if frontmatter is wrong.

## Deploy (Vercel)

The site is fully static, so no adapter is needed. `vercel.json` sets the build and holds the legacy-URL redirects.

1. In Vercel, **Add New → Project** and import this repo. It detects Astro; the build command is `npm run build` and the output is `dist`.
2. Under **Settings → Environment Variables**, add `PUBLIC_GA_MEASUREMENT_ID` (your GA4 `G-…` ID) for Production, then redeploy.
3. Under **Settings → Domains**, add `gregoryschnese.com` and `www.gregoryschnese.com` and follow the DNS instructions.

Every pull request gets a preview deployment automatically.

> Vercel's Hobby (free) plan is for non-commercial personal use. If the site starts promoting paid advisory work, Vercel expects the Pro plan.

## Turn-on checklist

- [ ] Create a GA4 property and set `PUBLIC_GA_MEASUREMENT_ID` in Vercel (and in `.env` locally, see `.env.example`). Custom events fire from `data-event` attributes: `cta_click`, `newsletter_click`, `resume_download`, `project_click`, `contact_submit`. Mark the ones you care about as key events in GA.
- [ ] `src/site.ts` → `testimonials`: add 2–3 named quotes (with permission). The section stays hidden while empty.
- [ ] Resolve every `TODO(greg)` in `src/content/**` and `src/data/resume.ts`.
- [ ] Replace `public/gregory-schnese-resume.pdf` with a version that includes FMX.
- [ ] Verify in Google Search Console + Bing Webmaster Tools; test share cards with LinkedIn Post Inspector.
- [ ] Update `/now` monthly.

## AI agent discoverability

Everything agent-facing is generated from the same content as the HTML pages, so it can't drift.

- **Markdown twins:** every page has a Markdown version at the same URL plus `.md` (`/about.md`, `/work/fleetio.md`, `/index.md`), advertised with `<link rel="alternate" type="text/markdown">`.
- **`/llms.txt`** (index) and **`/llms-full.txt`** (everything in one file).
- **MCP server at `/mcp`:** stateless Streamable HTTP, read-only, no auth, 11 tools and every Markdown page as a resource. Manifest at `/.well-known/mcp.json`. Docs for humans at `/agents`. Test locally with `npm run dev`, then `npx @modelcontextprotocol/inspector` pointed at `http://localhost:4321/mcp`.
- **`/resume.json`:** JSON Resume, built from `src/data/resume.ts`.
- **`/facts`:** short Q&A answers with FAQPage JSON-LD.
- **Person JSON-LD:** credentials, occupation and skills, employer and school links.
- **IndexNow:** `npm run build` pings IndexNow with every sitemap URL on Vercel production builds (`VERCEL_ENV=production`). Preview builds skip it; a failure never fails the build. `npm run indexnow:dry-run` prints the payload.
- **Ask AI links:** case studies, essays, projects, About and Facts link to ChatGPT, Claude and Perplexity with the page's Markdown URL in the prompt, plus "Copy as Markdown".
