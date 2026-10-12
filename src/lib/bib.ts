// Build-time parser for the CV bibliography (BibDesk export).
// Single source of truth: src/data/publications.bib (synced from CV_repo/ via
// `npm run sync:bib`). Dependency-free on purpose — see src/lib/latex.ts.

import bibSrc from '../data/publications.bib?raw';
import { latexToHtml, latexToText } from './latex';
import { classify, type Classification } from './taxonomy';

export type PubType =
  | 'journal' | 'proceeding' | 'conference' | 'other'
  | 'editor' | 'thesis' | 'submitted' | 'inprep';

export interface PubLink { label: string; href: string; }

export interface Publication {
  key: string;
  entryType: string;
  pubType: PubType;
  topics: string[];      // topic keywords (type/flags removed)
  cls: Classification;   // field/application facets + chips (src/lib/taxonomy.ts)
  authors: Name[];       // structured co-author list
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
export interface Name { display: string; family: string; given: string; slug: string; isElia: boolean; }

function initials(given: string): string {
  return given
    .split(/\s+/)
    .filter(Boolean)
    .map((g) => g.split('-').map((p) => p.charAt(0).toUpperCase() + '.').join('-'))
    .join(' ');
}

/** Stable, accent-folded key for matching against the links dictionary. */
export function slugifyName(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function parseName(raw: string): Name {
  const r = raw.trim();
  let family: string, given: string;
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
  const display = (given ? `${given} ` : '') + family;
  const isElia = family === 'Onofri' && /^E/.test(given);
  return { display, family, given, slug: slugifyName(display), isElia };
}

function namesOf(raw: string): Name[] {
  return raw.split(/\s+and\s+/).map((s) => s.trim()).filter(Boolean).map(parseName);
}

/** Small envelope marking the corresponding author (styled by `.corr` in global.css). */
export const CORR_ICON =
  '<svg class="corr" viewBox="0 0 16 12" role="img" aria-label="corresponding author"><title>Corresponding author</title>' +
  '<rect x=".75" y=".75" width="14.5" height="10.5" rx="1.5"/><path d="M1.5 1.6 8 6.6l6.5-5"/></svg>';

/**
 * Who is marked as corresponding author. The optional bib field `corresponding`
 * lists surnames ("Di Pietro"), optionally with a given name to disambiguate
 * ("Onofri, Elia"), separated by "and"; `none` marks nobody. Without the field,
 * Elia is the corresponding author, except for theses and edited volumes.
 */
function correspondingMatcher(field: string | undefined, pubType: PubType): (n: Name) => boolean {
  if (field === undefined) return pubType === 'thesis' || pubType === 'editor' ? () => false : (n) => n.isElia;
  if (/^\s*none\s*$/i.test(field)) return () => false;
  const fold = (x: string) => slugifyName(x);
  const wanted = field.split(/\s+and\s+/).map((w) => {
    const [fam, giv = ''] = latexToText(w).split(',').map((x) => x.trim());
    return { family: fold(fam), initial: fold(giv).charAt(0) };
  });
  return (n) => wanted.some((w) => fold(n.family) === w.family && (!w.initial || fold(n.given).charAt(0) === w.initial));
}

function citeName(n: Name, corr: boolean): string {
  const text = (n.given ? `${initials(n.given)} ` : '') + n.family;
  return (n.isElia ? `<em class="me">${text}</em>` : text) + (corr ? CORR_ICON : '');
}

function formatAuthors(names: Name[], isCorr: (n: Name) => boolean = () => false): string {
  const out = names.map((n) => citeName(n, isCorr(n)));
  if (out.length === 0) return '';
  if (out.length === 1) return out[0];
  if (out.length === 2) return `${out[0]} and ${out[1]}`;
  return `${out.slice(0, -1).join(', ')}, and ${out[out.length - 1]}`;
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
      return latexToHtml(stripIdMacros(f.note ?? '')).replace(/^[\s.,;]+|[\s.,;]+$/g, '').replace(/\s*\.(\s*\.)+/g, '.');
    default:
      return latexToHtml(f.journal ?? f.booktitle ?? '');
  }
}

function deriveLinks(e: RawEntry): PubLink[] {
  const f = e.fields;
  const links: PubLink[] = [];
  if (f.doi) links.push({ label: 'DOI', href: `https://doi.org/${f.doi}` });
  if (f.url) links.push({ label: f.url.toLowerCase().endsWith('.pdf') ? 'PDF' : 'url', href: f.url });
  const note = f.note ?? '';
  const arxiv = note.match(/\\arxiv\{(?:arXiv:)?([^}]+)\}/i);
  // skip placeholder ids such as 2609.XXXX until the preprint is live
  if (arxiv && !/x{2,}/i.test(arxiv[1])) links.push({ label: 'arXiv', href: `https://arxiv.org/abs/${arxiv[1].trim()}` });
  const eprint = note.match(/\\eprint\{([^}]+)\}/i);
  if (eprint) links.push({ label: 'ePrint', href: `https://eprint.iacr.org/${eprint[1].trim()}` });
  for (const m of note.matchAll(/\\href\{([^}]+)\}\{([^}]*)\}/g)) {
    const raw = m[2];
    const opens = (raw.match(/\{/g) ?? []).length;
    const closes = (raw.match(/\}/g) ?? []).length;
    const label = latexToText(raw + '}'.repeat(opens - closes)).trim() || 'link';
    links.push({ label, href: m[1].trim() });
  }
  return links;
}

