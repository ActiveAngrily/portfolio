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
const focus = $('focus');
$('open-focus')?.addEventListener('click', () => focus.showModal());
focus?.querySelector('.close').addEventListener('click', () => focus.close());
focus?.addEventListener('click', (event) => { if (event.target === focus) focus.close(); });
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
