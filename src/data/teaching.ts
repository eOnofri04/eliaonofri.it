// Teaching content (bilingual), transcribed from docs/CV/CV_Onofri.tex.
// Course names differ EN/IT; thesis titles are kept verbatim (not translated).
// MDA courses use a single calendar year prefixed with A.Y. (e.g. "A.Y. 2026").

export interface L { en: string; it: string; }

export interface CourseLink { label: string; href: string; }

export interface CourseDetail {
  università?: string;
  dipartimento?: string;
  corsoStudio?: string;
  periodi?: string;
  curriculum?: string;
  ambito?: string;
  attività?: string;
  ore?: string;
  cfu?: string;
}

export interface Course {
  code?: string;       // language-neutral course code (IN110, CR410/B, …)
  name: L;
  ssd?: string;        // Italian disciplinary sector, e.g. [INF/01]
  year: string;        // academic year; MDA uses A.Y. + single calendar year
  programme: string;   // L-35 / LM-40 / MDA …
  links?: CourseLink[];
  detail?: CourseDetail;
}

export interface CourseGroup {
  kind: L;
  org: L;
  period: string;
  courses: Course[];
}

// ── shared detail objects ────────────────────────────────────────────────────

const in400detail: CourseDetail = {
  università: 'Roma Tre',
  dipartimento: 'Matematica e Fisica',
  corsoStudio: 'LM-40 · Scienze Computazionali; L-35 · Matematica',
  periodi: 'LM-40: Primo anno · Primo Semestre; L-35: Terzo anno · Primo Semestre',
  curriculum: 'Crittografia e sicurezza informatica; Modellistica fisica e simulazioni numeriche; Analisi dei dati e statistica',
  ambito: 'Attività formative affini o integrative',
  attività: 'Attività formative affini ed integrative',
  ore: '24 + 6 esercitazione',
};

const cr410detail: CourseDetail = {
  università: 'Roma Tre',
  dipartimento: 'Matematica e Fisica',
  corsoStudio: 'LM-40 · Scienze Computazionali',
  periodi: 'Primo anno · Primo semestre',
  curriculum: 'Gestione e protezione dei dati; Modellistica fisica e simulazioni numeriche; Analisi dei dati e statistica',
  ambito: 'Formazione teorica avanzata',
  attività: 'Attività formative caratterizzanti',
  ore: '12 di 12',
  cfu: '3',
};

// IN110 supplementary teaching: hours differ by era
const in110detail_2324: CourseDetail = {
  università: 'Roma Tre',
  dipartimento: 'Matematica e Fisica',
  corsoStudio: 'L-35 · Matematica',
  periodi: 'Primo anno · Primo Semestre',
  curriculum: 'Teorico-didattico; Modellistico-applicativo',
  ambito: 'Formazione informatica',
  attività: 'Attività formative di base',
  ore: '30 di 42',
};

const in110detail_2122: CourseDetail = {
  università: 'Roma Tre',
  dipartimento: 'Matematica e Fisica',
  corsoStudio: 'L-35 · Matematica',
  periodi: 'Primo anno · Primo semestre',
  curriculum: 'Teorico-didattico; Modellistico-applicativo',
  ambito: 'Formazione informatica',
  attività: 'Attività formative di base',
  ore: '42 di 90',
  cfu: '9',
};

const in110tutoring_2223: CourseDetail = {
  università: 'Roma Tre',
  dipartimento: 'Matematica e Fisica',
  corsoStudio: 'L-35 · Matematica',
  periodi: 'Primo anno · Primo Semestre',
  curriculum: 'Teorico-didattico; Modellistico-applicativo',
  ambito: 'Formazione informatica',
  attività: 'Attività formative di base',
  ore: '25 di 50',
};

const in110tutoring_summer: CourseDetail = {
  università: 'Roma Tre',
  dipartimento: 'Matematica e Fisica',
  corsoStudio: 'L-35 · Matematica',
  periodi: 'Primo anno · Primo semestre',
  curriculum: 'Teorico-didattico; Modellistico-applicativo',
  ambito: 'Formazione informatica',
  attività: 'Attività formative di base',
  ore: '50 di 50',
};

