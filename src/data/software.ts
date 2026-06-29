// Software-page content. Toolbox = languages/tools (Elia's core list, enriched
// from the CV skills). Projects = real software artefacts, linked to GitHub
// repos and verified DOIs/arXiv. `soon` marks repos not yet released.

export type Accent = 'teal' | 'terra' | 'gold' | 'purple';

export const githubUrl = 'https://github.com/eOnofri04';

// ── Toolbox ────────────────────────────────────────────────────────────────
export interface ToolRow { label: string; color: Accent; items: string[]; }

export const toolbox: ToolRow[] = [
  {
    label: 'Languages',
    color: 'teal',
    items: ['C / C++', 'Python', 'Julia', 'Java', 'Rust', 'Bash'],
  },
  {
    label: 'Scientific computing & HPC',
    color: 'terra',
    items: ['MATLAB', 'Mathematica', 'NumPy / SciPy', 'PyTorch', 'Jupyter', 'OpenMP', 'MPI', 'CUDA', 'PARI/GP'],
  },
  {
    label: 'Paradigms',
    color: 'purple',
    items: ['Imperative', 'Object-oriented', 'Functional', 'Parallel & concurrent'],
  },
  {
    label: 'Tooling & data',
    color: 'gold',
    items: ['Git', 'Docker', 'SQL / SQLite / PostgreSQL', 'Make'],
  },
  {
    label: 'Authoring & typesetting',
    color: 'teal',
    items: ['LaTeX', 'TikZ', 'Beamer', 'Markdown', 'Office', 'iWork'],
  },
];

// ── Projects & tools ───────────────────────────────────────────────────────
export interface SwLink { label: string; href: string; soon?: boolean; }
export interface SwProject {
  name: string;
  tagline: string;
  blurb: string;
  tags: string[];
  color: Accent;
  links: SwLink[];
}

