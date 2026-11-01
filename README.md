# gregoryschnese.com

Personal site of Gregory Schnese: an "operator portfolio" with positioning, quantified case studies, projects, writing and one clear call to action.

**Stack:** Astro 7 · Tailwind CSS v4 · MDX content collections · Satori OG images · Cloudflare Workers static assets. The site ships no framework JS; the only scripts are small inline ones for the theme toggle and scroll reveals.

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
| Writing `/writing/*` + RSS | `src/content/writing/*.mdx` |
| `/now` (newest entry wins) | `src/content/now/YYYY-MM.mdx` |
| Design tokens | `src/styles/global.css` (`@theme`) |
| JSON-LD (ProfilePage / Person / BlogPosting) | `src/lib/schema.ts` |
| OG images (generated at build) | `src/pages/og/[...slug].png.ts` |
| Legacy URL redirects | `public/_redirects` |

Schemas for every collection are in `src/content.config.ts`; the build fails if frontmatter is wrong.

## Deploy (Cloudflare)

`wrangler.jsonc` serves `dist/` as static assets on Workers (free tier).

- **Git integration:** in the Cloudflare dashboard, create a Worker from this repo with build command `npm run build` and deploy command `npx wrangler deploy`.
- **Manual:** `npm run deploy`.

Then point the `gregoryschnese.com` DNS at the Worker (Custom Domains). In Cloudflare's **AI Crawl Control / bot settings**, make sure AI crawlers are *not* blocked if you want assistants to be able to cite the site.

## Turn-on checklist

- [ ] `src/site.ts` → `bookingUrl`: create a Cal.com event (e.g. 20-min intro) and paste the link. CTAs switch from "Get in touch" to "Book a 20-min call".
- [ ] `src/site.ts` → `plausibleDomain`: set after creating the Plausible site. Goals fire from `data-event` attributes: `CTA click`, `Newsletter click`, `Resume download`, `Project click`, `Contact submit`.
- [ ] `src/site.ts` → `testimonials`: add 2–3 named quotes (with permission). The section stays hidden while empty.
- [ ] Resolve every `TODO(greg)` in `src/content/**` and `src/data/resume.ts`.
- [ ] Replace `public/gregory-schnese-resume.pdf` with a version that includes FMX.
- [ ] Verify in Google Search Console + Bing Webmaster Tools; test share cards with LinkedIn Post Inspector.
- [ ] Update `/now` monthly.
