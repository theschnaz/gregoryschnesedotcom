/**
 * Renders the 8-second intro video used for og:video.
 *
 *   npm run og:video
 *
 * Needs Playwright (Chromium) and ffmpeg on the machine. The scene is driven
 * by a pure render(t) function, so every frame is deterministic: each frame
 * is screenshotted and piped straight into ffmpeg.
 *
 * Outputs (committed, served from /media):
 *   public/media/gregory-schnese-intro.mp4   H.264, for og:video
 *   public/media/gregory-schnese-intro.webm  VP9
 *   public/media/gregory-schnese-intro.jpg   poster (final frame)
 */
const { chromium } = require('playwright');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public/media');
const W = 1200, H = 630, FPS = 30, SECONDS = 8;

const b64 = (p) => fs.readFileSync(path.join(ROOT, p)).toString('base64');
const font = b64('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const mono = b64('node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2');
const photo = b64('src/assets/profile.jpg');

// Facts come from the same place as the site would: keep in sync with src/site.ts `proof`.
const proof = [
  { prefix: '', value: 10, suffix: 'x', label: 'Inbound ARR growth' },
  { prefix: '', value: 2, suffix: 'x', label: 'Trial-to-paid conversion' },
  { prefix: '$', value: 4, suffix: 'M+', label: 'Annual paid budget' },
  { prefix: '', value: 700, suffix: 'K+', label: 'Members grown' },
];
const words = 'I build B2B SaaS demand engines and the software behind them.'.split(' ');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900}
@font-face{font-family:Mono;src:url(data:font/woff2;base64,${mono}) format('woff2');font-weight:100 900}
*{box-sizing:border-box;margin:0}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#fbfaf7}
body{font-family:Inter;color:#141412;position:relative;-webkit-font-smoothing:antialiased}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(20,20,18,.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(20,20,18,.06) 1px,transparent 1px);background-size:48px 48px}
.glow{position:absolute;width:760px;height:760px;right:-200px;top:-260px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,.22),rgba(251,146,60,0) 65%)}
.rule{position:absolute;left:0;top:0;width:10px;background:#c2410c}
.eyebrow{position:absolute;left:80px;top:56px;font:500 21px/1 Mono;letter-spacing:.14em;text-transform:uppercase;color:#5c5a55;display:flex;align-items:center;gap:14px}
.eyebrow i{width:12px;height:12px;border-radius:50%;background:#c2410c;display:block}
.mark{position:absolute;right:72px;top:52px;font:700 26px/1 Inter}
.mark span{color:#c2410c}
h1{position:absolute;left:80px;top:118px;width:700px;font:800 62px/1.05 Inter;letter-spacing:-.04em}
h1 span{display:inline-block;margin-right:.24em}
h1 .soft{color:#5c5a55}
.photo{position:absolute;right:88px;top:118px;width:270px;height:270px}
.photo .back{position:absolute;inset:0;border-radius:40px;background:#fb923c}
.photo img{position:absolute;inset:0;width:270px;height:270px;border-radius:40px;object-fit:cover}
.proof{position:absolute;left:80px;right:72px;bottom:52px;display:flex;justify-content:space-between;border-top:1px solid rgba(20,20,18,.10);padding-top:24px}
.proof div{width:240px}
.proof b{display:block;font:800 46px/1 Inter;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.proof b em{font-style:normal;color:#c2410c}
.proof small{display:block;margin-top:8px;font:500 17px/1.2 Inter;color:#5c5a55}
.url{position:absolute;left:80px;top:418px;display:flex;gap:14px;align-items:center;font:500 22px/1 Inter;color:#5c5a55}
.url b{color:#ffffff;background:#c2410c;border-radius:999px;padding:10px 18px;font:700 20px/1 Inter}
</style></head><body>
<div class="glow" id="glow"></div><div class="grid"></div><div class="rule" id="rule"></div>
<div class="eyebrow" id="eyebrow"><i></i>Director of Demand Generation · FMX</div>
<div class="mark" id="mark">G<span>.</span></div>
<h1 id="h1">${words.map((w, i) => `<span class="${i >= 6 ? 'soft' : ''}">${w}</span>`).join('')}</h1>
<div class="photo" id="photo"><div class="back" id="back"></div><img src="data:image/jpeg;base64,${photo}"></div>
<div class="url" id="url"><b>gregoryschnese.com</b>Case studies · Projects · Writing</div>
<div class="proof" id="proof">${proof.map((p) => `<div><b>${p.prefix}<span>0</span><em>${p.suffix}</em></b><small>${p.label}</small></div>`).join('')}</div>
<script>
const proof = ${JSON.stringify(proof)};
const clamp = (x) => Math.max(0, Math.min(1, x));
const ease = (x) => 1 - Math.pow(1 - clamp(x), 3);
const seg = (t, a, b) => ease((t - a) / (b - a));
const $ = (id) => document.getElementById(id);
window.render = (t) => {
  $('rule').style.height = (seg(t, 0, 0.9) * 630) + 'px';
  $('glow').style.opacity = seg(t, 0, 1.6);
  const e = seg(t, 0.3, 0.9); $('eyebrow').style.opacity = e; $('eyebrow').style.transform = 'translateY(' + (1 - e) * 10 + 'px)';
  $('mark').style.opacity = seg(t, 0.3, 0.9);
  [...$('h1').children].forEach((s, i) => {
    const k = seg(t, 0.6 + i * 0.12, 1.1 + i * 0.12);
    s.style.opacity = k; s.style.transform = 'translateY(' + (1 - k) * 26 + 'px)';
  });
  const ph = seg(t, 2.0, 2.8);
  $('photo').style.opacity = ph; $('photo').style.transform = 'translateX(' + (1 - ph) * 40 + 'px)';
  const bk = seg(t, 2.5, 3.1) * 16; $('back').style.transform = 'translate(' + bk + 'px,' + bk + 'px)';
  const pr = seg(t, 2.9, 3.4); $('proof').style.opacity = pr; $('proof').style.borderTopColor = 'rgba(20,20,18,' + 0.10 * pr + ')';
  [...$('proof').children].forEach((d, i) => {
    const k = seg(t, 3.0 + i * 0.35, 4.2 + i * 0.35);
    d.querySelector('span').textContent = Math.round(proof[i].value * k);
    d.style.opacity = seg(t, 3.0 + i * 0.35, 3.4 + i * 0.35);
  });
  const u = seg(t, 5.6, 6.2); $('url').style.opacity = u; $('url').style.transform = 'translateY(' + (1 - u) * 12 + 'px)';
};
render(0);
</script></body></html>`;

function ffmpeg(args, input) {
  return new Promise((resolve, reject) => {
    const p = spawn('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: [input ? 'pipe' : 'ignore', 'inherit', 'inherit'] });
    p.on('exit', (code) => (code === 0 ? resolve() : reject(new Error('ffmpeg exited ' + code))));
    if (input) input(p.stdin);
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'ogvideo-'));
  const lossless = path.join(tmp, 'master.mkv');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  // Frames -> lossless master
  await ffmpeg(['-f', 'image2pipe', '-framerate', String(FPS), '-i', '-', '-c:v', 'ffv1', lossless], async (stdin) => {
    for (let f = 0; f < FPS * SECONDS; f++) {
      await page.evaluate((t) => window.render(t), f / FPS);
      stdin.write(await page.screenshot({ type: 'png' }));
    }
    stdin.end();
  });
  await browser.close();

  const base = path.join(OUT, 'gregory-schnese-intro');
  await ffmpeg(['-i', lossless, '-c:v', 'libx264', '-preset', 'slow', '-crf', '22', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', base + '.mp4']);
  await ffmpeg(['-i', lossless, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '36', '-row-mt', '1', '-an', base + '.webm']);
  await ffmpeg(['-sseof', '-0.1', '-i', lossless, '-frames:v', '1', '-q:v', '3', base + '.jpg']);
  fs.rmSync(tmp, { recursive: true, force: true });
  for (const ext of ['mp4', 'webm', 'jpg']) console.log(`${base}.${ext}`, (fs.statSync(`${base}.${ext}`).size / 1024).toFixed(0) + ' KB');
})();