const am210detail: CourseDetail = {
  università: 'Roma Tre',
  dipartimento: 'Matematica e Fisica',
  corsoStudio: 'L-35 · Matematica',
  periodi: 'Secondo anno · Primo semestre',
  curriculum: 'Teorico-didattico; Modellistico-applicativo',
  ambito: 'Formazione teorica',
  attività: 'Attività formative caratterizzanti',
  ore: '24',
  cfu: '9',
};

// ── teaching data ────────────────────────────────────────────────────────────

export const teaching: CourseGroup[] = [
  {
    kind: { en: 'Courses taught', it: 'Attività di didattica' },
    org: { en: 'Roma Tre University · Master in Data Analytics', it: 'Università Roma Tre · Master in Data Analytics' },
    period: '2022 – present',
    courses: [
      { name: { en: 'Cryptography I',            it: 'Crittografia I'           }, ssd: '[INF/01]', year: 'A.Y. 2026', programme: 'MDA' },
      { name: { en: 'Cryptography: Case Study',  it: 'Crittografia: Case Study' }, ssd: '[INF/01]', year: 'A.Y. 2026', programme: 'MDA' },
      {
        code: 'IN400/A',
        name: { en: 'Python Programming', it: 'Programmazione in Python' },
        ssd: '[INF/01]', year: 'A.Y. 2024/25', programme: 'L-35, LM-40',
        detail: in400detail,
      },
      { name: { en: 'Cryptography I',            it: 'Crittografia I'           }, ssd: '[INF/01]', year: 'A.Y. 2025', programme: 'MDA' },
      { name: { en: 'Cryptography: Case Study',  it: 'Crittografia: Case Study' }, ssd: '[INF/01]', year: 'A.Y. 2025', programme: 'MDA' },
      { name: { en: 'Cryptography II',           it: 'Crittografia II'          }, ssd: '[INF/01]', year: 'A.Y. 2024', programme: 'MDA' },
      { name: { en: 'Cryptography II',           it: 'Crittografia II'          }, ssd: '[INF/01]', year: 'A.Y. 2023', programme: 'MDA' },
    ],
  },
  {
    kind: { en: 'Supplementary teaching', it: 'Didattica integrativa' },
    org: { en: 'Roma Tre University', it: 'Università Roma Tre' },
    period: '2020 – 2025',
    courses: [
      {
        code: 'IN110',
        name: { en: 'Algorithms and Data Structures', it: 'Algoritmi e Strutture Dati' },
        ssd: '[INF/01]', year: 'A.Y. 2024/25', programme: 'L-35',
        links: [
          { label: 'Sito del Corso',   href: 'http://www.mat.uniroma3.it/users/liverani/IN110/' },
          { label: 'Scheda del Corso', href: 'https://www.uniroma3.it/insegnamento-erogato/dipartimento-di-matematica-e-fisica/l/2024-2025/Matematica-0580706203500001/4825A29F-B3C2-4E1B-AF96-6A46C2CFB44F--20410336/' },
        ],
        detail: in110detail_2324,
      },
      {
        code: 'CR410/B',
        name: { en: 'Public-Key Cryptography', it: 'Crittografia a chiave pubblica' },
        ssd: '[MAT/02]', year: 'A.Y. 2023/24', programme: 'LM-40',
        links: [
          { label: 'Sito del Corso',   href: 'http://ricerca.mat.uniroma3.it/users/merola/crittomat23/crittomat' },
          { label: 'Scheda del Corso', href: 'https://matematicafisica.uniroma3.it/insegnamento-erogato/dipartimento-di-matematica-e-fisica/lm/2023-2024/Scienze-Computazionali-0580707304100003/BF890F5A-967D-426D-BC67-25BA87FE6B78--20410625-2/' },
          { label: 'Moodle',           href: 'https://matematicafisica.el.uniroma3.it/course/view.php?id=1323' },
          { label: 'Teams',            href: 'https://teams.microsoft.com/l/team/19%3aepvlNvrn1ReRUMAOE7erTVlJ9Qz3jlWq2LUCEZFhx_c1%40thread.tacv2/conversations?groupId=3fa0d828-1421-4d6c-a203-04fc4f4f54cb&tenantId=ffb4df68-f464-458c-a546-00fb3af66f6a' },
          { label: 'Registrazioni',    href: 'https://uniroma3.sharepoint.com/sites/AA2324-CR410-CRITTOGRAFIAACHIAVEPUBBLICA-20410625MEROLA/Documenti%20Condivisi/General' },
        ],
        detail: cr410detail,
      },
      {
        code: 'IN110',
        name: { en: 'Algorithms and Data Structures', it: 'Algoritmi e Strutture Dati' },
        ssd: '[INF/01]', year: 'A.Y. 2023/24', programme: 'L-35',
        links: [
          { label: 'Sito del Corso',   href: 'http://www.mat.uniroma3.it/users/liverani/IN110/index.shtml' },
          { label: 'Scheda del Corso', href: 'https://matematicafisica.uniroma3.it/insegnamento-erogato/dipartimento-di-matematica-e-fisica/l/2023-2024/Matematica-0580706203500001/B72C30E2-B227-416C-BA2C-B5392699857B--20410336/' },
          { label: 'Blocco Note',      href: 'https://uniroma3-my.sharepoint.com/:o:/r/personal/eonofri_os_uniroma3_it/Documents/IN110%20-%20AA%202023-24?d=wf57874a60dc540429c5c4c745f682b8f&csf=1&web=1&e=ee9BET' },
        ],
        detail: in110detail_2324,
      },
      {
        code: 'CR410/B',
        name: { en: 'Public-Key Cryptography', it: 'Crittografia a chiave pubblica' },
        ssd: '[MAT/02]', year: 'A.Y. 2022/23', programme: 'LM-40',
        links: [
          { label: 'Scheda del Corso', href: 'https://matematicafisica.uniroma3.it/insegnamento-erogato/dipartimento-di-matematica-e-fisica/lm/2022-2023/Scienze-Computazionali-0580707304100003/A20201CD-45A2-4907-9CBD-A8456D46ABC2--20410625-2/' },
          { label: 'Moodle',           href: 'https://matematicafisica.el.uniroma3.it/course/view.php?id=1131' },
          { label: 'Teams',            href: 'https://teams.microsoft.com/l/team/19%3a6_kwYRuGOag2c74-9oU4ES_fV7B8mRTgN8uKdgze0EQ1%40thread.tacv2/conversations?groupId=eb90e79d-8a07-43ee-9c6e-c2aabee1620d&tenantId=ffb4df68-f464-458c-a546-00fb3af66f6a' },
          { label: 'Registrazioni',    href: 'https://uniroma3.sharepoint.com/sites/AA2223-CR410-CRITTOGRAFIAACHIAVEPUBBLICA-20410625MEROLA2/Documenti%20Condivisi/General' },
        ],
        detail: cr410detail,
      },
      {
        code: 'IN110',
        name: { en: 'Algorithms and Data Structures', it: 'Algoritmi e Strutture Dati' },
        ssd: '[INF/01]', year: 'A.Y. 2021/22', programme: 'L-35',
        links: [
          { label: 'Sito del Corso', href: 'http://www.mat.uniroma3.it/users/liverani/IN110/' },
        ],
        detail: in110detail_2122,
      },
      {
        code: 'IN110',
        name: { en: 'Algorithms and Data Structures', it: 'Algoritmi e Strutture Dati' },
        ssd: '[INF/01]', year: 'A.Y. 2020/21', programme: 'L-35',
        links: [
          { label: 'Sito del Corso', href: 'http://www.mat.uniroma3.it/users/liverani/IN110/' },
        ],
        detail: in110detail_2122,
      },
    ],
  },
  {
    kind: { en: 'Tutoring', it: 'Tutoraggio' },
    org: { en: 'Roma Tre University', it: 'Università Roma Tre' },
    period: '2018 – 2023',
    courses: [
      {
        code: 'IN110',
        name: { en: 'Algorithms and Data Structures', it: 'Algoritmi e Strutture Dati' },
        year: 'A.Y. 2022/23', programme: 'L-35',
        links: [
          { label: 'Sito del Corso', href: 'http://www.mat.uniroma3.it/users/liverani/IN110/' },
        ],
        detail: in110tutoring_2223,
      },
      { name: { en: 'Ad-personam support, first year', it: 'Tutoraggio ad personam, primo anno' }, year: 'Jun 2021 – Oct 2022', programme: 'L-30/L-35' },
      {
        code: 'IN110',
        name: { en: 'Algorithms and Data Structures', it: 'Algoritmi e Strutture Dati' },
        year: 'summer A.Y. 2020/21', programme: 'L-35',
        links: [
          { label: 'Sito del Corso', href: 'http://www.mat.uniroma3.it/users/liverani/IN110/' },
        ],
        detail: in110tutoring_summer,
      },
      {
        code: 'AM210',
        name: { en: 'Mathematical Analysis 3', it: 'Analisi Matematica 3' },
        year: 'A.Y. 2018/19', programme: 'L-35',
        links: [
          { label: 'Sito del Corso', href: 'http://ricerca.matfis.uniroma3.it/users/procesi/AM210.html' },
        ],
        detail: am210detail,
      },
    ],
  },
];

