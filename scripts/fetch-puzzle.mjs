// Fetch a mate-in-two puzzle from Lichess (puzzles are CC0) for the chess easter egg
// on the CV page. Run by the deploy workflow next to the citation metrics, so the
// puzzle changes at every deploy and at the weekly refresh.
//
// Writes src/data/puzzle.json: { id, fen, solution (UCI moves), rating }.
// The position is rebuilt from the game and the solution is checked to end in mate;
// on any failure the existing file is left untouched, so the build never breaks.
//
// Usage: node scripts/fetch-puzzle.mjs   (or: npm run puzzle)

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Chess } from 'chess.js';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src/data/puzzle.json');
const URL = 'https://lichess.org/api/puzzle/next?angle=mateIn2';

const uci = (m) => ({ from: m.slice(0, 2), to: m.slice(2, 4), promotion: m[4] });

async function attempt() {
  const res = await fetch(URL, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const { game, puzzle } = await res.json();
  const board = new Chess();
  const moves = game.pgn.trim().split(/\s+/);
  if (moves.length !== puzzle.initialPly + 1) throw new Error('unexpected game length');
  for (const san of moves) board.move(san);
  const fen = board.fen();
  if (puzzle.solution.length !== 3) throw new Error('not a mate in two');
  for (const m of puzzle.solution) board.move(uci(m));
  if (!board.isCheckmate()) throw new Error('solution does not mate');
  return { id: puzzle.id, fen, solution: puzzle.solution, rating: puzzle.rating };
}

for (let i = 1; i <= 3; i++) {
  try {
    const p = await attempt();
    writeFileSync(OUT, JSON.stringify(p, null, 2) + '\n');
    console.log(`[puzzle] ${p.id} (rating ${p.rating}) written`);
    process.exit(0);
  } catch (e) {
    console.warn(`[puzzle] attempt ${i} failed: ${e.message}`);
  }
}
console.warn('[puzzle] keeping the existing puzzle.json');
