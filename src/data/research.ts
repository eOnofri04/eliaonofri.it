// Research-page content, transcribed from docs/CV/CV_Onofri.tex (English side).
// Three sections live on /research: funded projects, talks & seminars, service.

export type Accent = 'teal' | 'terra' | 'gold' | 'purple';

// ── Funded projects ────────────────────────────────────────────────────────
export interface Project {
  acronym: string;
  title: string;
  org: string;
  period: string;
  grant?: string;
  url?: string;
  blurb: string;
  color: Accent;
  tags: string[];
}

export const projects: Project[] = [
  {
    acronym: 'LLM Bias',
    title: 'Uncovering and Addressing Bias in LLM Interactions',
    org: 'KAUST · CEMSE',
    period: '2025 – present',
    grant: 'BAS/1/1701-01-01 (ref. R. Di Pietro)',
    blurb:
      'Applied mathematics and computer science to identify and mitigate bias in large-language-model platforms across diverse operational contexts.',
    color: 'teal',
    tags: ['Machine Learning', 'Security & Privacy'],
  },
  {
    acronym: 'H2IOSC',
    title: 'Humanities and cultural Heritage Italian Open Science Cloud',
    org: 'IAC · CNR',
    period: '2024 – 2025',
    grant: 'NextGenerationEU · NRRP M4C2 · IR0000029 (CUP B63C22000730005)',
    url: 'https://www.h2iosc.cnr.it',
    blurb:
      'Mathematical modelling, data analysis, and the implementation and parallelisation of model-based algorithms for the cultural-heritage open-science cloud.',
    color: 'gold',
    tags: ['Cultural Heritage', 'Numerical Modelling', 'HPC'],
  },
  {
    acronym: 'PRAESIIDIUM',
    title: 'Multi-scale in-silico simulation of the immune-system response',
    org: 'IAC · CNR',
    period: '2023 – 2024',
    grant: 'EU Horizon · G.A. 101095672',
    blurb:
      'Development of a mathematical and computational multi-scale model for the in-silico simulation of the immune-system response.',
    color: 'terra',
    tags: ['Computational Biology', 'Numerical Modelling'],
  },
  {
    acronym: 'ERA4TB',
    title: 'European Regimen Accelerator for Tuberculosis',
    org: 'IMI2 consortium',
    period: '2021 – 2024',
    grant: 'H2020-JTI-IMI2-2018-15 · G.A. 853989',
    url: 'https://era4tb.org',
    blurb:
      'In-silico modelling of granuloma-like structures and the immune response to support tuberculosis-treatment design.',
    color: 'terra',
    tags: ['Computational Biology'],
  },
  {
    acronym: 'MODA',
    title: 'Integrating Model-based and Data-driven Methods for Multiscale Biological Systems',
    org: 'INdAM · GNCS',
    period: '2025',
    grant: 'CUP E53C24001950001',
    blurb: 'Bridging model-based and data-driven methods for multiscale biological systems.',
    color: 'purple',
    tags: ['Numerical Modelling', 'Machine Learning', 'Computational Biology'],
  },
  {
    acronym: 'GNCS-HPC',
    title: 'Numerical modelling and HPC approaches for multiscale models of Complex Systems',
    org: 'INdAM · GNCS',
    period: '2024',
    grant: 'CUP E53C23001670001',
    blurb: 'High-performance-computing approaches for the numerical modelling of complex multiscale systems.',
    color: 'gold',
    tags: ['HPC', 'Numerical Modelling'],
  },
];

// ── Talks & seminars ───────────────────────────────────────────────────────
export type TalkKind = 'Talk' | 'Invited talk' | 'Invited lesson' | 'Seminar' | 'Poster' | 'Mini-course';

export interface Talk {
  date: string; // ISO YYYY-MM-DD
  title: string;
  event: string;
  location?: string;
  kind: TalkKind;
  links?: { label: string; href: string }[];
}

