// Fetch citation metrics from OpenAlex, anchored to the DOIs in the bib.
//
// We deliberately do NOT use the ORCID author profile: OpenAlex conflates
// "E. Onofri" with another author (works back to 1969), which inflates the
// figures. Anchoring on the actual DOIs gives accurate, defensible numbers.
//
// Writes src/data/metrics.json. On any failure it leaves the existing file
// untouched (so the build always has cached values and never breaks offline).
//
// Usage: node scripts/fetch-metrics.mjs   (or: npm run metrics)

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BIB = join(root, 'src/data/publications.bib');
const OUT = join(root, 'src/data/metrics.json');
const MAILTO = 'elia.onofri4@gmail.com';

function extractDois(bib) {
  const dois = new Set();
  for (const m of bib.matchAll(/doi\s*=\s*\{([^}]+)\}/gi)) {
    dois.add(m[1].trim().toLowerCase());
  }
  return [...dois];
}

async function fetchWorks(dois) {
  const works = [];
  // OpenAlex OR-filter supports many values; chunk conservatively at 40.
  for (let i = 0; i < dois.length; i += 40) {
    const chunk = dois.slice(i, i + 40);
    const url =
      `https://api.openalex.org/works?filter=doi:${chunk.join('|')}` +
      `&select=doi,cited_by_count,counts_by_year,publication_year&per-page=100&mailto=${MAILTO}`;
    const res = await fetch(url, { headers: { 'User-Agent': `eliaonofri.it (${MAILTO})` } });
    if (!res.ok) throw new Error(`OpenAlex ${res.status} ${res.statusText}`);
    const json = await res.json();
    works.push(...(json.results ?? []));
  }
  return works;
}

function computeMetrics(works) {
  const cites = works.map((w) => w.cited_by_count ?? 0).sort((a, b) => b - a);
  const citations = cites.reduce((s, c) => s + c, 0);
  let hIndex = 0;
  for (let i = 0; i < cites.length; i++) { if (cites[i] >= i + 1) hIndex = i + 1; else break; }
  const i10Index = cites.filter((c) => c >= 10).length;

  const byYear = new Map();
  for (const w of works) {
    for (const y of w.counts_by_year ?? []) {
      byYear.set(y.year, (byYear.get(y.year) ?? 0) + (y.cited_by_count ?? 0));
    }
  }
  const perYear = [...byYear.entries()]
    .filter(([year]) => year >= 2019)
    .sort((a, b) => a[0] - b[0])
    .map(([year, citations]) => ({ year, citations }));

  return { citations, hIndex, i10Index, perYear };
}

async function main() {
  const bib = readFileSync(BIB, 'utf-8');
  const dois = extractDois(bib);
  const works = await fetchWorks(dois);
  const { citations, hIndex, i10Index, perYear } = computeMetrics(works);

  const metrics = {
    source: 'OpenAlex',
    note: 'Citations to indexed works only; anchored to the listed DOIs.',
    updated: new Date().toISOString().slice(0, 10),
    doisQueried: dois.length,
    worksMatched: works.length,
    citations,
    hIndex,
    i10Index,
    perYear,
  };
  writeFileSync(OUT, JSON.stringify(metrics, null, 2) + '\n');
  console.log(`metrics.json updated — ${works.length}/${dois.length} works, ${citations} citations, h=${hIndex}, i10=${i10Index}`);
}

main().catch((err) => {
  console.error('fetch-metrics failed:', err.message);
  if (existsSync(OUT)) {
    console.error('keeping existing metrics.json');
    process.exit(0); // do not fail the pipeline; cached values remain
  }
  process.exit(1);
});
