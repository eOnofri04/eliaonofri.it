// Easter eggs: trophies, their tracker, and the site-wide eggs (Konami code, console
// message, campfire, page visits). Page-specific eggs import `unlock` and friends.
// Progress lives in this browser's localStorage only (in memory when that is blocked).
import { TROPHIES, TIER_POINTS, SECTIONS, levelOf, type Tier } from '@/lib/trophies';
import { cupSvg, capSvg } from '@/lib/pixel';

interface State {
  got: Record<string, string>;      // trophy id -> ISO date earned
  sets: Record<string, string[]>;   // things seen: 'pages', 'gallery'
  best: Record<string, number>;     // records: 'knight', 'gallery-total'
}
const KEY = 'eo-eggs';
const BY_ID = new Map(TROPHIES.map((t) => [t.id, t]));
const TIERS: Tier[] = ['platinum', 'gold', 'silver', 'bronze'];
let memory: State = { got: {}, sets: {}, best: {} };

function read(): State {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (s && typeof s === 'object') return { got: s.got ?? {}, sets: s.sets ?? {}, best: s.best ?? {} };
  } catch { /* storage unavailable: keep the in-memory copy */ }
  return memory;
}
function write(s: State) {
  memory = s;
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* idem */ }
}

export const has = (id: string) => !!read().got[id];

const TOTAL = TROPHIES.reduce((a, t) => a + TIER_POINTS[t.tier], 0);
const percent = (s: State) => Math.round((TROPHIES.reduce((a, t) => a + (s.got[t.id] ? TIER_POINTS[t.tier] : 0), 0) / TOTAL) * 100);

/** Earns a trophy (once), with a toast, and another when the visitor's level rises;
 * earning all the others earns the platinum. */
export function unlock(id: string): boolean {
  const s = read();
  if (s.got[id] || !BY_ID.has(id)) return false;
  const before = levelOf(percent(s));
  s.got[id] = new Date().toISOString();
  write(s);
  const t = BY_ID.get(id)!;
  toast(t.tier === 'platinum' ? 'Platinum trophy earned' : 'Trophy earned', t.title, t.tier);
  const after = levelOf(percent(s));
  if (after.n > before.n) toast('Level up', `Lv. ${after.n} · ${after.title}`, 'level');
  if (id !== 'platinum' && TROPHIES.every((t) => t.id === 'platinum' || s.got[t.id])) unlock('platinum');
  refresh();
  return true;
}

/** Adds an item to a named set; returns the size of the set. */
export function remember(set: string, item: string): number {
  const s = read();
  const list = s.sets[set] ?? [];
  if (!list.includes(item)) {
    list.push(item);
    s.sets[set] = list;
    write(s);
  }
  return list.length;
}

/** Keeps the highest value seen for a named record. */
export function record(name: string, n: number) {
  const s = read();
  if ((s.best[name] ?? 0) < n) {
    s.best[name] = n;
    write(s);
  }
}

// ── toasts ──
interface Toast { kind: string; title: string; tier: Tier | 'level'; }
const queue: Toast[] = [];
let showing = false;
function toast(kind: string, title: string, tier: Toast['tier']) {
  queue.push({ kind, title, tier });
  if (!showing) nextToast();
}
function nextToast() {
  const t = queue.shift();
  if (!t) { showing = false; return; }
  showing = true;
  let box = document.querySelector<HTMLElement>('.egg-toasts');
  if (!box) {
    box = document.createElement('div');
    box.className = 'egg-toasts';
    box.setAttribute('role', 'status');
    document.body.append(box);
  }
  const el = document.createElement('button');
  el.type = 'button';
  el.className = `egg-toast tier-${t.tier}`;
  el.innerHTML = `${t.tier === 'level' ? capSvg() : cupSvg()}<span><span class="egg-kind">${t.kind}</span><strong>${t.title}</strong></span>`;
  el.addEventListener('click', openTracker);
  box.append(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('in')));
  window.setTimeout(() => {
    el.classList.remove('in');
    window.setTimeout(() => { el.remove(); nextToast(); }, 400);
  }, 4200);
}

