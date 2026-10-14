// Synthesised sounds for the easter eggs (404 gear, collaboration network).
// Off by default; the visitor's choice is remembered in this browser and shared by
// every page that offers a speaker button.

const KEY = 'eo-sound';
let ctx: AudioContext | null = null;
let memory = false;   // used when storage is blocked

export function soundOn(): boolean {
  try { return localStorage.getItem(KEY) === 'on'; } catch { return memory; }
}
export function setSound(on: boolean) {
  memory = on;
  try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch { /* no storage */ }
}

function audio() {
  ctx ??= new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// speaker icons for the toggle buttons
const SPEAKER = '<path d="M3 9h4l5-4v14l-5-4H3z" fill="currentColor" stroke="none"/>';
const svg = (extra: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">${SPEAKER}${extra}</svg>`;
export const ICON_ON = svg('<path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>');
export const ICON_OFF = svg('<path d="M16 10l4 4M20 10l-4 4"/>');

/** Makes `btn` a speaker toggle; `onChange` runs after each click. */
export function speakerButton(btn: HTMLButtonElement, onChange?: (on: boolean) => void) {
  const show = () => {
    btn.innerHTML = soundOn() ? ICON_ON : ICON_OFF;
    btn.setAttribute('aria-pressed', String(soundOn()));
  };
  btn.addEventListener('click', () => {
    setSound(!soundOn());
    show();
    onChange?.(soundOn());
  });
  show();
}

/** A short mechanical click. */
export function click() {
  if (!soundOn()) return;
  const a = audio(), t = a.currentTime;
  const o = a.createOscillator(), g = a.createGain();
  o.type = 'square';
  o.frequency.setValueAtTime(1400, t);
  o.frequency.exponentialRampToValueAtTime(500, t + 0.03);
  g.gain.setValueAtTime(0.04, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + 0.05);
}

/** A soft triangle-wave note, starting `delay` seconds from now. */
export function note(freq: number, delay = 0, length = 1.2, gain = 0.07) {
  if (!soundOn()) return;
  const a = audio(), s = a.currentTime + 0.02 + delay;
  const o = a.createOscillator(), g = a.createGain();
  o.type = 'triangle';
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, s);
  g.gain.exponentialRampToValueAtTime(gain, s + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, s + length);
  o.connect(g).connect(a.destination);
  o.start(s);
  o.stop(s + length + 0.1);
}

/** C5 E5 G5 C6, rolled. */
export function chord() {
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => note(f, 0.05 + i * 0.09, 1.4, 0.08));
}