export const talks: Talk[] = [
  { date: '2026-07-07', title: 'A Geometric Analysis of Small-sized Language Model Hallucinations', event: 'ICML 2026', location: 'Seoul, South Korea', kind: 'Talk' },
  { date: '2026-05-14', title: 'Git: a 40-minute primer for researchers', event: 'CRI-Lab, KAUST', location: 'Saudi Arabia', kind: 'Seminar' },
  { date: '2026-04-22', title: 'Quantum & Post-Quantum Cryptography', event: 'CRI-Lab Quantum Masterclass, KAUST', location: 'Saudi Arabia', kind: 'Invited talk' },
  { date: '2026-04-14', title: 'I-(OT)²', event: 'Applied Cryptography course, KAUST', location: 'Saudi Arabia', kind: 'Invited lesson' },
  { date: '2025-10-06', title: 'Mathematical Modelling of Imbibition in Porous Media: From Diffusion Equations to the StoneVerse Platform', event: 'Math4cult 2025, IAC', location: 'Rome, Italy', kind: 'Talk' },
  { date: '2025-09-25', title: 'Modelling Percolation and Stone Decay in Cultural Heritage through StoneVerse', event: 'YAMC 2025', location: 'Padua, Italy', kind: 'Talk' },
  { date: '2025-09-22', title: 'AMELIA: A High-Performance Computing Infrastructure for Advanced Research', event: 'YAMC 2025', location: 'Padua, Italy', kind: 'Poster' },
  { date: '2025-09-10', title: 'StoneVerse: The Open-Science Platform for Reproducible Modelling of Stone Decay', event: 'Digital Heritage 2025', location: 'Siena, Italy', kind: 'Talk' },
  { date: '2025-02-25', title: 'Models and Methods in Cultural Heritage: The Open-Science StoneVerse Platform', event: 'Giornate IAC | AdR 7, CNR', location: 'Rome, Italy', kind: 'Talk' },
  { date: '2025-02-17', title: 'mR_LWE-CP-ABE: a Recoverable CP-ABE Protocol for Post-Quantum Cryptography', event: 'Graduate Seminar | CEMSE, KAUST', location: 'Saudi Arabia', kind: 'Seminar' },
  { date: '2025-02-14', title: 'Adversarial Examples in Machine Learning: Taxonomy and Insights', event: 'CySec Group Meeting | TGIT, KAUST', location: 'Saudi Arabia', kind: 'Seminar' },
  { date: '2025-01-21', title: 'On the Modelling of Granuloma-Like Structures: from In-Vitro to In-Silico Modelling', event: 'MDN Winter Semester, Sapienza', location: 'Rome, Italy', kind: 'Seminar' },
  { date: '2024-12-02', title: 'Introduction to Python: a discussion on advantages and criticalities', event: 'IN490 invited talk, Roma Tre', location: 'Italy', kind: 'Invited talk' },
  { date: '2024-05-06', title: 'Managing pedestrian flows in crowded museums: from data gathering to optimisation', event: 'PYSANUM, Scuola Normale Superiore', location: 'Pisa, Italy', kind: 'Seminar' },
  { date: '2024-04-18', title: 'β-contraction: a Framework for Contracting Coloured Networks — Use Cases and Applications', event: 'KAUST', location: 'Saudi Arabia', kind: 'Seminar' },
  { date: '2024-04-15', title: 'A gentle introduction to Fully Homomorphic Encryption', event: 'Applied Cryptography invited lesson, KAUST', location: 'Saudi Arabia', kind: 'Invited lesson' },
  { date: '2024-02-01', title: 'Multi-scale and ML-aided models for vehicular traffic', event: 'Heterogeneity on the Road, Padua University', location: 'Italy', kind: 'Talk' },
  { date: '2023-12-15', title: 'mR_LWE-CP-ABE: a revocable CP-ABE for post-quantum cryptography', event: 'Cifris’23, Consob', location: 'Rome, Italy', kind: 'Talk' },
  { date: '2023-09-19', title: 'Managing crowded museums', event: 'YAMC 2023, Siena University', location: 'Italy', kind: 'Talk' },
  { date: '2023-09-18', title: 'A gentle introduction to clustering', event: 'YAMC 2023, Siena University', location: 'Italy', kind: 'Mini-course' },
  { date: '2023-05-10', title: 'How machine learning can improve macroscopic models for traffic state estimation and forecast', event: 'Junior Seminars, Roma Tre', location: 'Italy', kind: 'Seminar' },
  { date: '2023-04-13', title: 'Validate in-silico modelling of GLS', event: 'ERA4TB Workshop', location: 'Rome, Italy', kind: 'Talk' },
  { date: '2022-12-20', title: 'A brief introduction to Multi-threading and Multi-processing: Pthreads, OpenMP and MPI', event: 'IN490 invited talk, Roma Tre', location: 'Italy', kind: 'Invited talk' },
  { date: '2022-10-25', title: 'In-Silico Granulomas: preliminary results', event: 'ERA4TB, IDMIT', location: 'Paris, France', kind: 'Talk' },
  { date: '2022-09-21', title: 'AI for Traffic Data Analysis', event: 'YAMC 2022', location: 'Arenzano, Italy', kind: 'Talk' },
  { date: '2022-09-20', title: 'Basics in Traffic Modelling', event: 'YAMC 2022', location: 'Arenzano, Italy', kind: 'Mini-course' },
  { date: '2022-07-08', title: 'A brief introduction to Differential Privacy', event: 'DBU Smol Tolks, IAC-CNR', location: 'Rome, Italy', kind: 'Seminar' },
  { date: '2022-02-28', title: 'On tweakable black-box polynomials: the cube attacks family', event: 'GTM seminars, Roma Tre', location: 'Italy', kind: 'Seminar' },
  { date: '2022-01-24', title: 'Attribute-based colouring and its applications in reducing problem size', event: 'GTM seminars, Roma Tre', location: 'Italy', kind: 'Seminar' },
  { date: '2021-12-14', title: 'Multi-threading and Multi-processing: Julia Parallel Computing', event: 'IN490 invited talk, Roma Tre', location: 'Italy', kind: 'Invited talk' },
  { date: '2021-12-13', title: 'The role of the applied mathematician: optimising pedestrian flows in crowded museums', event: 'GTM seminars, Roma Tre', location: 'Italy', kind: 'Seminar' },
  { date: '2021-12-07', title: 'Multi-threading and Multi-processing: Pthreads, OpenMP and MPI', event: 'IN490 invited talk, Roma Tre', location: 'Italy', kind: 'Invited talk' },
  { date: '2021-11-29', title: 'RSSi-based visitor tracking in museums via cascaded AI classifiers', event: 'PED 2021', location: 'online', kind: 'Talk' },
  { date: '2021-11-25', title: 'On real-world implementation of the RSA cryptosystem: Hands-On', event: 'CR410 invited talk, Roma Tre', location: 'Italy', kind: 'Invited lesson' },
  { date: '2021-11-18', title: 'On real-world implementation of the RSA cryptosystem: Theory', event: 'CR410 invited talk, Roma Tre', location: 'Italy', kind: 'Invited lesson' },
  { date: '2021-07-01', title: 'On the existence of adversarial examples in neural-network classification with small Hamming distance', event: 'GTM seminars, Roma Tre', location: 'Italy', kind: 'Seminar' },
  { date: '2021-05-14', title: 'Macroscopic vehicular traffic simulations and linear programming problems', event: 'IN440 invited talk, Roma Tre', location: 'Italy', kind: 'Invited talk' },
  { date: '2020-12-10', title: 'ML-based Algorithms and Models for Analysing Heterogeneous Data', event: 'Young Researchers Day, IAC-CNR', location: 'Italy', kind: 'Talk' },
  { date: '2019-05-23', title: 'Snowden Backdoor', event: 'Roma Tre', location: 'Italy', kind: 'Seminar', links: [{ label: 'page', href: 'https://matematicafisica.uniroma3.it/articoli/pre-snowden-backdoor-298/' }] },
  { date: '2019-04-29', title: 'A brief description of Proof Nets: the bridge between Modern Logic and Computer Science', event: 'Roma Tre', location: 'Italy', kind: 'Seminar' },
  { date: '2019-01-18', title: 'A brief presentation on Hamilton’s Ideals', event: 'Roma Tre', location: 'Italy', kind: 'Seminar' },
];