// ── tracker ──
let dlg: HTMLDialogElement | null = null;

function progress(id: string, s: State): string {
  if (id === 'explorer') return `${SECTIONS.filter((p) => s.sets.pages?.includes(p)).length}/${SECTIONS.length} sections`;
  if (id === 'curator' && s.best['gallery-total']) return `${s.sets.gallery?.length ?? 0}/${s.best['gallery-total']} pieces`;
  if (id === 'knight' && s.best.knight) return `best: ${s.best.knight}/64 squares`;
  return '';
}

function render() {
  if (!dlg) return;
  const s = read();
  const pct = percent(s);
  const level = levelOf(pct);
  const date = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const tiers = TIERS.map((tier) => {
    const all = TROPHIES.filter((t) => t.tier === tier);
    return `<li class="tier-${tier}" title="${tier}">${cupSvg()}${all.filter((t) => s.got[t.id]).length}/${all.length}</li>`;
  }).join('');
  const items = TROPHIES.map((t) => {
    const d = s.got[t.id];
    const p = d ? '' : progress(t.id, s);
    return `<li class="egg-item tier-${t.tier}${d ? ' got' : ''}">${cupSvg()}<div>`
      + `<strong>${t.title}</strong><span>${d ? t.desc : t.hint}</span>`
      + (p ? `<em>${p}</em>` : '') + (d ? `<time datetime="${d}">${date(d)}</time>` : '')
      + `</div></li>`;
  }).join('');
  dlg.innerHTML = `
    <div class="egg-head">
      <div>
        <h2>Trophies</h2>
        <p class="egg-level tier-level">${capSvg()}Lv. ${level.n} · ${level.title}</p>
      </div>
      <button type="button" class="egg-close" data-egg-close aria-label="Close">×</button>
    </div>
    <div class="egg-sum">
      <div class="egg-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pct}%"></span></div>
      <span class="egg-pct">${pct}%</span>
      <ul class="egg-tiers">${tiers}</ul>
    </div>
    <ol class="egg-list">${items}</ol>
    <div class="egg-foot">
      <span>Progress is kept in this browser only.</span>
      <button type="button" data-egg-reset>reset</button>
    </div>`;
}

export function openTracker() {
  if (!dlg) {
    dlg = document.createElement('dialog');
    dlg.className = 'egg-tracker';
    dlg.setAttribute('aria-label', 'Trophies');
    dlg.addEventListener('click', (ev) => {
      const t = ev.target as HTMLElement;
      if (t === dlg || t.closest('[data-egg-close]')) dlg!.close();
      else if (t.closest('[data-egg-reset]') && window.confirm('Forget every trophy earned in this browser?')) {
        write({ got: {}, sets: {}, best: {} });
        refresh();
      }
    });
    document.body.append(dlg);
  }
  render();
  if (!dlg.open) dlg.showModal();
}

/** Updates the footer counter, and the tracker when it is open. */
function refresh() {
  const s = read();
  const n = TROPHIES.filter((t) => s.got[t.id]).length;
  document.querySelectorAll('[data-egg-count]').forEach((el) => { el.textContent = `${n}/${TROPHIES.length}`; });
  if (dlg?.open) render();
}

// ── site-wide eggs ──
const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];

