// Build-time parser for the CV bibliography (BibDesk export).
// Single source of truth: src/data/publications.bib (synced from docs/CV via
// `npm run sync:bib`). Dependency-free on purpose — see src/lib/latex.ts.

import bibSrc from '../data/publications.bib?raw';
import { latexToHtml, latexToText } from './latex';

export type PubType =
  | 'journal' | 'proceeding' | 'conference' | 'other'
  | 'editor' | 'thesis' | 'submitted' | 'inprep';

export interface PubLink { label: string; href: string; }

export interface Publication {
  key: string;
  entryType: string;
  pubType: PubType;
  topics: string[];      // keyword topics (type/flags removed)
  groups: string[];      // filter-group ids this entry belongs to
  authorsHtml: string;   // formatted, "E. Onofri" emphasised
  title: string;         // HTML fragment
  venue: string;         // HTML fragment
  year: number;
  month: number;
  note: string;          // human-readable remainder of the note field
  links: PubLink[];
}

// CV section order + headings (mirrors \printbibliography blocks in CV_Onofri.tex)
export const SECTIONS: { type: PubType; label: string }[] = [
  { type: 'journal',    label: 'Journal Articles' },
  { type: 'proceeding', label: 'Conference Proceedings' },
  { type: 'conference', label: 'Abstracts & Posters' },
  { type: 'other',      label: 'Other Contributions' },
  { type: 'editor',     label: 'As Editor' },
  { type: 'thesis',     label: 'Theses' },
  { type: 'submitted',  label: 'Under Review' },
  { type: 'inprep',     label: 'In Preparation' },
];

const TYPE_SET = new Set(SECTIONS.map((s) => s.type));
const FLAGS = new Set(['toappear']);

// Topic filter groups (each maps onto one or more bib keywords)
export const TOPIC_GROUPS: { id: string; label: string; keys: string[] }[] = [
  { id: 'crypto',    label: 'Cryptography & Security', keys: ['crypto'] },
  { id: 'graph',     label: 'Graph Theory',            keys: ['graph theory', 'graph contraction'] },
  { id: 'numerical', label: 'Numerical Modelling',     keys: ['numerical analysis'] },
  { id: 'ml',        label: 'Machine Learning',        keys: ['ai application', 'llm'] },
  { id: 'topology',  label: 'Computational Topology',  keys: ['computational topology'] },
];

// ── low-level bib tokenizer ──────────────────────────────────────────────
interface RawEntry { type: string; key: string; fields: Record<string, string>; }

function parseFields(body: string): Record<string, string> {
  const f: Record<string, string> = {};
  let i = 0;
  const n = body.length;
  while (i < n) {
    while (i < n && /[\s,]/.test(body[i])) i++;
    const s = i;
    while (i < n && /[A-Za-z0-9_\-]/.test(body[i])) i++;
    const name = body.slice(s, i).trim().toLowerCase();
    while (i < n && /\s/.test(body[i])) i++;
    if (body[i] !== '=' || !name) { i++; continue; }
    i++;
    while (i < n && /\s/.test(body[i])) i++;
    let val = '';
    if (body[i] === '{') {
      let d = 1; i++;
      const vs = i;
      while (i < n && d > 0) {
        if (body[i] === '{') d++;
        else if (body[i] === '}') { d--; if (d === 0) break; }
        i++;
      }
      val = body.slice(vs, i); i++;
    } else if (body[i] === '"') {
      i++; const vs = i;
      while (i < n && body[i] !== '"') i++;
      val = body.slice(vs, i); i++;
    } else {
      const vs = i;
      while (i < n && body[i] !== ',') i++;
      val = body.slice(vs, i).trim();
    }
    f[name] = val;
  }
  return f;
}

function parseBib(src: string): RawEntry[] {
  const out: RawEntry[] = [];
  let i = 0;
  while (i < src.length) {
    if (src[i] !== '@') { i++; continue; }
    let j = i + 1;
    while (j < src.length && /[A-Za-z]/.test(src[j])) j++;
    const type = src.slice(i + 1, j).toLowerCase();
    if (src[j] !== '{') { i = j; continue; }
    let k = j + 1;
    while (k < src.length && src[k] !== ',') k++;
    const key = src.slice(j + 1, k).trim();
    let p = j + 1, d = 1;
    while (p < src.length && d > 0) {
      if (src[p] === '{') d++;
      else if (src[p] === '}') { d--; if (d === 0) break; }
      p++;
    }
    if (type !== 'comment' && type !== 'string' && type !== 'preamble') {
      out.push({ type, key, fields: parseFields(src.slice(k + 1, p)) });
    }
    i = p + 1;
  }
  return out;
}

// ── names ────────────────────────────────────────────────────────────────
function initials(given: string): string {
  return given
    .split(/\s+/)
    .filter(Boolean)
    .map((g) => g.split('-').map((p) => p.charAt(0).toUpperCase() + '.').join('-'))
    .join(' ');
}