// ── Service ────────────────────────────────────────────────────────────────
export interface ServiceRole { role: string; org: string; detail?: string; url?: string; }
export interface ServiceTags { label: string; tags: { name: string; detail?: string }[]; }
export interface ServiceBlock {
  id: string;
  heading: string;
  roles?: ServiceRole[];
  tagGroups?: ServiceTags[];
}

export const service: ServiceBlock[] = [
  {
    id: 'editorial',
    heading: 'Editorial & peer review',
    roles: [
      {
        role: 'Review Editor',
        org: 'Frontiers in Communications and Networks',
        detail: 'Security, Privacy and Authentication · since 2020',
      },
    ],
    tagGroups: [
      {
        label: 'Journal referee',
        tags: [
          { name: 'Journal of Mathematical Cryptology (De Gruyter)', detail: '2025–26' },
          { name: 'Frontiers in Communications and Networks', detail: '2025–26' },
          { name: 'Pervasive and Mobile Computing (Elsevier)', detail: '2024–25' },
          { name: 'Journal on Computing and Cultural Heritage (ACM)', detail: '2025' },
          { name: 'Frontiers in Computer Science', detail: '2025' },
          { name: 'Scientific Reports (Nature)', detail: '2025' },
          { name: 'Computer Communications (Elsevier)', detail: '2024' },
          { name: 'Security and Communication Networks (Hindawi)', detail: '2020–22' },
          { name: 'Frontiers in Immunology', detail: '2022' },
        ],
      },
      {
        label: 'Conference referee',
        tags: [
          { name: 'ESORICS', detail: '2026' },
          { name: 'IEEE SECON', detail: '2026' },
          { name: 'IEEE/ACM CCGrid', detail: '2026' },
          { name: 'IEEE BIBM', detail: '2024' },
          { name: 'VEHITS', detail: '2024' },
          { name: 'ANT', detail: '2021–22' },
          { name: 'EUSPN', detail: '2020–21' },
        ],
      },
    ],
  },
  {
    id: 'committees',
    heading: 'Programme & scientific committees',
    roles: [
      { role: 'Scientific Committee', org: 'Master in Data Analytics, Roma Tre', detail: 'since 2025', url: 'https://master-data-analytics.it' },
      { role: 'General Program Chair', org: 'Young Applied Mathematicians Conference (YAMC 2026)', detail: 'Turin, Italy', url: 'https://www.yamc.it' },
      { role: 'PC Member', org: 'NET-AI-BHI workshop @ IEEE BIBM', detail: 'Dallas 2026 · Wuhan 2025 · Lisbon 2024' },
      { role: 'Programme & Organising', org: 'Young Applied Mathematicians Conference (YAMC)', detail: 'Padua 2025 · Rome 2024' },
      { role: 'Scientific Committee', org: 'IXH24 — Italian XRPL Hackathon', detail: 'secondary-schools session · Rome 2024', url: 'https://www.decifris.it/ixh24' },
      { role: 'PC Member', org: 'Int. Conf. on Ambient Systems, Networks and Technologies (ANT)', detail: 'Systems Security & Privacy · 2021–22' },
      { role: 'PC Member', org: 'Int. Conf. on Emerging Ubiquitous Systems and Pervasive Networks (EUSPN)', detail: 'Security, Privacy & Trust · 2020–21' },
    ],
  },
  {
    id: 'organising',
    heading: 'Organising — events & seminar cycles',
    roles: [
      { role: 'Organiser', org: 'Kitware Visualization Toolkit (VTK) course, 30 h', detail: 'IAC-CNR · H2IOSC · 2025' },
      { role: 'Organiser', org: 'Tè di Matematica — seminar cycle', detail: 'Roma Tre · 2022–24' },
      { role: 'Organiser', org: 'Junior Seminars — Ph.D. seminar cycle', detail: 'Roma Tre · 2022–24' },
      { role: 'Co-founder', org: 'General Topics in Mathematics (GTM) — Ph.D. seminar cycle', detail: 'Roma Tre · 2021–22' },
    ],
  },
];
