export interface Affiliation {
  role: string;
  org: string;
  location: string;
  color: 'teal' | 'terra' | 'gold' | 'purple';
  primary?: boolean;
  note?: string;
  url?: string;
}

export const affiliations: Affiliation[] = [
  {
    role: 'Postdoctoral Researcher · CRI-Lab, CEMSE',
    org: 'KAUST',
    location: 'Thuwal, Saudi Arabia',
    color: 'teal',
    primary: true,
    url: 'https://www.kaust.edu.sa',
  },
  {
    role: 'Scientific Committee & Lecturer',
    org: 'MDA · Roma Tre University',
    location: 'Italy',
    color: 'terra',
  },
  {
    role: 'Affiliate, Digital Biology Unit',
    org: 'IAC · CNR',
    location: 'Italy',
    color: 'gold',
    url: 'https://www.iac.cnr.it',
  },
  {
    role: 'Member',
    org: 'De Componendis Cifris',
    location: 'Italy',
    color: 'teal',
    url: 'https://www.cifris.com',
  },
  {
    role: 'Affiliated · SIG Intelligence Research Administrator',
    org: 'Mensa International | Mensa Italia',
    location: 'Italy',
    color: 'purple',
  },
];
