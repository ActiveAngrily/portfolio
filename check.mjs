import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('dist');
const files = ['index.html', 'app.js', 'style.css'];
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

for (const page of ['me', 'contact', 'work/document-workspace', 'work/developer-portal', 'work/form-builder']) {
  await access(resolve(root, page, 'index.html'));
}

console.log('Portfolio checks passed: clean shell, empty stage, focus dialog, and generated pages present.');
