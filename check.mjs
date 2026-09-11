import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('dist');
const pages = ['me', 'contact', 'work/red-letter', 'work/crucible', 'work/curieon', 'work/latent-diffusion'];
const files = ['index.html', 'app.js', 'style.css', ...pages.map((page) => `${page}/index.html`)];
const source = await Promise.all(files.map((file) => readFile(resolve(root, file), 'utf8')));
const combined = source.join('\n');

for (const term of ['sprite', 'typing-sprite', 'waving', 'open-studio', 'cafe-scribble', 'hatch-pet']) {
  if (combined.toLowerCase().includes(term)) throw new Error(`stale animation reference: ${term}`);
}

const html = source[0];
if (!html.includes('<aside class="desk"') || !html.includes('id="open-focus"') || !html.includes('id="focus"')) {
  throw new Error('main shell is missing the reserved stage or focus experiment');
}
if (html.includes('id="open-studio"') || html.includes('id="character"')) throw new Error('removed controls are still present');

for (const term of ['sample projects', 'illustrative portfolio content', 'contact details are being added', 'ready for your story']) {
  if (combined.toLowerCase().includes(term)) throw new Error(`placeholder content remains: ${term}`);
}

console.log('Portfolio checks passed: Anant’s content, project pages, focus dialog, and clean shell are present.');

for (const [i, page] of source.entries()) {
  if (!files[i].endsWith('.html')) continue;
  for (const marker of ['activity-card', 'square-playground', 'https://github.com/ActiveAngrily']) {
    if (!page.includes(marker)) throw new Error(`${files[i]} missing ${marker}`);
  }
}
for (const slug of ['red-letter', 'crucible', 'curieon']) {
  const page = await readFile(resolve(root, 'work', slug, 'index.html'), 'utf8');
  for (const marker of [`case-study ${slug}`, '<figure class="project-visual">', '<figcaption>', 'next-project', '← all work']) {
    if (!page.includes(marker)) throw new Error(`${slug} missing ${marker}`);
  }
  if (page.includes('A few useful details.')) throw new Error('Old generic preview remains');
}
const latentDiffusion = await readFile(resolve(root, 'work/latent-diffusion/index.html'), 'utf8');
for (const marker of ['case-study latent-diffusion', '<h2>Abstract</h2>', '<h2>Built with</h2>', 'tech-stack', 'next-project', '← all work']) {
  if (!latentDiffusion.includes(marker)) throw new Error(`latent-diffusion missing ${marker}`);
}
if (latentDiffusion.includes('<figure class="project-visual">') || latentDiffusion.includes('project-evidence')) {
  throw new Error('latent-diffusion still contains the removed project card');
}
console.log('Shared GitHub card and four editorial project pages passed.');

const redLetter = await readFile(resolve(root, 'work/red-letter/index.html'), 'utf8');
for (const heading of ['Why I built it', 'How it works', 'Getting the summaries right', 'A bug that took some digging', 'What came out of it', 'Built with']) {
  if (!redLetter.includes(`<h2>${heading}</h2>`)) throw new Error(`Red Letter missing section: ${heading}`);
}
for (const marker of ['99.8%', '1,000', 'https://redletter.cc.cd/', 'https://github.com/ActiveAngrily/red_letter', '/assets/red-letter-logo.svg']) {
  if (!redLetter.includes(marker)) throw new Error(`Red Letter missing content: ${marker}`);
}
await readFile(resolve(root, 'assets/red-letter-logo.svg'));
if (html.includes('class="rl-paper"') || !html.includes('Red Letter <img class="project-logo"')) throw new Error('Red Letter homepage must show title and logo without the cover');
console.log('Red Letter copy, cover, logo, and project links passed.');

for (const [slug, title] of [['red-letter', 'Red Letter'], ['crucible', 'Crucible']]) {
  const page = await readFile(resolve(root, 'work', slug, 'index.html'), 'utf8');
  const heading = page.match(/<h1 class="project-heading">(.*?)<\/h1>/)?.[1];
  if (!heading?.startsWith('<') || !heading.endsWith(title)) throw new Error(`${slug}: logo must precede title`);
  if (!page.includes('class="project-links"')) throw new Error(`${slug}: shared action spacing missing`);
}
console.log('Both project headings use logo-first order and shared layout styles.');
