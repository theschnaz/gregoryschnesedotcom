# gregoryschnese.com

Personal site and resume for Gregory Schnese, built with React + Vite.

## Editing content

Almost everything on the home page comes from **`src/resume.json`**:

| Key | Section |
| --- | --- |
| `main` | Hero, About, contact links, social icons |
| `impact` | The results strip under the hero |
| `work`, `education` | Experience |
| `skills` | Tag groups in About |
| `projects` | Projects & Talks (images in `public/images/portfolio/`) |
| `testimonials` | Hidden until you add entries: `{ "text", "name", "role" }` |

Lessons ("Market like Schnese") live in `src/articles/`. To add one, create a
component with the article body and register it in `src/articles/index.js`.
It gets its own route (`/<slug>`) and card automatically.

## Scripts

```
npm install
npm run dev      # local dev server
npm run build    # production build into build/
npm start        # serve build/ (used on Heroku)
```

Heroku runs `heroku-postbuild` → `npm run build`, then `npm start`.
