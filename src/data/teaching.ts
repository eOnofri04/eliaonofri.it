// Teaching content (bilingual), transcribed from docs/CV/CV_Onofri.tex.
// Course names differ EN/IT; thesis titles are kept verbatim (not translated).

export interface L { en: string; it: string; }

export interface Course {
  code?: string;       // language-neutral course code (IN110, CR410/B, …)
  name: L;
  ssd?: string;        // Italian disciplinary sector, e.g. [INF/01]
  year: string;        // academic year(s)
  programme: string;   // L-35 / LM-40 / MDA …
}

export interface CourseGroup {
  kind: L;
  org: L;
  period: string;
  courses: Course[];
}

export const teaching: CourseGroup[] = [
  {
    kind: { en: 'Courses taught', it: 'Attività di didattica' },
    org: { en: 'Roma Tre University · Master in Data Analytics', it: 'Università Roma Tre · Master in Data Analytics' },
    period: '2022 – 2025',
    courses: [
      { code: 'IN400/A', name: { en: 'Python Programming', it: 'Programmazione in Python' }, ssd: '[INF/01]', year: 'A.Y. 2024/25', programme: 'L-35, LM-40' },
      { name: { en: 'Cryptography I', it: 'Crittografia I' }, ssd: '[INF/01]', year: 'A.Y. 2024/25', programme: 'MDA' },
      { name: { en: 'Cryptography: Case Study', it: 'Crittografia: Case Study' }, ssd: '[INF/01]', year: 'A.Y. 2024/25', programme: 'MDA' },
      { name: { en: 'Cryptography II', it: 'Crittografia II' }, ssd: '[INF/01]', year: 'A.Y. 2023/24', programme: 'MDA' },
      { name: { en: 'Cryptography II', it: 'Crittografia II' }, ssd: '[INF/01]', year: 'A.Y. 2022/23', programme: 'MDA' },
    ],
  },
  {
    kind: { en: 'Supplementary teaching', it: 'Didattica integrativa' },
    org: { en: 'Roma Tre University', it: 'Università Roma Tre' },
    period: '2020 – 2025',
    courses: [
      { code: 'IN110', name: { en: 'Algorithms and Data Structures', it: 'Algoritmi e Strutture Dati' }, ssd: '[INF/01]', year: 'A.Y. 2024/25', programme: 'L-35' },
      { code: 'CR410/B', name: { en: 'Public-Key Cryptography', it: 'Crittografia a chiave pubblica' }, ssd: '[MAT/02]', year: 'A.Y. 2023/24', programme: 'LM-40' },
      { code: 'IN110', name: { en: 'Algorithms and Data Structures', it: 'Algoritmi e Strutture Dati' }, ssd: '[INF/01]', year: 'A.Y. 2023/24', programme: 'L-35' },
      { code: 'CR410/B', name: { en: 'Public-Key Cryptography', it: 'Crittografia a chiave pubblica' }, ssd: '[MAT/02]', year: 'A.Y. 2022/23', programme: 'LM-40' },
      { code: 'IN110', name: { en: 'Algorithms and Data Structures', it: 'Algoritmi e Strutture Dati' }, ssd: '[INF/01]', year: 'A.Y. 2021/22', programme: 'L-35' },
      { code: 'IN110', name: { en: 'Algorithms and Data Structures', it: 'Algoritmi e Strutture Dati' }, ssd: '[INF/01]', year: 'A.Y. 2020/21', programme: 'L-35' },
    ],
  },
  {
    kind: { en: 'Tutoring', it: 'Tutoraggio' },
    org: { en: 'Roma Tre University', it: 'Università Roma Tre' },
    period: '2018 – 2023',
    courses: [
      { code: 'IN110', name: { en: 'Algorithms and Data Structures', it: 'Algoritmi e Strutture Dati' }, year: 'A.Y. 2022/23', programme: 'L-35' },
      { name: { en: 'Ad-personam support, first year', it: 'Tutoraggio ad personam, primo anno' }, year: 'Jun 2021 – Oct 2022', programme: 'L-30/L-35' },
      { code: 'IN110', name: { en: 'Algorithms and Data Structures', it: 'Algoritmi e Strutture Dati' }, year: 'summer A.Y. 2020/21', programme: 'L-35' },
      { code: 'AM210', name: { en: 'Mathematical Analysis 3', it: 'Analisi Matematica 3' }, year: 'A.Y. 2018/19', programme: 'L-35' },
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
  { name: 'Davide Sabatini', degree: { en: 'M.Sc. Mathematics (LM-40)', it: 'Laurea Magistrale in Matematica (LM-40)' }, date: 'current' },
  { name: 'Augusta Gioia Vallifuoco', degree: { en: 'M.Sc. Computational Sciences (LM-40)', it: 'Laurea Magistrale in Scienze Computazionali (LM-40)' }, date: '2025-03-07', thesis: 'Estensione di uno Schema KP-ABE basato su Reticoli: Implementazione e Analisi del Meccanismo di Revoca' },
  { name: 'Serena Massarone', degree: { en: 'M.Sc. Computational Sciences (LM-40)', it: 'Laurea Magistrale in Scienze Computazionali (LM-40)' }, date: '2025-01-13', thesis: 'A Systematic Analysis of Scale-Free Effects on Coloured Graph Contraction' },
  { name: 'Davide Moretti', degree: { en: 'M.Sc. Computational Sciences (LM-40)', it: 'Laurea Magistrale in Scienze Computazionali (LM-40)' }, date: '2024-01-25', thesis: 'About clustering of time series — A case study with traffic data by Autostrade Alto Adriatico S.p.A.', coSupervisor: 'Vincenzo Bonifaci' },
  { name: 'Francesca Bacco', degree: { en: 'M.Sc. Computational Sciences (LM-40)', it: 'Laurea Magistrale in Scienze Computazionali (LM-40)' }, date: '2023-10-19', thesis: 'Investigating Coloured Graph Contraction for Analyzing Large Graphs', coSupervisor: 'Flavio Lombardi' },
  { name: 'Valerio Ardizio', degree: { en: 'B.Sc. Mathematics (L-35)', it: 'Laurea Triennale in Matematica (L-35)' }, date: '2023-07-13', thesis: 'Sugli schemi di Secret Sharing', coSupervisor: 'Francesca Merola' },
  { name: 'Francesca Giulianelli', degree: { en: 'M.Sc. Computational Sciences (LM-40)', it: 'Laurea Magistrale in Scienze Computazionali (LM-40)' }, date: '2022-10-26', thesis: 'Homomorphic Encryption: an application to Linear Regression', coSupervisor: 'Marco Pedicini' },
];
