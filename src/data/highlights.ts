export type HighlightKind = 'Talk' | 'Organising' | 'Teaching' | 'Primer' | 'Paper';

export interface Highlight {
  kind: HighlightKind;
  date: string;
  title: string;
  detail: string;
  color: 'teal' | 'terra' | 'gold' | 'purple';
  href?: string;
}

export const highlights: Highlight[] = [
  {
    kind: 'Talk',
    date: '09 Jul 2026',
    title: 'A Geometric Analysis of Small-sized LLM Hallucinations',
    detail: 'ICML 2026 · Seoul, South Korea',
    color: 'teal',
  },
  {
    kind: 'Organising',
    date: '14–18 Sep 2026',
    title: 'Young Applied Mathematicians Conference — 6th Edition',
    detail: 'General Programme Chair · Turin, Italy',
    color: 'terra',
  },
  {
    kind: 'Teaching',
    date: 'A.Y. 25/26',
    title: 'Cryptography I — Foundations of Cryptography',
    detail: 'Master in Data Analytics · Roma Tre',
    color: 'gold',
    href: '/teaching',
  },
  {
    kind: 'Primer',
    date: '14 May 2026',
    title: 'Git: a 40-minute primer for researchers',
    detail: 'Slides and notes available',
    color: 'teal',
  },
];

export const researchAreas = [
  { label: 'Cryptography',                        color: 'teal'   },
  { label: 'Cryptocurrencies',                    color: 'teal'   },
  { label: 'Security & Privacy',                  color: 'teal'   },
  { label: 'Machine Learning',                    color: 'purple' },
  { label: 'Theoretical Computer Science',        color: 'purple' },
  { label: 'Graph Theory',                        color: 'terra'  },
  { label: 'Numerical Simulations',               color: 'terra'  },
  { label: 'Bio-Informatics',                     color: 'gold'   },
  { label: 'Cultural Heritage',                   color: 'gold'   },
  { label: 'Flow Management and Optimisation',    color: 'gold'   },
] as const;
