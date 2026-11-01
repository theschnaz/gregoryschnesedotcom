# gregoryschnese.com

Personal site of Gregory Schnese: an "operator portfolio" with positioning, quantified case studies, projects, writing and one clear call to action.

**Stack:** Astro 7 · Tailwind CSS v4 · MDX content collections · Satori OG images · Vercel · Google Analytics 4. The site ships no framework JS; the only scripts are small inline ones for the theme toggle and scroll reveals.

## Develop

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview
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
| JSON-LD (ProfilePage / Person / BlogPosting) | `src/lib/schema.ts` |
| OG images (generated at build) | `src/pages/og/[...slug].png.ts` |
| Legacy URL redirects, cache headers | `vercel.json` |
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
