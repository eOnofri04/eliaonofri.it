// Two-facet classification shared by publications, talks, projects, gallery and the
// collaboration graph (see TAXONOMY.md). Every object carries plain keywords (bib
// `keywords`, or `topics` in the data files); this vocabulary says which facet each
// keyword belongs to. Field = the research method (drives colour); application = the
// domain. Filters combine one field and one application with AND.

export interface Facet { id: string; label: string; }

export const FIELDS: Facet[] = [
  { id: 'security',  label: 'Cryptography & Security' },
  { id: 'ai',        label: 'AI Reliability & Safety' },
  { id: 'ml',        label: 'Machine Learning' },
  { id: 'numerical', label: 'Numerical Modelling & Simulation' },
  { id: 'graph',     label: 'Graph Theory & Networks' },
  { id: 'topology',  label: 'Computational Topology' },
];

export const APPLICATIONS: Facet[] = [
  { id: 'crowds',      label: 'Crowds & Mobility' },
  { id: 'heritage',    label: 'Cultural Heritage' },
  { id: 'biomed',      label: 'Biomedicine' },
  { id: 'blockchain',  label: 'Blockchain & Finance' },
  { id: 'identity',    label: 'Digital Identity & IoT' },
  { id: 'genai',       label: 'Generative AI' },
  { id: 'foundations', label: 'Foundations' },
  { id: 'other',       label: 'Other' },
];

// keyword (lower case) → facet, facet id, chip label. `generic` marks a keyword that
// merely names its category: its chip shows the category alone, and is dropped when
// a more specific keyword of the same category is present.
const VOCAB: Record<string, { facet: 'field' | 'app'; id: string; label: string; generic?: boolean }> = {
  // fields
  'crypto':                 { facet: 'field', id: 'security',  label: 'Cryptography', generic: true },
  'cpabe':                  { facet: 'field', id: 'security',  label: 'CP-ABE' },
  'oblivious transfer':     { facet: 'field', id: 'security',  label: 'Oblivious Transfer' },
  'cubeattack':             { facet: 'field', id: 'security',  label: 'Cube Attacks' },
  'trustworthy ai':         { facet: 'field', id: 'ai',        label: 'Trustworthy AI' },
  'agentic ai':             { facet: 'field', id: 'ai',        label: 'Agentic AI' },
  'ai forensics':           { facet: 'field', id: 'ai',        label: 'AI Forensics' },
  'machine learning':       { facet: 'field', id: 'ml',        label: 'Machine Learning', generic: true },
  'numerical analysis':     { facet: 'field', id: 'numerical', label: 'Numerical Modelling', generic: true },
  'graph theory':           { facet: 'field', id: 'graph',     label: 'Graph Theory', generic: true },
  'graph contraction':      { facet: 'field', id: 'graph',     label: 'Graph Contraction' },
  'network analysis':       { facet: 'field', id: 'graph',     label: 'Network Analysis' },
  'computational topology': { facet: 'field', id: 'topology',  label: 'Computational Topology', generic: true },
  // applications
  'museums':                { facet: 'app', id: 'crowds',      label: 'Museums' },
  'traffic':                { facet: 'app', id: 'crowds',      label: 'Traffic' },
  'porous media':           { facet: 'app', id: 'heritage',    label: 'Porous Media' },
  'cultural heritage':      { facet: 'app', id: 'heritage',    label: 'Cultural Heritage', generic: true },
  'computational biology':  { facet: 'app', id: 'biomed',      label: 'Computational Biology', generic: true },
  'cryptocurrency':         { facet: 'app', id: 'blockchain',  label: 'Cryptocurrency' },
  'ssi':                    { facet: 'app', id: 'identity',    label: 'Self-Sovereign Identity' },
  'iot':                    { facet: 'app', id: 'identity',    label: 'IoT' },
  'llm':                    { facet: 'app', id: 'genai',       label: 'LLMs' },
  'generative ai':          { facet: 'app', id: 'genai',       label: 'Generative AI', generic: true },
  'foundations':            { facet: 'app', id: 'foundations', label: 'Foundations', generic: true },
  'sports analytics':       { facet: 'app', id: 'other',       label: 'Sports Analytics' },
};

export interface Chip {
  label: string;          // "Category | Subcategory", or the category alone
  facet: 'field' | 'app';
  id: string;
  sub?: string;           // the subcategory, when the keyword is specific
}
export interface Classification { fields: string[]; apps: string[]; chips: Chip[]; }

const warned = new Set<string>();

/** Classify a list of keywords; unknown ones are reported once at build time. */
export function classify(keywords: string[], where = ''): Classification {
  const fields: string[] = [];
  const apps: string[] = [];
  const chips: Chip[] = [];
  for (const raw of keywords) {
    const k = raw.trim().toLowerCase();
    const v = VOCAB[k];
    if (!v) {
      if (k && !warned.has(k)) {
        warned.add(k);
        console.warn(`[taxonomy] unknown keyword "${raw}"${where ? ` (${where})` : ''}; add it to src/lib/taxonomy.ts`);
      }
      continue;
    }
    const list = v.facet === 'field' ? fields : apps;
    if (!list.includes(v.id)) list.push(v.id);
    const cat = facetLabel(v.facet, v.id);
    chips.push(v.generic
      ? { label: cat, facet: v.facet, id: v.id }
      : { label: `${cat} | ${v.label}`, facet: v.facet, id: v.id, sub: v.label });
  }
  return { fields, apps, chips: prune(chips) };
}

function facetLabel(facet: 'field' | 'app', id: string): string {
  return (facet === 'field' ? FIELDS : APPLICATIONS).find((f) => f.id === id)?.label ?? id;
}

/** Drop duplicates, and category-only chips made redundant by a specific one. */
function prune(chips: Chip[]): Chip[] {
  const out: Chip[] = [];
  for (const c of chips) {
    if (out.some((x) => x.label === c.label)) continue;
    if (!c.sub && chips.some((x) => x.sub && x.facet === c.facet && x.id === c.id)) continue;
    out.push(c);
  }
  return out;
}

/** Merge several classifications (e.g. a talk's own topics plus its paper's). */
export function merge(...cs: Classification[]): Classification {
  const out: Classification = { fields: [], apps: [], chips: [] };
  for (const c of cs) {
    for (const f of c.fields) if (!out.fields.includes(f)) out.fields.push(f);
    for (const a of c.apps) if (!out.apps.includes(a)) out.apps.push(a);
    out.chips.push(...c.chips);
  }
  out.chips = prune(out.chips);
  return out;
}

/** Only the facets that at least one item uses, in canonical order. */
export function usedFacets(items: Classification[]) {
  return {
    fields: FIELDS.filter((f) => items.some((i) => i.fields.includes(f.id))),
    apps: APPLICATIONS.filter((a) => items.some((i) => i.apps.includes(a.id))),
  };
}
