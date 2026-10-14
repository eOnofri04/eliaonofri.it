// Pixel art as inline SVG: one string per row, one character per pixel ('.' is empty),
// each character mapped to a colour by the palette. Runs of equal pixels in a row are
// merged into a single rect. Used by both the server (footer) and the client (trophies).

export function pixelRects(rows: string[], palette: Record<string, string>): string {
  let out = '';
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; ) {
      const ch = row[x];
      let w = 1;
      while (row[x + w] === ch) w++;
      if (ch !== '.' && palette[ch]) out += `<rect x="${x}" y="${y}" width="${w}" height="1" fill="${palette[ch]}"/>`;
      x += w;
    }
  });
  return out;
}

export function pixelSvg(rows: string[], palette: Record<string, string>, cls = ''): string {
  const w = Math.max(...rows.map((r) => r.length));
  return `<svg class="${cls}" viewBox="0 0 ${w} ${rows.length}" shape-rendering="crispEdges" aria-hidden="true">${pixelRects(rows, palette)}</svg>`;
}

// A trophy cup; the tier sets --tl, --tm, --td (light, mid, dark) on an ancestor.
export const CUP = [
  '..LMMMMMMD..',
  'MMLMMMMMMDMM',
  'M.LMMMMMMD.M',
  'M.LMMMMMMD.M',
  '.MLMMMMMMDM.',
  '...LMMMMD...',
  '....LMMD....',
  '.....MD.....',
  '.....MD.....',
  '....LMMD....',
  '...LMMMMD...',
  '..DDDDDDDD..',
];
export const CUP_PALETTE = { L: 'var(--tl)', M: 'var(--tm)', D: 'var(--td)' };
export const cupSvg = (cls = 'cup') => pixelSvg(CUP, CUP_PALETTE, cls);

// A campfire in two frames, alternated by CSS for the flicker.
const LOGS = [
  '.BB.OOOO.bb.',
  '..BBBbbbbb..',
  '..bbbBBBB...',
  '.bb......BB.',
];
export const FIRE_A = [
  '......Y.....',
  '.....YY.....',
  '.Y..YOY.....',
  '.YY.YOOY.Y..',
  '..YYOROOYY..',
  '..YORRROOY..',
  '..YORRRROY..',
  '...OORRRO...',
  ...LOGS,
];
export const FIRE_B = [
  '.....Y......',
  '.....YY..Y..',
  '....YOY..Y..',
  '..Y.YOOY.YY.',
  '..YYOROOYY..',
  '..YORRROOY..',
  '..YORRRROY..',
  '...OORRRO...',
  ...LOGS,
];
export const FIRE_PALETTE = { Y: '#ffd166', O: '#f08a3c', R: '#d1495b', B: '#8a5a3b', b: '#5e3c26' };
