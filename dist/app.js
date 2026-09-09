const $ = (id) => document.getElementById(id);
const route = location.pathname.split('/').filter(Boolean)[0] || 'work';
document.querySelector(`[data-nav="${route}"]`)?.setAttribute('aria-current', 'page');
const updateClock = () => {
  const now = new Date();
  $('date').textContent = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  $('clock').textContent = now.toLocaleTimeString('en-GB');
  $('year').textContent = now.getFullYear();
};
updateClock();
setInterval(updateClock, 1000);
const desk = document.querySelector('.desk');
let waveTimeout;
const wave = () => {
  clearTimeout(waveTimeout);
  desk.classList.add('waving');
  waveTimeout = setTimeout(() => desk.classList.remove('waving'), 2400);
};
$('character').addEventListener('pointerenter', wave);
$('character').addEventListener('focus', wave);
$('character').addEventListener('click', wave);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const setPaused = (paused) => {
  document.body.classList.toggle('paused', paused);
  $('motion').setAttribute('aria-pressed', String(paused));
  $('motion').textContent = paused ? 'resume motion' : 'pause motion';
};
setPaused(reducedMotion.matches);
reducedMotion.addEventListener('change', (event) => setPaused(event.matches));
$('motion').addEventListener('click', () => setPaused(!document.body.classList.contains('paused')));
$('long-intro')?.addEventListener('change', (event) => {
  $('extra-intro').hidden = !event.target.checked;
  $('intro-label').textContent = event.target.checked ? 'show shorter intro' : 'show longer intro';
  const url = new URL(location.href);
  event.target.checked ? url.searchParams.set('intro-mode', 'long') : url.searchParams.delete('intro-mode');
  history.replaceState(null, '', url);
});
if ($('long-intro') && new URLSearchParams(location.search).get('intro-mode') === 'long') {
  $('long-intro').checked = true;
  $('extra-intro').hidden = false;
  $('intro-label').textContent = 'show shorter intro';
}
const previews = [
  ['Document workspace', ['Supplier quotation.pdf', 'Purchase order.pdf', 'Invoice.pdf']],
  ['Developer workspace', ['Discover services', 'Configure application', 'Review and connect']],
  ['Form workspace', ['Project name', 'Target date', 'Progress']],
];
document.querySelectorAll('a.project').forEach((project, index) => {
  const show = () => {
    $('preview-title').textContent = previews[index][0];
    $('preview-rows').replaceChildren(...previews[index][1].map((text, i) => {
      const row = document.createElement('div'); row.className = 'preview-row';
      const label = document.createElement('span'); label.textContent = text;
      const state = document.createElement('span'); state.textContent = ['01', '02', '03'][i];
      row.append(label, state); return row;
    }));
    desk.classList.add('previewing');
  };
  project.addEventListener('pointerenter', show);
  project.addEventListener('focus', show);
  project.addEventListener('pointerleave', () => desk.classList.remove('previewing'));
  project.addEventListener('blur', () => desk.classList.remove('previewing'));
});
for (const name of ['studio', 'focus']) {
  $('open-' + name)?.addEventListener('click', () => $(name).showModal());
  $(name).querySelector('.close').addEventListener('click', () => $(name).close());
  $(name).addEventListener('click', (event) => { if (event.target === $(name)) { const box = $(name).getBoundingClientRect(); if(event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) $(name).close(); } });
}
$('wave').addEventListener('click', () => document.querySelector('.studio-sprite').classList.add('waving'));
$('type').addEventListener('click', () => document.querySelector('.studio-sprite').classList.remove('waving'));
// Use elapsed wall time so background-tab throttling does not stretch a focus session.
let remaining = 25 * 60, deadline = null;
function renderTimer() {
  if (deadline !== null) remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  if (remaining === 0 && deadline !== null) {
    deadline = null;
    $('focus-status').textContent = 'A little progress. Time for a break.';
  }
  $('timer').textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
  $('timer-toggle').textContent = deadline !== null ? 'pause' : remaining === 0 ? 'start again' : 'start focusing';
}
$('timer-toggle').addEventListener('click', () => {
  renderTimer();
  if (deadline !== null) { deadline = null; $('focus-status').textContent = 'Take your time. I’ll be here.'; }
  else { if (remaining === 0) remaining = 1500; deadline = Date.now() + remaining * 1000; $('focus-status').textContent = 'Just you and the next small step.'; }
  renderTimer();
});
$('timer-reset').addEventListener('click', () => { remaining = 1500; deadline = null; $('focus-status').textContent = 'Settle in. You’ve got this.'; renderTimer(); });
setInterval(renderTimer, 250);