/** Uniform venue for entries under review, named after the preprint server. */
function preprintVenue(e: RawEntry, links: PubLink[]): string {
  if (links.some((l) => l.label === 'arXiv')) return 'arXiv preprint';
  if (/^10\.(1101|64898)\//.test(e.fields.doi ?? '')) return 'bioRxiv preprint';
  return 'Preprint';
}

function stripIdMacros(note: string): string {
  return note.replace(/\\arxiv\{[^}]*\}/gi, '').replace(/\\eprint\{[^}]*\}/gi, '');
}

function cleanNote(note?: string): string {
  if (!note) return '';
  let s = stripIdMacros(note);
  s = latexToText(s).replace(/^[\s.,;]+|[\s,;]+$/g, '').replace(/\s*\.(\s*\.)+/g, '.').trim();
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
    const topics = keywords.filter((k) => !TYPE_SET.has(k as PubType) && !FLAGS.has(k));
    const cls = classify(topics, e.key);
    const authorSrc = pubType === 'editor' ? (e.fields.editor ?? '') : (e.fields.author ?? '');
    const authors = namesOf(authorSrc);
    const toappear = keywords.includes('toappear');
    const links = deriveLinks(e);
    const under = pubType === 'submitted';
    return {
      key: e.key,
      entryType: e.type,
      pubType,
      topics,
      cls,
      authors,
      authorsHtml: formatAuthors(authors, correspondingMatcher(e.fields.corresponding, pubType)),
      title: latexToHtml(e.fields.title) + (toappear ? ' <span class="pub-flag">to appear</span>' : ''),
      venue: under ? preprintVenue(e, links) : deriveVenue(e),
      year: parseInt(e.fields.year ?? '0', 10) || 0,
      month: parseInt((e.fields.month ?? '0').replace(/[^\d]/g, ''), 10) || 0,
      // under review: the section already says "submitted"; unpublished: the venue carries the note
      note: under || e.type === 'unpublished' ? '' : cleanNote(e.fields.note),
      links,
    };
  });
  pubs.sort((a, b) => b.year - a.year || b.month - a.month);
  cache = pubs;
  return pubs;
}

export interface Collaborator { slug: string; name: string; count: number; }

/** Distinct co-authors (Elia excluded), with shared-paper counts, most first. */
export function getCollaborators(): Collaborator[] {
  const m = new Map<string, Collaborator>();
  for (const p of getPublications()) {
    const seen = new Set<string>();
    for (const a of p.authors) {
      if (a.isElia || seen.has(a.slug)) continue;
      seen.add(a.slug);
      const e = m.get(a.slug) ?? { slug: a.slug, name: a.display, count: 0 };
      e.count++;
      m.set(a.slug, e);
    }
  }
  return [...m.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Group publications by CV section, preserving section order; empties dropped. */
export function getSections() {
  const pubs = getPublications();
  return SECTIONS
    .map((s) => ({ ...s, items: pubs.filter((p) => p.pubType === s.type) }))
    .filter((s) => s.items.length > 0);
}