function formatName(raw: string): string {
  let family: string, given: string;
  const r = raw.trim();
  if (r.includes(',')) {
    const idx = r.indexOf(',');
    family = r.slice(0, idx).trim();
    given = r.slice(idx + 1).trim();
  } else {
    const parts = r.split(/\s+/);
    family = parts.pop() ?? r;
    given = parts.join(' ');
  }
  family = latexToText(family);
  given = latexToText(given);
  const isElia = family === 'Onofri' && /^E/.test(given);
  const text = (given ? `${initials(given)} ` : '') + family;
  return isElia ? `<em class="me">${text}</em>` : text;
}

function formatAuthors(raw: string): string {
  const names = raw.split(/\s+and\s+/).map(formatName);
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}

// ── per-entry derivations ──────────────────────────────────────────────────
function deriveVenue(e: RawEntry): string {
  const f = e.fields;
  switch (e.type) {
    case 'article': {
      return latexToHtml(f.journal ?? f.note ?? '');
    }
    case 'inproceedings':
    case 'incollection': {
      const book = f.booktitle && !/^to appear$/i.test(f.booktitle) ? f.booktitle : '';
      return latexToHtml(book || f.organization || f.publisher || '');
    }
    case 'book':
      return latexToHtml([f.publisher, f.address].filter(Boolean).join(', '));
    case 'phdthesis':
      return latexToHtml([f.type, f.school].filter(Boolean).join(', '));
    case 'techreport':
      return latexToHtml([f.type, f.institution].filter(Boolean).join(', '));
    case 'unpublished':
      return latexToHtml(f.note ?? '');
    default:
      return latexToHtml(f.journal ?? f.booktitle ?? '');
  }
}

function deriveLinks(e: RawEntry): PubLink[] {
  const f = e.fields;
  const links: PubLink[] = [];
  if (f.doi) links.push({ label: 'DOI', href: `https://doi.org/${f.doi}` });
  const note = f.note ?? '';
  const arxiv = note.match(/\\arxiv\{(?:arXiv:)?([^}]+)\}/i);
  if (arxiv) links.push({ label: 'arXiv', href: `https://arxiv.org/abs/${arxiv[1].trim()}` });
  const eprint = note.match(/\\eprint\{([^}]+)\}/i);
  if (eprint) links.push({ label: 'ePrint', href: `https://eprint.iacr.org/${eprint[1].trim()}` });
  return links;
}

function cleanNote(note?: string): string {
  if (!note) return '';
  let s = note
    .replace(/\\arxiv\{[^}]*\}/gi, '')
    .replace(/\\eprint\{[^}]*\}/gi, '');
  s = latexToText(s).replace(/^[\s.,;]+/, '').trim();
  // drop bare "In preparation"/"To appear" — already conveyed by the section
  if (/^(in preparation|to appear)\.?$/i.test(s)) return '';
  return s;
}

// ── public API ─────────────────────────────────────────────────────────────
let cache: Publication[] | null = null;

export function getPublications(): Publication[] {
  if (cache) return cache;
  const raw = parseBib(bibSrc);
  const pubs: Publication[] = raw.map((e) => {
    const keywords = (e.fields.keywords ?? '')
      .split(',')
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);
    const pubType = (keywords.find((k) => TYPE_SET.has(k as PubType)) ?? 'other') as PubType;
    const topics = keywords.filter((k) => k !== pubType && !FLAGS.has(k));
    const groups = TOPIC_GROUPS
      .filter((g) => g.keys.some((key) => topics.includes(key)))
      .map((g) => g.id);
    const authorSrc = pubType === 'editor' ? (e.fields.editor ?? '') : (e.fields.author ?? '');
    const toappear = keywords.includes('toappear');
    return {
      key: e.key,
      entryType: e.type,
      pubType,
      topics,
      groups,
      authorsHtml: formatAuthors(authorSrc),
      title: latexToHtml(e.fields.title) + (toappear ? ' <span class="pub-flag">to appear</span>' : ''),
      venue: deriveVenue(e),
      year: parseInt(e.fields.year ?? '0', 10) || 0,
      month: parseInt((e.fields.month ?? '0').replace(/[^\d]/g, ''), 10) || 0,
      note: cleanNote(e.fields.note),
      links: deriveLinks(e),
    };
  });
  pubs.sort((a, b) => b.year - a.year || b.month - a.month);
  cache = pubs;
  return pubs;
}

/** Group publications by CV section, preserving section order; empties dropped. */
export function getSections() {
  const pubs = getPublications();
  return SECTIONS
    .map((s) => ({ ...s, items: pubs.filter((p) => p.pubType === s.type) }))
    .filter((s) => s.items.length > 0);
}