export const projects: SwProject[] = [
  {
    name: 'Coloured graph contraction',
    tagline: 'β- and γ-contraction for colour-preserving graph reduction',
    blurb:
      'Algorithms and a unified framework for contracting large coloured networks while preserving categorical node attributes, with serial and parallelisable implementations.',
    tags: ['C', 'OpenMP', 'Rust', 'Julia', 'Graph Theory'],
    color: 'terra',
    links: [
      { label: 'code', href: 'https://github.com/eOnofri04/GraphColorContraction' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2404.12080' },
      { label: 'DOI', href: 'https://doi.org/10.5383/JUSPN.17.02.006' },
    ],
  },
  {
    name: 'Polkadot network analysis',
    tagline: 'Graph contraction & staking on a live cryptocurrency network',
    blurb:
      'Characterising Polkadot’s transaction ecosystem through coloured graph contraction, estimating speculation in the transaction network, and a reality check on its nominated proof-of-stake.',
    tags: ['Cryptocurrency', 'Graph contraction', 'Network analysis'],
    color: 'gold',
    links: [
      { label: 'transactions', href: 'https://github.com/eOnofri04/Polkadot-ComNet2026' },
      { label: 'contraction', href: 'https://github.com/eOnofri04/Polkadot-Contraction-DAPPS2024' },
      { label: 'staking', href: 'https://github.com/eOnofri04/Polkadot-Staking-ICBC26', soon: true },
      { label: 'paper', href: 'https://doi.org/10.1016/j.comnet.2026.112166' },
    ],
  },
  {
    name: 'mR_LWE-CP-ABE',
    tagline: 'Revocable post-quantum attribute-based encryption',
    blurb:
      'A lattice-based, revocable CP-ABE scheme for post-quantum cryptography, with a cross-primitive comparison of lattices versus bilinear pairings.',
    tags: ['Cryptography', 'Lattices', 'Post-quantum'],
    color: 'teal',
    links: [
      { label: 'DOI', href: 'https://doi.org/10.1515/jmc-2023-0026' },
      { label: 'comparison', href: 'https://doi.org/10.1515/jmc-2025-0051' },
    ],
  },
  {
    name: 'I-(OT)²',
    tagline: 'A client-optimal oblivious-transfer protocol for IoT',
    blurb:
      'An oblivious-transfer protocol designed to minimise client-side cost, targeting resource-constrained IoT devices.',
    tags: ['Cryptography', 'Oblivious transfer', 'IoT'],
    color: 'teal',
    links: [
      { label: 'code', href: 'https://github.com/eOnofri04/IOT2' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2606.02344' },
    ],
  },
  {
    name: 'COD-ssi',
    tagline: 'Credential oblivious disclosure for self-sovereign identity',
    blurb:
      'A protocol enforcing mutual privacy for credential disclosure in self-sovereign-identity settings.',
    tags: ['Cryptography', 'Privacy', 'Self-sovereign identity'],
    color: 'teal',
    links: [
      { label: 'code', href: 'https://github.com/eOnofri04/COD-ssi', soon: true },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2604.10685' },
    ],
  },
  {
    name: 'Cube-attack toolkit',
    tagline: 'Algebraic cryptanalysis over general finite fields',
    blurb:
      'A computational investigation of the cube attack generalised beyond GF(2), with tooling to mount and analyse the attack and a survey of a decade-plus of developments.',
    tags: ['Cryptanalysis', 'C', 'PARI/GP', 'Finite fields'],
    color: 'teal',
    links: [
      { label: 'DOI', href: 'https://doi.org/10.1007/s00200-023-00602-w' },
      { label: 'ePrint', href: 'https://eprint.iacr.org/2022/137' },
    ],
  },
  {
    name: 'PRISM',
    tagline: 'Fingerprinting AI-generated images',
    blurb:
      'A phase-enhanced, radial-based image-signature mapping framework that fingerprints AI-generated images through signal analysis, released together with the PRISM-36K dataset.',
    tags: ['Signal analysis', 'Machine Learning', 'Python'],
    color: 'purple',
    links: [
      { label: 'method', href: 'https://github.com/eOnofri04/PRISM', soon: true },
      { label: 'dataset', href: 'https://github.com/eOnofri04/PRISM-36K' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2509.15270' },
    ],
  },
  {
    name: 'APORIA',
    tagline: 'A geometric analysis of LLM hallucinations',
    blurb:
      'Companion code for “A Geometric Analysis of Small-sized Language Model Hallucinations”, characterising hallucination through the geometry of model representations.',
    tags: ['Python', 'Machine Learning', 'LLMs'],
    color: 'purple',
    links: [
      { label: 'code', href: 'https://github.com/eOnofri04/APORIA' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2602.14778' },
    ],
  },
  {
    name: 'LAR — Linear Algebraic Representation',
    tagline: 'Solid modelling & computational topology in Julia',
    blurb:
      'Julia libraries representing solids and chain complexes through sparse-array linear algebra, enabling boundary evaluation and topological operations as sparse-matrix products.',
    tags: ['Julia', 'Computational Topology', 'Sparse linear algebra'],
    color: 'gold',
    links: [
      { label: 'code', href: 'https://github.com/cvdlab/LinearAlgebraicRepresentation.jl' },
      { label: 'DOI', href: 'https://doi.org/10.1016/j.cad.2022.103436' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2004.00046' },
    ],
  },
  {
    name: 'AlphaStructures.jl',
    tagline: 'α-complexes for topological data analysis',
    blurb:
      'A Julia library computing α-complexes and α-shapes for point-cloud reconstruction and topological analysis, part of the LAR ecosystem.',
    tags: ['Julia', 'Computational Topology', 'Point clouds'],
    color: 'gold',
    links: [{ label: 'code', href: 'https://github.com/eOnofri04/AlphaStructures.jl' }],
  },
  {
    name: 'StoneVerse',
    tagline: 'Open-science platform for modelling stone decay',
    blurb:
      'A reproducible, open-science platform for modelling water transport and stone decay in porous media for cultural-heritage conservation, with Bayesian parameter identification.',
    tags: ['Numerical PDEs', 'Bayesian / ABC', 'Cultural Heritage'],
    color: 'terra',
    links: [
      { label: 'DOI', href: 'https://doi.org/10.2312/DH.20253236' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2602.23932' },
    ],
  },
  {
    name: 'NRMc',
    tagline: 'Multi-stratum model of a nano-functionalised releasing capsule',
    blurb:
      'Numerical simulation of a multi-stratum, experiment-driven model for a nano-functionalised drug-releasing capsule.',
    tags: ['MATLAB', 'Numerical modelling', 'Drug delivery', 'Computational Biology'],
    color: 'terra',
    links: [
      { label: 'code', href: 'https://github.com/eOnofri04/NRMc' },
      { label: 'DOI', href: 'https://doi.org/10.3934/mbe.2026001' },
    ],
  },
  {
    name: 'Immune-system ABM',
    tagline: 'Multi-scale agent-based immunology',
    blurb:
      'Multi-scale agent-based modelling of the immune response and granuloma-like structures for tuberculosis-treatment studies, integrating drug, host, and pathogen dynamics.',
    tags: ['C / C++', 'PhysiCell', 'Computational Biology', 'HPC'],
    color: 'terra',
    links: [
      { label: 'DOI', href: 'https://doi.org/10.1109/BIBM58861.2023.10385440' },
      { label: 'DOI', href: 'https://doi.org/10.1109/TCBB.2022.3191392' },
    ],
  },
  {
    name: 'eliacv',
    tagline: 'A standalone LaTeX CV class',
    blurb:
      'A dependency-light CV class built directly on `article`: a designed cover, an accent-bar timeline, a career-arc Gantt, chip-based skills, and language/theme toggles. It typesets the very CV linked from this site.',
    tags: ['LaTeX', 'LuaLaTeX', 'TikZ'],
    color: 'teal',
    links: [{ label: 'CV', href: '/cv' }],
  },
];