export interface Student {
  name: string;
  degree: L;
  date: string;       // ISO YYYY-MM-DD, or 'current'
  thesis?: string;    // verbatim, as written in the CV
  coSupervisor?: string;
}

export const students: Student[] = [
  { name: 'Simone Maione', degree: { en: 'M.Sc. Computational Sciences (LM-40)', it: 'Laurea Magistrale in Scienze Computazionali (LM-40)' }, date: 'current', coSupervisor: 'Flavio Lombardi' },
  { name: 'Michela Rossi', degree: { en: 'M.Sc. Computational Sciences (LM-40)', it: 'Laurea Magistrale in Scienze Computazionali (LM-40)' }, date: 'current', coSupervisor: 'Flavio Lombardi' },
  { name: 'Davide Sabatini', degree: { en: 'M.Sc. Mathematics (LM-40)', it: 'Laurea Magistrale in Matematica (LM-40)' }, date: 'current' },
  { name: 'Augusta Gioia Vallifuoco', degree: { en: 'M.Sc. Computational Sciences (LM-40)', it: 'Laurea Magistrale in Scienze Computazionali (LM-40)' }, date: '2025-03-07', thesis: 'Estensione di uno Schema KP-ABE basato su Reticoli: Implementazione e Analisi del Meccanismo di Revoca' },
  { name: 'Serena Massarone', degree: { en: 'M.Sc. Computational Sciences (LM-40)', it: 'Laurea Magistrale in Scienze Computazionali (LM-40)' }, date: '2025-01-13', thesis: 'A Systematic Analysis of Scale-Free Effects on Coloured Graph Contraction' },
  { name: 'Davide Moretti', degree: { en: 'M.Sc. Computational Sciences (LM-40)', it: 'Laurea Magistrale in Scienze Computazionali (LM-40)' }, date: '2024-01-25', thesis: 'About clustering of time series — A case study with traffic data by Autostrade Alto Adriatico S.p.A.', coSupervisor: 'Vincenzo Bonifaci' },
  { name: 'Francesca Bacco', degree: { en: 'M.Sc. Computational Sciences (LM-40)', it: 'Laurea Magistrale in Scienze Computazionali (LM-40)' }, date: '2023-10-19', thesis: 'Investigating Coloured Graph Contraction for Analyzing Large Graphs', coSupervisor: 'Flavio Lombardi' },
  { name: 'Valerio Ardizio', degree: { en: 'B.Sc. Mathematics (L-35)', it: 'Laurea Triennale in Matematica (L-35)' }, date: '2023-07-13', thesis: 'Sugli schemi di Secret Sharing', coSupervisor: 'Francesca Merola' },
  { name: 'Francesca Giulianelli', degree: { en: 'M.Sc. Computational Sciences (LM-40)', it: 'Laurea Magistrale in Scienze Computazionali (LM-40)' }, date: '2022-10-26', thesis: 'Homomorphic Encryption: an application to Linear Regression', coSupervisor: 'Marco Pedicini' },
];
