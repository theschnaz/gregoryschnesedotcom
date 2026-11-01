# Agent guide for gregoryschnese.com

Instructions for AI coding agents (Claude Code, Cursor, etc.) working in this repo.

## Purpose
This site is a verification layer: someone who looked Gregory up should know in 30 seconds what he does ("technical demand-gen leader who builds"), see proof in numbers, and have one obvious next step. Content quality beats visual flourish.

## Rules
- **Facts live in one place.** Identity facts go in `src/site.ts`; resume facts in `src/data/resume.ts`. Never hardcode a title, employer or metric in a page.
- **Never invent facts.** No made-up metrics, testimonials, logos, clients or quotes. If something's missing, leave a `{/* TODO(greg): ... */}` comment.
- **Structured data must match visible text** (`src/lib/schema.ts`).
- **No client JS frameworks.** Keep interactivity to small inline `<script>`s. Homepage JS budget: under 50 KB (currently ~2 KB).
- **One accent color.** Use the tokens in `src/styles/global.css` (`accent`, `ink`, `muted`, `line`, `paper`, `card`, plus the `night-*` dark variants). Every color class needs a `dark:` counterpart.
- **Accessibility:** WCAG 2.2 AA. 4.5:1 contrast, visible focus, semantic headings (one `h1` per page), alt text, and all motion disabled under `prefers-reduced-motion`.
- **Voice:** first person, plain, specific. Lead with the number, then the mechanism. Avoid "growth hacker", "ninja", emoji and exclamation marks in new copy.

## Recipes
- **New case study:** add `src/content/work/<slug>.mdx` (see the schema in `src/content.config.ts`), using the sections Context → The problem → What I did → Results. OG image and sitemap entry are automatic.
- **New project:** add `src/content/projects/<slug>.mdx`. The homepage section shows them in `order`.
- **New essay:** add `src/content/writing/<slug>.mdx`. Put images in `src/assets/writing/<slug>/` and use `<Image>` from `astro:assets`.
- **Now update:** add `src/content/now/YYYY-MM.mdx`. The newest `updated` date wins.

## Before you open a PR
`npm run check && npm run build` must pass with 0 errors.
