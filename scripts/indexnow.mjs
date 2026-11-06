/**
 * IndexNow (https://www.indexnow.org): tells Bing, Yandex, Seznam, Naver and
 * other participating engines which URLs exist, so new and changed pages are
 * picked up in hours instead of weeks. Bing's index also feeds Copilot and
 * other AI search products.
 *
 * Runs after `astro build`. It only submits on Vercel production builds
 * (VERCEL_ENV=production) and never fails the build.
 *
 *   node scripts/indexnow.mjs --dry-run   # print the payload, never POST
 *
 * The key is public by design; it must match public/<key>.txt.
 */
import { readFileSync, existsSync } from 'node:fs';

const KEY = '3ff6c80299a4b1b76935235d29e10e31';
const HOST = 'gregoryschnese.com';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const dryRun = process.argv.includes('--dry-run');

const sitemapPath = ['.vercel/output/static/sitemap-0.xml', 'dist/sitemap-0.xml'].find(existsSync);

async function main() {
  if (!dryRun && process.env.VERCEL_ENV !== 'production') {
    console.log('[indexnow] skipped (not a Vercel production build)');
    return;
  }
  if (!sitemapPath) {
    console.log('[indexnow] skipped (no sitemap found)');
    return;
  }
  const pages = [...readFileSync(sitemapPath, 'utf8').matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)]
    .map((m) => m[1])
    .filter((u) => new URL(u).hostname === HOST);
  // Agent-facing files change with every content update too.
  const extra = ['/llms.txt', '/llms-full.txt', '/resume.json'].map((p) => `https://${HOST}${p}`);
  const payload = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: [...new Set([...pages, ...extra])] };

  if (dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  });
  console.log(`[indexnow] submitted ${payload.urlList.length} URLs: HTTP ${res.status}`);
}

main().catch((err) => console.log(`[indexnow] failed (ignored): ${err.message}`));