function consoleArt() {
  // a pixel-art gear, drawn with background-coloured blocks
  const N = 18, c = N / 2;
  let fmt = '';
  const css: string[] = [];
  for (let y = 0; y < N; y++) {
    let prev = '', run = 0;
    const flush = () => {
      if (!run) return;
      fmt += `%c${'  '.repeat(run)}`;
      css.push(`background:${prev || 'transparent'};font-size:11px;line-height:1.2`);
    };
    for (let x = 0; x < N; x++) {
      const px = x + 0.5 - c, py = y + 0.5 - c;
      const r = Math.hypot(px, py);
      const tooth = Math.cos(8 * Math.atan2(py, px)) > 0.3;
      const col = r < 2.3 ? '' : r < 3.6 ? '#a07a2a' : r < 6.3 ? '#e0b354' : r < 8.7 && tooth ? '#e0b354' : '';
      if (col === prev) run++;
      else { flush(); prev = col; run = 1; }
    }
    flush();
    fmt += '\n';
  }
  const t = 'font:13px/1.6 ui-monospace,Menlo,monospace;color:#9d9b8c';
  const h = 'font:600 15px/1.6 ui-monospace,Menlo,monospace;color:#e0b354';
  console.log(
    `${fmt}\n%cHello, fellow tinkerer.\n%cThis site is plain Astro; its source is at https://github.com/eOnofri04/eliaonofri.it\n`
    + 'A few things are hidden around here. Type tinker() to claim your first trophy, then press ? to see the others.',
    ...css, h, t,
  );
  (window as unknown as { tinker: () => string }).tinker = () => {
    unlock('tinkerer');
    return 'Trophy earned: Tinkerer. Press ? on the page to see what else there is.';
  };
  (window as unknown as { sudo: (...args: unknown[]) => string }).sudo = () => {
    unlock('sudo');
    return 'You are not in the sudoers file. This incident will be reported.';
  };
}

export function initEggs() {
  // page visits
  const path = location.pathname.replace(/\/+$/, '').replace(/\/index\.html$/, '') || '/';
  if (SECTIONS.includes(path)) {
    remember('pages', path);
    const s = read();
    if (SECTIONS.every((p) => s.sets.pages?.includes(p))) unlock('explorer');
  }
  if (path.startsWith('/it/')) unlock('bilingual');

  // Konami code: keys, or on touch screens swipes for the arrows and two taps for B, A
  let k = 0;
  function konami(key: string) {
    // a third ↑ keeps the first two
    k = key === KONAMI[k] ? k + 1 : key === 'arrowup' ? (k === 2 ? 2 : 1) : 0;
    if (k === KONAMI.length) {
      k = 0;
      document.documentElement.classList.toggle('retro');
      unlock('konami');
    }
  }
  document.addEventListener('keydown', (ev) => {
    const el = ev.target as HTMLElement;
    if (ev.ctrlKey || ev.metaKey || ev.altKey || el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
    const key = ev.key.toLowerCase();
    konami(key);
    // tracker: ? or h, or the footer button
    if (ev.key === '?' || key === 'h') openTracker();
  });
  let touch: { x: number; y: number } | null = null;
  document.addEventListener('touchstart', (ev) => {
    touch = ev.touches.length === 1 ? { x: ev.touches[0].clientX, y: ev.touches[0].clientY } : null;
  }, { passive: true });
  document.addEventListener('touchend', (ev) => {
    if (!touch) return;
    const dx = ev.changedTouches[0].clientX - touch.x;
    const dy = ev.changedTouches[0].clientY - touch.y;
    touch = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 30) konami(k === 8 ? 'b' : k === 9 ? 'a' : 'tap');
    else if (Math.abs(dx) > Math.abs(dy)) konami(dx > 0 ? 'arrowright' : 'arrowleft');
    else konami(dy > 0 ? 'arrowdown' : 'arrowup');
  }, { passive: true });
  document.querySelectorAll('[data-egg-open]').forEach((b) => b.addEventListener('click', openTracker));

  // the campfire in the footer is a save point
  document.querySelectorAll<HTMLElement>('[data-campfire]').forEach((b) => b.addEventListener('click', () => {
    const msg = b.parentElement?.querySelector<HTMLElement>('.save-msg');
    if (msg) {
      msg.classList.remove('show');
      void msg.offsetWidth;   // restart the fade
      msg.classList.add('show');
    }
    unlock('bonfire');
  }));

  consoleArt();
  refresh();
}
