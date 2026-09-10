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
