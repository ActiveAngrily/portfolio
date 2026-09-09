import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import vm from 'node:vm';

function element() {
  const classes = new Set();
  return { textContent: '', hidden: false, checked: false, listeners: {}, attrs: {}, children: [],
    classList: { add: c => classes.add(c), remove: c => classes.delete(c), contains: c => classes.has(c), toggle(c,on) { on ? classes.add(c) : classes.delete(c); } },
    addEventListener(event, fn) { this.listeners[event] = fn; },
    setAttribute(key, value) { this.attrs[key] = value; },
    querySelector() { return element(); },
    append(...children) { this.children.push(...children); },
    replaceChildren(...children) { this.children = children; },
    showModal() { this.open = true; }, close() { this.open = false; },
  };
}
const nodes = new Map();
const node = id => { if (!nodes.has(id)) nodes.set(id, element()); return nodes.get(id); };
const projects = [element(), element(), element()];
let now = 1000000;
class Clock extends Date { constructor(...args) { super(...(args.length ? args : [now])); } static now() { return now; } }
const context = vm.createContext({ document: { getElementById:node, querySelector:node, querySelectorAll:()=>projects, createElement:element, body:node('body') }, location: { pathname:'/', href:'http://localhost/' }, history:{replaceState(){}}, Date:Clock, URL, URLSearchParams, matchMedia:()=>({matches:false,addEventListener(){}}), setInterval(){},setTimeout(){},clearTimeout(){} });
vm.runInContext(readFileSync('dist/app.js','utf8'), context);
node('long-intro').listeners.change({target:{checked:true}});
assert.equal(node('extra-intro').hidden,false);
node('long-intro').listeners.change({target:{checked:false}});
assert.equal(node('extra-intro').hidden,true);
node('character').listeners.click();
assert(node('.desk').classList.contains('waving'));
node('motion').listeners.click();
assert(node('body').classList.contains('paused'));
node('open-studio').listeners.click();
assert(node('studio').open);
projects[1].listeners.pointerenter();
assert.equal(node('preview-title').textContent,'Developer workspace');
assert.equal(node('preview-rows').children.length,3);
projects[1].listeners.pointerleave();
assert(!node('.desk').classList.contains('previewing'));
node('timer-toggle').listeners.click();
now += 62000;
vm.runInContext('renderTimer()', context);
assert.equal(node('timer').textContent,'23:58');
node('timer-toggle').listeners.click();
now += 60000;
vm.runInContext('renderTimer()', context);
assert.equal(node('timer').textContent,'23:58');
node('timer-toggle').listeners.click();
now += 1500000;
vm.runInContext('renderTimer()', context);
assert.equal(node('timer').textContent,'00:00');
assert.equal(node('timer-toggle').textContent,'start again');
node('timer-reset').listeners.click();
assert.equal(node('timer').textContent,'25:00');
function checkFiles(dir) {
  for (const entry of readdirSync(dir, {withFileTypes:true})) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) checkFiles(path);
    else if (path.endsWith('.html')) {
      const html = readFileSync(path,'utf8');
      for (const [,url] of html.matchAll(/(?:src|href)="(\/[^"?]*)"/g)) {
        assert(existsSync('dist'+url+(url.endsWith('/')?'index.html':'')),`Missing ${url} from ${path}`);
      }
      assert.equal((html.match(/<main /g)||[]).length,1);
    }
  }
}
checkFiles('dist');
assert(existsSync('dist/assets/typing-sprite.png'));
console.log('Passed: intro, wave, motion pause, dialog, project previews, timer drift/pause/completion/reset, all page and asset links.');
