export interface Affiliation {
  role: string;
  org: string;
  location: string;
  color: 'teal' | 'terra' | 'gold' | 'purple';
  primary?: boolean;
  note?: string;
  url?: string;                     // links the whole `org`, unless `links` covers it
  links?: Record<string, string>;   // phrase in `role` or `org` → URL
}

/** Split `text` into plain and linked segments, after the phrases in `links`. */
export function linkify(text: string, links: Record<string, string> = {}): { text: string; href?: string }[] {
  const phrases = Object.keys(links).sort((a, b) => b.length - a.length);
  if (phrases.length === 0) return [{ text }];
  const re = new RegExp(`(${phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`);
  return text.split(re).filter(Boolean).map((t) => (links[t] ? { text: t, href: links[t] } : { text: t }));
}

export const affiliations: Affiliation[] = [
  {
    role: 'Postdoctoral Researcher · CRI-Lab, CEMSE',
    org: 'KAUST',
    location: 'Thuwal, Saudi Arabia',
    color: 'teal',
    primary: true,
    url: 'https://www.kaust.edu.sa',
    links: { 'CRI-Lab': 'https://cri-lab.net', 'CEMSE': 'https://cemse.kaust.edu.sa' },
  },
  {
    role: 'Scientific Committee & Lecturer',
    org: 'MDA · Roma Tre University',
    location: 'Italy',
    color: 'terra',
    links: { 'MDA': 'https://master-data-analytics.it', 'Roma Tre University': 'https://www.uniroma3.it' },
  },
  {
    role: 'Affiliate, Digital Biology Unit',
    org: 'IAC · CNR',
    location: 'Italy',
    color: 'gold',
    links: { 'IAC': 'https://www.iac.cnr.it', 'CNR': 'https://www.cnr.it' },
  },
  {
    role: 'Member',
    org: 'De Componendis Cifris',
    location: 'Italy',
    color: 'teal',
    url: 'https://www.decifris.it',
  },
  {
    role: 'Member · Coordinator, SIG Intellect Research',
    org: 'Mensa International | Mensa Italia',
    location: 'Italy',
    color: 'purple',
    links: { 'Mensa International': 'https://www.mensa.org', 'Mensa Italia': 'https://www.mensa.it/' },
  },
];
