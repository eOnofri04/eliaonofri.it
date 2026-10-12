# Topics

Publications, talks, projects and gallery pieces all share one classification, defined in `src/lib/taxonomy.ts`.
It has two independent axes:
the *field* says how the work is done (the method), the *application* says what it is about (the domain).
Most items have one of each; a few genuinely span two.

Filters on the site pick at most one field and one application, and show the items that match both.

## Keywords

Items carry plain lower-case keywords (bib `keywords`, or `topics` in the data files), and the vocabulary in `taxonomy.ts` knows which axis each one belongs to.
A keyword the vocabulary does not know produces a warning at build time and is otherwise ignored.

The section keywords (`journal`, `proceeding`, `conference`, `other`, `editor`, `thesis`, `submitted`, `inprep`) and the `toappear` flag are shared with the CV and are not topics.

Fields:

- Cryptography & Security — `crypto`, `cpabe`, `oblivious transfer`, `cubeattack`
- AI Reliability & Safety — `trustworthy ai`, `agentic ai`, `ai forensics`
- Machine Learning — `machine learning`
- Numerical Modelling & Simulation — `numerical analysis`
- Graph Theory & Networks — `graph theory`, `graph contraction`, `network analysis`
- Computational Topology — `computational topology`

Applications:

- Crowds & Mobility — `museums`, `traffic`
- Cultural Heritage — `porous media`, `cultural heritage`
- Biomedicine — `computational biology`
- Blockchain & Finance — `cryptocurrency`
- Digital Identity & IoT — `ssi`, `iot`
- Generative AI — `llm`, `generative ai`
- Foundations — `foundations`, for theoretical work with no particular domain
- Other — `sports analytics`

A chip reads "Category | Subcategory", e.g. "Crowds & Mobility | Museums".
Keywords that merely repeat the category (`crypto`, `machine learning`, `numerical analysis`, `graph theory`, `computational topology`, `cultural heritage`, `computational biology`, `generative ai`, `foundations`) give a chip with the category alone, which is dropped when a more specific chip of the same category is present.

Colours: fields tint their chips and filter buttons (`--f-<id>` in `global.css`); applications put a coloured dot on theirs (`--a-<id>`), the same colours used for the collaboration graph.

A new keyword is one line in `VOCAB`.
A new field or application also needs an entry in `FIELDS` or `APPLICATIONS`, and a colour in `global.css` for both themes.

## Where the keywords go

- Publications: the bib `keywords` field.
- Talks (`research.ts`): `paper: '<bib key>'` borrows the paper's topics; `topics` adds more, or classifies a talk with no paper.
  The programming primers, the multi-threading and proof-net seminars and the talk on Hamilton's ideals are left unclassified on purpose, so they only show under "All".
- Projects (`research.ts`): `topics`; `tags` is for free extras such as HPC.
- Gallery: the topics of the `source` paper, plus any `topics` of its own.
- Collaboration graph: nothing to do; each co-author takes the applications of the papers we share; a co-author whose shared papers carry no topics stays grey.

## How the papers are classified

By research line, as a reminder of the conventions in use:

- Museum crowds: `numerical analysis, museums`; the visitor-network paper (`Onofri_Corbetta_22`) is `machine learning, graph theory, museums`.
- Traffic: `numerical analysis, traffic` (Briani), `machine learning, traffic` (Moretti); the Ph.D. thesis adds `graph contraction`.
- Stone decay and porous media: `numerical analysis, porous media`.
- Tuberculosis and drug modelling: `numerical analysis, computational biology`; drug repurposing is `machine learning, graph theory, computational biology`.
- Cube attacks, CP-ABE: `cubeattack` or `cpabe`, with `foundations`; the B.Sc. thesis is `crypto, foundations`.
- Graph contraction: `graph contraction, foundations`.
- Computational topology: `computational topology, foundations`.
- Polkadot: `crypto, network analysis, cryptocurrency`; NPoS is `crypto, cryptocurrency`.
- Oblivious transfer: `oblivious transfer` with `iot` (I-(OT)²) or `ssi` (COD-ssi).
- LLMs: `trustworthy ai, llm`; PRISM is `crypto, ai forensics, generative ai`.
- Tennis: `sports analytics` only.
- Edited volumes: no topics.
